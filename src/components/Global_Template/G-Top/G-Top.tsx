import G_Cream from "./G-Cream/G-Cream";
import TopBorder from "./G-TopBorder/TopBorder";

export default function GTop() {
	return (
		<div className="w-[100%] h-[45%]">
			<TopBorder />
			<G_Cream />
		</div>
	);
}