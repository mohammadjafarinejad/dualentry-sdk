/**
 * Hand-written type aliases over the auto-generated OpenAPI types.
 *
 * NEVER edit the generated/ folder directly.
 * Run `scripts/codegen.sh` to regenerate it from the latest OpenAPI spec.
 */
import type { components } from "./generated/types.js";

// Convenience shorthand for the generated schema bag
type S = components["schemas"];

// ─── Shared primitives ───────────────────────────────────────────────────────

type Address = S["AddressSchemaIn"];
type RecordStatus = S["RecordStatus"];
type DualEntryErrorBody = S["ErrorSchema"];

/** SDK-level pagination parameters (not from OpenAPI — these are query params). */
interface ListParams {
  limit?: number;
  offset?: number;
  [key: string]: unknown;
}

/** Generic paged response wrapper. */
interface ListResponse<T> {
  items: T[];
  count: number;
}

type AuditActor = S["AuditActorSchemaOut"];

// ─── Invoice ─────────────────────────────────────────────────────────────────

type Invoice = S["PublicInvoiceSchemaOut"];
type InvoiceLineItem = S["PublicInvoiceItemOut"];
type InvoiceLineInput = S["PublicInvoiceItemIn"];
type InvoiceCreateInput = S["PublicInvoiceSchemaCreateIn"];
type InvoiceUpdateInput = S["PublicInvoiceSchemaUpdateIn"];

// ─── Bill ─────────────────────────────────────────────────────────────────────

type Bill = S["PublicBillSchemaOut"];
type BillLineItem = S["PublicBillItemOut"];
type BillExpenseItem = S["PublicBillExpenseOut"];
type BillLineInput = S["PublicBillItemIn"];
type BillExpenseInput = S["PublicBillExpenseIn"];
type BillCreateInput = S["PublicBillSchemaCreateIn"];
type BillUpdateInput = S["PublicBillSchemaUpdateIn"];

// ─── Journal Entry ────────────────────────────────────────────────────────────

type JournalEntry = S["PublicJournalEntrySchemaOut"];
type JournalEntryLine = S["PublicJournalEntryItemOut"];
type JournalEntryLineInput = S["PublicJournalEntryItemIn"];
type JournalEntryCreateInput = S["PublicJournalEntrySchemaCreateIn"];
type JournalEntryUpdateInput = S["PublicJournalEntrySchemaUpdateIn"];

// ─── Customer ─────────────────────────────────────────────────────────────────

type Customer = S["CustomerSchemaOut"];
type CustomerCreateInput = S["CustomerSchemaCreateIn"];
type CustomerUpdateInput = S["CustomerSchemaUpdateIn"];

// ─── Vendor ───────────────────────────────────────────────────────────────────

type Vendor = S["PublicVendorSchemaOut"];
type VendorCreateInput = S["PublicVendorSchemaCreateIn"];
type VendorUpdateInput = S["PublicVendorSchemaUpdateIn"];

export type {
  Address,
  RecordStatus,
  DualEntryErrorBody,
  ListParams,
  ListResponse,
  AuditActor,
  Invoice,
  InvoiceLineItem,
  InvoiceLineInput,
  InvoiceCreateInput,
  InvoiceUpdateInput,
  Bill,
  BillLineItem,
  BillExpenseItem,
  BillLineInput,
  BillExpenseInput,
  BillCreateInput,
  BillUpdateInput,
  JournalEntry,
  JournalEntryLine,
  JournalEntryLineInput,
  JournalEntryCreateInput,
  JournalEntryUpdateInput,
  Customer,
  CustomerCreateInput,
  CustomerUpdateInput,
  Vendor,
  VendorCreateInput,
  VendorUpdateInput,
};
