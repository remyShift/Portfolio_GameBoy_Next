import G_Cream from "./G-Cream/G-Cream";
import TopBorder from "./G-TopBorder/TopBorder";

export default function GTop({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-[100%] h-[45%] md:h-[90%] sm:h-[90%]">
			<TopBorder />
			<G_Cream>
				{children}
			</G_Cream>
		</div>
	);
}