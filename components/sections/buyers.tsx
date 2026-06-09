import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { BUYER_VERIFY, BUYER_CONFIDENCE } from "@/lib/buyers-content";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="mt-[5px] h-3.5 w-3.5 shrink-0 text-brand"
    >
      <path
        d="M2 6l3 3 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Buyers() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.buyers");
  const title = blueprint.whyChooseUsIntro ?? t("fallbackTitle");

  return (
    <section
      id="why-buyers-choose"
      className="border-b border-border-soft px-6 py-20 lg:py-24"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-brand) 4%, var(--color-bg-alt) 96%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-brand">
            {t("eyebrow")}
          </div>
          <h2 className="mb-4 text-[28px] font-semibold leading-[1.05] tracking-[-0.035em] text-text-primary sm:text-[36px] lg:text-[40px]">
            {title}
          </h2>
          <p className="max-w-2xl text-[15px] leading-[1.72] text-text-secondary">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-20">
          {/* What buyers can verify */}
          <div>
            <div className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-text-muted">
              {t("verifyHeading")}
            </div>
            <ul className="space-y-3.5">
              {BUYER_VERIFY.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-[13.5px] leading-[1.7] text-text-secondary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Confidence signals */}
          <div>
            <div className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-text-muted">
              {t("confidenceHeading")}
            </div>
            <dl className="space-y-5">
              {BUYER_CONFIDENCE.map((c) => (
                <div key={c.title}>
                  <dt className="text-[14px] font-semibold tracking-[-0.01em] text-text-primary">
                    {c.title}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-[1.7] text-text-secondary">
                    {c.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
