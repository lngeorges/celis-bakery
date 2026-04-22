import Link from "next/link";

export default function ProductsPage() {
  // The four Celi's Bakery product categories
  const categories = [
    { name: "Bread", slug: "bread", desc: "Freshly baked artisan loaves." },
    { name: "Muffins & Scones", slug: "muffins-and-scones", desc: "Light, fluffy morning favorites." },
    { name: "Cookies", slug: "cookies", desc: "Batch-made, classic favorites." },
    { name: "Pastries", slug: "pastries", desc: "Flaky, buttery handmade pastries." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold font-caveat text-amber-900 mb-12">
        Our Menu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="p-8 border border-gray-200 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-bold text-amber-800 font-caveat">
              {cat.name}
            </h2>
            <p className="text-gray-600 mt-2">{cat.desc}</p>
            <div className="mt-6 text-amber-600 font-semibold">Coming Soon</div>
          </div>
        ))}
      </div>
    </div>
  );
}
