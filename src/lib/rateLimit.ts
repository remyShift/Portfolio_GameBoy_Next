type Entry = { count: number; resetAt: number };

// Why: in-memory store is per-instance. On Vercel serverless, each cold lambda gets its own
// Map, so a determined attacker can bypass the limit by spreading requests across instances.
// Acceptable trade-off for the current traffic of a personal portfolio contact form. Move to
// Upstash Redis or @vercel/kv before opening the form to high traffic.
const store = new Map<string, Entry>();

export function checkRateLimit(
	key: string,
	limit: number,
	windowMs: number,
): { ok: boolean; retryAfterSec: number } {
	const now = Date.now();
	const entry = store.get(key);

	if (!entry || entry.resetAt <= now) {
		store.set(key, { count: 1, resetAt: now + windowMs });
		return { ok: true, retryAfterSec: 0 };
	}

	if (entry.count >= limit) {
		return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
	}

	entry.count += 1;
	return { ok: true, retryAfterSec: 0 };
}
