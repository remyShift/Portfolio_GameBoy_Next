import GTop from "./G-Top/G-Top";
import Pivot from "./G-Pivot/Pivot";
import GBot from "./G-Bottom/G-Bot";

export default function GlobalTemplate({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-full overflow-y-hidden">
			<GTop>
				{children}
			</GTop>
			<Pivot />
			<GBot />
		</div>
	);
}