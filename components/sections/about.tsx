import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";

export function About() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.about");
  const { company } = blueprint;

  const capabilityCount = blueprint.allCapabilitiesCanonical?.length ?? 0;
  const certs = blueprint.certifications ?? [];
  // Distinct accreditation families (ISO 9001:2015 / ISO 9001 collapse to one).
  const accreditationCount = new Set(
    certs.map((c) => c.name.split(":")[0].trim()),
  ).size;
  const industryCount = blueprint.industries?.length ?? 0;
  const primaryCert = certs[0]?.name ?? "—";
  const secondaryCert = certs[1]?.name ?? "";

  const stats = [
    {
      label: t("stats.capabilityAreas"),
      value: String(capabilityCount),
      sub: t("stats.capabilityAreasSub"),
    },
    {
      label: t("stats.accreditations"),
      value: String(accreditationCount),
      sub: t("stats.accreditationsSub"),
    },
    {
      label: t("stats.industriesServed"),
      value: String(industryCount),
      sub: t("stats.industriesServedSub"),
    },
    {
      label: t("stats.qualityAnchor"),
      value: primaryCert,
      sub: secondaryCert,
    },
  ];

  return (
    <section id="about" className="border-b border-border-soft bg-bg-surface">
      <div className="mx-auto max-w-[1100px] px-5 py-20 text-center md:px-12 lg:py-24">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-brand/80">
            {t("eyebrow", { company: company.name })}
          </div>
          <h2 className="mx-auto text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] text-text-primary sm:text-[38px] lg:text-[42px]">
            {company.about}
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[1.85] text-text-secondary">
            {t("paragraph1")}
          </p>
          <p className="mx-auto mt-6 max-w-[680px] text-[15.5px] leading-[1.85] text-text-secondary">
            {t("paragraph2")}
          </p>
          <p className="mx-auto mt-6 max-w-[640px] text-[13.5px] leading-[1.6] text-text-muted">
            {t("body")}
          </p>
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                {s.label}
              </dt>
              <dd className="mt-2 text-[28px] font-semibold tracking-[-0.025em] text-text-primary">
                {s.value}
              </dd>
              {s.sub && (
                <dd className="mt-1.5 text-[12.5px] leading-[1.65] text-text-muted">
                  {s.sub}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
