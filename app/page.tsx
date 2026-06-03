import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Materials } from "@/components/sections/materials";
import { Quality } from "@/components/sections/quality";
import { QualityKpis } from "@/components/sections/quality-kpis";
import { ProgrammeDelivery } from "@/components/sections/programme-delivery";
import { Buyers } from "@/components/sections/buyers";
import { LeadTimesContact } from "@/components/sections/lead-times-contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
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
        <LeadTimesContact />
      </main>
      <Footer />
    </>
  );
}
