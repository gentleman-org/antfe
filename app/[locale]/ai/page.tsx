import type { Metadata } from 'next';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Bot, Building2, Code2, HeartHandshake, KeyRound, Lightbulb, MessageCirclePlus, Search, Sparkles, WandSparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import PageLayout from '~/components/layout/pageLayout';
import { type AiTokenStation, getAiContent } from '~/lib/ai';
import { generateStaticParams as getI18nParams } from '~/lib/i18n/routing';

type PageParams = {
  params: Promise<{ locale: string }>;
};

type SubmitFieldKey = 'name' | 'models' | 'pricing' | 'contact' | 'notes';

const toolDecorations: Record<string, { icon: LucideIcon; gradient: string }> = {
  chatgpt: { icon: Bot, gradient: 'from-emerald-500 to-cyan-500' },
  claude: { icon: Sparkles, gradient: 'from-orange-500 to-amber-500' },
  gemini: { icon: WandSparkles, gradient: 'from-blue-500 to-indigo-500' },
  perplexity: { icon: Search, gradient: 'from-violet-500 to-fuchsia-500' },
  cursor: { icon: Code2, gradient: 'from-slate-500 to-zinc-500' },
  midjourney: { icon: Lightbulb, gradient: 'from-pink-500 to-rose-500' },
};

const tipIcons: Record<string, LucideIcon> = {
  contextFirst: Sparkles,
  structuredOutput: Code2,
  clarifyQuestion: Search,
  splitTask: WandSparkles,
  doubleCheck: KeyRound,
};

const submitFieldKeys: SubmitFieldKey[] = ['name', 'models', 'pricing', 'contact', 'notes'];

export async function generateStaticParams() {
  return getI18nParams();
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AiPage({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiPage' });
  const aiContent = await getAiContent(locale);

  const tokenGroups: Array<{
    key: 'commercial' | 'public';
    icon: LucideIcon;
    title: string;
    panelClass: string;
    badgeClass: string;
    items: AiTokenStation[];
  }> = [
    {
      key: 'public',
      icon: HeartHandshake,
      title: t('sections.tokens.public.title'),
      panelClass: 'border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-800/40 dark:bg-emerald-950/10',
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      items: aiContent.tokens.public,
    },
    {
      key: 'commercial',
      icon: Building2,
      title: t('sections.tokens.commercial.title'),
      panelClass: 'border-amber-200/60 bg-amber-50/40 dark:border-amber-800/40 dark:bg-amber-950/10',
      badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      items: aiContent.tokens.commercial,
    },
  ];

  return (
    <PageLayout>
      <div className="relative">
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 via-transparent to-blue-50/80 dark:from-cyan-950/20 dark:via-transparent dark:to-blue-950/20" />
          <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-1000" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 text-center">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold md:text-6xl">
                  <span className="gradient-text-animated">{t('title')}</span>
                </h1>
                <p className="mx-auto max-w-3xl text-xl text-gray-600 md:text-2xl dark:text-gray-300">{t('subtitle')}</p>
                <p className="mx-auto max-w-3xl text-lg text-gray-500 dark:text-gray-400">{t('description')}</p>
              </div>

              <div className="flex justify-center pt-6">
                <div className="inline-flex max-w-3xl items-start gap-2 rounded-2xl border border-cyan-200/60 bg-white/80 px-5 py-3 text-left shadow-lg backdrop-blur-sm dark:border-cyan-800/50 dark:bg-slate-900/70">
                  <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-300" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('notice')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 space-y-3 text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">{t('sections.tools.title')}</h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">{t('sections.tools.description')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {aiContent.tools.map((item) => {
                const decoration = toolDecorations[item.id] ?? {
                  icon: Sparkles,
                  gradient: 'from-cyan-500 to-blue-500',
                };
                const Icon = decoration.icon;

                return (
                  <article
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800/50 dark:bg-gray-900/60">
                    <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r p-3 text-white shadow-lg ${decoration.gradient}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="mt-2 min-h-14 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.description}</p>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200">
                      {t('sections.tools.visit')}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-blue-200/60 bg-gradient-to-br from-blue-50/60 via-white/80 to-cyan-50/60 p-8 shadow-sm dark:border-blue-800/40 dark:from-blue-950/20 dark:via-slate-900/60 dark:to-cyan-950/20">
              <div className="mb-8 space-y-3">
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">{t('sections.tips.title')}</h2>
                <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300">{t('sections.tips.description')}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {aiContent.tips.map((tip, index) => {
                  const Icon = tipIcons[tip.id] ?? Sparkles;
                  return (
                    <article key={tip.id} className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/70">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
                          </div>
                          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{tip.description}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 space-y-3 text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">{t('sections.tokens.title')}</h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">{t('sections.tokens.description')}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {tokenGroups.map((group) => {
                const GroupIcon = group.icon;

                return (
                  <article key={group.key} className={`rounded-3xl border p-6 shadow-sm ${group.panelClass}`}>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-xl bg-white/80 p-2 shadow-sm dark:bg-slate-900/70">
                        <GroupIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{group.title}</h3>
                    </div>

                    <div className="space-y-4">
                      {group.items.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/70">
                          <div className="mb-2 flex items-center justify-between gap-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${group.badgeClass}`}>{group.title}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                            <span className="font-semibold">{t('sections.tokens.linkLabel')}:</span>{' '}
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-700 underline decoration-cyan-300 underline-offset-2 transition-colors hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200">
                              {item.url}
                            </a>
                          </p>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                            <span className="font-semibold">{t('sections.tokens.supportedLabel')}:</span> {item.categories}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-gray-200/70 bg-white/80 px-5 py-4 text-sm text-gray-600 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/70 dark:text-gray-300">
              <span className="font-semibold">{t('sections.tokens.title')}:</span> {t('sections.tokens.complianceHint')}
            </div>

            <div className="mx-auto mt-6 max-w-4xl rounded-3xl border border-cyan-200/70 bg-gradient-to-r from-cyan-50/70 via-white/80 to-blue-50/70 p-6 shadow-sm dark:border-cyan-800/40 dark:from-cyan-950/20 dark:via-slate-900/70 dark:to-blue-950/20">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300">
                    <MessageCirclePlus className="h-3.5 w-3.5" />
                    <span>{t('sections.tokens.submit.badge')}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('sections.tokens.submit.title')}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t('sections.tokens.submit.description')}</p>
                </div>

                <Link
                  href="/discord"
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400">
                  {t('sections.tokens.submit.primaryCta')}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 rounded-2xl border border-white/80 bg-white/80 p-4 dark:border-slate-700/60 dark:bg-slate-900/70">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{t('sections.tokens.submit.templateTitle')}</p>
                <ul className="mt-3 grid gap-2 md:grid-cols-2">
                  {submitFieldKeys.map((field) => (
                    <li key={field} className="rounded-lg bg-slate-100/80 px-3 py-2 text-sm text-gray-700 dark:bg-slate-800/80 dark:text-gray-200">
                      {t(`sections.tokens.submit.templateFields.${field}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
