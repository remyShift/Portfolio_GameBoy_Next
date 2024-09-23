export default function Divider({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
	return (
		<div className="flex w-[80%] items-center rounded-full my-4 md:my-6 lg:my-10">
			<div className="flex-1 border-b border-wine"></div>
			<h1
				className={`text-black font-openSansBold text-xl md:text-2xl lg:text-3xl px-3 ${onClick ? 'rounded-full hover:bg-wine hover:text-white cursor-pointer border-2 border-wine' : ''}`}
				onClick={onClick}
			>
				{children}
			</h1>
			<div className="flex-1 border-b border-wine"></div>
		</div>
	);
}