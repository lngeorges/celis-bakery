import Link from "next/link";

export default function ProductsPage() {
  const categories = [
    { name: "Bread", slug: "bread", desc: "Freshly baked artisan loaves." },
    { name: "Muffins & Scones", slug: "muffins-and-scones", desc: "Light, fluffy morning favorites." },
    { name: "Cookies", slug: "cookies", desc: "Batch-made, classic favorites." },
    { name: "Pastries", slug: "pastries", desc: "Flaky, buttery handmade pastries." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold font-playfair italic text-stone-700 mb-12">
        Our Menu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products/${cat.slug}`}
            className="block p-8 border border-stone-300 rounded-lg shadow-sm bg-white hover:shadow-md hover:border-amber-400 transition-all"
          >
            <h2 className="text-2xl font-bold font-playfair italic text-amber-800">
              {cat.name}
            </h2>
            <p className="text-stone-600 mt-2">{cat.desc}</p>
            <div className="mt-6 text-amber-600 font-semibold text-sm uppercase tracking-wide">
              View Selection →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
