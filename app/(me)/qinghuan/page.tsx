'use client';
import { useEffect, useState } from 'react';
import { FileText, Github, Loader2, AlertCircle, ExternalLink, Code, Tag } from 'lucide-react';

interface BlogItem {
  repo: string;
  success: boolean;
  content?: string;
  base64?: string;
  url?: string;
  error?: string;
}

interface BlogData {
  success: boolean;
  data: BlogItem[];
  summary?: {
    total: number;
    successful: number;
    failed: number;
  };
}

export default function QinghuanBlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/github/qinghuan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repos: ['rag-server', 'novel-server'],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BlogData = await response.json();

      if (data.success && data.data) {
        setBlogs(data.data.filter((blog) => blog.success));
      } else {
        setError('Failed to load blogs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogClick = (blog: BlogItem) => {
    if (blog.url) {
      window.open(blog.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-indigo-600 dark:text-indigo-400" />
              <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full bg-indigo-400/20" />
            </div>
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading amazing content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl">
            <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-8 shadow-xl dark:border-red-900/50 dark:from-red-950/20 dark:to-orange-950/20">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-400/10 blur-3xl" />
              <div className="relative flex flex-col items-center space-y-4">
                <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
                  <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-red-100">Oops! Something went wrong</h2>
                <p className="text-center text-red-700 dark:text-red-300">{error}</p>
                <button
                  onClick={fetchBlogs}
                  className="mt-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Animated Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-400/10 blur-3xl dark:from-indigo-600/5 dark:to-purple-600/5" />
        <div className="absolute -bottom-1/2 -left-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-400/10 blur-3xl dark:from-purple-600/5 dark:to-pink-600/5" />
      </div>

      {/* Hero Section */}
      <div className="relative border-b border-slate-200/50 bg-white/50 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-5xl">
            {/* Profile Section */}
            <div className="mb-12 flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50 blur-xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl font-bold text-white shadow-2xl ring-4 ring-white dark:ring-slate-900">
                  Q
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl dark:from-indigo-400 dark:to-purple-400">
                  Qinghuan&apos;s Blog
                </h1>
                <p className="mb-6 text-xl text-slate-600 md:text-2xl dark:text-slate-400">Building the future, one commit at a time 🚀</p>
                <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  <a
                    href="https://github.com/Asaki-M"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:from-slate-100 dark:to-slate-300 dark:text-slate-900">
                    <Github className="h-5 w-5" />
                    <span>Follow @Asaki-M</span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <div className="flex items-center gap-3 rounded-full bg-white/80 px-6 py-3 shadow-md backdrop-blur-sm dark:bg-slate-800/80">
                    <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{blogs.length} Articles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">Latest Articles</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Explore my thoughts on technology, coding, and more</p>
          </div>

          {blogs.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-16 text-center shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20" />
              <div className="relative">
                <div className="mb-6 inline-flex rounded-full bg-indigo-100 p-6 dark:bg-indigo-900/30">
                  <FileText className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">No articles yet</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400">New content coming soon! Stay tuned 📝</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {blogs.map((blog, index) => (
                <article
                  key={blog.repo}
                  onClick={() => handleBlogClick(blog)}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                  }}>
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 transition-all group-hover:from-indigo-500/5 group-hover:to-purple-500/5" />

                  {/* Corner Accent */}
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-2xl transition-all group-hover:scale-150" />

                  <div className="relative">
                    {/* Header */}
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-3 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                          <Code className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
                            {blog.repo}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                            <Tag className="h-4 w-4" />
                            <span>Repository</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full bg-indigo-100 p-2 transition-all group-hover:bg-indigo-200 dark:bg-indigo-900/30 dark:group-hover:bg-indigo-800/50">
                        <ExternalLink className="h-5 w-5 text-indigo-600 transition-transform group-hover:scale-110 group-hover:rotate-12 dark:text-indigo-400" />
                      </div>
                    </div>

                    {/* Content Preview */}
                    <p className="mb-6 line-clamp-3 leading-relaxed text-slate-600 dark:text-slate-400">
                      {blog.content
                        ? blog.content.slice(0, 180) + (blog.content.length > 180 ? '...' : '')
                        : 'Click to explore this amazing project and read the full documentation on GitHub.'}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-700">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Github className="h-4 w-4" />
                        <span>View on GitHub</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg">
                        <span>Read More</span>
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative border-t border-slate-200/50 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:border-slate-800/50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">Want to collaborate?</h3>
            <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
              I&apos;m always open to interesting projects and discussions. Let&apos;s build something amazing together!
            </p>
            <a
              href="https://github.com/Asaki-M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
              <Github className="h-6 w-6" />
              <span>Connect on GitHub</span>
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
