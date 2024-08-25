import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rémy Cassagne - Portfolio",
	description: "Made with ❤️ by Rémy Cassagne",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body>
				{children}
			</body>
		</html>
	);
}
