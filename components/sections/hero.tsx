"use client";

import { Fragment, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";

// Hero carousel slides — sourced from the openfoundry.app preview, in its order.
const HERO_SLIDES = [
  "/stock-heroes/cnc-1.webp",
  "/stock-heroes/sheet-metal-2.jpg",
  "/stock-heroes/sheet-metal-1.webp",
];

const ROTATE_MS = 5000;

export function Hero() {
  const blueprint = getBlueprint(useLocale());
  const headline = blueprint.heroHeadline;
  const sub = blueprint.heroSubheadline;
  const primary = blueprint.heroCtas?.primary ?? blueprint.primaryCtaLabel;
  const secondary = blueprint.heroCtas?.secondary ?? blueprint.secondaryCtaLabel;
  const badges = (blueprint.topTrustBadges ?? []).slice(0, 3);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % HERO_SLIDES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex-1 min-h-[460px] overflow-hidden"
      style={{ backgroundColor: "#07090d" }}
    >
      {HERO_SLIDES.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === active ? 1 : 0,
          }}
        />
      ))}

      {/* Gradient overlays (match preview) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,10,18,0.55) 0%, rgba(6,10,18,0.28) 35%, rgba(6,10,18,0.38) 70%, rgba(6,10,18,0.72) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6,10,18,0) 38%, rgba(6,10,18,0.48) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-36"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,10,18,0.55) 0%, rgba(6,10,18,0.22) 55%, rgba(6,10,18,0) 100%)",
        }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24 pb-10 text-center sm:px-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-14">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="mx-auto max-w-[22ch] text-[30px] font-semibold leading-[1.08] tracking-[-0.028em] text-white sm:text-[38px] lg:text-[46px]">
            {headline}
          </h1>

          <p className="mx-auto mt-5 max-w-[52ch] text-[15px] leading-[1.6] text-white/85 sm:text-[16.5px]">
            {sub}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-brand px-6 py-3 text-[13px] font-semibold text-white shadow-[0_22px_44px_-18px_rgba(0,0,0,0.7)] transition-[transform,box-shadow] duration-[220ms] ease-out hover:scale-[1.02] hover:shadow-[0_28px_56px_-18px_rgba(0,0,0,0.78)] active:scale-[0.98]"
            >
              {primary}
            </a>
            <a
              href="#capabilities"
              className="rounded-full border border-white/35 bg-white/[0.06] px-6 py-3 text-[13px] font-semibold text-white/90 backdrop-blur-[2px] transition-colors duration-[220ms] hover:border-white/55 hover:bg-white/[0.14]"
            >
              {secondary}
            </a>
          </div>

          {badges.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {badges.map((b, i) => (
                <Fragment key={b}>
                  {i > 0 && <span aria-hidden className="h-3 w-px bg-white/35" />}
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-white/85">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-brand" />
                    {b}
                  </span>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Carousel indicators */}
      {HERO_SLIDES.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {HERO_SLIDES.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show hero image ${i + 1} of ${HERO_SLIDES.length}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className="h-[3px] rounded-full transition-all duration-500 ease-out"
              style={{
                width: i === active ? 22 : 8,
                backgroundColor:
                  i === active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.38)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
