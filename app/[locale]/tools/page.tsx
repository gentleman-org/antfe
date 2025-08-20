import { getTranslations } from 'next-intl/server';
import { getTools, getToolStats } from '~/lib/tools';
import PageLayout from '~/components/layout/pageLayout';
import ToolsClient from './ToolsClient';
import { generateStaticParams as getI18nParams } from '~/lib/i18n/routing';

export async function generateStaticParams() {
  return getI18nParams();
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('toolsPage');
  const tools = await getTools(locale);
  const statistics = getToolStats(tools);

  return (
    <PageLayout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-blue-50/50 dark:from-green-950/20 dark:via-transparent dark:to-blue-950/20" />

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-green-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-1000" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 text-center">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold md:text-6xl">
                  <span className="gradient-text-animated">{t('title')}</span>
                </h1>
                <p className="mx-auto max-w-3xl text-xl text-gray-600 md:text-2xl dark:text-gray-300">{t('subtitle')}</p>
                <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">{t('description')}</p>
              </div>

              {/* Statistics */}
              <div className="flex justify-center pt-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">{statistics.totalTools}</div>
                  <span className="text-gray-600 dark:text-gray-400">{t('statistics.totalTools')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Client Component */}
        <ToolsClient tools={tools} />
      </div>
    </PageLayout>
  );
}
