import { blueprint } from "@/lib/blueprint";
import { SectionHeader } from "./section-header";

export function About() {
  const { company, capabilityIntro, whyChooseUsIntro } = blueprint;

  const capabilityCount =
    blueprint.allCapabilitiesCanonical?.length ??
    Number(blueprint.stats?.find((s) => s.label === "Capability Areas")?.value ?? 0);
  const accreditationCount = blueprint.certifications?.length ?? 0;
  const primaryCert = blueprint.certifications?.[0]?.name;
  const primaryIndustry = blueprint.industries?.[0]?.name;

  const tiles: { value: string; label: string }[] = [];
  if (capabilityCount) {
    tiles.push({ value: String(capabilityCount), label: "Capability Areas" });
  }
  if (accreditationCount) {
    tiles.push({ value: String(accreditationCount), label: "Accreditations" });
  }
  if (primaryCert) tiles.push({ value: primaryCert, label: "Primary cert" });
  if (primaryIndustry) tiles.push({ value: primaryIndustry, label: "Industry" });

  return (
    <section
      id="about"
      className="border-b border-border-soft bg-bg-alt"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
        <SectionHeader eyebrow={`About ${company.name}`} title={company.about} />

        <div className="mb-10 grid max-w-[680px] gap-3.5">
          <p className="text-[15px] leading-[1.72] text-text-secondary">
            {capabilityIntro}
          </p>
          <p className="text-[15px] leading-[1.72] text-text-secondary">
            {whyChooseUsIntro}
          </p>
        </div>

        {tiles.length > 0 && (
          <ul className="flex flex-wrap gap-4">
            {tiles.map((t) => (
              <li
                key={t.label}
                className="min-w-[160px] border border-border-soft bg-bg-surface px-5 py-4"
              >
                <div className="text-[20px] font-bold tracking-[-0.04em] text-text-primary">
                  {t.value}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  {t.label}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
