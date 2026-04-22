import { getTranslations } from "next-intl/server";

export default async function WineBorderText() {
	const t = await getTranslations();
	const role = t("role");

	return (
		<div className="min-w-fit h-fit flex justify-center z-20 my-[0.2rem] md:my-[0.4rem]">
			<p className="relative font-gillSans font-bold italic text-wine z-10 text-base sm:text-xl md:text-2xl lg:text-3xl text-center">
				{role}
				<span className="absolute inset-0 z-[-1] text-stroke">
					{role}
				</span>
			</p>
		</div>
	);
}
