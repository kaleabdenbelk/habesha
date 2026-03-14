import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { SITE_METADATA } from "@/constants";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
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
