import "./not-found.css";

// Why: this root not-found is a rare fallback (the [locale]/not-found handles the
// localized cases). We stack both languages instead of detecting the locale to
// keep the file zero-dependency and synchronously rendered.
export default function NotFound() {
	return (
		<>
			<div className="flex flex-col justify-center items-center h-screen gap-4">
				<h1 className="animate-blink font-pressStart2P text-slate-50 text-base sm:text-lg md:text-2xl lg:text-4xl font-bold">404 - Page non trouvée</h1>
				<h2 className="font-pressStart2P text-slate-50 text-sm sm:text-base md:text-lg lg:text-2xl">404 - Page not found</h2>
			</div>
		</>
	);
}
