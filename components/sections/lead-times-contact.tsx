import { blueprint } from "@/lib/blueprint";
import { RfqForm } from "./rfq-form";

export function LeadTimesContact() {
  const leadTimes = blueprint.leadTimes ?? [];
  const contact = blueprint.contactDetails;
  const contactCta = blueprint.templateSlots?.contactCta ?? "Request a Quote";
  const contactLine = blueprint.contactLine;

  if (leadTimes.length === 0 && !contact) return null;

  return (
    <section id="contact" className="border-b border-white/[0.08] bg-bg-hero">
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-12 md:py-18">
        <div className="grid grid-cols-1 items-start gap-12 md:[grid-template-columns:minmax(0,1fr)_minmax(0,1.45fr)]">
          {leadTimes.length > 0 && (
            <div>
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-white/55">
                <span className="inline-block h-px w-7 bg-white/55" />
                Lead times &amp; capacity
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-white/10 px-0 pt-0 pb-2.5 text-left font-mono text-[9px] font-normal uppercase tracking-[0.18em] text-white/[0.38]">
                      Type
                    </th>
                    <th className="border-b border-white/10 px-0 pt-0 pb-2.5 text-right font-mono text-[9px] font-normal uppercase tracking-[0.18em] text-white/[0.38]">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leadTimes.map((lt) => (
                    <tr key={lt.type}>
                      <td className="border-b border-white/[0.07] px-0 py-3 align-middle text-[13px] font-medium text-white/[0.72]">
                        {lt.type}
                      </td>
                      <td className="border-b border-white/[0.07] px-0 py-3 text-right align-middle font-mono text-[15px] font-semibold text-white/[0.95]">
                        {lt.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {contact && (
                <div className="mt-8 grid gap-1.5 border-t border-white/[0.07] pt-6 text-[12px] text-white/[0.62]">
                  <div className="mb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    Or reach out directly
                  </div>
                  {contact.email && (
                    <div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-white/75 transition-colors hover:text-white/95"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && <div>{contact.phone}</div>}
                  {contact.address && <div className="text-white/[0.48]">{contact.address}</div>}
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-white/55">
              <span className="inline-block h-px w-7 bg-white/55" />
              Get in touch
            </div>
            <div className="mb-2 text-[clamp(22px,3vw,32px)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
              {contactCta}
            </div>
            {contactLine && (
              <p className="mb-8 max-w-[480px] text-[14px] leading-[1.6] text-white/60">
                {contactLine}
              </p>
            )}
            <RfqForm ctaLabel={contactCta} />
          </div>
        </div>
      </div>
    </section>
  );
}
