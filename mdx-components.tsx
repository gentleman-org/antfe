import type { MDXComponents } from 'mdx/types';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, ExternalLink, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '~/lib/utils';

// 导入模块化的 MDX 组件
import { Callout, SocialLinks } from '~/components/mdx';

// Card 组件
function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-card text-card-foreground my-6 rounded-lg border shadow-sm', className)} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-2xl leading-none font-semibold tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 基础 HTML 元素
    h1: ({ children, ...props }) => (
      <h1 className="mt-8 mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="mt-8 mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="mt-6 mb-4 scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="mt-4 mb-3 scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mt-2" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre className="bg-muted mt-6 mb-4 overflow-x-auto rounded-lg border p-4" {...props}>
        {children}
      </pre>
    ),
    a: ({ href, children, ...props }) => {
      // 内部链接使用 Next.js Link，外部链接使用普通 a 标签
      const isExternal = href?.startsWith('http') || href?.startsWith('//');
      const isEmail = href?.startsWith('mailto:');

      if (isExternal || isEmail) {
        return (
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-primary hover:text-primary/80 inline-flex items-center gap-1 font-medium underline underline-offset-4"
            {...props}>
            {children}
            {isExternal && <ExternalLink className="h-3 w-3" />}
          </a>
        );
      }

      return (
        <Link href={href || '#'} className="text-primary hover:text-primary/80 font-medium underline underline-offset-4" {...props}>
          {children}
        </Link>
      );
    },
    img: ({ src, alt, ...props }) => (
      <div className="my-6">
        <Image src={src || ''} alt={alt || ''} width={800} height={400} className="rounded-lg shadow-md" {...props} />
        {alt && <p className="text-muted-foreground mt-2 text-center text-sm">{alt}</p>}
      </div>
    ),

    // UI 组件
    Badge,
    Button,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

    // 自定义组件
    Callout,
    SocialLinks,
    Card,
    CardHeader,
    CardTitle,
    CardContent,

    // 图标
    Github,
    Twitter,
    Linkedin,
    Mail,
    ExternalLink,
    Info,
    AlertTriangle,
    AlertCircle,
    CheckCircle,

    // 允许覆盖
    ...components,
  };
}
