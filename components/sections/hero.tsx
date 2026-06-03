import Image from "next/image";
import { useLocale } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";

export function Hero() {
  const blueprint = getBlueprint(useLocale());
  const eyebrow = blueprint.heroEyebrow;
  const headline = blueprint.heroHeadline;
  const sub = blueprint.heroSubheadline;
  const primary = blueprint.heroCtas?.primary ?? blueprint.primaryCtaLabel;
  const secondary = blueprint.heroCtas?.secondary ?? blueprint.secondaryCtaLabel;
  const badges = blueprint.topTrustBadges ?? [];
  const stats = blueprint.topProofStats ?? blueprint.stats ?? [];
  const heroImage =
    blueprint.templateSlots?.heroImages?.find((h) => h.likelyUsableAsHero) ??
    blueprint.templateSlots?.heroImages?.[0];

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden bg-bg-hero"
    >
      {heroImage?.url && (
        <Image
          src={heroImage.url}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center opacity-[0.42]"
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,28,0.62)_0%,rgba(10,15,28,0.82)_60%,rgba(10,15,28,0.96)_100%)]"
      />

      <div className="relative max-w-[900px] px-5 pt-18 pb-16 md:px-12 md:pt-18 md:pb-16">
        <div className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/[0.55]">
          {eyebrow}
        </div>

        <h1 className="mb-5 text-[clamp(36px,5vw,64px)] font-bold leading-[0.97] tracking-[-0.05em] text-white">
          {headline}
        </h1>

        <p className="mb-9 max-w-[560px] text-[clamp(15px,1.8vw,18px)] leading-[1.55] text-white/70">
          {sub}
        </p>

        <div className="mb-12 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-[0.88]"
          >
            {primary}
          </a>
          <a
            href="#capabilities"
            className="inline-flex items-center gap-2 border border-white/[0.28] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            {secondary}
          </a>
        </div>

        {stats.length > 0 && (
          <div className="flex flex-wrap border-t border-white/[0.12]">
            {stats.map((s) => (
              <div key={s.label} className="mr-6 py-4 pr-6">
                <div className="text-[22px] font-bold tracking-[-0.04em] text-white">
                  {s.value}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/[0.48]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {badges.length > 0 && (
        <div className="absolute right-12 bottom-16 hidden flex-col items-end gap-2 md:flex">
          {badges.slice(0, 3).map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/[0.15] bg-white/[0.09] px-3.5 py-1.5 text-[10.5px] font-medium text-white/[0.88] backdrop-blur"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
