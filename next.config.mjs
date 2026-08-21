import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Why: CSP allows 'unsafe-inline' for styles because framer-motion injects inline styles
// at runtime; vercel.live entries cover Speed Insights and the live preview toolbar.
// Why: 'unsafe-eval' is dev-only — React/Turbopack needs it in development to
// reconstruct stack traces. React never uses it in production builds.
const isDev = process.env.NODE_ENV !== 'production';
const devOnlyScriptSources = isDev ? "'unsafe-eval' " : '';

const cspDirectives = [
	"default-src 'self'",
	"img-src 'self' data: blob:",
	`script-src 'self' 'unsafe-inline' ${devOnlyScriptSources}https://vercel.live https://*.vercel-scripts.com`,
	"connect-src 'self' https://vercel.live https://*.vercel-insights.com https://*.vercel-scripts.com",
	"font-src 'self' data:",
	"style-src 'self' 'unsafe-inline'",
	"frame-ancestors 'none'",
	"base-uri 'self'",
	"form-action 'self'",
];

const securityHeaders = [
	{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
	{ key: 'Content-Security-Policy', value: cspDirectives.join('; ') },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: '/:path*',
				headers: securityHeaders,
			},
		];
	},
};

export default withNextIntl(nextConfig);
