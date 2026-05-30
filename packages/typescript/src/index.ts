// Client
export { DualEntry } from "./client.js";
export type { DualEntryConfig, RequestFn } from "./client.js";

// Errors
export {
  DualEntryError,
  DualEntryAuthError,
  DualEntryNotFoundError,
  DualEntryValidationError,
  DualEntryRateLimitError,
  DualEntryServerError,
} from "./errors.js";
export type { DualEntryErrorBody } from "./errors.js";

// Types
export type {
  Address,
  RecordStatus,
  ListParams,
  ListResponse,
  AuditActor,
  Invoice,
  InvoiceLineItem,
  InvoiceCreateInput,
  InvoiceUpdateInput,
  InvoiceLineInput,
  Bill,
  BillLineItem,
  BillCreateInput,
  BillUpdateInput,
  BillLineInput,
  JournalEntry,
  JournalEntryLine,
  JournalEntryCreateInput,
  JournalEntryUpdateInput,
  JournalEntryLineInput,
  Customer,
  CustomerCreateInput,
  CustomerUpdateInput,
  Vendor,
  VendorCreateInput,
  VendorUpdateInput,
} from "./types.js";

// Resources
export {
  InvoicesResource,
  BillsResource,
  JournalEntriesResource,
  CustomersResource,
  VendorsResource,
} from "./resources/index.js";
