import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
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
    <html lang="en" className={caveat.variable}>
      <body className="antialiased">
        <header className="flex flex-row items-center justify-start p-6 gap-6 border-b border-gray-200 bg-white">
          {/* Logo at h-24 (96px) — approximately 150% of a standard 64px nav logo */}
          <img
            src="/logo.png"
            alt="Celi's Bakery"
            className="h-24 w-auto block"
          />
          <h1 className="text-4xl md:text-5xl font-bold font-caveat text-amber-900">
            Celi&apos;s Bakery
          </h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

