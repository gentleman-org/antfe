import { useLocale, useTranslations } from 'next-intl';
import { routing } from '~/lib/i18n/routing';
import LocaleSwitcherSelect from '~/components/langSelect/localeSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher');
  const locale = useLocale();

  // Create language options array
  const options = routing.locales.map((cur) => ({
    value: cur,
    label: t('locale', { locale: cur.replace('-', '') }),
  }));

  return <LocaleSwitcherSelect defaultValue={locale} label={t('label')} options={options} />;
}
