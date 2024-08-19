import type { LocalePrefix } from 'next-intl/routing';

export const locales = ['en', 'de'];
export const defaultLocale = 'en';
export type Locale = (typeof locales)[number];
export const localePrefix: LocalePrefix<typeof locales> = 'always';
