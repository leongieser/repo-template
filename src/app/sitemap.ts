import type { MetadataRoute } from 'next';
import { getPathname } from '@i18n/navigation';
import { pathnames } from '@i18n/config';
import { locales, defaultLocale } from '@i18n/locales';
import { host } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(pathnames) as Array<keyof typeof pathnames>;

  function getUrl(
    key: keyof typeof pathnames,
    locale: (typeof locales)[number]
  ) {
    const pathname = getPathname({ locale, href: key });
    return `${host}/${locale}${pathname === '/' ? '' : pathname}`;
  }

  return keys.map((key) => ({
    url: getUrl(key, defaultLocale),
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.5,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(key, locale)])
      ),
    },
    images: ['https://example.com/image.jpg'],
  }));
}
