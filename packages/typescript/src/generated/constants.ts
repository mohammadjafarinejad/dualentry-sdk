/** This file was auto-generated. Do not edit. */

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
const DEFAULT_BASE_URL = 'https://api.dualentry.com';
const API_PATHS = {
  INVOICES: '/public/v2/invoices/',
  BILLS: '/public/v2/bills/',
  JOURNAL_ENTRIES: '/public/v2/journal-entries/',
  CUSTOMERS: '/public/v2/customers/',
  VENDORS: '/public/v2/vendors/',
} as const;

export { HttpMethod, DEFAULT_BASE_URL, API_PATHS };
