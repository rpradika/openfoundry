import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { SectionHeader } from "./section-header";

export function Materials() {
  const blueprint = getBlueprint(useLocale());
  const t = useTranslations("sections.materials");
  const materials = blueprint.materials ?? [];
  if (materials.length === 0) return null;

  return (
    <section
      id="materials"
      className="border-b border-border-soft bg-bg-alt"
    >
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
          {materials.map((m) => (
            <div
              key={m.family}
              className="border border-border-soft bg-bg-surface p-5"
            >
              <div className="mb-2.5 text-[13px] font-semibold text-text-primary">
                {m.family}
              </div>
              {m.grades?.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {m.grades.map((g) => (
                    <li
                      key={g}
                      className="border border-border-soft bg-bg-alt px-2 py-[3px] font-mono text-[10px] text-brand"
                    >
                      {g}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
