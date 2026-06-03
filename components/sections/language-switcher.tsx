"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");

  return (
    <label className="flex items-center gap-2 text-[12px] text-white/55">
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={(e) => {
          router.replace(pathname, { locale: e.target.value as AppLocale });
        }}
        className="cursor-pointer border-none bg-transparent pr-1 text-[12.5px] font-medium text-white/85 outline-none focus:text-white"
        aria-label={t("label")}
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} className="bg-bg-hero text-white">
            {t(l)}
          </option>
        ))}
      </select>
    </label>
  );
}
