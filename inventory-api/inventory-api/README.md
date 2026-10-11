# Inventory and Data Management System

REST API built with Node.js, Express, MongoDB (Mongoose) and dotenv.

## Setup

```bash
npm install
cp .env.example .env     # set MONGO_URI and PORT
npm start                # or: npm run dev
```

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/products` | Create a product |
| GET | `/api/products` | List products (filter, sort, paginate) |
| GET | `/api/products/:id` | Get one product |
| PUT | `/api/products/:id` | Update product details |
| PATCH | `/api/products/:id/stock` | Restock / sell: `{ "change": 10 }` or `{ "change": -3 }` |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/products/low-stock` | Products with `quantity <= reorderLevel` (aggregation) |
| GET | `/api/products/summary` | Category-wise totals and average price (aggregation) |

### Query parameters for `GET /api/products`

`category`, `supplier`, `search` (name/SKU), `minPrice`, `maxPrice`, `inStock=true|false`,
`sort` (e.g. `price,-quantity`), `page`, `limit` (default 10, max 100).

### Sample create body

```json
{ "name": "Gel Pen Pack of 15", "sku": "STNY-PN-713", "category": "Stationery",
  "price": 120, "quantity": 40, "reorderLevel": 20, "supplier": "Cello Pens" }
```

## Design notes

- **Schema**: required fields, unique uppercase SKU with format check, category enum, non-negative price/quantity, integer quantities, `stockValue` virtual (`price * quantity`).
- **Stock safety**: `PATCH /:id/stock` uses a single atomic `findOneAndUpdate` with `$inc`, so quantity can never go below zero, even under concurrent sales.
- **Errors**: one centralized handler maps validation, cast, duplicate-key and JSON parse errors to clean 400/404/409 responses.
- **Structure**: `config/`, `models/`, `controllers/`, `routes/`, `middleware/`.
