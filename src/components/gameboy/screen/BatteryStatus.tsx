import { useIsValidPath } from "@/hooks/useIsValidPath";

export default function BatteryStatus() {
	const batteryStatus = useIsValidPath() ? "BATTERIE PLEINE" : "BATTERIE VIDE";

	return (
		<h1 className="text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl pr-2.5">
			{batteryStatus}
		</h1>
	);
}