import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-20 bg-cream-100 py-16 rounded-xl border border-cream-200 shadow-sm relative overflow-hidden">
        {/* Decorative elements for the hero */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-cream-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold-400 rounded-full translate-x-16 translate-y-16 opacity-10"></div>
        
        {/* Baker graphic in upper left */}
        <div className="absolute top-4 left-4 w-24 h-24 md:w-32 md:h-32 z-20">
          <Image 
            src="/baker.png" 
            alt="Celi, the baker" 
            fill
            className="object-contain"
          />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-burgundy-900 mb-6 font-bold">
            Home-baked treats from Celi's own kitchen
          </h2>
          <p className="text-lg text-burgundy-700 max-w-2xl mx-auto italic mb-8">
            Everything from Celi's Bakery is made-to-order with clean, healthy products and lots of love.
          </p>
          <a href="/products" className="inline-block bg-burgundy-700 text-cream-50 px-8 py-3 rounded-md hover:bg-burgundy-900 transition-colors uppercase tracking-wider font-semibold shadow-md border border-burgundy-900">
            What can Celi make for you?
          </a>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h3 className="text-3xl font-serif text-wood-900 inline-block relative">
            What would you like Celi make for you?
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gold-500"></div>
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Row 1, Col 1: Celi's Story */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-cream-200">
            <div className="p-6 bg-white">
              <h4 className="font-serif text-xl text-burgundy-900 mb-4 font-semibold">Celi's Story</h4>
              <p className="text-wood-800 text-sm mb-4 leading-relaxed">
                Welcome to my kitchen! I'm Araceli, but everyone calls me Celi. I grew up baking alongside my grandmother in Mexico, learning the traditional techniques that have been in our family for generations.
              </p>
              <p className="text-wood-800 text-sm mb-4 leading-relaxed">
                After moving to the US, I missed the flavors of home. So I started baking for my friends and neighbors — and the word spread. Now I'm thrilled to share my creations with you!
              </p>
              <p className="text-wood-800 text-sm leading-relaxed">
                Every item is made with love, using recipes passed down through generations and the finest ingredients I can find.
              </p>
            </div>
          </div>

          {/* Row 1, Col 2: Bread */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-cream-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="aspect-[4/3] bg-cream-100 relative overflow-hidden">
              <Image 
                src="/bread.jpg" 
                alt="Fresh baked bread" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 bg-white">
              <h4 className="font-serif text-xl text-burgundy-900 mb-2 font-semibold">Bread</h4>
              <p className="text-wood-800 text-sm mb-4 leading-relaxed">Artisanal breads baked fresh daily with traditional techniques.</p>
              <div className="flex justify-between items-center pt-4 border-t border-cream-100">
                <span className="font-semibold text-burgundy-700">From $8.00</span>
              </div>
            </div>
          </div>

          {/* Row 1, Col 3: Muffins and Scones */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-cream-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="aspect-[4/3] bg-cream-100 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center text-burgundy-500 bg-cream-200 group-hover:scale-105 transition-transform duration-500">
                <span className="font-serif italic text-xl">Muffins & Scones Photo</span>
              </div>
            </div>
            <div className="p-6 bg-white">
              <h4 className="font-serif text-xl text-burgundy-900 mb-2 font-semibold">Muffins and Scones</h4>
              <p className="text-wood-800 text-sm mb-4 leading-relaxed">Sweet and savory muffins and scones made with fresh fruits and quality ingredients.</p>
              <div className="flex justify-between items-center pt-4 border-t border-cream-100">
                <span className="font-semibold text-burgundy-700">From $3.50 each</span>
              </div>
            </div>
          </div>

          {/* Row 2, Col 1: Talk to Celi */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-cream-200">
            <div className="p-6 bg-white">
              <h4 className="font-serif text-xl text-burgundy-900 mb-4 font-semibold">Talk to Celi</h4>
              <div className="space-y-4">
                <div className="border-b border-cream-200 pb-3">
                  <p className="text-wood-800 text-sm italic mb-2">"The conchas are absolutely divine! Reminds me of my grandmother's kitchen."</p>
                  <p className="text-burgundy-700 text-xs">— Maria S.</p>
                </div>
                <div className="border-b border-cream-200 pb-3">
                  <p className="text-wood-800 text-sm italic mb-2">"Best birthday cake ever. My kids loved it!"</p>
                  <p className="text-burgundy-700 text-xs">— The Garcia Family</p>
                </div>
                <div>
                  <p className="text-wood-800 text-sm italic mb-2">"The pan de muerto was perfect for Dia de los Muertos. Thank you Celi!"</p>
                  <p className="text-burgundy-700 text-xs">— Teresa R.</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-cream-100">
                <p className="text-burgundy-700 text-xs">💬 Have a testimonial? Send me a message!</p>
              </div>
            </div>
          </div>

          {/* Row 2, Col 2: Cookies */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-cream-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="aspect-[4/3] bg-cream-100 relative overflow-hidden">
              <Image 
                src="/cookies.jpg" 
                alt="Fresh baked cookies" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 bg-white">
              <h4 className="font-serif text-xl text-burgundy-900 mb-2 font-semibold">Cookies</h4>
              <p className="text-wood-800 text-sm mb-4 leading-relaxed">Classic cookies with a twist — from snickerdoodles to Mexican wedding cookies.</p>
              <div className="flex justify-between items-center pt-4 border-t border-cream-100">
                <span className="font-semibold text-burgundy-700">From $2.00 each</span>
              </div>
            </div>
          </div>

          {/* Row 2, Col 3: Pastries */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-cream-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="aspect-[4/3] bg-cream-100 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center text-burgundy-500 bg-cream-200 group-hover:scale-105 transition-transform duration-500">
                <span className="font-serif italic text-xl">Pastries Photo</span>
              </div>
            </div>
            <div className="p-6 bg-white">
              <h4 className="font-serif text-xl text-burgundy-900 mb-2 font-semibold">Pastries</h4>
              <p className="text-wood-800 text-sm mb-4 leading-relaxed">French-inspired pastries including croissants, danishes, and more.</p>
              <div className="flex justify-between items-center pt-4 border-t border-cream-100">
                <span className="font-semibold text-burgundy-700">From $4.00 each</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}