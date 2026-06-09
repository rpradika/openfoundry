"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createRfqSchema, type RfqInput } from "@/lib/rfq-schema";

type Status = "idle" | "submitting" | "success" | "error";

const labelClass = "mb-1.5 block text-[11px] font-semibold tracking-[-0.005em] text-text-primary";
const inputClass =
  "w-full rounded-[15px] border border-border-soft bg-[color-mix(in_srgb,var(--color-bg-page)_92%,white_8%)] px-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-muted focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15";
const errorClass = "mt-1.5 text-[11px] text-brand";

export function RfqForm({ ctaLabel }: { ctaLabel?: string }) {
  const t = useTranslations("rfq");
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      createRfqSchema({
        nameRequired: t("errors.nameRequired"),
        emailInvalid: t("errors.emailInvalid"),
        companyRequired: t("errors.companyRequired"),
        projectMin: t("errors.projectMin"),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RfqInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", phone: "", project: "", website: "" },
  });

  async function onSubmit(values: RfqInput) {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setServerError(data?.error ?? t("errors.sendFailed"));
        setStatus("error");
        return;
      }
      reset();
      setStatus("success");
    } catch {
      setServerError(t("errors.networkError"));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[16px] border border-border-soft bg-[color-mix(in_srgb,var(--color-bg-page)_95%,white_5%)] px-5 py-6">
        <div className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
          {t("receivedHeading")}
        </div>
        <p className="text-[14px] text-text-secondary">{t("receivedBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="mb-3.5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="rfq-company" className={labelClass}>
            {t("label.company")}
          </label>
          <input
            id="rfq-company"
            type="text"
            autoComplete="organization"
            placeholder={t("placeholder.company")}
            className={inputClass}
            {...register("company")}
          />
          {errors.company && <p className={errorClass}>{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="rfq-name" className={labelClass}>
            {t("label.name")}
          </label>
          <input
            id="rfq-name"
            type="text"
            autoComplete="name"
            placeholder={t("placeholder.name")}
            className={inputClass}
            {...register("name")}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="rfq-email" className={labelClass}>
            {t("label.email")}
          </label>
          <input
            id="rfq-email"
            type="email"
            autoComplete="email"
            placeholder={t("placeholder.email")}
            className={inputClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="rfq-phone" className={labelClass}>
            {t("label.phone")}
          </label>
          <input
            id="rfq-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("placeholder.phone")}
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="rfq-project" className={labelClass}>
          {t("label.project")}
        </label>
        <textarea
          id="rfq-project"
          rows={3}
          className={`${inputClass} resize-y`}
          placeholder={t("projectPlaceholder")}
          {...register("project")}
        />
        {errors.project && <p className={errorClass}>{errors.project.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group w-full rounded-[16px] bg-bg-hero px-6 py-4 text-center text-[15.5px] font-semibold text-white shadow-[0_18px_38px_rgba(15,23,42,0.18)] transition-transform duration-200 ease-out hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        <span className="inline-flex items-center justify-center gap-2">
          {status === "submitting" ? t("sending") : (ctaLabel ?? t("ctaSend"))}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </button>
      {serverError && (
        <p className={errorClass} role="alert">
          {serverError}
        </p>
      )}
    </form>
  );
}
