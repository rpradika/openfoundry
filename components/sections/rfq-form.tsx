"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createRfqSchema, type RfqInput } from "@/lib/rfq-schema";

type Status = "idle" | "submitting" | "success" | "error";

const labelClass =
  "mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55";
const inputClass =
  "w-full rounded-none border border-white/[0.12] bg-white/[0.04] px-3.5 py-3 text-[13px] text-white placeholder:text-white/30 focus:border-white/35 focus:outline-none focus:ring-1 focus:ring-white/35";
const errorClass = "mt-1.5 text-[11px] text-[color-mix(in_srgb,var(--color-brand)_70%,white_30%)]";

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
      <div className="rounded-none border border-white/[0.12] bg-white/[0.04] px-5 py-6">
        <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
          {t("receivedHeading")}
        </div>
        <p className="text-[14px] text-white/85">{t("receivedBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="rfq-name" className={labelClass}>
            {t("label.name")}
          </label>
          <input id="rfq-name" type="text" autoComplete="name" className={inputClass} {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="rfq-company" className={labelClass}>
            {t("label.company")}
          </label>
          <input
            id="rfq-company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            {...register("company")}
          />
          {errors.company && <p className={errorClass}>{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="rfq-email" className={labelClass}>
            {t("label.email")}
          </label>
          <input
            id="rfq-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="rfq-phone" className={labelClass}>
            {t("label.phone")}{" "}
            <span className="text-white/30 normal-case tracking-normal">
              {t("label.phoneOptional")}
            </span>
          </label>
          <input
            id="rfq-phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="rfq-project" className={labelClass}>
          {t("label.project")}
        </label>
        <textarea
          id="rfq-project"
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder={t("projectPlaceholder")}
          {...register("project")}
        />
        {errors.project && <p className={errorClass}>{errors.project.message}</p>}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 bg-brand px-7 py-3.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-[0.88] disabled:opacity-60"
        >
          {status === "submitting" ? t("sending") : (ctaLabel ?? t("ctaSend"))}
        </button>
        {serverError && (
          <span className={errorClass} role="alert">
            {serverError}
          </span>
        )}
      </div>
    </form>
  );
}
