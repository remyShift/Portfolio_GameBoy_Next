export default function Stack({ stack }: { stack: string }) {
	return (
		<div>
			<img src={`/assets/img/stacks/${stack}.png`} alt={stack} />
		</div>
	);
}