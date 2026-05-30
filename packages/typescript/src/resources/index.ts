import { BaseResource } from "./base.js";
import type {
  Invoice,
  InvoiceCreateInput,
  InvoiceUpdateInput,
  Bill,
  BillCreateInput,
  BillUpdateInput,
  JournalEntry,
  JournalEntryCreateInput,
  JournalEntryUpdateInput,
  Customer,
  CustomerCreateInput,
  CustomerUpdateInput,
  Vendor,
  VendorCreateInput,
  VendorUpdateInput,
} from "../types.js";
import { API_PATHS } from "../generated/constants.js";

class InvoicesResource extends BaseResource<
  Invoice,
  InvoiceCreateInput,
  InvoiceUpdateInput
> {
  protected readonly path = API_PATHS.INVOICES;
}

class BillsResource extends BaseResource<
  Bill,
  BillCreateInput,
  BillUpdateInput
> {
  protected readonly path = API_PATHS.BILLS;
}

class JournalEntriesResource extends BaseResource<
  JournalEntry,
  JournalEntryCreateInput,
  JournalEntryUpdateInput
> {
  protected readonly path = API_PATHS.JOURNAL_ENTRIES;
}

class CustomersResource extends BaseResource<
  Customer,
  CustomerCreateInput,
  CustomerUpdateInput
> {
  protected readonly path = API_PATHS.CUSTOMERS;
}

class VendorsResource extends BaseResource<
  Vendor,
  VendorCreateInput,
  VendorUpdateInput
> {
  protected readonly path = API_PATHS.VENDORS;
}

export {
  InvoicesResource,
  BillsResource,
  JournalEntriesResource,
  CustomersResource,
  VendorsResource,
};
