import { z } from "zod";

export const transferFormSchema = z.object({
  amountStr: z
    .string()
    .min(1, "Enter amount")
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(v), "Invalid amount format"),
  note: z.string().max(140, "Max 140 chars").optional().or(z.literal("")),
});

export type TransferFormValues = z.infer<typeof transferFormSchema>;
