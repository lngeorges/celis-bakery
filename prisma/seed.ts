import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const INGREDIENTS = [
  { name: "All-Purpose Flour", cost: 4.99, ingredientMinimum: 125, ingredientPurchaseMeasure: "5 lb bag", ingredientPurchaseQuantity: 10000, lowStockThreshold: 0 },
  { name: "Bread Flour", cost: 5.49, ingredientMinimum: 120, ingredientPurchaseMeasure: "5 lb bag", ingredientPurchaseQuantity: 10000, lowStockThreshold: 0 },
  { name: "Active Dry Yeast", cost: 4.29, ingredientMinimum: 9, ingredientPurchaseMeasure: "4 oz jar", ingredientPurchaseQuantity: 113, lowStockThreshold: 0 },
  { name: "Sourdough Starter", cost: 0.0, ingredientMinimum: 240, ingredientPurchaseMeasure: "batch (1 cup)", ingredientPurchaseQuantity: 240, lowStockThreshold: 0 },
  { name: "Salt", cost: 1.29, ingredientMinimum: 6, ingredientPurchaseMeasure: "26 oz container", ingredientPurchaseQuantity: 737, lowStockThreshold: 0 },
  { name: "Sugar", cost: 3.49, ingredientMinimum: 200, ingredientPurchaseMeasure: "4 lb bag", ingredientPurchaseQuantity: 3628, lowStockThreshold: 0 },
  { name: "Brown Sugar", cost: 3.29, ingredientMinimum: 220, ingredientPurchaseMeasure: "2 lb bag", ingredientPurchaseQuantity: 1814, lowStockThreshold: 0 },
  { name: "Butter", cost: 5.99, ingredientMinimum: 14, ingredientPurchaseMeasure: "1 lb package", ingredientPurchaseQuantity: 454, lowStockThreshold: 0 },
  { name: "Whole Milk", cost: 4.29, ingredientMinimum: 240, ingredientPurchaseMeasure: "1 gallon", ingredientPurchaseQuantity: 3785, lowStockThreshold: 0 },
  { name: "Buttermilk", cost: 2.99, ingredientMinimum: 240, ingredientPurchaseMeasure: "1 quart", ingredientPurchaseQuantity: 946, lowStockThreshold: 0 },
  { name: "Eggs", cost: 4.49, ingredientMinimum: 50, ingredientPurchaseMeasure: "1 dozen", ingredientPurchaseQuantity: 600, lowStockThreshold: 0 },
  { name: "Baking Powder", cost: 2.99, ingredientMinimum: 4, ingredientPurchaseMeasure: "8.1 oz can", ingredientPurchaseQuantity: 230, lowStockThreshold: 0 },
  { name: "Baking Soda", cost: 1.49, ingredientMinimum: 6, ingredientPurchaseMeasure: "16 oz box", ingredientPurchaseQuantity: 454, lowStockThreshold: 0 },
  { name: "Vanilla Extract", cost: 7.99, ingredientMinimum: 5, ingredientPurchaseMeasure: "4 oz bottle", ingredientPurchaseQuantity: 118, lowStockThreshold: 0 },
  { name: "Chocolate Chips", cost: 4.99, ingredientMinimum: 15, ingredientPurchaseMeasure: "12 oz bag", ingredientPurchaseQuantity: 340, lowStockThreshold: 0 },
  { name: "Mini Chocolate Chips", cost: 4.99, ingredientMinimum: 15, ingredientPurchaseMeasure: "10 oz bag", ingredientPurchaseQuantity: 283, lowStockThreshold: 0 },
  { name: "Cinnamon", cost: 3.49, ingredientMinimum: 3, ingredientPurchaseMeasure: "2.37 oz jar", ingredientPurchaseQuantity: 67, lowStockThreshold: 0 },
  { name: "Cream of Tartar", cost: 3.29, ingredientMinimum: 3, ingredientPurchaseMeasure: "1.5 oz jar", ingredientPurchaseQuantity: 43, lowStockThreshold: 0 },
  { name: "Blueberries (fresh)", cost: 4.99, ingredientMinimum: 148, ingredientPurchaseMeasure: "1 pint", ingredientPurchaseQuantity: 340, lowStockThreshold: 0 },
  { name: "Strawberries (fresh)", cost: 4.49, ingredientMinimum: 150, ingredientPurchaseMeasure: "1 lb container", ingredientPurchaseQuantity: 454, lowStockThreshold: 0 },
  { name: "Rosemary (fresh)", cost: 2.49, ingredientMinimum: 5, ingredientPurchaseMeasure: "0.75 oz bundle", ingredientPurchaseQuantity: 21, lowStockThreshold: 0 },
  { name: "Sea Salt (flakes)", cost: 5.99, ingredientMinimum: 4, ingredientPurchaseMeasure: "8.5 oz box", ingredientPurchaseQuantity: 241, lowStockThreshold: 0 },
  { name: "Heavy Cream", cost: 4.99, ingredientMinimum: 240, ingredientPurchaseMeasure: "1 pint", ingredientPurchaseQuantity: 473, lowStockThreshold: 0 },
  { name: "Cream Cheese", cost: 3.29, ingredientMinimum: 225, ingredientPurchaseMeasure: "8 oz block", ingredientPurchaseQuantity: 225, lowStockThreshold: 0 },
  { name: "Powdered Sugar", cost: 2.99, ingredientMinimum: 120, ingredientPurchaseMeasure: "2 lb bag", ingredientPurchaseQuantity: 908, lowStockThreshold: 0 },
  { name: "Water", cost: 0.0, ingredientMinimum: 240, ingredientPurchaseMeasure: "gallon", ingredientPurchaseQuantity: 3785, lowStockThreshold: 0 },
] as const;

type RecipeLine = {
  ingredient: string;
  measure: number;
  recipeMeasure: string;
  recipeMeasureQty: number;
  notes?: string | null;
};

type ProductSeed = {
  name: string;
  category: string;
  description?: string | null;
  batch: number;
  productPrice: number;
  priceBreakQuantity?: number | null;
  priceBreakDiscount?: number | null;
  bakeTime: number;
  isAvailable: boolean;
  notes?: string | null;
  recipe: RecipeLine[];
};

const PRODUCTS: ProductSeed[] = [
  {
    name: "Sourdough",
    category: "Bread",
    description: "Classic artisan sourdough loaf with a crisp crust and tender crumb.",
    batch: 1,
    productPrice: 9.0,
    bakeTime: 50,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "Bread Flour", measure: 420, recipeMeasure: "cups", recipeMeasureQty: 3.5 },
      { ingredient: "Sourdough Starter", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 1.0 },
      { ingredient: "Salt", measure: 9, recipeMeasure: "tsp", recipeMeasureQty: 1.5 },
      { ingredient: "Water", measure: 300, recipeMeasure: "cups", recipeMeasureQty: 1.25 },
    ],
  },
  {
    name: "Rosemary Sourdough",
    category: "Bread",
    description: "Sourdough loaf finished with fresh rosemary and flaky sea salt.",
    batch: 1,
    productPrice: 10.0,
    bakeTime: 52,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "Bread Flour", measure: 420, recipeMeasure: "cups", recipeMeasureQty: 3.5 },
      { ingredient: "Sourdough Starter", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 1.0 },
      { ingredient: "Salt", measure: 9, recipeMeasure: "tsp", recipeMeasureQty: 1.5 },
      { ingredient: "Rosemary (fresh)", measure: 10, recipeMeasure: "tbsp", recipeMeasureQty: 2.0 },
      { ingredient: "Sea Salt (flakes)", measure: 16, recipeMeasure: "tbsp", recipeMeasureQty: 1.0 },
    ],
  },
  {
    name: "Sandwich Bread",
    category: "Bread",
    description: "Soft enriched sandwich loaf for everyday slicing and toasting.",
    batch: 1,
    productPrice: 7.0,
    bakeTime: 40,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 360, recipeMeasure: "cups", recipeMeasureQty: 3.0 },
      { ingredient: "Whole Milk", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 1.0 },
      { ingredient: "Butter", measure: 28, recipeMeasure: "tbsp", recipeMeasureQty: 2.0 },
      { ingredient: "Sugar", measure: 12, recipeMeasure: "tbsp", recipeMeasureQty: 1.0 },
      { ingredient: "Salt", measure: 9, recipeMeasure: "tsp", recipeMeasureQty: 1.5 },
      { ingredient: "Active Dry Yeast", measure: 7, recipeMeasure: "tsp", recipeMeasureQty: 2.25 },
    ],
  },
  {
    name: "Bagels",
    category: "Bread",
    description: "Chewy handmade bagels sold by the half dozen.",
    batch: 6,
    productPrice: 9.0,
    priceBreakQuantity: 12,
    priceBreakDiscount: 10,
    bakeTime: 35,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "Bread Flour", measure: 480, recipeMeasure: "cups", recipeMeasureQty: 4.0 },
      { ingredient: "Active Dry Yeast", measure: 7, recipeMeasure: "tsp", recipeMeasureQty: 2.0 },
      { ingredient: "Sugar", measure: 12, recipeMeasure: "tbsp", recipeMeasureQty: 1.0 },
      { ingredient: "Salt", measure: 12, recipeMeasure: "tsp", recipeMeasureQty: 2.0 },
    ],
  },
  {
    name: "Blueberry Muffins",
    category: "Muffins",
    description: "Tender vanilla muffins packed with fresh blueberries.",
    batch: 12,
    productPrice: 18.0,
    priceBreakQuantity: 24,
    priceBreakDiscount: 10,
    bakeTime: 28,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 2.0 },
      { ingredient: "Sugar", measure: 150, recipeMeasure: "cups", recipeMeasureQty: 0.75 },
      { ingredient: "Baking Powder", measure: 8, recipeMeasure: "tsp", recipeMeasureQty: 2.0 },
      { ingredient: "Salt", measure: 3, recipeMeasure: "tsp", recipeMeasureQty: 0.5 },
      { ingredient: "Eggs", measure: 100, recipeMeasure: "each", recipeMeasureQty: 2.0 },
      { ingredient: "Whole Milk", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 1.0 },
      { ingredient: "Butter", measure: 56, recipeMeasure: "tbsp", recipeMeasureQty: 4.0 },
      { ingredient: "Vanilla Extract", measure: 5, recipeMeasure: "tsp", recipeMeasureQty: 1.0 },
      { ingredient: "Blueberries (fresh)", measure: 222, recipeMeasure: "cups", recipeMeasureQty: 1.5 },
    ],
  },
  {
    name: "Strawberry Muffins",
    category: "Muffins",
    description: "Tender vanilla muffins filled with fresh strawberries.",
    batch: 12,
    productPrice: 18.0,
    priceBreakQuantity: 24,
    priceBreakDiscount: 10,
    bakeTime: 28,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 2.0 },
      { ingredient: "Sugar", measure: 150, recipeMeasure: "cups", recipeMeasureQty: 0.75 },
      { ingredient: "Baking Powder", measure: 8, recipeMeasure: "tsp", recipeMeasureQty: 2.0 },
      { ingredient: "Salt", measure: 3, recipeMeasure: "tsp", recipeMeasureQty: 0.5 },
      { ingredient: "Eggs", measure: 100, recipeMeasure: "each", recipeMeasureQty: 2.0 },
      { ingredient: "Whole Milk", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 1.0 },
      { ingredient: "Butter", measure: 56, recipeMeasure: "tbsp", recipeMeasureQty: 4.0 },
      { ingredient: "Vanilla Extract", measure: 5, recipeMeasure: "tsp", recipeMeasureQty: 1.0 },
      { ingredient: "Strawberries (fresh)", measure: 225, recipeMeasure: "cups", recipeMeasureQty: 1.5 },
    ],
  },
  {
    name: "Blueberry Scones",
    category: "Scones",
    description: "Rich cream scones with fresh blueberries.",
    batch: 6,
    productPrice: 12.0,
    priceBreakQuantity: 12,
    priceBreakDiscount: 10,
    bakeTime: 24,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 2.0 },
      { ingredient: "Sugar", measure: 36, recipeMeasure: "tbsp", recipeMeasureQty: 3.0 },
      { ingredient: "Baking Powder", measure: 10, recipeMeasure: "tsp", recipeMeasureQty: 2.5 },
      { ingredient: "Salt", measure: 3, recipeMeasure: "tsp", recipeMeasureQty: 0.5 },
      { ingredient: "Butter", measure: 84, recipeMeasure: "tbsp", recipeMeasureQty: 6.0 },
      { ingredient: "Heavy Cream", measure: 180, recipeMeasure: "cups", recipeMeasureQty: 0.75 },
      { ingredient: "Blueberries (fresh)", measure: 148, recipeMeasure: "cups", recipeMeasureQty: 1.0 },
      { ingredient: "Vanilla Extract", measure: 2, recipeMeasure: "tsp", recipeMeasureQty: 0.5 },
    ],
  },
  {
    name: "Strawberry Scones",
    category: "Scones",
    description: "Rich cream scones with fresh strawberries.",
    batch: 6,
    productPrice: 12.0,
    priceBreakQuantity: 12,
    priceBreakDiscount: 10,
    bakeTime: 24,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 2.0 },
      { ingredient: "Sugar", measure: 36, recipeMeasure: "tbsp", recipeMeasureQty: 3.0 },
      { ingredient: "Baking Powder", measure: 10, recipeMeasure: "tsp", recipeMeasureQty: 2.5 },
      { ingredient: "Salt", measure: 3, recipeMeasure: "tsp", recipeMeasureQty: 0.5 },
      { ingredient: "Butter", measure: 84, recipeMeasure: "tbsp", recipeMeasureQty: 6.0 },
      { ingredient: "Heavy Cream", measure: 180, recipeMeasure: "cups", recipeMeasureQty: 0.75 },
      { ingredient: "Strawberries (fresh)", measure: 150, recipeMeasure: "cups", recipeMeasureQty: 1.0 },
      { ingredient: "Vanilla Extract", measure: 2, recipeMeasure: "tsp", recipeMeasureQty: 0.5 },
    ],
  },
  {
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    description: "Classic chewy chocolate chip cookies.",
    batch: 12,
    productPrice: 15.0,
    priceBreakQuantity: 24,
    priceBreakDiscount: 10,
    bakeTime: 16,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 270, recipeMeasure: "cups", recipeMeasureQty: 2.25 },
      { ingredient: "Butter", measure: 224, recipeMeasure: "tbsp", recipeMeasureQty: 16.0 },
      { ingredient: "Sugar", measure: 150, recipeMeasure: "cups", recipeMeasureQty: 0.75 },
      { ingredient: "Brown Sugar", measure: 165, recipeMeasure: "cups", recipeMeasureQty: 0.75 },
      { ingredient: "Eggs", measure: 100, recipeMeasure: "each", recipeMeasureQty: 2.0 },
      { ingredient: "Vanilla Extract", measure: 5, recipeMeasure: "tsp", recipeMeasureQty: 1.0 },
      { ingredient: "Baking Soda", measure: 6, recipeMeasure: "tsp", recipeMeasureQty: 1.0 },
      { ingredient: "Salt", measure: 6, recipeMeasure: "tsp", recipeMeasureQty: 1.0 },
      { ingredient: "Chocolate Chips", measure: 170, recipeMeasure: "tbsp", recipeMeasureQty: 12.0 },
    ],
  },
  {
    name: "Snickerdoodles",
    category: "Cookies",
    description: "Soft cinnamon-sugar cookies with classic tang from cream of tartar.",
    batch: 12,
    productPrice: 14.0,
    priceBreakQuantity: 24,
    priceBreakDiscount: 10,
    bakeTime: 14,
    isAvailable: true,
    notes: null,
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 330, recipeMeasure: "cups", recipeMeasureQty: 2.75 },
      { ingredient: "Butter", measure: 224, recipeMeasure: "tbsp", recipeMeasureQty: 16.0 },
      { ingredient: "Sugar", measure: 300, recipeMeasure: "cups", recipeMeasureQty: 1.5 },
      { ingredient: "Eggs", measure: 100, recipeMeasure: "each", recipeMeasureQty: 2.0 },
      { ingredient: "Baking Soda", measure: 6, recipeMeasure: "tsp", recipeMeasureQty: 1.0 },
      { ingredient: "Cream of Tartar", measure: 9, recipeMeasure: "tsp", recipeMeasureQty: 2.0 },
      { ingredient: "Salt", measure: 2, recipeMeasure: "tsp", recipeMeasureQty: 0.25 },
      { ingredient: "Cinnamon", measure: 6, recipeMeasure: "tsp", recipeMeasureQty: 2.0 },
    ],
  },
  {
    name: "Cake",
    category: "Cakes",
    description: "Custom cake placeholder product for future flavor and design selection.",
    batch: 1,
    productPrice: 0.0,
    bakeTime: 90,
    isAvailable: true,
    notes: "Stub product; recipe to be finalized.",
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 375, recipeMeasure: "cups", recipeMeasureQty: 3.0, notes: "Stub base formula." },
      { ingredient: "Sugar", measure: 300, recipeMeasure: "cups", recipeMeasureQty: 1.5, notes: "Stub base formula." },
      { ingredient: "Butter", measure: 170, recipeMeasure: "tbsp", recipeMeasureQty: 12.0, notes: "Stub base formula." },
      { ingredient: "Eggs", measure: 150, recipeMeasure: "each", recipeMeasureQty: 3.0, notes: "Stub base formula." },
      { ingredient: "Whole Milk", measure: 240, recipeMeasure: "cups", recipeMeasureQty: 1.0, notes: "Stub base formula." },
      { ingredient: "Baking Powder", measure: 12, recipeMeasure: "tsp", recipeMeasureQty: 3.0, notes: "Stub base formula." },
      { ingredient: "Vanilla Extract", measure: 10, recipeMeasure: "tsp", recipeMeasureQty: 2.0, notes: "Stub base formula." },
    ],
  },
  {
    name: "Cupcakes",
    category: "Cupcakes",
    description: "Custom cupcake placeholder product for future flavor and frosting selection.",
    batch: 6,
    productPrice: 0.0,
    bakeTime: 24,
    isAvailable: true,
    notes: "Stub product; recipe to be finalized.",
    recipe: [
      { ingredient: "All-Purpose Flour", measure: 180, recipeMeasure: "cups", recipeMeasureQty: 1.5, notes: "Stub base formula." },
      { ingredient: "Sugar", measure: 150, recipeMeasure: "cups", recipeMeasureQty: 0.75, notes: "Stub base formula." },
      { ingredient: "Butter", measure: 84, recipeMeasure: "tbsp", recipeMeasureQty: 6.0, notes: "Stub base formula." },
      { ingredient: "Eggs", measure: 100, recipeMeasure: "each", recipeMeasureQty: 2.0, notes: "Stub base formula." },
      { ingredient: "Whole Milk", measure: 120, recipeMeasure: "cups", recipeMeasureQty: 0.5, notes: "Stub base formula." },
      { ingredient: "Baking Powder", measure: 8, recipeMeasure: "tsp", recipeMeasureQty: 2.0, notes: "Stub base formula." },
      { ingredient: "Vanilla Extract", measure: 5, recipeMeasure: "tsp", recipeMeasureQty: 1.0, notes: "Stub base formula." },
    ],
  },
];

async function main() {
  console.log("🌱 Starting seed...\n");

  console.log(`Seeding ${INGREDIENTS.length} ingredients...`);
  const ingredientMap = new Map<string, string>();

  for (const ing of INGREDIENTS) {
    const created = await prisma.ingredient.upsert({
      where: { name: ing.name },
      update: {
        cost: ing.cost,
        ingredientMinimum: ing.ingredientMinimum,
        ingredientPurchaseMeasure: ing.ingredientPurchaseMeasure,
        ingredientPurchaseQuantity: ing.ingredientPurchaseQuantity,
        lowStockThreshold: ing.lowStockThreshold,
      },
      create: {
        name: ing.name,
        cost: ing.cost,
        ingredientMinimum: ing.ingredientMinimum,
        ingredientPurchaseMeasure: ing.ingredientPurchaseMeasure,
        ingredientPurchaseQuantity: ing.ingredientPurchaseQuantity,
        lowStockThreshold: ing.lowStockThreshold,
      },
    });
    ingredientMap.set(created.name, created.id);
    console.log(` ✓ ${created.name}`);
  }

  console.log(`\nSeeding ${PRODUCTS.length} products with recipes...`);
  let totalRecipeLines = 0;

  for (const prod of PRODUCTS) {
    const { recipe, ...productData } = prod;

    const created = await prisma.product.upsert({
      where: { name: productData.name },
      update: {
        category: productData.category,
        description: productData.description ?? null,
        batch: productData.batch,
        productPrice: productData.productPrice,
        priceBreakQuantity: productData.priceBreakQuantity ?? null,
        priceBreakDiscount: productData.priceBreakDiscount ?? null,
        bakeTime: productData.bakeTime,
        isAvailable: productData.isAvailable,
        notes: productData.notes ?? null,
      },
      create: {
        name: productData.name,
        category: productData.category,
        description: productData.description ?? null,
        batch: productData.batch,
        productPrice: productData.productPrice,
        priceBreakQuantity: productData.priceBreakQuantity ?? null,
        priceBreakDiscount: productData.priceBreakDiscount ?? null,
        bakeTime: productData.bakeTime,
        isAvailable: productData.isAvailable,
        notes: productData.notes ?? null,
      },
    });

    console.log(` ✓ ${created.name} (batch: ${created.batch})`);

    for (const line of recipe) {
      const ingredientId = ingredientMap.get(line.ingredient);
      if (!ingredientId) {
        throw new Error(`Recipe references unknown ingredient "${line.ingredient}" for product "${prod.name}"`);
      }

      await prisma.recipeItem.upsert({
        where: {
          productId_ingredientId: {
            productId: created.id,
            ingredientId,
          },
        },
        update: {
          measure: line.measure,
          recipeMeasure: line.recipeMeasure,
          recipeMeasureQty: line.recipeMeasureQty,
          notes: line.notes ?? null,
        },
        create: {
          productId: created.id,
          ingredientId,
          measure: line.measure,
          recipeMeasure: line.recipeMeasure,
          recipeMeasureQty: line.recipeMeasureQty,
          notes: line.notes ?? null,
        },
      });

      console.log(` → ${line.recipeMeasureQty} ${line.recipeMeasure} ${line.ingredient}`);
      totalRecipeLines++;
    }
  }

  console.log(`\n✅ Seed complete!\n ${INGREDIENTS.length} ingredients\n ${PRODUCTS.length} products\n ${totalRecipeLines} recipe items\n `);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
