/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		forceSwcTransforms: true,
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(
			(rule) => rule.test?.test?.(".svg"),
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: [{ loader: "@svgr/webpack", options: { svgo: true, titleProp: true } }],
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;
		return config;
	},
};

export default nextConfig;
