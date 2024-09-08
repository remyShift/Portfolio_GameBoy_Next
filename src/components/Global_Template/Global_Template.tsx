import GTop from "./G-Top/G-Top";

export default function GlobalTemplate({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-[100dvw] h-[100dvh]">
			<GTop>
				{children}
			</GTop>
		</div>
	);
}