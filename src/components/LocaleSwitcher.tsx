import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { locales } from '@i18n/locales';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {locales.map((current) => (
        <option key={current} value={current}>
          {t('locale', { locale: current })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
