import { EmailTemplate } from '@/components/emails/email-template';
import { contactFormSchema } from '@/schemas/contactForm';
import { Resend } from 'resend';

function getResend() {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		throw new Error('RESEND_API_KEY is not configured');
	}
	return new Resend(apiKey);
}

export async function POST(request: Request) {
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
			{ status: 400 }
		);
	}

	const { firstName, lastName, email, message } = parsed.data;

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
