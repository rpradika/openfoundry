import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";

const COMPANY_LINKS = [
  { key: "about", href: "#about" },
  { key: "capabilities", href: "#capabilities" },
  { key: "quality", href: "#quality" },
  { key: "contact", href: "#contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const blueprint = getBlueprint(useLocale());
  const { logoUrl } = blueprint.brand;
  const companyName = blueprint.company.name;
  const contact = blueprint.contactDetails;

  return (
    <footer className="border-t border-white/[0.07] bg-bg-hero px-5 pt-10 pb-6 md:px-12 md:pt-12 md:pb-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-8 grid items-start gap-10 [grid-template-columns:minmax(0,1.2fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)] max-[768px]:grid-cols-1">
          <div>
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={companyName}
                width={400}
                height={192}
                className="mb-3 h-7 w-auto object-contain"
                unoptimized
              />
            ) : (
              <div className="mb-3 text-[16px] font-bold tracking-[-0.03em] text-white">
                {companyName}
              </div>
            )}
            <p className="mt-2.5 max-w-[320px] text-[12px] leading-[1.7] text-white/45">
              {t("tagline")}
            </p>
          </div>

          {contact && (
            <div>
              <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/[0.38]">
                {t("sectionContact")}
              </div>
              <div className="grid gap-2.5 text-[12px] text-white/55">
                {contact.address && <div>{contact.address}</div>}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-white/85"
                  >
                    {contact.email}
                  </a>
                )}
                {contact.phone && <div>{contact.phone}</div>}
              </div>
            </div>
          )}

          <div>
            <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/[0.38]">
              {t("sectionCompany")}
            </div>
            <ul className="grid gap-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    className="text-[12px] text-white/55 transition-colors hover:text-white/85"
                  >
                    {t(`links.${l.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Provenance note — centered */}
        <div className="flex flex-col items-center gap-1.5 border-t border-white/[0.07] pt-5 text-center">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
            {t("valuesMarkedWith")}
          </span>
          <p className="max-w-[600px] text-[11px] leading-[1.7] text-white/[0.38]">
            {t("provenance")}
          </p>
        </div>
      </div>
    </footer>
  );
}
