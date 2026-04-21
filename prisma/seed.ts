import { prisma } from '../src/lib/prisma';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

async function main() {
  console.log('Seed starting...');

  try {
    // 1. Load Ingredients
    console.log('Loading ingredients...');
    const ingredientsRaw = fs.readFileSync('/tmp/263581926.csv', 'utf-8');
    const ingredientsRecords = parse(ingredientsRaw, {
      from_line: 4,
      skip_empty_lines: true,
    });

    for (const record of ingredientsRecords) {
      const name = record[1];
      if (!name) continue;

      const costStr = record[2].replace(/[$,]/g, '');
      const cost = parseFloat(costStr);
      const min = parseFloat(record[3]);
      const purchaseMeasure = record[4];
      const purchaseQty = parseFloat(record[5]);
      const threshold = parseFloat(record[6]) || 0;

      await prisma.ingredient.upsert({
        where: { name },
        update: {
          cost,
          ingredientMinimum: min,
          ingredientPurchaseMeasure: purchaseMeasure,
          ingredientPurchaseQuantity: purchaseQty,
          lowStockThreshold: threshold,
        },
        create: {
          name,
          cost,
          ingredientMinimum: min,
          ingredientPurchaseMeasure: purchaseMeasure,
          ingredientPurchaseQuantity: purchaseQty,
          lowStockThreshold: threshold,
        },
      });
    }

    // 2. Load Products
    console.log('Loading products...');
    const productsRaw = fs.readFileSync('/tmp/1234021566.csv', 'utf-8');
    const productsRecords = parse(productsRaw, {
      from_line: 4,
      skip_empty_lines: true,
    });

    for (const record of productsRecords) {
      const name = record[1];
      if (!name) continue;

      const category = record[2];
      const description = record[3];
      const batch = parseInt(record[4], 10);
      const price = parseFloat(record[5]);
      const breakQty = parseInt(record[6], 10) || null;
      const breakDiscount = parseFloat(record[7]) || null;
      const bakeTime = parseInt(record[8], 10) || 0;
      const isAvailable = record[9].toUpperCase() === 'TRUE';
      const notes = record[10];

      await prisma.product.upsert({
        where: { name },
        update: {
          category,
          description,
          batch,
          productPrice: price,
          priceBreakQuantity: breakQty,
          priceBreakDiscount: breakDiscount,
          bakeTime,
          isAvailable,
          notes,
        },
        create: {
          name,
          category,
          description,
          batch,
          productPrice: price,
          priceBreakQuantity: breakQty,
          priceBreakDiscount: breakDiscount,
          bakeTime,
          isAvailable,
          notes,
        },
      });
    }

    // 3. Load Recipes
    console.log('Loading recipes...');
    const recipesRaw = fs.readFileSync('/tmp/609664298.csv', 'utf-8');
    const recipesRecords = parse(recipesRaw, {
      from_line: 5,
      skip_empty_lines: true,
    });

    for (const record of recipesRecords) {
      const productName = record[1];
      const ingredientName = record[2];

      if (!productName || !ingredientName || productName.includes('|')) continue;

      const measureQty = parseFloat(record[4]);
      const measureUnit = record[3];
      const notes = record[8];

      const product = await prisma.product.findUnique({ where: { name: productName } });
      const ingredient = await prisma.ingredient.findUnique({ where: { name: ingredientName } });

      if (!product || !ingredient) {
          continue;
      }

      await prisma.recipeItem.upsert({
        where: {
          productId_ingredientId: {
            productId: product.id,
            ingredientId: ingredient.id,
          },
        },
        update: {
          recipeMeasure: measureUnit,
          recipeMeasureQty: measureQty,
          measure: 1, // default batch count
          notes,
        },
        create: {
          productId: product.id,
          ingredientId: ingredient.id,
          recipeMeasure: measureUnit,
          recipeMeasureQty: measureQty,
          measure: 1,
          notes,
        },
      });
    }

    console.log('Seed complete.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
