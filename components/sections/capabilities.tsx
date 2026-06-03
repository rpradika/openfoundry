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

function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="mt-[5px] flex-shrink-0 text-brand"
    >
      <path
        d="M2 6.5L4.5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
          <div className="mb-10 grid gap-5 md:grid-cols-2">
            {featured.map((c, idx) => (
              <article
                key={c.name}
                className="group relative flex flex-col overflow-hidden border border-border-soft bg-bg-surface transition-all hover:border-brand/40 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0f1830]">
                  <Image
                    src={CAPABILITY_IMAGE_MAP[c.name] ?? CAP_IMAGE_FALLBACK}
                    alt={c.name}
                    fill
                    sizes="(min-width:768px) 540px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                    {String(idx + 1).padStart(2, "0")} · {t("capabilityLabel")}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3.5 px-5 py-5 md:px-6">
                  <div>
                    <h3 className="text-[18px] font-semibold tracking-[-0.025em] text-text-primary">
                      {c.name}
                    </h3>
                    {c.spec && (
                      <div className="mt-0.5 font-mono text-[10px] text-brand">
                        {c.spec}
                      </div>
                    )}
                  </div>

                  {c.summary && (
                    <p className="text-[13px] leading-[1.65] text-text-secondary">
                      {c.summary}
                    </p>
                  )}

                  {c.specItems && c.specItems.length > 0 && (
                    <ul className="grid gap-1.5 border-t border-border-soft pt-3.5">
                      {c.specItems.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[12.5px] leading-[1.55] text-text-secondary"
                        >
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {c.pdfBullets && c.pdfBullets.length > 0 && (
                    <div className="mt-auto pt-2">
                      <div className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                        {t("qualityProof")}
                      </div>
                      <ul className="flex flex-wrap gap-1.5">
                        {c.pdfBullets.map((b) => (
                          <li
                            key={b}
                            className="rounded-full border border-brand/25 bg-brand/[0.06] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-brand"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {additional.length > 0 && (
          <div>
            <div className="mb-3.5 flex items-center gap-3 font-mono text-[9.5px] font-semibold uppercase tracking-[0.22em] text-text-muted">
              <span className="inline-block h-px w-6 bg-border-soft" />
              {t("alsoAvailable")}
            </div>
            <ul className="flex flex-wrap gap-2">
              {additional.map((name) => (
                <li
                  key={name}
                  className="border border-border-soft bg-bg-surface px-3.5 py-1.5 text-[11.5px] font-medium tracking-[-0.005em] text-text-secondary transition-colors hover:border-brand/40 hover:text-text-primary"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
