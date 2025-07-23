# MDX 配置完整指南

## 📖 概述

本项目已完成 MDX 支持的完整配置，允许您在 Markdown 文件中无缝使用 React 组件，为 `app/(me)/mdx` 路径及其他个人页面提供强大的内容创作能力。

## 🗂️ 文件结构

```
项目根目录/
├── mdx-components.tsx          # 🔑 MDX 组件配置（必须在根目录）
├── next.config.ts              # Next.js 配置（已添加 MDX 支持）
├── styles/globals.css          # 全局样式（已添加 typography 支持）
├── components/mdx/             # 📁 模块化 MDX 组件目录
│   ├── index.ts               # 统一导出
│   ├── callout.tsx            # 提示框组件
│   ├── social-links.tsx       # 社交链接组件
│   └── card.tsx              # 卡片组件
└── app/(me)/mdx/              # 📁 MDX 示例页面
    ├── layout.tsx             # 专用布局
    └── page.mdx              # 示例页面
```

## 🎯 核心问题解答

### Q: mdx-components.tsx 必须在根目录吗？

**答：是的，必须在根目录。**

- **原因**：Next.js 的约定，框架会自动查找根目录的这个文件
- **机制**：`useMDXComponents` 函数为整个项目提供全局组件映射
- **好处**：统一管理，所有 MDX 文件都能使用相同的组件集

### Q: 如何实现模块化管理？

**答：通过组件导入实现模块化。**

虽然配置文件必须在根目录，但我们采用了模块化架构：

```typescript
// mdx-components.tsx (根目录)
import { Callout, SocialLinks } from '~/components/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 使用导入的模块化组件
    Callout,
    SocialLinks,
    // ... 其他组件
    ...components,
  };
}
```

## 🚀 使用方法

### 1. 创建 MDX 页面

在任何支持的目录下创建 `.mdx` 文件：

```bash
# 个人页面示例
app/(me)/your-username/page.mdx

# 其他路径示例
app/(me)/mdx/demo.mdx
```

### 2. MDX 文件结构

```mdx
---
title: '页面标题'
description: '页面描述'
author: '作者'
date: '2024-01-01'
tags: ['标签1', '标签2']
---

# 这是标题

这是普通的 Markdown 内容。

<Callout type="info">这是一个 React 组件！</Callout>

## 更多组件示例

<SocialLinks github="https://github.com/yourusername" email="your@email.com" />

<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
  </CardHeader>
  <CardContent>卡片内容</CardContent>
</Card>
```

### 3. 可用组件

#### 基础 HTML 元素

- `h1`, `h2`, `h3`, `h4` - 自动样式化的标题
- `p`, `ul`, `ol`, `li` - 段落和列表
- `blockquote` - 引用块
- `code`, `pre` - 代码块
- `a` - 链接（自动处理内外部链接）
- `img` - 图片（自动优化）

#### UI 组件

- `Badge` - 标签
- `Button` - 按钮
- `Accordion` - 折叠面板
- `Dialog` - 对话框

#### 自定义组件

- `Callout` - 提示框（info/warning/error/success）
- `SocialLinks` - 社交链接
- `Card`, `CardHeader`, `CardTitle`, `CardContent` - 卡片组件

#### 图标

- `Github`, `Twitter`, `Linkedin`, `Mail` 等

## 🎨 样式配置

### Tailwind Typography

项目已配置 `@tailwindcss/typography` 插件：

```css
/* styles/globals.css */
@plugin "@tailwindcss/typography";

/* 自定义 prose 样式 */
.prose {
  @apply text-foreground;
}
```

### 响应式设计

MDX 页面自动适配深色/浅色主题，并提供响应式布局。

## 🔧 扩展配置

### 添加新组件

1. **创建组件文件**：

```typescript
// components/mdx/my-component.tsx
export default function MyComponent({ children }: { children: React.ReactNode }) {
  return <div className="my-custom-style">{children}</div>;
}
```

2. **导出组件**：

```typescript
// components/mdx/index.ts
export { default as MyComponent } from './my-component';
```

3. **添加到配置**：

```typescript
// mdx-components.tsx
import { MyComponent } from '~/components/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MyComponent,
    // ... 其他组件
    ...components,
  };
}
```

### 添加插件

```typescript
// next.config.ts
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // 添加 remark 插件
    ],
    rehypePlugins: [
      // 添加 rehype 插件
    ],
  },
});
```

### 常用插件推荐

```bash
# 数学公式支持
npm install remark-math rehype-katex

# 语法高亮
npm install rehype-highlight

# 目录生成
npm install remark-toc

# 代码块增强
npm install rehype-code-titles
```

## 📝 最佳实践

### 1. 内容组织

- 使用有意义的 frontmatter
- 保持 MDX 文件简洁，复杂逻辑放入组件
- 合理使用标题层级

### 2. 组件设计

- 保持组件的可复用性
- 提供 TypeScript 类型定义
- 遵循项目的设计系统

### 3. 性能优化

- 避免在 MDX 中进行重计算
- 使用 Next.js 的图片优化
- 合理使用客户端组件

## 🔍 故障排除

### 常见问题

1. **组件未显示**
   - 检查是否在 `mdx-components.tsx` 中正确导出
   - 确认组件导入路径正确

2. **样式不生效**
   - 确认 `@tailwindcss/typography` 已安装
   - 检查 `globals.css` 中的插件配置

3. **类型错误**
   - 确认安装了 `@types/mdx`
   - 检查组件的 TypeScript 类型定义

### 调试技巧

```bash
# 检查 MDX 编译
npm run build

# 开发模式调试
npm run dev
```

## 🎯 总结

- ✅ **必须位置**：`mdx-components.tsx` 必须在项目根目录
- ✅ **模块化**：通过导入实现组件的模块化管理
- ✅ **全功能**：支持所有 Markdown 语法 + React 组件
- ✅ **类型安全**：完整的 TypeScript 支持
- ✅ **主题适配**：自动适配深色/浅色主题
- ✅ **性能优化**：基于 Next.js 的编译时优化

现在您可以在 `app/(me)/mdx` 或任何个人页面目录下创建 `.mdx` 文件，享受强大的内容创作体验！
