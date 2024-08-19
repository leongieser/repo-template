import type { Pathnames } from 'next-intl/routing';

import type { locales } from './locales';

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    de: '/pfadnamen',
  },
  foo: {
    en: '/foo',
    de: '/foo',
  },
  '/foo/bar': {
    en: '/foo/bar',
    de: '/foo/bar',
  },
};
