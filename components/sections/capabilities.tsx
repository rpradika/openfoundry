"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { CAPABILITY_ITEMS } from "@/lib/capabilities-content";

function Star() {
  return (
    <span aria-hidden className="ml-0.5 text-text-muted">
      *
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${
        open ? "rotate-180 text-brand" : ""
      }`}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Capabilities() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.capabilities");
  const intro = blueprint.capabilityIntro;

  const [open, setOpen] = useState(0);

  return (
    <section id="capabilities" className="border-b border-border-soft bg-bg-page">
      <div className="mx-auto max-w-[1100px] px-5 py-20 md:px-12 lg:py-24">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-brand">
            {t("eyebrow")}
          </div>
          <h2 className="text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-text-primary sm:text-[44px] lg:text-[52px]">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.65] text-text-secondary sm:text-[17px]">
            {intro}
          </p>
        </div>

        <ul className="mx-auto max-w-5xl border-t border-border-soft">
          {CAPABILITY_ITEMS.map((c, idx) => {
            const isOpen = open === idx;
            const rows = [
              { label: t("fields.processScope"), value: c.processScope },
              { label: t("fields.materials"), value: c.materials },
              { label: t("fields.tolerances"), value: c.tolerances },
              { label: t("fields.inspection"), value: c.inspection },
              { label: t("fields.productionScale"), value: c.productionScale },
            ];
            return (
              <li key={c.name} className="border-b border-border-soft">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="font-mono text-[11px] tabular-nums text-text-muted">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5 md:flex-row md:items-baseline md:gap-3">
                      <span
                        className={`text-[18px] font-semibold tracking-[-0.025em] transition-colors group-hover:text-brand md:text-[20px] ${
                          isOpen ? "text-brand" : "text-text-primary"
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="line-clamp-1 text-[12.5px] leading-[1.5] text-text-secondary">
                        {c.summary}
                      </span>
                    </span>
                    <Chevron open={isOpen} />
                  </button>
                </h3>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-[#0f1830] shadow-[0_14px_30px_-24px_rgba(15,23,42,0.22)] lg:order-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.image}
                          alt={c.name}
                          loading="lazy"
                          draggable={false}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-5 lg:order-1">
                        <p className="text-[14px] leading-[1.7] text-text-secondary">
                          {c.summary}
                        </p>

                        <dl className="grid gap-x-6 gap-y-2.5 [grid-template-columns:minmax(120px,auto)_1fr]">
                          {rows.map((r) => (
                            <div key={r.label} className="contents">
                              <dt className="text-[12.5px] font-medium text-text-muted">
                                {r.label}
                              </dt>
                              <dd className="text-[13.5px] leading-[1.55] text-text-primary">
                                {r.value}
                                <Star />
                              </dd>
                            </div>
                          ))}
                          <dt className="text-[12.5px] font-medium text-text-muted">
                            {t("fields.typicalApplications")}
                          </dt>
                          <dd className="text-[13.5px] leading-[1.55] text-text-primary">
                            <ul className="grid gap-1">
                              {c.applications.map((a) => (
                                <li key={a}>
                                  {a}
                                  <Star />
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </dl>

                        <p className="text-[11px] text-text-muted">
                          <Star /> {t("onboardingNote")}
                        </p>

                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand transition-opacity hover:opacity-70"
                        >
                          {t("discussCapability")}
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                              d="M6 3l5 5-5 5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
