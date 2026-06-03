import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Materials } from "@/components/sections/materials";
import { Quality } from "@/components/sections/quality";
import { QualityKpis } from "@/components/sections/quality-kpis";
import { ProgrammeDelivery } from "@/components/sections/programme-delivery";
import { Buyers } from "@/components/sections/buyers";
import { CustomerLogos } from "@/components/sections/customer-logos";
import { LeadTimesContact } from "@/components/sections/lead-times-contact";
import { Footer } from "@/components/sections/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale as AppLocale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Materials />
        <Quality />
        <QualityKpis />
        <ProgrammeDelivery />
        <Buyers />
        <CustomerLogos />
        <LeadTimesContact />
      </main>
      <Footer />
    </>
  );
}
