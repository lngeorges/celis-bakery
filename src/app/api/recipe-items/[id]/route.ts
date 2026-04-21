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

    const recipeItem = await prisma.recipeItem.findUnique({
      where: { id },
      include: {
        product: true,
        ingredient: true,
      },
    });

    if (!recipeItem) {
      throw new ApiError(404, 'Recipe item not found.');
    }

    return Response.json({ data: recipeItem });
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

    const existing = await prisma.recipeItem.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'Recipe item not found.');
    }

    const productId =
      body.productId !== undefined
        ? parseString(body.productId, 'productId')
        : existing.productId;
    const ingredientId =
      body.ingredientId !== undefined
        ? parseString(body.ingredientId, 'ingredientId')
        : existing.ingredientId;

    if (body.productId !== undefined) {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) {
        throw new ApiError(404, 'Product not found.');
      }
    }

    if (body.ingredientId !== undefined) {
      const ingredient = await prisma.ingredient.findUnique({ where: { id: ingredientId } });
      if (!ingredient) {
        throw new ApiError(404, 'Ingredient not found.');
      }
    }

    const recipeItem = await prisma.recipeItem.update({
      where: { id },
      data: {
        ...(body.productId !== undefined ? { productId } : {}),
        ...(body.ingredientId !== undefined ? { ingredientId } : {}),
        ...(body.measure !== undefined
          ? { measure: parseNumber(body.measure, 'measure') }
          : {}),
        ...(body.recipeMeasure !== undefined
          ? { recipeMeasure: parseString(body.recipeMeasure, 'recipeMeasure') }
          : {}),
        ...(body.recipeMeasureQty !== undefined
          ? { recipeMeasureQty: parseNumber(body.recipeMeasureQty, 'recipeMeasureQty') }
          : {}),
      },
      include: {
        product: true,
        ingredient: true,
      },
    });

    return Response.json({ data: recipeItem });
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

    const existing = await prisma.recipeItem.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'Recipe item not found.');
    }

    await prisma.recipeItem.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
