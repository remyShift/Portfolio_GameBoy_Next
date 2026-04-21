import { EmailTemplate } from '@/components/emails/email-template';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getResend() {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		throw new Error('RESEND_API_KEY is not configured');
	}
	return new Resend(apiKey);
}

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	if (!body || typeof body !== 'object') {
		return Response.json({ error: 'Invalid payload' }, { status: 400 });
	}

	const { firstName, lastName, email, message } = body as Record<string, unknown>;

	if (
		typeof firstName !== 'string' || !firstName.trim() ||
		typeof lastName !== 'string' || !lastName.trim() ||
		typeof email !== 'string' || !EMAIL_REGEX.test(email) ||
		typeof message !== 'string' || !message.trim()
	) {
		return Response.json({ error: 'Missing or invalid fields' }, { status: 400 });
	}

	if (firstName.length > 100 || lastName.length > 100 || email.length > 254 || message.length > 5000) {
		return Response.json({ error: 'Field too long' }, { status: 400 });
	}

	try {
		const resend = getResend();
		const { data, error } = await resend.emails.send({
			from: `${process.env.FROM_EMAIL}`,
			to: `${process.env.TO_EMAIL}`,
			subject: 'Portfolio Contact',
			react: EmailTemplate({
				firstName,
				lastName,
				email,
				message: message.split('\n'),
			}),
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
