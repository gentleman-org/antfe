import { notFound } from 'next/navigation';
import { Calendar, MapPin, Code, User, Github, Twitter, Linkedin, Globe, ArrowLeft, ExternalLink, Building2, Briefcase, Rss } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getDeveloperByUsername, generateDeveloperMetadata } from '~/lib/developers';
import { Button } from '~/components/ui/button';

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  website: Globe,
  rss: Rss,
};

const experienceColors = {
  junior: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  mid: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  senior: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  lead: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

const experienceLevels = {
  junior: 'Junior Developer',
  mid: 'Mid-level Developer',
  senior: 'Senior Developer',
  lead: 'Lead Developer',
};

export async function generateMetadata(): Promise<Metadata> {
  const developer = getDeveloperByUsername('vadxq');

  if (!developer) {
    return {
      title: 'Developer Not Found - AntFE',
      description: 'The requested developer profile could not be found.',
    };
  }

  return generateDeveloperMetadata(developer, 'vadxq');
}

export default function VadxqPage() {
  const developer = getDeveloperByUsername('vadxq');

  if (!developer) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="relative min-h-screen">
      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/developers" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Developers
          </Link>
        </Button>
      </div>

      {/* Profile Header */}
      <section className="relative overflow-hidden py-12">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass-card rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Left Column - Avatar and Basic Info */}
              <div className="space-y-6 text-center">
                <div className="relative inline-block">
                  <Image
                    src={developer.avatar}
                    alt={developer.name}
                    width={200}
                    height={200}
                    className="mx-auto h-48 w-48 rounded-full object-cover shadow-xl ring-4 ring-white md:h-52 md:w-52 dark:ring-gray-800"
                  />
                  {developer.experience && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <div className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${experienceColors[developer.experience]}`}>
                        {experienceLevels[developer.experience]}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{developer.name}</h1>
                  {(developer.position || developer.title) && (
                    <div className="flex items-center justify-center gap-2">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                      <p className="text-xl font-medium text-blue-600 dark:text-blue-400">{developer.position || developer.title}</p>
                    </div>
                  )}
                  {developer.company && (
                    <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">{developer.company}</span>
                    </div>
                  )}
                  {developer.location && (
                    <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{developer.location}</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {Object.entries(developer.links || {}).map(([platform, url]) => {
                    if (!url) return null;
                    const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                    if (!IconComponent) return null;
                    return (
                      <Button key={platform} asChild variant="outline" size="lg" className="h-12 w-12 p-0">
                        <Link href={url} target="_blank" rel="noopener noreferrer">
                          <IconComponent className="h-5 w-5" />
                          <span className="sr-only">{platform}</span>
                        </Link>
                      </Button>
                    );
                  })}
                  {developer.rss && (
                    <Button asChild variant="outline" size="lg" className="h-12 w-12 p-0">
                      <Link href={developer.rss} target="_blank" rel="noopener noreferrer">
                        <Rss className="h-5 w-5" />
                        <span className="sr-only">RSS Feed</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-8 md:col-span-2">
                {/* Bio */}
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">About</h2>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">{developer.bio}</p>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Skills</h2>
                  <div className="flex flex-wrap gap-3">
                    {developer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats and Join Date */}
                <div className="space-y-6">
                  {/* Stats - Only show if available */}
                  {(developer.projects || developer.contributions) && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {developer.projects && (
                        <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800/50">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{developer.projects}</div>
                          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Projects</div>
                        </div>
                      )}
                      {developer.contributions && (
                        <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800/50">
                          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{developer.contributions}</div>
                          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Contributions</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Join Date */}
                  {developer.joinedAt && (
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3 dark:from-blue-950/20 dark:to-purple-950/20">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Joined {formatDate(developer.joinedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Recent Projects Card */}
            <div className="liquid-glass-card rounded-2xl p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Code className="h-5 w-5" />
                Recent Projects
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Projects will be displayed here soon...</p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="liquid-glass-card rounded-2xl p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <User className="h-5 w-5" />
                Get in Touch
              </h3>
              <div className="space-y-3">
                {developer.links?.github && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href={developer.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub Profile
                      <ExternalLink className="ml-auto h-3 w-3" />
                    </Link>
                  </Button>
                )}
                {developer.links?.website && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href={developer.links.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Personal Website
                      <ExternalLink className="ml-auto h-3 w-3" />
                    </Link>
                  </Button>
                )}
                {developer.rss && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href={developer.rss} target="_blank" rel="noopener noreferrer">
                      <Rss className="mr-2 h-4 w-4" />
                      RSS Feed
                      <ExternalLink className="ml-auto h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
