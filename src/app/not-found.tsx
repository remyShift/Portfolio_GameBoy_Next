import "./not-found.css";

export default function NotFound() {
	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<h1 className="animate-blink font-pressStart2P text-slate-50 text-base sm:text-lg md:text-2xl lg:text-4xl font-bold">404 - Page non trouvée</h1>
			</div>
		</>
	);
}