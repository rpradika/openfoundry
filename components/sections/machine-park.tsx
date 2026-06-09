"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getBlueprint, type EquipmentCard } from "@/lib/blueprint";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d={dir === "right" ? "M4.5 2.5L8 6l-3.5 3.5" : "M7.5 2.5L4 6l3.5 3.5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MachinePark() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.machinePark");
  const cards: EquipmentCard[] =
    blueprint.advancedManufacturing ?? blueprint.templateSlots?.advancedManufacturing ?? [];
  const meta = (blueprint.templateSlots?.advancedMfgMeta ?? {}) as {
    machineCount?: number;
    categoryLabels?: string[];
  };

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState({ start: 1, end: Math.min(3, cards.length) });

  function updateRange() {
    const el = scrollerRef.current;
    if (!el || cards.length === 0) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const per = Math.max(1, Math.round(el.clientWidth / card.offsetWidth));
    const start = Math.round(el.scrollLeft / card.offsetWidth) + 1;
    setRange({ start, end: Math.min(start + per - 1, cards.length) });
  }

  useEffect(() => {
    updateRange();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateRange, { passive: true });
    window.addEventListener("resize", updateRange);
    return () => {
      el.removeEventListener("scroll", updateRange);
      window.removeEventListener("resize", updateRange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  function page(dir: "prev" | "next") {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth : el.clientWidth;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  }

  if (cards.length === 0) return null;

  const machineCount = meta.machineCount ?? cards.length;
  const labels = meta.categoryLabels ?? cards.map((c) => c.category);
  const shownLabels = labels.slice(0, 4);
  const restCount = labels.length - shownLabels.length;
  const labelList =
    restCount > 0
      ? t("andMore", { items: shownLabels.join(", "), n: restCount })
      : shownLabels.join(", ");
  const headline = t("headline", { count: machineCount, list: labelList });

  const navBtn =
    "group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.04] text-white/70 transition-colors hover:bg-white/10 hover:text-white";

  return (
    <section
      id="machine-park"
      aria-labelledby="machine-park-heading"
      className="border-b px-6 py-12"
      style={{
        background:
          "linear-gradient(160deg, #0a0f1a 0%, #0f1825 55%, #111a27 100%)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
              {t("eyebrow")}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <h2
                id="machine-park-heading"
                className="text-[26px] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[32px] lg:text-[38px]"
              >
                {t("title")}
              </h2>
              <div className="flex items-center gap-2">
                <button type="button" aria-label={t("prev")} onClick={() => page("prev")} className={navBtn}>
                  <Arrow dir="left" />
                </button>
                <button type="button" aria-label={t("next")} onClick={() => page("next")} className={navBtn}>
                  <Arrow dir="right" />
                </button>
              </div>
            </div>
          </div>
          <span
            className="shrink-0 text-[11px] font-medium tabular-nums tracking-[0.02em] text-white/[0.42]"
            aria-live="polite"
          >
            {range.start}–{range.end} {t("of")} {cards.length}
          </span>
        </div>

        {/* Meta bar */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-white/[0.08] bg-white/[0.04] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
            <span className="text-[11.5px] font-medium leading-snug text-white/[0.72]">
              {headline}
            </span>
          </div>
          <span className="shrink-0 text-[9.5px] font-medium tracking-[0.02em] text-white/[0.32]">
            {t("sourceNote")}
          </span>
        </div>

        {/* Carousel */}
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => {
            const util = Math.max(0, Math.min(100, card.utilisationPct));
            const star = card.utilisationVerified ? "" : "*";
            const specs = [
              { label: t("specs.axes"), value: card.specs?.axes },
              { label: t("specs.envelope"), value: card.specs?.envelope },
              { label: t("specs.tolerance"), value: card.specs?.tolerance },
            ].filter((s) => s.value);
            return (
              <div
                key={card.title}
                data-card
                className="w-full shrink-0 snap-start basis-full pr-4 sm:basis-1/2 lg:basis-1/3"
              >
                <article
                  className="flex h-full flex-col overflow-hidden rounded-[16px] border border-white/[0.10] bg-white/[0.03] shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
                >
                  {/* Image */}
                  <div className="relative h-[148px] w-full shrink-0">
                    {card.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.imageUrl}
                        alt={`${card.title} — ${card.category}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ filter: "brightness(0.72) saturate(0.85)" }}
                      />
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.82) 100%)",
                      }}
                    />
                    <div className="absolute right-3 top-3">
                      <span
                        className="flex items-center gap-1 rounded-full px-2 py-1 text-[8.5px] font-semibold tracking-[0.06em] text-white/85 backdrop-blur-[6px]"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: "rgba(134,239,172,0.9)" }}
                        />
                        {util}% {t("utilisation")}
                        {star}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3.5">
                      <span className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-white/[0.52]">
                        {card.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-3 px-4 py-3.5">
                    <h3 className="text-[13.5px] font-semibold leading-tight tracking-[-0.01em] text-white">
                      {card.title}
                    </h3>

                    {specs.length > 0 && (
                      <div
                        className="overflow-hidden rounded-[10px]"
                        style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.22)" }}
                      >
                        {specs.map((s, i) => (
                          <div
                            key={s.label}
                            className="flex items-start justify-between gap-2 px-3 py-2"
                            style={
                              i < specs.length - 1
                                ? { borderBottom: "1px solid rgba(255,255,255,0.06)" }
                                : undefined
                            }
                          >
                            <span className="shrink-0 text-[9.5px] font-medium text-white/[0.38]">
                              {s.label}
                            </span>
                            <span className="text-right text-[9.5px] font-semibold leading-snug text-white/[0.82]">
                              {s.value}*
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {card.bullets?.length > 0 && (
                      <ul className="space-y-1">
                        {card.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-[10px] leading-[1.45] text-white/[0.58]"
                          >
                            <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-brand" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-1">
                      <a
                        href="#contact"
                        className="flex items-center gap-1 text-[9.5px] font-semibold tracking-[0.04em] text-brand transition-opacity hover:opacity-75"
                      >
                        {t("viewSpecs")}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path
                            d="M2.5 5h5M5.5 3l2 2-2 2"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
