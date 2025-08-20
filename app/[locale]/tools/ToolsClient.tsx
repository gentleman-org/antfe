'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Search, ExternalLink, AlertCircle, Filter, Wrench, Code, Calculator, Palette, FileText, Lock } from 'lucide-react';
import { Link } from '~/lib/i18n/navigation';
import { Tool, filterTools } from '~/lib/tools';

const categoryIcons = {
  tool: Wrench,
  code: Code,
  calculator: Calculator,
  design: Palette,
  text: FileText,
  security: Lock,
  encoder: Code,
  converter: Calculator,
};

interface ToolsClientProps {
  tools: Tool[];
}

export default function ToolsClient({ tools }: ToolsClientProps) {
  const t = useTranslations('toolsPage');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus] = useState<string>('all');

  const filteredTools = useMemo(() => {
    return filterTools(tools, searchQuery, selectedCategory, selectedStatus);
  }, [tools, searchQuery, selectedCategory, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'deprecated':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const categories = useMemo(() => {
    const allCategories = tools.flatMap((tool) => tool.category || ['tool']);
    return Array.from(new Set(allCategories));
  }, [tools]);

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
                  <Button key="all" variant={selectedCategory === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory('all')}>
                    {t('filterAll')}
                  </Button>
                  {categories.map((category) => (
                    <Button key={category} variant={selectedCategory === category ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(category)}>
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredTools.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto max-w-md">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{t('noResults')}</h3>
                <p className="text-gray-500 dark:text-gray-400">{t('tryDifferentSearch')}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool, index) => {
                const CategoryIcon = categoryIcons[tool.category?.[0] as keyof typeof categoryIcons] || Wrench;
                return (
                  <div
                    key={`${tool.name}-${index}`}
                    className="group liquid-glass-card rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-xl dark:border-gray-800">
                    {/* Tool Header */}
                    <div className="mb-4 flex items-start gap-4">
                      <div className="relative">
                        {tool.icon ? (
                          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 ring-2 ring-white dark:ring-gray-800">
                            <span className="text-2xl">{tool.icon}</span>
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 ring-2 ring-white dark:ring-gray-800">
                            <CategoryIcon className="h-8 w-8 text-green-500" />
                          </div>
                        )}
                        <div className="absolute -top-1 -right-1">
                          <div className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(tool.status || 'active')}`}>
                            {tool.status || 'active'}
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xl font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                        {tool.category && (
                          <div className="mt-1 flex items-center gap-1">
                            <CategoryIcon className="h-3 w-3 text-green-500" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">{tool.category.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{tool.description}</p>

                    {/* Action Button */}
                    <div className="space-y-3">
                      <Button asChild className="flex w-full items-center justify-center gap-2" title={`Open tool: ${tool.name}`}>
                        {tool.url.startsWith('http') ? (
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            {t('openTool')}
                          </a>
                        ) : (
                          <Link href={tool.url}>
                            <ExternalLink className="h-4 w-4" />
                            {t('openTool')}
                          </Link>
                        )}
                      </Button>
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
