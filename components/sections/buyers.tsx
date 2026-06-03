import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { SectionHeader } from "./section-header";

export function Buyers() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.buyers");
  const trust = blueprint.trustSignals ?? [];
  const proofs = blueprint.buyerProofs ?? [];
  const title =
    blueprint.whyChooseUsIntro?.replace(/\.$/, "") ?? t("fallbackTitle");

  if (trust.length === 0 && proofs.length === 0) return null;

  return (
    <section
      id="why-buyers-choose"
      className="border-b border-border-soft bg-bg-surface"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={title}
        />

        {trust.length > 0 && (
          <ul className="mt-7 grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
            {trust.map((t) => (
              <li key={t.text} className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                  className="mt-[2px] h-3.5 w-3.5 flex-shrink-0 text-brand"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[12px] leading-[1.55] text-text-secondary">
                  {t.text}
                </span>
              </li>
            ))}
          </ul>
        )}

        {proofs.length > 0 && (
          <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
            {proofs.map((p) => (
              <article
                key={p.headline}
                className="border border-border-soft bg-bg-alt px-5.5 py-5"
              >
                <h3 className="mb-1.5 text-[13px] font-semibold tracking-[-0.02em] text-text-primary">
                  {p.headline}
                </h3>
                <p className="text-[11.5px] leading-[1.6] text-text-secondary">
                  {p.detail}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
