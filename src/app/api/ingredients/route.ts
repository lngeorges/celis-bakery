import { prisma } from '@/lib/prisma';
import { handleApiError, parseNumber, parseString, readJsonBody } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { name: 'asc' },
      include: {
        recipeItems: {
          include: {
            product: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return Response.json({ data: ingredients });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request) as Record<string, unknown>;

    const ingredient = await prisma.ingredient.create({
      data: {
        name: parseString(body.name, 'name'),
        cost: parseNumber(body.cost, 'cost'),
        ingredientMinimum: parseNumber(body.ingredientMinimum, 'ingredientMinimum'),
        ingredientPurchaseMeasure: parseString(
          body.ingredientPurchaseMeasure,
          'ingredientPurchaseMeasure',
        ),
        ingredientPurchaseQuantity: parseNumber(
          body.ingredientPurchaseQuantity,
          'ingredientPurchaseQuantity',
        ),
      },
    });

    return Response.json({ data: ingredient }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
