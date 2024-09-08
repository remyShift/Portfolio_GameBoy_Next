import GTop from "./G-Top/G-Top";
import Pivot from "./G-Pivot/Pivot";

export default function GlobalTemplate({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-full overflow-hidden">
			<GTop>
				{children}
			</GTop>
			<Pivot />
		</div>
	);
}