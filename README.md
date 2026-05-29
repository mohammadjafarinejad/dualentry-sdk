<img src="https://images.prismic.io/contrary-research/aNbX0J5xUNkB1Kmi_DualEntry_Square.png?auto=format,compress" width="100"/>

# dualentry-sdk

Unofficial TypeScript and Python SDKs for the [DualEntry API](https://docs.dualentry.com).

Idiomatic, fully typed SDK clients for TypeScript and Python — generated from the [official OpenAPI spec](https://docs.dualentry.com/developers/openapi/resources-v2.json).

> 📦 **Python SDK**
>
> 🚧 Python package will be available shortly.

---

## Quickstart

### TypeScript

```typescript
import { DualEntry, DualEntryNotFoundError, DualEntryValidationError } from '@dualentry/sdk';

const client = new DualEntry({ apiKey: process.env.DUALENTRY_API_KEY });

// List posted invoices
const invoices = await client.invoices.list({ status: 'posted' });

// Auto-paginate through all bills
for await (const bill of client.bills.listAll()) {
  console.log(bill.id, bill.total);
}

// Create a customer
const customer = await client.customers.create({
  name: 'Acme Corp',
  email: 'billing@acme.com',
});

try {
  await client.invoices.get('inv-missing');
} catch (e) {
  if (e instanceof DualEntryValidationError) {
    console.log(e.errors); // { field: ['message'] }
  }
}
```

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

## Errors

| Class | HTTP Status |
|---|---|
| `DualEntryAuthError` | 401, 403 |
| `DualEntryNotFoundError` | 404 |
| `DualEntryValidationError` | 422 |
| `DualEntryRateLimitError` | 429 |
| `DualEntryServerError` | 500, 503 |

---

## Disclaimer

This is an unofficial, community-maintained project and is not affiliated with or endorsed by DualEntry. For the official CLI, see [dualentry/dualentry-cli](https://github.com/dualentry/dualentry-cli).
