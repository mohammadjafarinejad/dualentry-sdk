<img src="./assets/logo.jpg" width="100"/>

# dualentry-sdk

Unofficial TypeScript and Python SDKs for the [DualEntry API](https://docs.dualentry.com).

Idiomatic, fully typed SDK clients for TypeScript and Python — generated from the [official OpenAPI spec](https://docs.dualentry.com/developers/openapi/resources-v2.json).

> 📦 **Python SDK**
>
> 🚧 Python package will be available shortly.

---

## Quickstart

<details>
<summary><strong>TypeScript Example</strong></summary>

### TypeScript

```typescript
import { DualEntry } from "@dualentry/sdk";

const client = new DualEntry({ apiKey: process.env.DUALENTRY_API_KEY! });

// List invoices (single page)
const page = await client.invoices.list({
  record_status: ["posted"],
  limit: 50,
});
console.log(`${page.count} total invoices`);

// Iterate through every invoice without manual pagination
for await (const invoice of client.invoices.listAll({
  record_status: ["posted"],
})) {
  console.log(invoice.number, invoice.amount_due);
}

// Get a single invoice
const invoice = await client.invoices.get(1001);

// Create an invoice
const created = await client.invoices.create({
  company_id: 10,
  customer_id: 42,
  date: "2026-05-01",
  items: [{ item_id: 5, quantity: 2, rate: "250.00" }],
});
```

## Error handling

All errors extend `DualEntryError`, so you can catch broadly or narrow to specific conditions.

```ts
import {
  DualEntryNotFoundError,
  DualEntryValidationError,
  DualEntryAuthError,
  DualEntryRateLimitError,
  DualEntryServerError,
} from "@dualentry/sdk";

try {
  const inv = await client.invoices.get(9999);
} catch (err) {
  if (err instanceof DualEntryNotFoundError) {
    console.log("Invoice does not exist");
  } else if (err instanceof DualEntryValidationError) {
    console.log("Validation errors:", err.errors);
  } else if (err instanceof DualEntryAuthError) {
    console.log("Check your API key");
  }
}
```

</details>

---

<details>
<summary><strong>Python Example</strong></summary>

### Python

```py
import os
from dualentry import DualEntry
from dualentry.errors import DualEntryNotFoundError, DualEntryValidationError

client = DualEntry(api_key=os.environ["DUALENTRY_API_KEY"])

# List posted invoices
invoices = client.invoices.list(status="posted")

# Auto-paginate through all bills
for bill in client.bills.list_all():
    print(bill.id, bill.total)

# Create a customer
customer = client.customers.create(
    name="Acme Corp",
    email="billing@acme.com",
)

try:
    client.invoices.get("inv-missing")
except DualEntryValidationError as e:
    print(e.errors)  # { 'field': ['message'] }
```

</details>

---

## Errors

| Class                      | Status code(s) |
| -------------------------- | -------------- |
| `DualEntryAuthError`       | 401, 403       |
| `DualEntryNotFoundError`   | 404            |
| `DualEntryValidationError` | 422            |
| `DualEntryRateLimitError`  | 429            |
| `DualEntryServerError`     | 500, 503       |

---

## Required methods per resource

Every resource must expose these five methods:

| Method          | Signature                             |
| --------------- | ------------------------------------- |
| List (one page) | `list(filters?)`                      |
| Fetch one       | `get(id)`                             |
| Create          | `create(data)`                        |
| Update (full)   | `update(id, data)`                    |
| Auto-paginate   | `listAll(filters?)` → `AsyncIterable` |

## Disclaimer

This is an unofficial, community-maintained project and is not affiliated with or endorsed by DualEntry. For the official CLI, see [dualentry/dualentry-cli](https://github.com/dualentry/dualentry-cli).
