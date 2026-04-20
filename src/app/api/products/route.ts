import { prisma } from '@/lib/prisma';
import {
  handleApiError,
  parseNumber,
  parseOptionalNumber,
  parseOptionalString,
  parseString,
  readJsonBody,
} from '@/lib/api';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        recipeItems: {
          include: {
            ingredient: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return Response.json({ data: products });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request) as Record<string, unknown>;

    const product = await prisma.product.create({
      data: {
        name: parseString(body.name, 'name'),
        category: parseString(body.category, 'category'),
        description: parseOptionalString(body.description, 'description'),
        batch: parseNumber(body.batch, 'batch'),
        productPrice: parseNumber(body.productPrice, 'productPrice'),
        priceBreakQuantity: parseOptionalNumber(body.priceBreakQuantity, 'priceBreakQuantity'),
        priceBreakDiscount: parseOptionalNumber(body.priceBreakDiscount, 'priceBreakDiscount'),
        bakeTime: parseNumber(body.bakeTime, 'bakeTime'),
        isAvailable: body.isAvailable === true || body.isAvailable === 'true',
      },
    });

    return Response.json({ data: product }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
