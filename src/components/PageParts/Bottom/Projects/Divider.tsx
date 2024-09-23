export default function Divider({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
	return (
		<div
			className={`flex w-[80%] items-center rounded-full my-4 md:my-6 lg:my-10 ${onClick ? 'hover:underline cursor-pointer' : ''}`}
			onClick={onClick}
		>
			<div className="flex-1 border-b border-wine"></div>
			<h1 className="text-black font-cabinBold text-base md:text-xl lg:text-2xl px-3">{children}</h1>
			<div className="flex-1 border-b border-wine"></div>
		</div>
	);
}