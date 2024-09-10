import SpacersPiv from "./SpacersPiv";
import ExtremePivLeft from "./ExtremePivLeft";
import PivLeft from "./PivLeft";
import MiddlePiv from "./MiddlePiv";
import PivRight from "./PivRight";
import ExtremePivRight from "./ExtremePivRight";

export default function Pivot() {
	return (
		<div className="w-full h-[7%] z-10 rounded-b-lg shadow-shadowPiv">
			<SpacersPiv />
			<div className="flex items-start">
				<ExtremePivLeft />
				<PivLeft />
				<MiddlePiv />
				<PivRight />
				<ExtremePivRight />
			</div>
		</div>
	);
}