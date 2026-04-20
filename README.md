This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend API

The project now includes a basic backend API built with Next.js App Router route handlers and Prisma.

### Available endpoints

- `GET /api/health` - verifies the API is up and the database is reachable
- `GET /api/products` - list all products with recipe items and ingredients
- `POST /api/products` - create a product
- `GET /api/products/:id` - fetch one product
- `PATCH /api/products/:id` - update a product
- `DELETE /api/products/:id` - delete a product
- `GET /api/ingredients` - list all ingredients with linked products
- `POST /api/ingredients` - create an ingredient
- `GET /api/ingredients/:id` - fetch one ingredient
- `PATCH /api/ingredients/:id` - update an ingredient
- `DELETE /api/ingredients/:id` - delete an ingredient
- `GET /api/recipe-items` - list all recipe items
- `POST /api/recipe-items` - create a recipe item
- `GET /api/recipe-items/:id` - fetch one recipe item
- `PATCH /api/recipe-items/:id` - update a recipe item
- `DELETE /api/recipe-items/:id` - delete a recipe item

### Example request

```bash
curl -X POST http://localhost:3000/api/products \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Chocolate Chip Cookies",
    "batch": 12,
    "productPrice": 24.99,
    "priceBreakQuantity": 5,
    "priceBreakDiscount": 10
  }'
```

### Database setup

Make sure `DATABASE_URL` is set in `.env`, then run Prisma database sync/generation as needed:

```bash
npx prisma generate
npx prisma db push
```

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
