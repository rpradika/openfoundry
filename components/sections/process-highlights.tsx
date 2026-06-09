import { useTranslations } from "next-intl";
import { EVIDENCE_CARDS } from "@/lib/evidence-content";

function DownloadIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
  const t = useTranslations("sections.processHighlights");

  if (EVIDENCE_CARDS.length === 0) return null;

  return (
    <section
      id="process-highlights"
      aria-labelledby="process-highlights-heading"
      className="border-b border-border-soft bg-bg-page px-6 py-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-brand">
            {t("eyebrow")}
          </div>
          <h2
            id="process-highlights-heading"
            className="text-[28px] font-semibold leading-[1.06] tracking-[-0.04em] text-text-primary sm:text-[36px]"
          >
            {t("title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[13px] text-text-secondary sm:text-[14px]">
            {t("intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EVIDENCE_CARDS.map((card) => (
            <article
              key={card.title}
              className="flex flex-col overflow-hidden rounded-[18px] border border-border-soft bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_3px_rgba(15,23,42,0.06)]"
            >
              <div className="relative h-[130px] shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                  style={{ filter: "brightness(0.88) saturate(0.9)" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(15,23,42,0.32) 100%)",
                  }}
                />
                <div className="absolute bottom-2.5 left-3">
                  <span
                    className="rounded-full px-2 py-1 text-[9px] font-semibold text-white/[0.92] backdrop-blur-[6px]"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.52)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {card.kpiBadge}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2 px-3.5 py-3.5">
                {card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-brand"
                        style={{ backgroundColor: "#b4232c18" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="text-[12.5px] font-semibold leading-snug tracking-[-0.02em] text-text-primary">
                  {card.title}
                </h3>
                <p className="text-[10px] leading-[1.5] text-text-secondary">
                  {card.summary}
                </p>

                <div className="space-y-1.5 border-t border-border-soft pt-2">
                  {card.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-1.5">
                      <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-brand" />
                      <span className="text-[10px] font-medium leading-[1.35] text-text-primary">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={`/pdfs/${card.pdf}`}
                  download={card.pdf}
                  className="mt-auto inline-flex items-center gap-1.5 self-start pt-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand transition-opacity hover:opacity-70"
                >
                  <DownloadIcon />
                  {t("downloadPdf")}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
