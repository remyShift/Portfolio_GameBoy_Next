export function createClassNameSSBtn(pathname: string): { img1: string, img2: string } {
	return pathname.includes("/projects") || pathname.includes("/about") ? {
		img1: "w-[10%] max-w-[120px]",
		img2: "w-[25%] max-w-[250px] mt-4",
	} : {
		img1: "w-[25%] max-w-[120px]",
		img2: "w-[50%] max-w-[250px] sm:w-[60%] mt-4",
	};
}