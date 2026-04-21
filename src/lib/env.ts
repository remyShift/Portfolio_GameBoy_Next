import { z } from "zod";

const envSchema = z.object({
	RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
	FROM_EMAIL: z.string().email("FROM_EMAIL must be a valid email"),
	TO_EMAIL: z.string().email("TO_EMAIL must be a valid email"),
});

export type ServerEnv = z.infer<typeof envSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
	if (cached) return cached;
	const parsed = envSchema.safeParse({
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		FROM_EMAIL: process.env.FROM_EMAIL,
		TO_EMAIL: process.env.TO_EMAIL,
	});
	if (!parsed.success) {
		const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
		throw new Error(`Invalid server environment: ${issues}`);
	}
	cached = parsed.data;
	return cached;
}
