import { useTranslations } from 'next-intl';
import PageLayout from '~/components/layout/pageLayout';
import { getAllDevelopers } from '~/lib/developers';
import DevelopersClient from './DevelopersClient';

export default function DevelopersPage() {
  const t = useTranslations('developersPage');
  const developers = getAllDevelopers();

  const translations = {
    viewProfile: t('viewProfile'),
    joinedAt: t('joinedAt'),
    skillTooltip: t('skillTooltip'),
    otherSkills: t('otherSkills'),
    visit: t('visit'),
    subscribe: t('subscribe'),
  };

  return (
    <PageLayout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          {/* Enhanced Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-purple-50/80 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05),transparent_50%)]" />
          </div>

          {/* Animated floating elements */}
          <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl delay-1000" />
          <div className="absolute top-3/4 left-1/3 h-48 w-48 animate-pulse rounded-full bg-gradient-to-r from-indigo-500/15 to-blue-500/15 blur-2xl delay-500" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 text-center">
              {/* Title Section */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-2 dark:border-blue-800/50 dark:bg-blue-950/30">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('communityBadge')}</span>
                </div>

                <h1 className="text-5xl font-bold md:text-7xl lg:text-8xl">
                  <span className="gradient-text-animated bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">{t('title')}</span>
                </h1>

                <div className="space-y-4">
                  <p className="mx-auto max-w-3xl text-xl font-medium text-gray-700 md:text-2xl lg:text-3xl dark:text-gray-200">{t('subtitle')}</p>
                  <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">{t('description')}</p>
                </div>
              </div>

              {/* Features Highlight */}
              <div className="pt-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                  {[
                    {
                      icon: '🚀',
                      title: t('features.discover.title'),
                      description: t('features.discover.description'),
                      color: 'from-blue-500 to-cyan-500',
                      bgColor: 'bg-blue-50/50 dark:bg-blue-950/20',
                      borderColor: 'border-blue-200/50 dark:border-blue-800/30',
                    },
                    {
                      icon: '🤝',
                      title: t('features.connect.title'),
                      description: t('features.connect.description'),
                      color: 'from-green-500 to-emerald-500',
                      bgColor: 'bg-green-50/50 dark:bg-green-950/20',
                      borderColor: 'border-green-200/50 dark:border-green-800/30',
                    },
                    {
                      icon: '💡',
                      title: t('features.collaborate.title'),
                      description: t('features.collaborate.description'),
                      color: 'from-purple-500 to-violet-500',
                      bgColor: 'bg-purple-50/50 dark:bg-purple-950/20',
                      borderColor: 'border-purple-200/50 dark:border-purple-800/30',
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`group relative rounded-2xl p-6 ${feature.bgColor} ${feature.borderColor} border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                      <div className="space-y-4 text-center">
                        <div className="mb-4 text-4xl">{feature.icon}</div>
                        <h3 className={`bg-gradient-to-r ${feature.color} bg-clip-text text-xl font-bold text-transparent md:text-2xl`}>{feature.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{feature.description}</p>
                      </div>

                      {/* Hover glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <DevelopersClient developers={developers} translations={translations} />
      </div>
    </PageLayout>
  );
}
