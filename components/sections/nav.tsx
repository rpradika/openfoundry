import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getBlueprint } from "@/lib/blueprint";
import { LanguageSwitcher } from "./language-switcher";

const NAV_ITEMS = [
  { key: "whatWeDo", href: "#about" },
  { key: "capabilities", href: "#capabilities" },
  { key: "services", href: "#programme-delivery" },
  { key: "contact", href: "#contact" },
] as const;

function ChevronDown() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="opacity-60"
    >
      <path
        d="M3 4.75L6 7.25L9 4.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav() {
  const t = useTranslations("nav");
  const blueprint = getBlueprint(useLocale());
  const { logoUrl } = blueprint.brand;
  const companyName = blueprint.company.name;

  return (
    <nav className="sticky top-0 z-[100] flex h-16 items-center justify-between gap-6 border-b border-white/[0.08] bg-bg-hero px-5 md:px-10">
      <a
        href="#"
        className="flex flex-shrink-0 items-center gap-2.5"
        aria-label={`${companyName} home`}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={companyName}
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        ) : (
          <span className="text-[15px] font-bold tracking-[-0.03em] text-white">
            {companyName}
          </span>
        )}
      </a>

      <ul className="hidden items-center gap-8 md:flex">
        {NAV_ITEMS.map(({ key, href }) => (
          <li key={key}>
            <a
              href={href}
              className="flex items-center gap-[5px] text-[13px] font-medium text-white transition-opacity hover:opacity-[0.78]"
            >
              {t(`links.${key}`)}
              <ChevronDown />
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <a
          href="#contact"
          className="whitespace-nowrap rounded-full bg-brand px-4.5 py-2 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-[0.88]"
        >
          {t("getInTouch")}
        </a>
      </div>
    </nav>
  );
}
