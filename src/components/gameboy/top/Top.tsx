import CreamFrame from "./CreamFrame";
import TopBorder from "./TopBorder";
import { ParallaxProvider } from "@/hooks/ParallaxProvider";

export default function Top({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-1/2 md:h-[92%]">
			<TopBorder />
			<ParallaxProvider>
				<CreamFrame>
					{children}
				</CreamFrame>
			</ParallaxProvider>
		</div>
	);
}