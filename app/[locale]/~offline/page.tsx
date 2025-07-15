// app/[locale]/~offline/page.tsx
import { useTranslations } from 'next-intl';
import PageLayout from '~/components/layout/pageLayout';

export default function OfflinePage() {
  const t = useTranslations('offline');

  return (
    <PageLayout>
      <div className="flex h-[70vh] flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-6 text-4xl font-bold">{t('title')}</h1>
        <p className="mb-8 text-xl">{t('description')}</p>
        <div className="bg-card border-border rounded-lg border p-4">
          <p className="text-muted-foreground">{t('tips')}</p>
        </div>
      </div>
    </PageLayout>
  );
}
