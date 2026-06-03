import { z } from "zod";

export type RfqMessages = {
  nameRequired: string;
  emailInvalid: string;
  companyRequired: string;
  projectMin: string;
};

export function createRfqSchema(messages: RfqMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired).max(120),
    email: z.email(messages.emailInvalid).max(200),
    company: z.string().trim().min(2, messages.companyRequired).max(160),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    project: z.string().trim().min(20, messages.projectMin).max(4000),
    website: z.string().max(500).optional(),
  });
}

const FALLBACK_MESSAGES: RfqMessages = {
  nameRequired: "Name is required",
  emailInvalid: "Enter a valid email",
  companyRequired: "Company is required",
  projectMin: "Tell us a bit more about the project (20+ characters)",
};

export const rfqSchema = createRfqSchema(FALLBACK_MESSAGES);

export type RfqInput = z.infer<typeof rfqSchema>;
