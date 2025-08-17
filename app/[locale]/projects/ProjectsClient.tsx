'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Search, ExternalLink, AlertCircle, Filter, Code, Smartphone, Monitor, Package, Wrench } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { type Project, filterProjects } from '~/lib/projects';

const categoryIcons = {
  web: Code,
  mobile: Smartphone,
  desktop: Monitor,
  library: Package,
  tool: Wrench,
  backend: Wrench,
  'open source': Code,
  开源: Code,
};

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const t = useTranslations('projectsPage');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return filterProjects(projects, searchQuery, selectedCategory, selectedStatus);
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <>
      {/* Search and Filter Section */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass-card space-y-6 rounded-2xl p-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder={t('searchPlaceholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: t('filterAll') },
                    { key: 'web', label: t('filterWeb') },
                    { key: 'mobile', label: t('filterMobile') },
                    { key: 'desktop', label: t('filterDesktop') },
                    { key: 'library', label: t('filterLibrary') },
                    { key: 'tool', label: t('filterTool') },
                    { key: 'backend', label: t('filterBackend') },
                  ].map((filter) => (
                    <Button key={filter.key} variant={selectedCategory === filter.key ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(filter.key)}>
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto max-w-md">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{t('noResults')}</h3>
                <p className="text-gray-500 dark:text-gray-400">{t('tryDifferentSearch')}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => {
                const CategoryIcon = categoryIcons[project.category[0] as keyof typeof categoryIcons] || Code;
                return (
                  <div key={project.id} className="group liquid-glass-card rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-xl dark:border-gray-800">
                    {/* Project Header */}
                    <div className="mb-4 flex items-start gap-4">
                      <div className="relative">
                        {project.cover ? (
                          <Image src={project.cover} alt={project.name} width={64} height={64} className="h-16 w-16 rounded-xl object-cover ring-2 ring-white dark:ring-gray-800" />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-2 ring-white dark:ring-gray-800">
                            <CategoryIcon className="h-8 w-8 text-blue-500" />
                          </div>
                        )}
                        <div className="absolute -top-1 -right-1">
                          <div className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}>
                            {t(`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}`)}
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xl font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                        <div className="mt-1 flex items-center gap-1">
                          <CategoryIcon className="h-3 w-3 text-blue-500" />
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{project.category.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>

                    {/* Technologies */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            title={`Built with ${tech}`}
                            className="inline-flex cursor-default items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span
                            title={`Other technologies: ${project.technologies.slice(3).join(', ')}`}
                            className="inline-flex cursor-default items-center rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-300 dark:hover:bg-gray-900/30">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {/* Primary Action */}
                      {(project.website || project.github) && (
                        <Button
                          asChild
                          className="flex w-full items-center justify-center gap-2"
                          title={`${project.website ? 'Visit website' : 'View source code'}: ${project.website || project.github}`}>
                          <Link href={project.website || project.github || '#'} target="_blank" rel="noopener noreferrer">
                            {project.website ? (
                              <>
                                <ExternalLink className="h-4 w-4" />
                                {t('visitWebsite')}
                              </>
                            ) : (
                              <>
                                <Code className="h-4 w-4" />
                                {t('viewSourceCode')}
                              </>
                            )}
                          </Link>
                        </Button>
                      )}

                      {/* Secondary Actions */}
                      <div className="flex gap-2">
                        {project.github && project.website && (
                          <Button asChild variant="outline" size="sm" className="flex flex-1 items-center justify-center gap-1.5" title={`View source code: ${project.github}`}>
                            <Link href={project.github} target="_blank" rel="noopener noreferrer">
                              <Code className="h-3.5 w-3.5" />
                              <span className="text-xs">{t('sourceCode')}</span>
                            </Link>
                          </Button>
                        )}
                        {project.download && (
                          <Button asChild variant="outline" size="sm" className="flex flex-1 items-center justify-center gap-1.5" title={`Download: ${project.download}`}>
                            <Link href={project.download} target="_blank" rel="noopener noreferrer">
                              <Package className="h-3.5 w-3.5" />
                              <span className="text-xs">{t('download')}</span>
                            </Link>
                          </Button>
                        )}
                        {!project.website && !project.github && project.download && (
                          <Button asChild className="flex w-full items-center justify-center gap-2" title={`Download: ${project.download}`}>
                            <Link href={project.download} target="_blank" rel="noopener noreferrer">
                              <Package className="h-4 w-4" />
                              {t('downloadProject')}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
