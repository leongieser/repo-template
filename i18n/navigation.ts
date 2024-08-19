import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { locales, localePrefix } from './locales';
import { pathnames } from './config';

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
