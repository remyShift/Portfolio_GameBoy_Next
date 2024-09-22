import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		console.log("Request received", request);
		const body = await request.json();
		console.log(body);
		const { data, error } = await resend.emails.send({
			from: `${process.env.FROM_EMAIL}`,
			to: `${process.env.TO_EMAIL}`,
			subject: 'Portfolio Contact',
			react: EmailTemplate({ firstName: body.firstName, lastName: body.lastName, email: body.email, message: body.message }),
		});

		if (error) {
			console.error('Error sending email:', error);
			return new Response(JSON.stringify({ error }), { status: 500 });
		}

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (err) {
		console.error('Request processing error:', err);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	}
}