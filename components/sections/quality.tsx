import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { SectionHeader } from "./section-header";

export function Quality() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.quality");
  const certs = blueprint.certifications ?? [];
  const methods = blueprint.qualityMethods ?? [];

  if (certs.length === 0 && methods.length === 0) return null;

  return (
    <section
      id="quality"
      className="border-b border-border-soft bg-[color-mix(in_srgb,var(--color-brand)_5%,var(--color-bg-alt)_95%)]"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        {certs.length > 0 && (
          <ul className="mb-7 flex flex-wrap gap-2.5">
            {certs.map((c) => (
              <li
                key={c.name}
                className="rounded-full border border-border-soft bg-white/70 px-4 py-2 text-[11px] font-semibold text-text-primary"
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}

        {methods.length > 0 && (
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,420px))]">
            {methods.map((m) => (
              <article
                key={m.method}
                className="rounded-[20px] border border-border-soft bg-white/85 p-5 shadow-[0_12px_24px_rgba(15,23,42,0.04)]"
              >
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                  {t("proofLabel")}
                </div>
                <h3 className="mb-1.5 text-[15px] font-semibold tracking-[-0.02em] text-text-primary">
                  {m.method}
                </h3>
                <p className="text-[11px] leading-[1.65] text-text-secondary">
                  {m.summary}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
