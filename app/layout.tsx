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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${blueprint.company.name} — Multi-process manufacturing in Vietnam`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
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
