import { Button } from '~/components/ui/button';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import PageLayout from '~/components/layout/pageLayout';
import { ArrowRight, Sparkles, Globe, Rocket, Brain, Layers, Github, Star } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'homePage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Home() {
  const t = useTranslations('homePage');

  const features = [
    {
      icon: Brain,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Layers,
      title: t('features.modern.title'),
      description: t('features.modern.description'),
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: t('features.i18n.title'),
      description: t('features.i18n.description'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: t('features.performance.title'),
      description: t('features.performance.description'),
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <PageLayout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />

          {/* Dynamic grid background */}
          <div className="grid-background absolute inset-0" />

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl delay-1000" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Title area */}
              <div className="space-y-6">
                <div className="liquid-glass-badge inline-flex items-center space-x-2 rounded-full px-4 py-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('openSource')}</span>
                </div>

                <h1 className="text-5xl leading-tight font-bold md:text-7xl">
                  <span className="gradient-text-animated">{t('title')}</span>
                </h1>

                <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">{t('subtitle')}</p>

                <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">{t('description')}</p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="group liquid-glass-button-primary" asChild>
                  <Link href="https://dc.antfe.com">
                    <span className="flex items-center space-x-2">
                      <span>{t('getStarted')}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="group liquid-glass-button-secondary" asChild>
                  <Link href="https://github.com/gentleman-org/antfe" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center space-x-2">
                      <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      <span>{t('learnMore')}</span>
                      <Star className="h-3 w-3 opacity-60" />
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-8 pt-16 md:grid-cols-4">
                {[
                  { number: '100+', label: t('statistics.activeDevelopers') },
                  { number: '50+', label: t('statistics.techArticles') },
                  { number: '30+', label: t('statistics.openSourceProjects') },
                  { number: '24/7', label: t('statistics.communityActivities') },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">{stat.number}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 space-y-6 text-center">
              <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-white dark:to-gray-300">
                {t('features.whyChoose')}
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">{t('features.whyChooseDescription')}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="group liquid-glass-card float-animation relative rounded-2xl p-6" style={{ animationDelay: `${index * 0.2}s` }}>
                  {/* Background gradient */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />

                  <div className="relative space-y-4">
                    {/* Icon */}
                    <div className={`inline-flex rounded-xl bg-gradient-to-br p-3 ${feature.gradient} liquid-glow shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="leading-relaxed text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="liquid-glass-card space-y-8 rounded-3xl p-12">
              <div className="space-y-4">
                <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-white dark:to-gray-300">
                  {t('cta.readyToJoin')}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">{t('cta.joinDescription')}</p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="group liquid-glass-button-primary" asChild>
                  <Link href="https://dc.antfe.com">
                    <span className="flex items-center space-x-2">
                      <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      <span>{t('cta.joinCommunity')}</span>
                    </span>
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="group liquid-glass-button-secondary" asChild>
                  <Link href="https://github.com/gentleman-org/antfe" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center space-x-2">
                      <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      <span>{t('cta.openSourceProject')}</span>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
