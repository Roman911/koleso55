import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_API_URL: process.env.SERVER_URL,
		HOSTNAME: process.env.HOSTNAME,
		HOSTNAME_TYRECLUB: process.env.HOSTNAME,
		ACCESS_ORIGIN: process.env.NEXT_PUBLIC_ACCESS_ORIGIN,
	},
	sassOptions: {
		additionalData: `$var: red;`,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'gate-opt.tyreclub.com.ua',
				pathname: '/public/img/user/**',
			},
			{
				protocol: 'https',
				hostname: 'admin.koleso55.com.ua',
				pathname: '**',
			},
		],
	},
	swcMinify: true,
	experimental: {
		optimizePackageImports: ['@heroui/react'],
	},
};

export default withNextIntl(nextConfig);
