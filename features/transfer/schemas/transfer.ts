import { z } from "zod";

export const transferFormSchema = z.object({
  recipientId: z.string().min(1, "Please select a recipient"),
  recipientName: z.string().optional(),
  amountStr: z
    .string()
    .min(1, "Enter amount")
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(v), "Invalid amount format"),
  note: z.string().max(10, "Max 140 chars").optional().or(z.literal("")),
});

export type TransferFormValues = z.infer<typeof transferFormSchema>;
