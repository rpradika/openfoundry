import { z } from "zod";

export const rfqSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.email("Enter a valid email").max(200),
  company: z.string().trim().min(2, "Company is required").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  project: z
    .string()
    .trim()
    .min(20, "Tell us a bit more about the project (20+ characters)")
    .max(4000),
  website: z.string().max(500).optional(),
});

export type RfqInput = z.infer<typeof rfqSchema>;
