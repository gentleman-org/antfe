'use client';

import { Button } from '~/components/ui/button';
import { MapPin, Github, Globe, Building2, Briefcase, Eye, Rss, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { type Developer } from '~/lib/developers';

const socialIcons = {
  github: Github,
  website: Globe,
  rss: Rss,
};

interface DevelopersClientProps {
  developers: Developer[];
  translations: {
    viewProfile: string;
    joinedAt: string;
    skillTooltip: string;
    otherSkills: string;
    visit: string;
    subscribe: string;
  };
}

export default function DevelopersClient({ developers, translations: t }: DevelopersClientProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      {/* Developers Grid */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {developers.map((developer) => (
              <div key={developer.id} className="group liquid-glass-card rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-xl dark:border-gray-800">
                {/* Developer Header */}
                <div className="mb-4 flex items-start gap-4">
                  <div className="relative">
                    <Image
                      src={developer.avatar}
                      alt={developer.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xl font-semibold text-gray-900 dark:text-white">{developer.name}</h3>
                    {developer.position && (
                      <div className="mt-1 flex items-center gap-1">
                        <Briefcase className="h-3 w-3 text-blue-500" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{developer.position}</span>
                      </div>
                    )}
                    {developer.company && (
                      <div className="mt-1 flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{developer.company}</span>
                      </div>
                    )}
                    {developer.location && (
                      <div className="mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{developer.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{developer.bio}</p>

                {/* Skills */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {developer.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        title={`${t.skillTooltip} ${skill}`}
                        className="inline-flex cursor-default items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30">
                        {skill}
                      </span>
                    ))}
                    {developer.skills.length > 3 && (
                      <span
                        title={`${t.otherSkills}: ${developer.skills.slice(3).join(', ')}`}
                        className="inline-flex cursor-default items-center rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-300 dark:hover:bg-gray-900/30">
                        +{developer.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Join Date */}
                {developer.joinedAt && (
                  <div className="mb-4 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {t.joinedAt} {formatDate(developer.joinedAt)}
                    </span>
                  </div>
                )}

                {/* Social Links and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {Object.entries(developer.links || {}).map(([platform, url]) => {
                      if (!url) return null;
                      const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                      if (!IconComponent) return null;

                      const platformNames = {
                        github: 'GitHub',
                        website: t.visit,
                      };

                      return (
                        <Button
                          key={platform}
                          asChild
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title={`${t.visit} ${platformNames[platform as keyof typeof platformNames] || platform}: ${url}`}>
                          <Link href={url} target="_blank" rel="noopener noreferrer">
                            <IconComponent className="h-4 w-4" />
                            <span className="sr-only">{platform}</span>
                          </Link>
                        </Button>
                      );
                    })}
                    {developer.rss && (
                      <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0" title={`${t.subscribe} RSS Feed: ${developer.rss}`}>
                        <Link href={developer.rss} target="_blank" rel="noopener noreferrer">
                          <Rss className="h-4 w-4" />
                          <span className="sr-only">RSS Feed</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                  <Button asChild size="sm" className="flex items-center gap-1" title={`${t.viewProfile} ${developer.name}`}>
                    <Link href={`/${developer.slug}`}>
                      <Eye className="h-3 w-3" />
                      {t.viewProfile}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
