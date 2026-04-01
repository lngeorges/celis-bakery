import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
        <header className="border-b border-cream-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <div className="w-10"></div> {/* Spacer for centering */}
              <h1 className="text-4xl font-serif font-bold text-center text-burgundy-900">Celi's Bakery</h1>
              <div className="w-10 text-right text-burgundy-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block hover:text-burgundy-900 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </div>
            <nav>
              <ul className="flex justify-center space-x-8 text-sm uppercase tracking-widest text-burgundy-700 font-medium">
                <li><a href="/" className="hover:text-burgundy-900 transition-colors">Home</a></li>
                <li><a href="/products" className="hover:text-burgundy-900 transition-colors">Shop</a></li>
                <li><a href="/rfp" className="hover:text-burgundy-900 transition-colors">Order Request</a></li>
                <li><a href="/admin" className="hover:text-burgundy-900 transition-colors">Login</a></li>
              </ul>
            </nav>
          </div>
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
