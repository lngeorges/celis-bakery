import Link from "next/link";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryName =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <nav className="mb-8">
        <Link href="/products" className="text-amber-800 hover:underline">
          ← Back to Menu
        </Link>
      </nav>

      <h1 className="text-5xl font-bold font-caveat text-amber-900 mb-6">
        {categoryName}
      </h1>

      <div className="bg-cream-50 border-2 border-dashed border-cream-200 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-bold text-amber-800 font-caveat mb-4">
          Our {categoryName} Gallery is coming soon!
        </h2>
        <p className="text-stone-600 max-w-md mx-auto">
          We are currently hand-selecting the finest photos of our{" "}
          {categoryName.toLowerCase()} to showcase our latest bakes. Please
          check back soon.
        </p>
      </div>

      {/* Static placeholder grid — no data required */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 opacity-40 grayscale">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="aspect-square bg-gray-100 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
