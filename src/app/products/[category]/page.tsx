import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // NEXT.js 15: params must be awaited
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category).toLowerCase();

  try {
    const categoryData = await prisma.category.findUnique({
      where: {
        slug: decodedCategory,
      },
      include: {
        products: {
          where: {
            active: true,
          },
        },
      },
    });

    if (!categoryData) {
      return notFound();
    }

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <nav className="mb-8">
          <Link href="/products" className="text-amber-800 hover:underline">
            ← Back to All Products
          </Link>
        </nav>
        
        <header className="mb-12">
          <h1 className="text-5xl font-bold font-caveat text-amber-900 mb-4 capitalize">
            {categoryData.name}
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl">
            {categoryData.description}
          </p>
        </header>

        {categoryData.products.length === 0 ? (
          <div className="bg-cream-50 border-2 border-dashed border-cream-200 rounded-2xl p-12 text-center">
            <p className="text-stone-500">No products found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.products.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-stone-100 overflow-hidden">
                <div className="aspect-square bg-stone-100 relative">
                  {/* Image component would go here */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{product.name}</h3>
                  <p className="text-stone-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-900 font-bold">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading category:", error);
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold text-amber-900">Unable to load products</h2>
        <p>Please try again later.</p>
      </div>
    );
  }
}
