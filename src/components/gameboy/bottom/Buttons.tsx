import Image from "next/image";
import LightButton from "./LightButton";
import SelectStart from "./SelectStart";
import Lights from "./Lights";

export default function Buttons() {
	return (
		<div className="w-full h-[95%] flex flex-row">
			<div className="w-[30%] h-full flex items-center justify-center">
				<Image
					src="/assets/SVG/Arrow.svg"
					alt=""
					aria-hidden="true"
					className="w-[85%] min-w-[100px] sm:w-full md:min-w-[190px] max-w-[350px] ml-12 md:ml-24 mb-24"
					width={350}
					height={350}
					priority
					style={{ height: "auto" }}
					unoptimized
				/>
			</div>
			<div className="w-[40%] h-full flex flex-col items-center space-between">
				<LightButton />
				<SelectStart />
			</div>
			<div className="w-[25%] h-full flex items-center justify-center">
				<Image
					src="/assets/SVG/AB.svg"
					alt=""
					aria-hidden="true"
					className="w-[120px] sm:w-full max-w-[350px] mr-4 mb-24"
					width={120}
					height={120}
					style={{ height: "auto" }}
					unoptimized
				/>
			</div>
			<Lights />
		</div>
	);
}
