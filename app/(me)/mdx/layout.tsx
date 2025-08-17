import type { Metadata } from 'next';
import Link from 'next/link';
import { getDeveloperByUsername, generateDeveloperMetadata } from '~/lib/developers';

export async function generateMetadata(): Promise<Metadata> {
  const developer = getDeveloperByUsername('mdx');

  if (!developer) {
    return {
      title: 'MDX Demo - Interactive Markdown with React Components | AntFE',
    };
  }

  return generateDeveloperMetadata(developer, 'mdx');
}

export default function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      {/* 导航返回按钮 */}
      <div className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/vadxq" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors">
              ← 返回首页
            </Link>
            <div className="text-muted-foreground text-sm">
              <span>MDX 示例页面</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* MDX 内容 */}
          <article className="prose prose-gray dark:prose-invert prose-lg prose-headings:text-foreground prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:mt-0 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-6 prose-h2:mt-8 prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h3:text-xl prose-h3:font-medium prose-h3:mb-4 prose-h3:mt-6 prose-p:text-foreground prose-p:leading-7 prose-p:mb-4 prose-strong:text-foreground prose-strong:font-semibold prose-code:bg-muted prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-blockquote:border-l-4 prose-blockquote:border-primary/20 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:bg-muted/50 prose-th:font-semibold prose-th:text-foreground prose-td:text-foreground max-w-none">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}
