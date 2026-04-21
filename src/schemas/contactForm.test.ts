import { describe, it, expect } from "vitest";
import { contactFormSchema } from "./contactForm";

const validPayload = {
	firstName: "Rémy",
	lastName: "Shift",
	email: "remy@example.com",
	message: "Hello world",
	company: "",
};

describe("contactFormSchema", () => {
	it("accepts a valid payload", () => {
		expect(contactFormSchema.safeParse(validPayload).success).toBe(true);
	});

	it("trims string fields", () => {
		const parsed = contactFormSchema.parse({ ...validPayload, firstName: "  Rémy  " });
		expect(parsed.firstName).toBe("Rémy");
	});

	it.each([
		["firstName", ""],
		["lastName", ""],
		["message", ""],
	])("rejects empty %s", (field, value) => {
		const result = contactFormSchema.safeParse({ ...validPayload, [field]: value });
		expect(result.success).toBe(false);
	});

	it("rejects invalid email", () => {
		const result = contactFormSchema.safeParse({ ...validPayload, email: "not-an-email" });
		expect(result.success).toBe(false);
	});

	it("rejects a filled honeypot (company field)", () => {
		const result = contactFormSchema.safeParse({ ...validPayload, company: "Acme Corp" });
		expect(result.success).toBe(false);
	});

	it("rejects a firstName over 100 chars", () => {
		const result = contactFormSchema.safeParse({ ...validPayload, firstName: "a".repeat(101) });
		expect(result.success).toBe(false);
	});

	it("accepts a missing company field (honeypot optional)", () => {
		const { company, ...withoutCompany } = validPayload;
		void company;
		const result = contactFormSchema.safeParse(withoutCompany);
		expect(result.success).toBe(true);
	});
});
