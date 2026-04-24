interface EmailTemplateProps {
	firstName: string;
	lastName: string;
	email: string;
	message: string[];
	greeting: string;
	intro: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	greeting,
	intro,
	message,
}) => (
	<div>
		<h1>{greeting}</h1>
		<h2>{intro}</h2>
		{
			message.map((msg, index) => (
				<p key={index}>{msg}</p>
			))
		}
	</div>
);
