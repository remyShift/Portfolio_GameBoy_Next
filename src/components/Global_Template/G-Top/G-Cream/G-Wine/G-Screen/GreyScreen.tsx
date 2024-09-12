import GreyScreenInfo from "./GreyScreenInfo";

export default function GreyScreen({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-greyScreen h-[89%] w-[94%] sm:h-[91%] lg:h-[90%] sm:w-[95%] rounded-xl md:rounded-2x shadow-[inset_0_0_0.5rem_0.18rem_#363636]">
			{children}
			<GreyScreenInfo />
		</div>
	);
}