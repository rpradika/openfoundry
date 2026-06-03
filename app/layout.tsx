import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { blueprint } from "@/lib/blueprint";
import { graphLD, serializeLD } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const title = `${blueprint.company.name} — ${blueprint.company.headline}`;
const description = blueprint.company.about;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: blueprint.company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: blueprint.company.name,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/stock-heroes/cnc-1.jpg",
        width: 900,
        height: 920,
        alt: `${blueprint.company.name} CNC machining facility`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/stock-heroes/cnc-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeLD(graphLD()) }}
        />
        {children}
      </body>
    </html>
  );
}
