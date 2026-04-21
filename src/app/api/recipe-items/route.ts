import { prisma } from '@/lib/prisma';
import {
  ApiError,
  handleApiError,
  parseNumber,
  parseString,
  readJsonBody,
} from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const recipeItems = await prisma.recipeItem.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        product: true,
        ingredient: true,
      },
    });

    return Response.json({ data: recipeItems });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request) as Record<string, unknown>;

    const productId = parseString(body.productId, 'productId');
    const ingredientId = parseString(body.ingredientId, 'ingredientId');

    const [product, ingredient] = await Promise.all([
      prisma.product.findUnique({ where: { id: productId } }),
      prisma.ingredient.findUnique({ where: { id: ingredientId } }),
    ]);

    if (!product) {
      throw new ApiError(404, 'Product not found.');
    }

    if (!ingredient) {
      throw new ApiError(404, 'Ingredient not found.');
    }

    const recipeItem = await prisma.recipeItem.create({
      data: {
        productId,
        ingredientId,
        measure: parseNumber(body.measure, 'measure'),
        recipeMeasure: parseString(body.recipeMeasure, 'recipeMeasure'),
        recipeMeasureQty: parseNumber(body.recipeMeasureQty, 'recipeMeasureQty'),
      },
      include: {
        product: true,
        ingredient: true,
      },
    });

    return Response.json({ data: recipeItem }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
