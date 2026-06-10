"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");

  return (
    <div className="relative flex items-center">
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={(e) => {
          router.replace(pathname, { locale: e.target.value as AppLocale });
        }}
        className="cursor-pointer appearance-none border-none bg-transparent pl-1 pr-[18px] text-[12.5px] font-medium text-white/85 outline-none focus:text-white"
        aria-label={t("label")}
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} className="bg-bg-hero text-white">
            {compact ? l.toUpperCase() : t(l)}
          </option>
        ))}
      </select>
      {/* custom chevron — replaces the native (black) select arrow */}
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 text-white/70"
      >
        <path
          d="M3 4.75L6 7.25L9 4.75"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
