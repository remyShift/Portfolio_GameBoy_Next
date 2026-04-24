import { z } from "zod";

export const contactFormSchema = z.object({
	firstName: z.string().trim().min(1, "Prénom requis").max(100),
	lastName: z.string().trim().min(1, "Nom requis").max(100),
	email: z.string().trim().email("Email invalide").max(254),
	message: z.string().trim().min(1, "Message requis").max(5000),
	company: z.string().max(0).optional().or(z.literal("")),
	locale: z.enum(["fr", "en"]).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
