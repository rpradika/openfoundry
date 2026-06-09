"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getBlueprint, type QualityKpi } from "@/lib/blueprint";

type IconKind = "star" | "clock" | "check" | "bars" | "clipboard" | "trend";

// Keyed on the locale-independent KPI id so icons stay correct in every language.
const KPI_THEME: Record<string, { color: string; icon: IconKind }> = {
  "defect-rate": { color: "#10b981", icon: "star" },
  "on-time-delivery": { color: "#3b82f6", icon: "clock" },
  "first-pass-yield": { color: "#06b6d4", icon: "check" },
  "process-cpk": { color: "#6366f1", icon: "bars" },
  "audit-score": { color: "#10b981", icon: "clipboard" },
  "customer-satisfaction": { color: "#8b5cf6", icon: "trend" },
};
const FALLBACK = { color: "#3b82f6", icon: "check" as IconKind };

function MetricIcon({ kind, color }: { kind: IconKind; color: string }) {
  const s = { stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      {kind === "star" && <path d="M9 2.5L11 6h3.5L12 8.5l1 4-4-2.5-4 2.5 1-4L3.5 6H7L9 2.5Z" {...s} />}
      {kind === "clock" && (
        <>
          <circle cx="9" cy="9" r="6.5" {...s} />
          <path d="M9 5.5V9l2.5 2" {...s} />
        </>
      )}
      {kind === "check" && (
        <>
          <circle cx="9" cy="9" r="6.5" {...s} />
          <path d="M6 9.5l2 2 4-4" {...s} />
        </>
      )}
      {kind === "bars" && (
        <>
          <rect x="2.5" y="10.5" width="3" height="5" rx="0.8" fill={color} fillOpacity="0.75" />
          <rect x="7.5" y="7" width="3" height="8.5" rx="0.8" fill={color} />
          <rect x="12.5" y="3.5" width="3" height="12" rx="0.8" fill={color} fillOpacity="0.65" />
        </>
      )}
      {kind === "clipboard" && (
        <>
          <rect x="4" y="2.5" width="10" height="13" rx="2" {...s} />
          <path d="M6.5 7h5M6.5 9.5h5M6.5 12h3" {...s} />
        </>
      )}
      {kind === "trend" && (
        <>
          <path d="M2.5 12.5L6.5 8l3 3 4-5L16 8" {...s} />
          <path d="M13.5 6h2.5v2.5" {...s} />
        </>
      )}
    </svg>
  );
}

const STATUS_STYLE: Record<string, { color: string; bg: string; symbol: string }> = {
  Improving: { color: "rgba(29,78,216,1)", bg: "rgba(59,130,246,0.10)", symbol: "↑" },
  Verified: { color: "rgba(6,120,87,1)", bg: "rgba(16,185,129,0.13)", symbol: "✓" },
  Stable: { color: "rgba(6,120,87,1)", bg: "rgba(16,185,129,0.10)", symbol: "→" },
};

export function QualityKpis() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.qualityKpis");
  const kpis: QualityKpi[] = blueprint.templateSlots?.qualityKpis ?? [];

  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAnimate(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (kpis.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="quality-systems"
      className="border-b border-border-soft bg-bg-page px-6 py-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-[28px] font-semibold leading-[1.06] tracking-[-0.04em] text-text-primary sm:text-[36px]">
            {t("eyebrow")}
          </h2>
          <p className="mt-2 text-[13px] text-text-secondary sm:text-[14px]">{t("intro")}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((k) => {
            const theme = KPI_THEME[k.id] ?? FALLBACK;
            const status = STATUS_STYLE[k.status] ?? STATUS_STYLE.Improving;
            const value = k.numericValue.toFixed(k.decimals);
            const width = Math.max(0, Math.min(100, k.progressPct));
            return (
              <div
                key={k.id}
                className="flex flex-col gap-4 rounded-[18px] border border-border-soft bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_3px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${theme.color}1a` }}
                  >
                    <MetricIcon kind={theme.icon} color={theme.color} />
                  </div>
                  <span
                    className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    style={{ color: status.color, backgroundColor: status.bg }}
                  >
                    <span className="leading-none">{status.symbol}</span>
                    {k.status}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-1 leading-none">
                    <span className="text-[40px] font-bold tracking-[-0.05em] text-[rgba(15,23,42,0.9)] sm:text-[44px]">
                      {value}
                    </span>
                    {k.unit && (
                      <span className="text-[20px] font-semibold text-[rgba(15,23,42,0.7)]">
                        {k.unit}
                      </span>
                    )}
                    {k.suffix && (
                      <span className="text-[16px] font-medium text-[rgba(15,23,42,0.38)]">
                        {k.suffix}
                      </span>
                    )}
                    {k.isInferred && (
                      <span className="mt-0.5 self-start text-[22px] font-medium text-[rgba(15,23,42,0.28)]">
                        *
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 text-[11.5px] font-medium text-[rgba(15,23,42,0.42)]">
                    {k.label}
                  </div>
                </div>

                <div className="mt-auto h-[3px] overflow-hidden rounded-full bg-[rgba(15,23,42,0.07)]">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{
                      width: animate ? `${width}%` : "0%",
                      transition: "width 1100ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-center text-[9px] text-[rgba(15,23,42,0.28)]">{t("footnote")}</p>
      </div>
    </section>
  );
}
