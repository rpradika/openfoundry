import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";

export function CustomerLogos() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.customerLogos");
  const logos = (blueprint.customerLogos ?? []).filter((l) => l.url);

  if (logos.length === 0) return null;

  return (
    <section
      aria-labelledby="customer-logos-heading"
      className="border-b border-border-soft bg-bg-surface"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-16">
        <div className="mb-8 flex flex-col items-start gap-3 md:flex-row md:items-baseline md:justify-between">
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-brand">
            <span className="inline-block h-px w-7 bg-brand" />
            <span id="customer-logos-heading">{t("eyebrow")}</span>
          </div>
          <p className="max-w-[420px] text-[12px] leading-[1.65] text-text-muted">
            {t("intro")}
          </p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5"
        >
          {logos.map((logo) => (
            <li
              key={logo.url}
              className="group relative flex h-[56px] items-center justify-center"
            >
              <Image
                src={logo.url}
                alt={logo.name ?? ""}
                width={160}
                height={56}
                className="max-h-[44px] w-auto max-w-full object-contain opacity-[0.55] grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
