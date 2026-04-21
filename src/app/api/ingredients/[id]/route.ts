import { prisma } from '@/lib/prisma';
import {
  ApiError,
  handleApiError,
  parseNumber,
  parseString,
  readJsonBody,
} from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const ingredient = await prisma.ingredient.findUnique({
      where: { id },
      include: {
        recipeItems: {
          include: {
            product: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!ingredient) {
      throw new ApiError(404, 'Ingredient not found.');
    }

    return Response.json({ data: ingredient });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await readJsonBody(request) as Record<string, unknown>;

    const existing = await prisma.ingredient.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'Ingredient not found.');
    }

    const ingredient = await prisma.ingredient.update({
      where: { id },
      data: {
        ...(body.name !== undefined ? { name: parseString(body.name, 'name') } : {}),
        ...(body.cost !== undefined ? { cost: parseNumber(body.cost, 'cost') } : {}),
        ...(body.ingredientMinimum !== undefined
          ? {
              ingredientMinimum: parseNumber(
                body.ingredientMinimum,
                'ingredientMinimum',
              ),
            }
          : {}),
        ...(body.ingredientPurchaseMeasure !== undefined
          ? {
              ingredientPurchaseMeasure: parseString(
                body.ingredientPurchaseMeasure,
                'ingredientPurchaseMeasure',
              ),
            }
          : {}),
        ...(body.ingredientPurchaseQuantity !== undefined
          ? {
              ingredientPurchaseQuantity: parseNumber(
                body.ingredientPurchaseQuantity,
                'ingredientPurchaseQuantity',
              ),
            }
          : {}),
      },
    });

    return Response.json({ data: ingredient });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existing = await prisma.ingredient.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'Ingredient not found.');
    }

    await prisma.ingredient.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
