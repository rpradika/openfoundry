import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { blueprint } from "@/lib/blueprint";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${blueprint.company.name} — ${blueprint.company.headline}`,
  description: blueprint.company.about,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
