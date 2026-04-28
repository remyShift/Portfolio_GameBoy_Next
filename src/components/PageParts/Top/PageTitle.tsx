type PageTitleProps = {
	children: React.ReactNode;
	className: string;
};

export default function PageTitle({ children, className }: PageTitleProps) {
	return (
		<h1 className={`font-pressStart2P text-pretty text-center shrink-0 ${className}`}>
			{children}
		</h1>
	);
}
