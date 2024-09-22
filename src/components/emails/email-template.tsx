interface EmailTemplateProps {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	lastName,
	email,
	message,
}) => (
	<div>
		<h1>Bonjour Rémy,</h1>
		<h2>Tu as reçu un message depuis ton Portfolio de {firstName} {lastName} ({email}) :</h2>
		<p className="bg-gray-300 p-2 rounded-md" dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br />') }}></p>
	</div>
);
