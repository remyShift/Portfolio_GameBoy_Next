import Image from 'next/image';

export default function Stack({ stack }: { stack: string }) {
	return (
		<div className="bg-contain bg-center bg-no-repeat w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" 
			style={{
				backgroundImage: `url(/assets/img/stacks/${stack}.webp)` 
			}}>
		</div>
	);
}