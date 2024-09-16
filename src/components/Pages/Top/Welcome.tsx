import Link from "next/link";
import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

export default function WelcomePage() {
	return (
		<div className="flex flex-row w-full h-full bg-slate-500">
			<nav className="flex flex-col justify-center items-center w-1/3 h-full bg-green-500">
				<ul>
					<li>
						<Link href="/about" className="font-pressStart2P">About</Link>
					</li>
					<li>
						<Link href="/projects">Projects</Link>
					</li>
					<li>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</nav>
			<BackgroundSign />
			<div className="flex flex-col justify-end items-center w-1/3 h-full bg-red-400">
				<img src="/assets/img/MeAvatar.png" alt="Me as avatar" className="w-[45%] h-[40%] bg-blue-500" />
			</div>
		</div>
	);
}