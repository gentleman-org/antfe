import { getTranslations } from 'next-intl/server';
import { getProjects, getProjectStats } from '~/lib/projects';
import PageLayout from '~/components/layout/pageLayout';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('projectsPage');
  const projects = await getProjects(params.locale);
  const statistics = getProjectStats(projects);

  return (
    <PageLayout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl delay-1000" />

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
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">{statistics.totalProjects}</div>
                  <span className="text-gray-600 dark:text-gray-400">{t('statistics.totalProjects')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Client Component */}
        <ProjectsClient projects={projects} />
      </div>
    </PageLayout>
  );
}
