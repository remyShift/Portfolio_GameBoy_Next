import Image from "next/image";

export default function Arrow_Btn() {
	return (
		<div className="w-[30%] h-full flex items-center justify-center">
			<Image src="/assets/SVG/Arrow.svg" alt="Arrow Button" className="w-[85%] min-w-[100px] sm:w-full md:min-w-[190px] max-w-[350px] ml-12 md:ml-24 mb-24" width={350} height={350} />
		</div>
	);
}