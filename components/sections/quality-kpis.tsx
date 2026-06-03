import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { SectionHeader } from "./section-header";

export function QualityKpis() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.qualityKpis");
  const kpis = blueprint.templateSlots?.qualityKpis ?? [];
  if (kpis.length === 0) return null;

  return (
    <section
      id="quality-systems"
      className="border-b border-white/[0.08] bg-bg-hero"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          inverse
        />

        <div className="mt-9 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
          {kpis.map((k) => {
            const value = k.numericValue.toFixed(k.decimals);
            const width = Math.max(0, Math.min(100, k.progressPct));
            return (
              <div
                key={k.id}
                className="border border-white/10 bg-white/[0.06] px-5.5 py-5"
              >
                <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                  {k.label}
                </div>
                <div className="leading-none">
                  <span className="text-[32px] font-bold tracking-[-0.05em] text-white">
                    {value}
                  </span>
                  {k.unit ? (
                    <span className="ml-0.5 text-sm font-medium text-white/60">
                      {k.unit}
                    </span>
                  ) : null}
                  {k.suffix ? (
                    <span className="ml-0.5 text-sm font-medium text-white/60">
                      {k.suffix}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3.5 h-[3px] rounded-[2px] bg-white/10">
                  <div
                    className="h-[3px] rounded-[2px] bg-brand"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                  {k.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
