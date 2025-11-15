// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import HtmlTag from "@/components/HtmlTag";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Svatební Deník",
  description: "Kompletní průvodce plánováním svatby",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HtmlTag>
      <body className="font-sans antialiased">{children}</body>
    </HtmlTag>
  );
}
