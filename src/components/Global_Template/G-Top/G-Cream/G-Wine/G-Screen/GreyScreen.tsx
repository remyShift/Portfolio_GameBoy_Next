import GreyScreenInfo from "./GreyScreenInfo";

export default function GreyScreen({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-greyScreen h-[89%] w-[94%] sm:w-[95%] rounded-xl lg:rounded-2xl shadow-[inset_0_0_0.5rem_0.18rem_#363636]">
			{children}
			<GreyScreenInfo />
		</div>
	);
}