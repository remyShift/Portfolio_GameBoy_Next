import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import { checkRateLimit } from "@/lib/rateLimit";
import { getServerEnv } from "@/lib/env";

const sendMock = vi.fn().mockResolvedValue({ data: { id: "email-id" }, error: null });

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("@/lib/env", () => ({
  getServerEnv: vi.fn().mockReturnValue({
    RESEND_API_KEY: "re_test",
    FROM_EMAIL: "from@test.com",
    TO_EMAIL: "to@test.com",
  }),
}));

vi.mock("@/lib/rateLimit", () => ({
  checkRateLimit: vi.fn().mockReturnValue({ ok: true }),
}));

vi.mock("@/components/emails/email-template", () => ({
  EmailTemplate: () => null,
}));

const validBody = {
  firstName: "Rémy",
  lastName: "Shift",
  email: "remy@example.com",
  message: "Hello",
  company: "",
};

function makeRequest(body: unknown, ip = "127.0.0.1"): Request {
  return new Request("http://localhost/contact/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /contact/api/send", () => {
  beforeEach(() => {
    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
    vi.mocked(checkRateLimit).mockReturnValue({ ok: true });
    vi.mocked(getServerEnv).mockReturnValue({
      RESEND_API_KEY: "re_test",
      FROM_EMAIL: "from@test.com",
      TO_EMAIL: "to@test.com",
    });
  });

  it("returns 200 for a valid payload", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
  });

  it("returns 400 for invalid JSON", async () => {
    const req = new Request("http://localhost/contact/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when validation fails", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 429 and Retry-After header when rate-limited", async () => {
    vi.mocked(checkRateLimit).mockReturnValue({ ok: false, retryAfterSec: 120 });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("120");
  });

  it("returns 400 when honeypot is filled (schema rejects non-empty company)", async () => {
    const res = await POST(makeRequest({ ...validBody, company: "Spam Corp" }));
    expect(res.status).toBe(400);
  });

  it("returns 500 when env is misconfigured", async () => {
    vi.mocked(getServerEnv).mockImplementation(() => {
      throw new Error("Invalid server environment");
    });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });

  it("returns 502 when Resend reports an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "API down" } });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
  });
});
