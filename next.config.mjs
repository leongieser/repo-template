import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/index.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

export default withNextIntl(nextConfig);
