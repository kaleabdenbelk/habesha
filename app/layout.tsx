import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AquaNova | Your voyage, reimagined",
  description: "Discover the future of cruising with AquaNova. Hybrid-electric catamaran, AI energy orchestration, and zero-odour journeys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${outfit.className} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
