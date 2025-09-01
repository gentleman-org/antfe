import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Github, Globe, BookOpen, Mail, MapPin, Calendar, Code2, Database, Server, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FanPage() {
  const techStack = [
    { name: 'TypeScript', icon: '🔷', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    { name: 'Node.js', icon: '🟢', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    { name: 'React', icon: '⚛️', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300' },
    { name: 'Next.js', icon: '▲', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
    { name: 'PostgreSQL', icon: '🐘', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' },
    { name: 'Docker', icon: '🐳', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  ];

  const projects = [
    {
      title: '博客',
      description: '基于 Nuxt.js 和 TypeScript 构建的现代化博客平台，支持暗黑模式。',
      tech: ['Nuxt.js', 'TypeScript', 'Unocss'],
      link: 'https://blog.xyu.fan'
    },
    {
      title: 'Node.js API 框架',
      description: '高性能的 RESTful API 框架，集成了认证、缓存、日志等企业级功能。',
      tech: ['Node.js', 'Express', 'PostgreSQL'],
      link: '#'
    },
    {
      title: '开发者工具集',
      description: '提升开发效率的工具集合，包括代码生成器、API 测试工具等。',
      tech: ['TypeScript', 'React', 'Electron'],
      link: '#'
    }
  ];

  const interests = [
    { icon: <Code2 className="w-5 h-5" />, text: '全栈开发' },
    { icon: <Server className="w-5 h-5" />, text: '后端架构' },
    { icon: <Database className="w-5 h-5" />, text: '数据库设计' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back to Developers Button */}
        <div className="pt-4 flex gap-3">
          <Button variant="ghost" asChild className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
            <Link href="/zh-CN/developers" className="flex items-center gap-2">
              <ArrowLeft className="w-3 h-3" />
              Back to Developers
            </Link>
          </Button>
        </div>
        {/* 头部个人信息 */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 -mt-6"></div>
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
              {/* 头像 */}
              <div className="relative -mt-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      FAN
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-1 right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fan</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">全栈开发者 & 技术爱好者</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>中国</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>专注开发 3+ 年</span>
                  </div>
                </div>

                {/* 社交链接 */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://xyu.fan" target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      个人网站
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://blog.xyu.fan" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="w-4 h-4 mr-2" />
                      技术博客
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com/fzzv" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 关于我 */}
        <Card>
          <CardHeader>
            <CardTitle>关于我</CardTitle>
            <CardDescription>
              专注于现代 Web 技术的全栈开发者
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              我是一名程序员
            </p>

            {/* 兴趣爱好 */}
            <div className="pt-4">
              <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">专业兴趣</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-blue-600 dark:text-blue-400">
                      {interest.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {interest.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 技术栈 */}
        <Card>
          <CardHeader>
            <CardTitle>技术栈</CardTitle>
            <CardDescription>
              我熟练掌握的技术和工具
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="secondary" className={`${tech.color} px-3 py-1.5 text-sm font-medium`}>
                  <span className="mr-2">{tech.icon}</span>
                  {tech.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 项目展示 */}
        <Card>
          <CardHeader>
            <CardTitle>精选项目</CardTitle>
            <CardDescription>
              一些我参与开发的项目
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link !== '#' && (
                    <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-medium text-blue-600 dark:text-blue-400">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        查看项目 →
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 联系方式 */}
        <Card>
          <CardHeader>
            <CardTitle>联系我</CardTitle>
            <CardDescription>
              欢迎与我交流技术或合作机会
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" asChild className="flex-1">
                <a href="mailto:xxyufan@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  发送邮件
                </a>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <a href="https://blog.xyu.fan" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="w-4 h-4 mr-2" />
                  阅读我的博客
                </a>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <a href="https://github.com/fzzv" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  查看我的代码
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
