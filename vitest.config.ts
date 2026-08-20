import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
		// Why: .claude/worktrees/ holds checkouts of other branches inside the repo.
		// Git ignores it, vitest does not, so their tests would run against this tree.
		exclude: [...configDefaults.exclude, "**/.claude/**"],
	},
});
