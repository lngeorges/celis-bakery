import { prisma } from '@/lib/prisma';
import {
  ApiError,
  handleApiError,
  parseNumber,
  parseOptionalNumber,
  parseOptionalString,
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

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        recipeItems: {
          include: {
            ingredient: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!product) {
      throw new ApiError(404, 'Product not found.');
    }

    return Response.json({ data: product });
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

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'Product not found.');
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(body.name !== undefined ? { name: parseString(body.name, 'name') } : {}),
        ...(body.category !== undefined
          ? { category: parseString(body.category, 'category') }
          : {}),
        ...(body.description !== undefined
          ? { description: parseOptionalString(body.description, 'description') }
          : {}),
        ...(body.batch !== undefined ? { batch: parseNumber(body.batch, 'batch') } : {}),
        ...(body.productPrice !== undefined
          ? { productPrice: parseNumber(body.productPrice, 'productPrice') }
          : {}),
        ...(body.priceBreakQuantity !== undefined
          ? {
              priceBreakQuantity: parseOptionalNumber(
                body.priceBreakQuantity,
                'priceBreakQuantity',
              ),
            }
          : {}),
        ...(body.priceBreakDiscount !== undefined
          ? {
              priceBreakDiscount: parseOptionalNumber(
                body.priceBreakDiscount,
                'priceBreakDiscount',
              ),
            }
          : {}),
        ...(body.bakeTime !== undefined
          ? { bakeTime: parseNumber(body.bakeTime, 'bakeTime') }
          : {}),
        ...(body.isAvailable !== undefined
          ? {
              isAvailable:
                body.isAvailable === true || body.isAvailable === 'true',
            }
          : {}),
      },
    });

    return Response.json({ data: product });
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

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'Product not found.');
    }

    await prisma.product.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
