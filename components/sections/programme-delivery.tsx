import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";

// ── Infinity-loop geometry (figure-8 / Gerono lemniscate) ────────────────────
const W = 1000;
const H = 600;
const CX = 500;
const CY = 300;
const AX = 330;
const BY = 152;

function pt(t: number): [number, number] {
  return [CX + AX * Math.cos(t), CY + 2 * BY * Math.sin(t) * Math.cos(t)];
}

const LOOP_D = (() => {
  let d = "";
  const N = 260;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const [x, y] = pt(t);
    d += (i ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d + "Z";
})();

// node[i] maps to steps[i]; t = position on the loop
const NODE_T = [
  (3 * Math.PI) / 4, // 01 top-left
  (5 * Math.PI) / 4, // 02 bottom-left
  Math.PI / 2, //      03 centre (crossover)
  (7 * Math.PI) / 4, // 04 top-right
  Math.PI / 4, //      05 bottom-right
];
const NODE_ICON = ["fileSearch", "flask", "clipboardCheck", "cog", "truck"] as const;

const R = 46;
const GLYPH = 46;
const BADGE = 17;
const MAROON = "#8a1f2a";

function Glyph({ name }: { name: (typeof NODE_ICON)[number] }) {
  switch (name) {
    case "fileSearch":
      return (
        <>
          <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
          <path d="M14 2v5a1 1 0 0 0 1 1h5" />
          <circle cx="11.5" cy="14.5" r="2.5" />
          <path d="M13.3 16.3 15 18" />
        </>
      );
    case "flask":
      return (
        <>
          <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
          <path d="M6.453 15h11.094" />
          <path d="M8.5 2h7" />
        </>
      );
    case "clipboardCheck":
      return (
        <>
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </>
      );
    case "cog":
      return (
        <>
          <path d="M11 10.27 7 3.34" />
          <path d="m11 13.73-4 6.93" />
          <path d="M12 22v-2" />
          <path d="M12 2v2" />
          <path d="M14 12h8" />
          <path d="m17 20.66-1-1.73" />
          <path d="m17 3.34-1 1.73" />
          <path d="M2 12h2" />
          <path d="m20.66 17-1.73-1" />
          <path d="m20.66 7-1.73 1" />
          <path d="m3.34 17 1.73-1" />
          <path d="m3.34 7 1.73 1" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="12" r="8" />
        </>
      );
    case "truck":
      return (
        <>
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </>
      );
  }
}

// first sentence only — keeps loop labels concise like the reference
function concise(summary: string) {
  const i = summary.indexOf(". ");
  return i > 0 ? summary.slice(0, i + 1) : summary;
}

type Step = { step: string; title: string; summary: string };

function Label({ step }: { step: Step }) {
  return (
    <div className="mx-auto max-w-[210px]">
      <h3 className="text-[13.5px] font-semibold leading-tight tracking-[-0.02em] text-text-primary">
        {step.title}
      </h3>
      <p className="mt-1 text-[10.5px] leading-[1.45] text-text-secondary">
        {concise(step.summary)}
      </p>
    </div>
  );
}

function ProcessLoop({ steps }: { steps: Step[] }) {
  // steps indexed 0..4; top row = [0, 2, 3], bottom row = [1, 4]
  return (
    <div className="relative w-full">
      {/* top labels: Technical Review · Launch Readiness · Volume Production */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <Label step={steps[0]} />
        <Label step={steps[2]} />
        <Label step={steps[3]} />
      </div>

      {/* loop diagram */}
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full max-w-[660px]" role="img" aria-label="Programme delivery loop">
        <defs>
          <linearGradient
            id="pd-ribbon"
            x1={CX - AX}
            y1="0"
            x2={CX + AX}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#c33a48" />
            <stop offset="0.5" stopColor="#a01f2c" />
            <stop offset="1" stopColor="#6f1620" />
          </linearGradient>
          <filter id="pd-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#3a0a10" floodOpacity="0.18" />
          </filter>
        </defs>

        <path d={LOOP_D} fill="none" stroke="url(#pd-ribbon)" strokeWidth={78} strokeLinejoin="round" />

        <g filter="url(#pd-shadow)">
          {NODE_T.map((t, i) => {
            const [x, y] = pt(t);
            const bx = x + 33;
            const by = y - 33;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={R} fill={MAROON} stroke="#f4ece1" strokeWidth={7} />
                <svg
                  x={x - GLYPH / 2}
                  y={y - GLYPH / 2}
                  width={GLYPH}
                  height={GLYPH}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Glyph name={NODE_ICON[i]} />
                </svg>
                <circle cx={bx} cy={by} r={BADGE} fill="#f4ece1" stroke="#fff" strokeWidth={1.5} />
                <text
                  x={bx}
                  y={by + 4.5}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={13}
                  fontWeight={700}
                  fill={MAROON}
                >
                  {steps[i].step}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* bottom labels: Prototype & Validation · Repeat Supply & Export */}
      <div className="mx-auto grid max-w-[560px] grid-cols-2 gap-2 text-center">
        <Label step={steps[1]} />
        <Label step={steps[4]} />
      </div>
    </div>
  );
}

function StepperRow({ step, icon }: { step: Step; icon: (typeof NODE_ICON)[number] }) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="relative shrink-0">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: MAROON }}
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Glyph name={icon} />
          </svg>
        </div>
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-bg-surface text-[9px] font-bold text-brand shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
          {step.step}
        </span>
      </div>
      <div className="pt-0.5">
        <h3 className="text-[13.5px] font-semibold tracking-[-0.02em] text-text-primary">
          {step.title}
        </h3>
        <p className="mt-1 text-[11px] leading-[1.55] text-text-secondary">
          {concise(step.summary)}
        </p>
      </div>
    </div>
  );
}

export function ProgrammeDelivery() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.programmeDelivery");
  const steps = (blueprint.processWorkflow ?? []) as Step[];
  const support = blueprint.programSupport ?? [];
  const primaryCert = blueprint.certifications?.[0]?.name;
  const primaryMethod = blueprint.qualityMethods?.[0]?.method;
  const primarySupport = support[0]?.title;
  const industries = (blueprint.industries ?? []).slice(0, 3).map((i) => i.name);
  const industryIntro = blueprint.industryIntro;
  const stages = blueprint.productionScale ?? [];

  const topChips = [primaryCert, primaryMethod, primarySupport].filter(
    (c): c is string => Boolean(c),
  );

  const hasLoop = steps.length >= 5;

  if (steps.length === 0 && support.length === 0) return null;

  return (
    <>
      <div className="border-b border-white/[0.08] bg-[linear-gradient(180deg,#182031_0%,#131b2d_100%)] px-5 py-18 text-center md:px-12">
        <div className="mb-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/[0.62]">
          {t("eyebrow")}
        </div>
        <h2 className="mb-3 text-[clamp(28px,4vw,48px)] font-bold leading-[0.97] tracking-[-0.05em] text-white">
          {t("introTitle")}
        </h2>
        <p className="mx-auto mb-6 max-w-[600px] text-[15px] leading-[1.6] text-white/[0.68]">
          {t("introSub")}
        </p>
        {topChips.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2.5">
            {topChips.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.86]"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
        {industries.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-2.5">
            {industries.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.86]"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
        {industryIntro && (
          <p className="mx-auto mt-5 max-w-[640px] text-[13px] leading-[1.65] text-white/[0.55]">
            {industryIntro}
          </p>
        )}
      </div>

      <section id="programme-delivery" className="border-b border-border-soft bg-bg-alt">
        <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
          <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-brand">
            <span className="inline-block h-px w-7 bg-brand" />
            {t("eyebrow")}
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)] lg:gap-10">
            {/* Steps: loop (lg) / stepper (smaller) */}
            <div>
              {hasLoop && (
                <div className="hidden lg:block">
                  <ProcessLoop steps={steps} />
                </div>
              )}
              <div className={hasLoop ? "grid gap-5 lg:hidden" : "grid gap-5"}>
                {steps.map((s, i) => (
                  <StepperRow key={s.step} step={s} icon={NODE_ICON[i] ?? "clipboardCheck"} />
                ))}
              </div>
            </div>

            {/* Programme support */}
            {support.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  <span className="inline-block h-px w-5 bg-border-soft" />
                  {t("supportTitle")}
                </h3>
                <div className="grid gap-3">
                  {support.map((s) => (
                    <div
                      key={s.title}
                      className="rounded-[18px] border border-border-soft bg-bg-surface px-4.5 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.035)]"
                    >
                      <h4 className="mb-[5px] text-[12px] font-semibold tracking-[-0.02em] text-text-primary">
                        {s.title}
                      </h4>
                      <p className="text-[11px] leading-[1.65] text-text-secondary">
                        {s.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {stages.length > 0 && (
            <div className="mt-10 border-t border-border-soft pt-7">
              <div className="mb-4 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                {t("productionScaleEyebrow")}
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {stages.map((s) => (
                  <li
                    key={s.stage}
                    className="rounded-[12px] border border-border-soft bg-bg-surface px-4 py-3"
                  >
                    <div className="mb-1 text-[12px] font-semibold tracking-[-0.01em] text-text-primary">
                      {s.stage}
                    </div>
                    <p className="text-[11px] leading-[1.6] text-text-secondary">
                      {s.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
