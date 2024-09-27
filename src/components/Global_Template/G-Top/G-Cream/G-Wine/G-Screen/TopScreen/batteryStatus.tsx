import { usePathname } from "next/navigation";
import { useValidPaths } from "@/context/store";

export default function BatteryStatus() {
	const { validPaths } = useValidPaths();
	const pathname = usePathname();

	const batteryStatus = validPaths.includes(pathname) ? "BATTERIE PLEINE" : "BATTERIE VIDE";

	return (
		<h1 className="text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl pr-2.5">
			{batteryStatus}
		</h1>
	);
}