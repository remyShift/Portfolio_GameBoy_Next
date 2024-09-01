import Noise from "./NoiseGreyScreen";

export default function GreyScreen() {
	return (
		<div className="height-[85%] w-[90%] z-3 bg-greyscreen flex space-between flex-col rounded-[1.563rem] shadow-[inset_0_0_1.563rem_0.313rem_#363636]">
			<Noise />
		</div>
	);
}