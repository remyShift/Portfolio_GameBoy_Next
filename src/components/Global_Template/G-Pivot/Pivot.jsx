import SpacersPiv from "./SpacersPiv";
import ExtremePivLeft from "./ExtremePivLeft";
import PivLeft from "./PivLeft";
import MiddlePiv from "./MiddlePiv";
import PivRight from "./PivRight";
import ExtremePivRight from "./ExtremePivRight";

export default function Pivot() {
	return (
		<div className="w-full h-1/5">
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