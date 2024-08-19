import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';

export default function IndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const t = useTranslations('IndexPage');

  return (
    <>
      <p className="max-w-[590px]">
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          ),
        })}
      </p>
    </>
  );
}
