import ExtremePivotLeft from "./ExtremePivotLeft";
import PivotLeft from "./PivotLeft";
import MiddlePivot from "./MiddlePivot";
import PivotRight from "./PivotRight";
import ExtremePivotRight from "./ExtremePivotRight";

export default function Pivot() {
	return (
		<div className="w-full h-[9%] md:h-[12%] md:h-[15%] lg:h-[20%] rounded-b-lg sm:rounded-b-xl md:rounded-b-3xl shadow-shadowsPiv md:shadow-shadowPivBigger flex items-end">
			<ExtremePivotLeft />
			<PivotLeft />
			<MiddlePivot />
			<PivotRight />
			<ExtremePivotRight />
		</div>
	);
}
