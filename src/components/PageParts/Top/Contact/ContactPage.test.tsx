import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ContactPage from "./ContactPage";

const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("sonner", () => ({
	toast: {
		success: (...args: unknown[]) => toastSuccess(...args),
		error: (...args: unknown[]) => toastError(...args),
	},
}));

vi.mock("next-intl", () => ({
	useTranslations: () => (key: string) => key,
	useLocale: () => "fr",
}));

vi.mock("@/components/gameboy/screen/BackgroundSign", () => ({
	default: () => <div />,
}));

function fillValidForm(container: HTMLElement) {
	fireEvent.input(container.querySelector("#lastName") as HTMLInputElement, { target: { value: "Doe" } });
	fireEvent.input(container.querySelector("#firstName") as HTMLInputElement, { target: { value: "John" } });
	fireEvent.input(container.querySelector("#email") as HTMLInputElement, { target: { value: "john@example.com" } });
	fireEvent.input(container.querySelector("#message") as HTMLTextAreaElement, { target: { value: "Hello there" } });
}

describe("ContactPage form", () => {
	beforeEach(() => {
		toastSuccess.mockClear();
		toastError.mockClear();
		global.fetch = vi.fn();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("submits valid form, posts to /api/contact/send with locale, and shows success toast", async () => {
		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: true });
		const { container } = render(<ContactPage />);

		fillValidForm(container);

		const form = container.querySelector("form") as HTMLFormElement;
		fireEvent.submit(form);

		await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

		const [url, init] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
		expect(url).toBe("/api/contact/send");
		expect(init.method).toBe("POST");
		const body = JSON.parse(init.body);
		expect(body).toMatchObject({
			lastName: "Doe",
			firstName: "John",
			email: "john@example.com",
			message: "Hello there",
			locale: "fr",
		});

		await waitFor(() => expect(toastSuccess).toHaveBeenCalled());
		expect(toastError).not.toHaveBeenCalled();
	});

	it("shows error toast when API returns non-ok", async () => {
		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: false });
		const { container } = render(<ContactPage />);

		fillValidForm(container);
		fireEvent.submit(container.querySelector("form") as HTMLFormElement);

		await waitFor(() => expect(toastError).toHaveBeenCalled());
		expect(toastSuccess).not.toHaveBeenCalled();
	});

	it("shows error toast when fetch rejects", async () => {
		(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("network"));
		const { container } = render(<ContactPage />);

		fillValidForm(container);
		fireEvent.submit(container.querySelector("form") as HTMLFormElement);

		await waitFor(() => expect(toastError).toHaveBeenCalled());
	});

	it("disables submit button while invalid", () => {
		const { container } = render(<ContactPage />);
		const button = container.querySelector("button[type='submit']") as HTMLButtonElement;
		expect(button.disabled).toBe(true);
	});

	it("enables submit button once form is valid", async () => {
		const { container } = render(<ContactPage />);
		fillValidForm(container);
		const button = container.querySelector("button[type='submit']") as HTMLButtonElement;
		await waitFor(() => expect(button.disabled).toBe(false));
	});
});
