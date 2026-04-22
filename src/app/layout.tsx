import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Celi's Bakery",
  description: "Homemade treats for every occasion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="antialiased bg-amber-50">

        {/* ── HEADER BANNER ── */}
        <header className="bg-stone-100 border-b border-stone-300">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

            {/* Logo — pinned to the far left */}
            <div className="flex-shrink-0">
              <img
                src="/baker.png"
                alt="Celi's Bakery"
                className="h-24 w-auto block"
              />
            </div>

            {/* Title — centered in the remaining space */}
            <div className="flex-1 text-center">
              <h1 className="text-5xl font-bold font-playfair text-stone-700 italic">
                Celi&apos;s Bakery
              </h1>
              <p className="text-sm text-stone-500 mt-1 tracking-widest uppercase">
                Homemade treats for every occasion
              </p>
            </div>

            {/* Spacer — mirrors logo width so title stays truly centered */}
            <div className="flex-shrink-0 w-24" />

          </div>
        </header>

        {/* ── NAVIGATION ── */}
        <nav className="bg-stone-200 border-b border-stone-300">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex justify-center gap-10 py-3 text-sm uppercase tracking-widest font-semibold text-stone-600">
              <li>
                <Link href="/" className="hover:text-amber-800 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-800 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/rfp" className="hover:text-amber-800 transition-colors">
                  Order Request
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-800 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* ── PAGE CONTENT ── */}
        <main>{children}</main>

      </body>
    </html>
  );
}
