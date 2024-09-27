import Image from 'next/image';

export default function Stack({ stack }: { stack: string }) {
	return (
		<>
			<Image src={`/assets/img/stacks/${stack}.webp`} alt={stack} width={60} height={60} />
		</>
	);
}