import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });

export const metadata: Metadata = {
  title: "Celi's Bakery",
  description: "Home-baked treats from Celi's own kitchen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-cream-50 text-wood-900`}>
        {/* Baker image at very top, outside header */}
        <div className="container mx-auto px-4 pt-4">
          <div className="flex justify-start items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0">
              <Image 
                src="/baker.png" 
                alt="Celi, the baker" 
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
	<header className="flex items-center justify-start p-6 border-b border-cream-200">
  	  <img 
             src="/logo.png" 
             alt="Celi's Bakery" 
             className="h-24 w-auto mr-4" 
           />
           <h1 className="text-4xl font-bold font-caveat text-amber-900">
             Celi's Bakery
           </h1>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-wood-900 text-cream-100 py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Celi's Bakery. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
