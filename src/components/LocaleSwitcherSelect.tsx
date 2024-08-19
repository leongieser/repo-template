'use client';

import { cn } from '@/utils';
import { useParams } from 'next/navigation';
import type { ChangeEvent, ReactNode } from 'react';
import { useTransition } from 'react';
import { useRouter, usePathname } from '@i18n/navigation';
import type { Locale } from '@i18n/locales';

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: {
  children: ReactNode;
  defaultValue: string;
  label: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const parameters = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        {
          pathname,
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          params: parameters,
        },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className={cn(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
