import G_Cream from "./G-Cream/G-Cream";
import TopBorder from "./G-TopBorder/TopBorder";

export default function GTop({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-1/2 md:h-[92%]">
			<TopBorder />
			<G_Cream>
				{children}
			</G_Cream>
		</div>
	);
}