import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// This loader is the safest way to ensure the font works without breaking current CSS
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Celi's Bakery",
  description: "Home-baked treats from Celi's own kitchen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={caveat.variable}>
      <body className="antialiased">
        {/* Force Horizontal Layout using Standard Tailwind */}
        <header className="flex flex-row items-center justify-start p-6 gap-6 border-b border-gray-200 bg-white">
          {/* Logo scaled to h-24 (approx 150% of standard nav logos) */}
          <img 
            src="/logo.png" 
            alt="Celi's Bakery" 
            className="h-24 w-auto block"
          />
          <h1 className="text-4xl md:text-5xl font-bold font-caveat text-amber-900">
            Celi's Bakery
          </h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

