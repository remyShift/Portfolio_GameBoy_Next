import ExtremePivLeft from "./ExtremePivLeft";
import PivLeft from "./PivLeft";
import MiddlePiv from "./MiddlePiv";
import PivRight from "./PivRight";
import ExtremePivRight from "./ExtremePivRight";

export default function Pivot() {
	return (
		<div className="w-full h-[7%] sm:h-[12%] md:h-[15%] lg:h-[20%] z-10 rounded-b-lg sm:rounded-b-xl lg:rounded-b-3xl shadow-shadowsPiv md:shadow-shadowPivBigger flex items-end">
			<ExtremePivLeft />
			<PivLeft />
			<MiddlePiv />
			<PivRight />
			<ExtremePivRight />
		</div>
	);
}