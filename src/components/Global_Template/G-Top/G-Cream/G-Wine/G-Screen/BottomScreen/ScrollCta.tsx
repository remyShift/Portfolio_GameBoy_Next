import Image from 'next/image';
import  "./ScrollCta.css";

export default function ScrollCTA() {
	return (
		<div className="flex flex-col items-center justify-center w-1/3">
			<h1 className="font-pressStart2P text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm">SCROLL</h1>
			<Image src="/assets/icons/Pointer_Down.webp" alt="Arrow" className={`w-3 h-2 sm:w-4 sm:h-3 lg:w-6 lg:h-5 mb-2 bounce`} width={24} height={16} />
		</div>
	);
}