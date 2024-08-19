import { cn } from '@/utils';
import { Inter } from 'next/font/google';
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale as setRequestLocale,
} from 'next-intl/server';
import Providers from '@/providers';
import { locales } from '@i18n/locales';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <body className={cn(inter.className, 'flex h-full flex-col')}>
        <Providers nextIntlProps={{ messages }}>{children}</Providers>
      </body>
    </html>
  );
}
