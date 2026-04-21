import { EmailTemplate } from '@/components/emails/email-template';
import { Resend } from 'resend';
import { contactFormSchema } from '@/schemas/contactForm';
import { getServerEnv } from '@/lib/env';
import { checkRateLimit } from '@/lib/rateLimit';

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function getClientKey(request: Request): string {
	const forwarded = request.headers.get('x-forwarded-for');
	const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') ?? 'unknown';
	return `contact:${ip}`;
}

export async function POST(request: Request) {
	const rate = checkRateLimit(getClientKey(request), RATE_LIMIT, RATE_WINDOW_MS);
	if (!rate.ok) {
		return Response.json(
			{ error: 'Too many requests' },
			{ status: 429, headers: { 'Retry-After': String(rate.retryAfterSec) } },
		);
	}

	let rawBody: unknown;
	try {
		rawBody = await request.json();
	} catch {
		return Response.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const parsed = contactFormSchema.safeParse(rawBody);
	if (!parsed.success) {
		return Response.json(
			{ error: 'Validation failed', issues: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	if (parsed.data.company && parsed.data.company.length > 0) {
		return Response.json({ ok: true }, { status: 200 });
	}

	const { firstName, lastName, email, message } = parsed.data;

	let env;
	try {
		env = getServerEnv();
	} catch (err) {
		console.error('Env config error:', err);
		return Response.json({ error: 'Server misconfigured' }, { status: 500 });
	}

	try {
		const resend = new Resend(env.RESEND_API_KEY);
		const { data, error } = await resend.emails.send({
			from: env.FROM_EMAIL,
			to: env.TO_EMAIL,
			subject: 'Portfolio Contact',
			react: (
				<EmailTemplate
					firstName={firstName}
					lastName={lastName}
					email={email}
					message={message.split('\n')}
				/>
			),
		});

		if (error) {
			console.error('Resend error:', error);
			return Response.json({ error: 'Email sending failed' }, { status: 502 });
		}

		return Response.json(data, { status: 200 });
	} catch (err) {
		console.error('Request processing error:', err);
		return Response.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
