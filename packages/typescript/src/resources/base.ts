import type { RequestFn } from "../client.js";
import type { ListParams, ListResponse } from "../types.js";

/**
 * Base class for all resource endpoints.
 * Implements common CRUD operations with type safety.
 *
 * @template T - The resource type (e.g., Invoice, Bill)
 * @template TCreate - The create input type
 * @template TUpdate - The update input type
 */
export abstract class BaseResource<T, TCreate, TUpdate> {
  protected request: RequestFn;
  protected abstract readonly path: string;

  constructor(request: RequestFn) {
    this.request = request;
  }

  protected buildParams(
    filters: Record<string, unknown> = {},
    extra: Record<string, unknown> = {},
  ): Record<string, unknown> {
    const params: Record<string, unknown> = {};
    for (const [k, v] of Object.entries({ ...filters, ...extra })) {
      if (v !== undefined && v !== null) {
        params[k] = v;
      }
    }
    return params;
  }

  /**
   * Retrieve a paginated list of resources.
   */
  async list(filters: ListParams = {}): Promise<ListResponse<T>> {
    return this.request<ListResponse<T>>("GET", this.path, {
      params: this.buildParams(filters),
    });
  }

  /**
   * Retrieve a single resource by its ID.
   */
  async get(id: number): Promise<T> {
    return this.request<T>("GET", `${this.path}${id}/`);
  }

  /**
   * Create a new resource.
   */
  async create(data: TCreate): Promise<T> {
    return this.request<T>("POST", this.path, { body: data });
  }

  /**
   * Update a resource (full replacement).
   */
  async update(id: number, data: TUpdate): Promise<T> {
    return this.request<T>("PUT", `${this.path}${id}/`, { body: data });
  }

  /**
   * Async generator that auto-paginates through all resources.
   */
  async *listAll(
    filters: Omit<ListParams, "limit" | "offset"> = {},
  ): AsyncIterable<T> {
    const limit = 100;
    let offset = 0;

    while (true) {
      const page = await this.list({ ...filters, limit, offset });
      for (const item of page.items) {
        yield item;
      }
      if (page.items.length === 0) break;
      offset += limit;
    }
  }
}
