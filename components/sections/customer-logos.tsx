import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";

const EDGE_MASK =
  "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)";

export function CustomerLogos() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.customerLogos");
  const logos = (blueprint.customerLogos ?? []).filter((l) => l.url);

  if (logos.length === 0) return null;

  // Duplicate the set so the marquee can loop seamlessly (-50% == one full set).
  const track = [...logos, ...logos];

  return (
    <section
      aria-label={t("eyebrow")}
      className="relative overflow-hidden bg-bg-page pt-4 pb-10 sm:pt-5 sm:pb-12"
    >
      <div className="mb-6 text-center">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-text-muted">
          {t("eyebrow")}
        </span>
      </div>

      <div
        className="logo-marquee-viewport relative"
        style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
      >
        <ul className="logo-marquee items-center gap-12 sm:gap-16 lg:gap-20">
          {track.map((logo, i) => (
            <li
              key={`${logo.url}-${i}`}
              className="group flex h-9 shrink-0 items-center sm:h-10"
              aria-hidden={i >= logos.length}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.url}
                alt={i >= logos.length ? "" : (logo.name ?? "")}
                draggable={false}
                loading="lazy"
                className="max-h-full w-auto max-w-[148px] object-contain opacity-60 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
