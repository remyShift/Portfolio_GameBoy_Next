export default function Stack({ stack }: { stack: string }) {
	return (
		<div>
			<img src={`/assets/img/stacks/${stack}.webp`} alt={stack} />
		</div>
	);
}