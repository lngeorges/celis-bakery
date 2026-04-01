import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-20 bg-cream-100 py-16 rounded-xl border border-cream-200 shadow-sm relative overflow-hidden">
        {/* Decorative elements for the hero */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-cream-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold-400 rounded-full translate-x-16 translate-y-16 opacity-10"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-burgundy-900 mb-6 font-bold">
            Home-baked treats from Celi's own kitchen
          </h2>
          <p className="text-lg text-burgundy-700 max-w-2xl mx-auto italic mb-8">
            Welcome to our artisanal bakery, inspired by classic French techniques and made with love.
          </p>
          <a href="/products" className="inline-block bg-burgundy-700 text-cream-50 px-8 py-3 rounded-md hover:bg-burgundy-900 transition-colors uppercase tracking-wider font-semibold shadow-md border border-burgundy-900">
            View the Bakery Case
          </a>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h3 className="text-3xl font-serif text-wood-900 inline-block relative">
            Featured Bakes
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gold-500"></div>
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Placeholder Gallery Items */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md border border-cream-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
              <div className="aspect-[4/3] bg-cream-100 relative overflow-hidden flex items-center justify-center">
                {/* Simulated image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-burgundy-500 bg-cream-200 group-hover:scale-105 transition-transform duration-500">
                  <span className="font-serif italic text-xl">Photo {item}</span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h4 className="font-serif text-xl text-burgundy-900 mb-2 font-semibold">Artisan Pastry {item}</h4>
                <p className="text-wood-800 text-sm mb-4 leading-relaxed">A delicious baked good made with the finest ingredients from our pantry.</p>
                <div className="flex justify-between items-center pt-4 border-t border-cream-100">
                  <span className="font-semibold text-burgundy-700">$24.00 / dozen</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
