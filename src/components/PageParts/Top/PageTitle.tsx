type PageTitleProps = {
	children: React.ReactNode;
	className: string;
};

export default function PageTitle({ children, className }: PageTitleProps) {
	return (
		<h1 className={`font-pressStart2P text-pretty text-center shrink-0 leading-pixel px-3 sm:px-4 mb-3 sm:mb-4 md:mb-6 ${className}`}>
			{children}
		</h1>
	);
}
