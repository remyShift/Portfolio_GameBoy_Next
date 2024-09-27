import Image from 'next/image';

interface ImageComponentProps {
	src: string;
	alt: string;
	className: string;
}

export default function ImageComponent({ src, alt, className }: ImageComponentProps) {
	return (
		<div className="flex w-1/3 items-end justify-center">
			<Image src={src} alt={alt} className={className} width={100} height={100} />
		</div>
	);
}