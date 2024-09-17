import GTop from "./G-Top/G-Top";
import Pivot from "./G-Pivot/Pivot";
import GBot from "./G-Bottom/G-Bot";

export default function GlobalTemplate({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-full overflow-y-hidden sm:overflow-y-visible">
			<GTop>
				{children}
			</GTop>
			<Pivot />
			<GBot />
		</div>
	);
}