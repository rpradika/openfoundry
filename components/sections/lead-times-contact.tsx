import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { RfqForm } from "./rfq-form";

export function LeadTimesContact() {
  const t = useTranslations("contact");
  const blueprint = getBlueprint(useLocale());
  const leadTimes = blueprint.leadTimes ?? [];
  const contactLine = blueprint.contactLine;
  const contactEmail = blueprint.contactDetails?.email;
  const rfqChip = leadTimes[0]
    ? `${leadTimes[0].type}: ${leadTimes[0].duration}*`
    : null;

  return (
    <section
      id="contact"
      className="px-6 pt-8"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--color-bg-page) 94%, white 6%) 0%, var(--color-bg-page) 60%, var(--color-bg-hero) 60%, var(--color-bg-hero) 100%)",
      }}
    >
      <div
        className="mx-auto max-w-5xl rounded-[28px] border border-border-soft bg-bg-surface px-5 py-5 shadow-[0_24px_52px_rgba(15,23,42,0.12)] sm:px-6 sm:py-6"
      >
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-6">
          {/* Intro */}
          <div className="lg:pr-3">
            <div className="text-[11px] font-semibold tracking-[-0.005em] text-brand">
              {t("eyebrow")}
            </div>
            <h2 className="mt-1.5 text-[28px] font-semibold leading-[1.02] tracking-[-0.045em] text-text-primary sm:text-[38px]">
              {t("heading")}
            </h2>
            {contactLine && (
              <p className="mt-3 max-w-md text-[13px] leading-[1.62] text-text-secondary sm:text-[14px]">
                {contactLine}
              </p>
            )}
            {rfqChip && (
              <div
                className="mt-4 flex items-center gap-3 rounded-[14px] border border-border-soft px-3.5 py-3"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-bg-page) 95%, white 5%)",
                }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-brand) 10%, white 90%)",
                  }}
                >
                  ✓
                </div>
                <span className="text-[12px] font-semibold text-text-secondary">
                  {rfqChip}
                </span>
              </div>
            )}
          </div>

          {/* Form */}
          <div>
            <RfqForm to={contactEmail} />
          </div>
        </div>
      </div>
    </section>
  );
}
