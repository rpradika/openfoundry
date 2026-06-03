import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { SectionHeader } from "./section-header";

const CAPABILITY_IMAGE_MAP: Record<string, string> = {
  "CNC Machining": "/images/process/aluminum-extrusion-6.jpg",
  "Casting": "/images/highlights/investment-casting.jpg",
  "Sheet Metal Fabrication": "/images/process/stamping-1.jpg",
  "Welding & Assembly": "/images/process/aluminum-extrusion-4.jpg",
  "Đúc": "/images/highlights/investment-casting.jpg",
  "Gia công CNC": "/images/process/aluminum-extrusion-6.jpg",
  "Gia công kim loại tấm": "/images/process/stamping-1.jpg",
  "Hàn & lắp ráp": "/images/process/aluminum-extrusion-4.jpg",
};

const CAP_IMAGE_FALLBACK = "/images/process/powder-metallurgy-4.jpg";

export function Capabilities() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.capabilities");
  const featured = blueprint.capabilities.slice(0, 4);
  const additional = blueprint.additionalCapabilities ?? [];
  const intro = blueprint.capabilityIntro;

  return (
    <section
      id="capabilities"
      className="border-b border-border-soft bg-bg-surface"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={intro}
        />

        {featured.length > 0 && (
          <div className="mb-8 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
            {featured.map((c) => (
              <article
                key={c.name}
                className="group overflow-hidden border border-border-soft bg-bg-surface transition-all hover:border-brand/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0f1830]">
                  <Image
                    src={CAPABILITY_IMAGE_MAP[c.name] ?? CAP_IMAGE_FALLBACK}
                    alt={c.name}
                    fill
                    sizes="(min-width:768px) 260px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-4.5 pt-4 pb-5">
                  <h3 className="mb-1 text-sm font-semibold tracking-[-0.02em] text-text-primary">
                    {c.name}
                  </h3>
                  {c.spec ? (
                    <div className="mb-1.5 font-mono text-[10px] text-brand">
                      {c.spec}
                    </div>
                  ) : null}
                  {c.summary ? (
                    <p className="text-[11.5px] leading-[1.6] text-text-secondary">
                      {c.summary}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}

        {additional.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {additional.map((name) => (
              <li
                key={name}
                className="border border-border-soft bg-bg-surface px-3.5 py-1.5 text-[11px] font-medium text-text-secondary"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
