import Image from 'next/image';

export default function Stack({ stack }: { stack: string }) {
	return (
		<>
			<Image
				className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20"
				src={`/assets/img/stacks/${stack}.webp`}
				alt={stack}
				width={60}
				height={60}
			/>
		</>
	);
}