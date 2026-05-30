import {
  DualEntryError,
  DualEntryAuthError,
  DualEntryNotFoundError,
  DualEntryValidationError,
  DualEntryRateLimitError,
  DualEntryServerError,
  type DualEntryErrorBody,
} from "./errors.js";
import {
  InvoicesResource,
  BillsResource,
  JournalEntriesResource,
  CustomersResource,
  VendorsResource,
} from "./resources/index.js";
import { DEFAULT_BASE_URL, type HttpMethod } from "./generated/constants.js";

export interface DualEntryConfig {
  /** Your DualEntry API key. */
  apiKey: string;
  /** Override the base URL (useful for testing). Defaults to https://api.dualentry.com */
  baseUrl?: string;
}

export type RequestFn = <T>(
  method: HttpMethod,
  path: string,
  options?: { params?: Record<string, unknown>; body?: unknown },
) => Promise<T>;

/**
 * DualEntry API client.
 *
 * @example
 * ```ts
 * const client = new DualEntry({ apiKey: process.env.DUALENTRY_API_KEY });
 * const invoices = await client.invoices.list({ status: 'posted' });
 * ```
 */
export class DualEntry {
  public readonly invoices: InvoicesResource;
  public readonly bills: BillsResource;
  public readonly journalEntries: JournalEntriesResource;
  public readonly customers: CustomersResource;
  public readonly vendors: VendorsResource;

  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(config: DualEntryConfig) {
    if (!config.apiKey) {
      throw new Error("apiKey is required");
    }
    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");

    const req = this._request.bind(this) as RequestFn;
    this.invoices = new InvoicesResource(req);
    this.bills = new BillsResource(req);
    this.journalEntries = new JournalEntriesResource(req);
    this.customers = new CustomersResource(req);
    this.vendors = new VendorsResource(req);
  }

  private async _request<T>(
    method: HttpMethod,
    path: string,
    options: { params?: Record<string, unknown>; body?: unknown } = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);

    if (options.params) {
      for (const [key, value] of Object.entries(options.params)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            if (item !== undefined && item !== null) {
              url.searchParams.append(key, String(item));
            }
          }
        } else if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      let body: DualEntryErrorBody | null = null;
      try {
        body = (await response.json()) as DualEntryErrorBody;
      } catch {
        // ignore JSON parse errors on error responses
      }

      const messages = body?.errors ? Object.values(body.errors).flat() : [];
      const message = messages[0] ?? `HTTP ${response.status}`;

      switch (response.status) {
        case 401:
        case 403:
          throw new DualEntryAuthError(message, response.status, body);
        case 404:
          throw new DualEntryNotFoundError(message, body);
        case 422:
          throw new DualEntryValidationError(message, body);
        case 429:
          throw new DualEntryRateLimitError(message, body);
        case 500:
        case 503:
          throw new DualEntryServerError(message, response.status, body);
        default:
          throw new DualEntryError(message, response.status, body);
      }
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }
}
