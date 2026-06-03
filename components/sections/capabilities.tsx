import Image from "next/image";
import { blueprint } from "@/lib/blueprint";
import { SectionHeader } from "./section-header";

const CAP_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80";

export function Capabilities() {
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
          eyebrow="What we do"
          title="Manufacturing capabilities"
          intro={intro}
        />

        {featured.length > 0 && (
          <div className="mb-8 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
            {featured.map((c) => (
              <article
                key={c.name}
                className="overflow-hidden border border-border-soft bg-bg-surface transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={CAP_IMAGE_FALLBACK}
                    alt={c.name}
                    fill
                    sizes="(min-width:768px) 260px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-4.5 pt-4 pb-5">
                  <h3 className="mb-1 text-sm font-semibold tracking-[-0.02em] text-text-primary">
                    {c.name}
                  </h3>
                  {c.spec ? (
                    <div className="mb-1.5 font-mono text-[10px] text-brand">
                      {c.spec}
                    </div>
                  ) : null}
                  {c.summary ? (
                    <p className="text-[11.5px] leading-[1.6] text-text-secondary">
                      {c.summary}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}

        {additional.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {additional.map((name) => (
              <li
                key={name}
                className="border border-border-soft bg-bg-surface px-3.5 py-1.5 text-[11px] font-medium text-text-secondary"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
