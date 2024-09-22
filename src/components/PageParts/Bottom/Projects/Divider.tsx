export default function Divider({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex w-[80%] items-center rounded-full">
			<div className="flex-1 border-b border-wine"></div>
			<h1 className="text-black font-cabinBold text-base px-3">{children}</h1>
			<div className="flex-1 border-b border-wine"></div>
		</div>
	);
}