import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

export default function Providers({
  children,
  nextIntlProps: { messages },
}: {
  children: React.ReactNode;
  nextIntlProps: {
    messages: AbstractIntlMessages;
  };
}) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
