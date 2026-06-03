import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { SectionHeader } from "./section-header";

function DownloadIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 2v8m0 0l3-3m-3 3L5 7M3 13h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProcessHighlights() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.processHighlights");
  const highlights = blueprint.processHighlights ?? [];

  if (highlights.length === 0) return null;

  return (
    <section
      id="process-highlights"
      aria-labelledby="process-highlights-heading"
      className="border-b border-border-soft bg-bg-alt"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

        <div className="grid gap-5 md:grid-cols-2">
          {highlights.map((h) => (
            <article
              key={h.processName}
              className="group flex flex-col overflow-hidden border border-border-soft bg-bg-surface transition-shadow hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0f1830]">
                <Image
                  src={h.imageUrl}
                  alt={`${h.processName} — ${h.programmeTitle}`}
                  fill
                  sizes="(min-width:768px) 540px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {h.kpiProof && (
                  <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur">
                    {h.kpiProof}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3.5 px-5 py-5 md:px-6">
                <div>
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brand">
                    {h.processName}
                  </div>
                  <h3 className="text-[17px] font-semibold leading-[1.25] tracking-[-0.025em] text-text-primary">
                    {h.programmeTitle}
                  </h3>
                </div>

                <p className="text-[13px] leading-[1.65] text-text-secondary">
                  {h.summary}
                </p>

                {h.bullets?.length > 0 && (
                  <ul className="grid gap-1.5">
                    {h.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-[12px] leading-[1.5] text-text-secondary"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] inline-block h-[3px] w-[3px] flex-shrink-0 rounded-full bg-brand"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {h.sourcePdfUrl && (
                  <div className="mt-auto pt-2">
                    <a
                      href={h.sourcePdfUrl}
                      download={h.sourcePdfFilename}
                      className="inline-flex items-center gap-2 self-start border border-border-soft bg-bg-alt px-3.5 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-text-primary transition-colors hover:border-brand hover:text-brand"
                    >
                      <DownloadIcon />
                      {t("downloadPdf")}
                      <span className="font-normal normal-case tracking-normal text-text-muted">
                        · {h.sourcePdfFilename}
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
