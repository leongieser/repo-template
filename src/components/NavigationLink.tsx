'use client';

import { cn } from '@/utils';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ComponentProps } from 'react';

import { Link } from '@i18n/navigation';
import type { pathnames } from '@i18n/config';

export default function NavigationLink<
  Pathname extends keyof typeof pathnames,
>({ href, ...rest }: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-block px-2 py-3 transition-colors',
        isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      )}
      href={href}
      {...rest}
    />
  );
}
