import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { getBlueprint } from "@/lib/blueprint";
import { graphLD, serializeLD } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const OG_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  vi: "vi_VN",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isValid = (routing.locales as readonly string[]).includes(locale);
  const resolved: AppLocale = isValid ? (locale as AppLocale) : routing.defaultLocale;
  const canonical = resolved === routing.defaultLocale ? "/" : `/${resolved}`;
  const bp = getBlueprint(resolved);
  const title = `${bp.company.name} — ${bp.company.headline}`;
  const description = bp.company.about;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: bp.company.name,
    alternates: {
      canonical,
      languages: {
        en: "/",
        vi: "/vi",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: bp.company.name,
      title,
      description,
      locale: OG_LOCALE[resolved],
      alternateLocale: routing.locales
        .filter((l) => l !== resolved)
        .map((l) => OG_LOCALE[l]),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${bp.company.name} — Multi-process manufacturing in Vietnam`,
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
}

function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeLD(graphLD(locale)) }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
