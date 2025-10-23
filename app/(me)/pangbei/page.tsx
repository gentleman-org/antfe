'use client';
import { Github, Globe, MapPin, Building2, Calendar, Sparkles, ExternalLink, Folder } from 'lucide-react';
import meData from './me.json';

export default function MyLtxPage() {
  const projects = [
    {
      name: 'Dream-hub',
      description: '🚀 基于 nuxt3 、nestjs 实现实用网站保存、个人笔记记录功能',
      tech: ['NestJS', 'TypeScript', 'Nuxt', 'Logto'],
      url: 'https://dream-hub.myltx.top',
      github: 'https://github.com/myltx/dream-hub', // 可选：GitHub 仓库地址
      logo: 'https://dream-hub.myltx.top/_nuxt/logo.O1RxSA40.png', // 可选：项目 logo URL
    },
    {
      name: 'NestBase',
      description: '基于 NestJS + Supabase + Prisma 的企业级全栈应用框架，采用 Monorepo 架构，支持前后端协作开发。',
      tech: ['NestJS', 'Supabase', 'Swagger', 'TypeScript', 'Prisma ORM'],
      url: 'https://github.com/myltx/nestBase',
      github: 'https://github.com/myltx/nestBase', // 可选：GitHub 仓库地址
      // logo: 'https://dream-hub.myltx.top/_nuxt/logo.O1RxSA40.png', // 可选：项目 logo URL
      // 没有 logo 字段，会显示默认图标
    },
    {
      name: 'Mindlog',
      description: '一个基于 Nuxt.js、TypeScript 和 UnoCSS 构建的现代化思维记录系统',
      tech: ['Nuxt', 'Unocss', 'TypeScript', 'VueUse', 'Iconify'],
      url: 'https://mindlog.myltx.top/',
      github: 'https://github.com/myltx/mindlog', // 可选：GitHub 仓库地址
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 h-96 w-96 rounded-full bg-blue-200/30 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sky-200/30 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200/20 blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-5xl px-6 py-20">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          {/* Avatar */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-sky-400 opacity-25 blur-xl" />
              <img src={meData.avatar} alt={meData.name} className="relative h-32 w-32 rounded-full border-4 border-white shadow-2xl ring-4 ring-blue-100" />
              <div className="absolute -right-2 -bottom-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 p-2 shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <h1
            className="mb-4 bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-6xl leading-tight font-black text-transparent"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
            {meData.name}
          </h1>
          <p className="mb-8 text-xl text-slate-600">{meData.bio}</p>

          {/* Info Cards */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{meData.position}</span>
              <span className="text-slate-400">@</span>
              <span className="text-blue-600">{meData.company}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
              <MapPin className="h-4 w-4 text-sky-600" />
              <span>{meData.location}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
              <Calendar className="h-4 w-4 text-indigo-600" />
              <span>Joined {meData.joinedAt}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={meData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href={meData.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
              <Globe className="h-5 w-5" />
              <span>Website</span>
            </a>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-800">Featured Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-md transition-all hover:scale-[1.02] hover:border-blue-300 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0,
                }}>
                {/* Gradient Accent */}
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-blue-200/30 to-sky-200/30 blur-2xl transition-all group-hover:scale-150" />

                <div className="relative">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    {project.logo ? (
                      <div className="rounded-xl bg-white p-2 shadow-md ring-2 ring-blue-100 transition-transform group-hover:scale-110 group-hover:rotate-3">
                        <img src={project.logo} alt={project.name} className="h-10 w-10 object-contain" />
                      </div>
                    ) : (
                      <div className="rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 p-3 shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3">
                        <Folder className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-lg bg-slate-100 p-2 transition-all hover:scale-110 hover:bg-slate-200"
                          title="View on GitHub">
                          <Github className="h-4 w-4 text-slate-700" />
                        </a>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="transition-all hover:scale-110"
                        title="Visit project">
                        <ExternalLink className="h-5 w-5 text-slate-400 hover:text-blue-600" />
                      </a>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-700">{project.name}</h3>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">{project.description}</p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {meData.skills.map((skill, index) => (
              <div
                key={skill}
                className="group relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 px-5 py-3 shadow-sm transition-all hover:scale-105 hover:border-blue-300 hover:shadow-md"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInScale 0.5s ease-out forwards',
                  opacity: 0,
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-sky-400/0 transition-all group-hover:from-blue-400/10 group-hover:to-sky-400/10" />
                <span className="relative text-sm font-medium text-slate-700 group-hover:text-slate-900">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-2xl border border-blue-100 bg-white/80 px-8 py-4 shadow-sm">
            <p className="text-sm text-slate-600 italic">&quot;{meData.bio}&quot;</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
