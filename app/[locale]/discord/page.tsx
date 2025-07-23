import { Button } from '~/components/ui/button';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import PageLayout from '~/components/layout/pageLayout';
import { MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'discordPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function DiscordPage() {
  const t = useTranslations('discordPage');
  return (
    <PageLayout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-950/20 dark:via-transparent dark:to-purple-950/20" />

          {/* Dynamic grid background */}
          <div className="grid-background absolute inset-0" />

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl delay-1000" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left side - Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="liquid-glass-badge inline-flex items-center space-x-2 rounded-full px-4 py-2">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Discord Community</span>
                  </div>

                  <h1 className="text-4xl leading-tight font-bold md:text-6xl">
                    <span className="gradient-text-animated">{t('welcome')}</span>
                  </h1>

                  <p className="text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">{t('subtitle')}</p>
                </div>

                {/* CTA button */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button size="lg" className="group liquid-glass-button-primary" asChild>
                    <Link href="https://discord.gg/P3v4zzZtGV" target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        <span>{t('joinButton')}</span>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </span>
                    </Link>
                  </Button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">50+</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('totalMembers')}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">5+</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('onlineMembers')}</div>
                  </div>
                </div>
              </div>

              {/* Right side - Discord Widget */}
              <div className="flex justify-center lg:justify-end">
                <div className="liquid-glass-card rounded-2xl p-6 shadow-2xl">
                  <div className="overflow-hidden rounded-xl">
                    <iframe
                      src="https://discord.com/widget?id=1394941879887331348&theme=dark"
                      width="350"
                      height="500"
                      style={{ border: 'none' }}
                      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
