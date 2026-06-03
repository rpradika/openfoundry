import type { LocalBusiness, Service, WebSite } from "schema-dts";
import { blueprint } from "@/lib/blueprint";
import { SITE_URL } from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function serviceId(name: string): string {
  return `${SITE_URL}/#service-${slugify(name)}`;
}

function localBusinessNode(): LocalBusiness {
  const { company, brand, contactDetails, certifications = [], industries = [], capabilities = [] } = blueprint;

  return {
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: company.name,
    url: SITE_URL,
    logo: brand.logoUrl,
    image: brand.logoUrl,
    description: company.about,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Huynh Van Luy Street, Quarter 7, Phu Loi Ward",
      addressLocality: "Ho Chi Minh City",
      postalCode: "821334",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: contactDetails.email,
      telephone: contactDetails.phone,
      contactType: "sales",
      availableLanguage: ["English", "Vietnamese"],
    },
    award: certifications.map((c) => c.name).join(", "),
    knowsAbout: [
      ...industries.map((i) => i.name),
      ...capabilities.map((c) => c.name),
    ],
    areaServed: industries.map((i) => i.name),
  };
}

function webSiteNode(): WebSite {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: blueprint.company.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

function serviceNodes(): Service[] {
  const industries = blueprint.industries ?? [];
  return (blueprint.capabilities ?? []).map((c) => ({
    "@type": "Service",
    "@id": serviceId(c.name),
    name: c.name,
    description: c.summary,
    serviceType: c.name,
    category: "Manufacturing",
    provider: { "@id": ORG_ID },
    areaServed: industries.map((i) => i.name),
  }));
}

export function graphLD() {
  return {
    "@context": "https://schema.org",
    "@graph": [localBusinessNode(), webSiteNode(), ...serviceNodes()],
  };
}

export function serializeLD(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
