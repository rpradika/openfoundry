import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
  inverse?: boolean;
  align?: "left" | "center";
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  inverse = false,
  align = "left",
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
      )}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em]",
          align === "center" && "justify-center",
          inverse ? "text-white/60" : "text-brand",
        )}
      >
        <span
          className={cn(
            "inline-block h-px w-7",
            inverse ? "bg-white/40" : "bg-brand",
          )}
        />
        {eyebrow}
      </div>

      <h2
        className={cn(
          "mb-3 text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.05] tracking-[-0.045em]",
          inverse ? "text-white" : "text-text-primary",
          align === "left" ? "max-w-[680px]" : "mx-auto max-w-[680px]",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {intro && (
        <p
          className={cn(
            "text-[15px] leading-[1.65]",
            inverse ? "text-white/70" : "text-text-secondary",
            align === "left" ? "max-w-[600px]" : "mx-auto max-w-[600px]",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
