import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";

const ACCENT_OPACITIES = [1, 0.88, 0.76, 0.64, 0.52];

export function ProgrammeDelivery() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.programmeDelivery");
  const steps = blueprint.processWorkflow ?? [];
  const support = blueprint.programSupport ?? [];
  const primaryCert = blueprint.certifications?.[0]?.name;
  const primaryMethod = blueprint.qualityMethods?.[0]?.method;
  const primarySupport = support[0]?.title;
  const industries = (blueprint.industries ?? []).slice(0, 3).map((i) => i.name);

  const topChips = [primaryCert, primaryMethod, primarySupport].filter(
    (c): c is string => Boolean(c),
  );

  if (steps.length === 0 && support.length === 0) return null;

  return (
    <>
      <div
        className="border-b border-white/[0.08] bg-[linear-gradient(180deg,#182031_0%,#131b2d_100%)] px-5 py-18 text-center md:px-12"
      >
        <div className="mb-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/[0.62]">
          {t("eyebrow")}
        </div>
        <h2 className="mb-3 text-[clamp(28px,4vw,48px)] font-bold leading-[0.97] tracking-[-0.05em] text-white">
          {t("introTitle")}
        </h2>
        <p className="mx-auto mb-6 max-w-[600px] text-[15px] leading-[1.6] text-white/[0.68]">
          {t("introSub")}
        </p>
        {topChips.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2.5">
            {topChips.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.86]"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
        {industries.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-2.5">
            {industries.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.86]"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      <section
        id="programme-delivery"
        className="border-b border-border-soft bg-bg-alt"
      >
        <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-brand">
            <span className="inline-block h-px w-7 bg-brand" />
            {t("eyebrow")}
          </div>

          <div className="grid items-start gap-5 [grid-template-columns:minmax(0,1.15fr)_minmax(260px,0.85fr)] max-[900px]:grid-cols-1">
            {steps.length > 0 && (
              <div className="grid gap-3">
                {steps.map((s, i) => (
                  <div
                    key={s.step}
                    className="relative overflow-hidden rounded-2xl border border-border-soft bg-bg-surface py-4 pr-4 pl-5 shadow-[0_8px_18px_rgba(15,23,42,0.035)]"
                  >
                    <div
                      aria-hidden
                      className="absolute top-0 bottom-0 left-0 w-[3px] bg-brand"
                      style={{ opacity: ACCENT_OPACITIES[i] ?? 0.4 }}
                    />
                    <div className="grid grid-cols-[36px_1fr] items-start gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border-soft bg-[color-mix(in_srgb,var(--color-brand)_12%,white_88%)] font-mono text-[9px] font-semibold text-brand">
                        {s.step}
                      </div>
                      <div>
                        <h3 className="mb-[3px] text-sm font-semibold tracking-[-0.02em] text-text-primary">
                          {s.title}
                        </h3>
                        <p className="text-[10.5px] leading-[1.55] text-text-secondary">
                          {s.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {support.length > 0 && (
              <div className="grid gap-3">
                {support.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-[18px] border border-border-soft bg-bg-surface px-4.5 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.035)]"
                  >
                    <h3 className="mb-[5px] text-[12px] font-semibold tracking-[-0.02em] text-text-primary">
                      {s.title}
                    </h3>
                    <p className="text-[11px] leading-[1.65] text-text-secondary">
                      {s.summary}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
