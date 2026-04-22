import Image from "next/image";
import { LuUser, LuFileText, LuPhone, LuSettings, LuArrowRight } from "react-icons/lu";
import BackgroundSign from "@/components/gameboy/screen/BackgroundSign";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const ICON_CLASS = "w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8";
const LINK_CLASS = "flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline";

export default async function WelcomePage() {
	const t = await getTranslations("nav");
	const tWelcome = await getTranslations("welcome");

	return (
		<div className="flex flex-row w-full h-full">
			<h1 className="sr-only">{tWelcome("srOnly")}</h1>

			<nav className="flex flex-col justify-center items-center w-1/3 h-full relative z-1">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="/about" className={LINK_CLASS}>
							<LuUser aria-hidden="true" className={ICON_CLASS} />
							{t("about")}
						</Link>
					</li>
					<li>
						<Link href="/projects" className={LINK_CLASS}>
							<LuFileText aria-hidden="true" className={ICON_CLASS} />
							{t("projects")}
						</Link>
					</li>
					<li>
						<Link href="/contact" className={LINK_CLASS}>
							<LuPhone aria-hidden="true" className={ICON_CLASS} />
							{t("contact")}
						</Link>
					</li>
					<li>
						<Link href="/settings" className={LINK_CLASS}>
							<LuSettings aria-hidden="true" className={ICON_CLASS} />
							{t("settings")}
						</Link>
					</li>
				</ul>
			</nav>

			<BackgroundSign />

			<div className="flex flex-col justify-end items-center w-1/3 h-full relative z-1">
				<div className="flex flex-col items-center gap-1 pb-1 w-full">
					<p className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg">{tWelcome("name")}</p>
					<LuArrowRight aria-hidden="true" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rotate-90" />
					<Image src="/assets/img/MeAvatar.webp" alt="Avatar de Rémy" width={180} height={140} priority className="w-[45%] lg:w-[30%] h-auto object-contain mx-auto" />
				</div>
			</div>
		</div>
	);
}
