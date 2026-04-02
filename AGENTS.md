# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js 15 App Router app. Use `app/[locale]/` for localized community pages, `app/api/**/route.ts` for API handlers, and `app/(me)/<handle>/` for personal pages. Personal profiles are registered by adding `me.json` inside each `app/(me)/*/` directory. Shared UI lives in `components/` (`ui/`, `layout/`, `provider/`, `mdx/`), reusable logic lives in `lib/`, static JSON and images live in `public/`, and global styles are in `styles/globals.css`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local dev server with Turbopack.
- `npm run build`: create a production build; use this as the main pre-PR verification step.
- `npm run start`: run the production build locally.
- `npm run lint`: run the staged-file lint and format pipeline used by Husky.
- `npm run log`: regenerate `CHANGELOG.md` from commit history.

For full-repo checks, run `npx eslint .` and `npx prettier --check .`.

## Coding Style & Naming Conventions

TypeScript is `strict`, so prefer fully typed props, helpers, and API responses. Prettier defines formatting: 2 spaces, no tabs, semicolons, single quotes, trailing commas (`es5`), LF line endings, and 180-character line width. Tailwind class order is normalized by `prettier-plugin-tailwindcss`. Follow Next.js naming such as `page.tsx`, `layout.tsx`, and `route.ts`. Keep utilities and directories lowercase; use descriptive component filenames like `ProjectsClient.tsx` or `pageLayout.tsx`. Prefer root imports via `~/*`.

## Testing Guidelines

There is no dedicated automated test suite checked in yet, and no coverage gate is enforced. Every change should at minimum pass `npm run build` and be exercised in `npm run dev`, especially locale routes, API endpoints, and profile pages under `app/(me)/`. If you introduce tests, place them near the feature or in a nearby `__tests__/` folder and name them after the unit being verified.

## Commit & Pull Request Guidelines

Commit messages follow Conventional Commits enforced by `commitlint`, for example `feat: add qinghuan personal page`. Allowed types include `feat`, `fix`, `docs`, `refactor`, `build`, `ci`, `test`, and `chore`; keep the header under 108 characters. Pull requests should explain scope, link related issues, list changed routes or APIs, and include screenshots for UI changes. Call out locale updates, new assets in `public/`, and any new `app/(me)/*/me.json` entries explicitly.

## 协作约定

默认使用中文交流，文档使用中文 Markdown。修改前先阅读相关模块，避免回退与当前任务无关的现有改动；搜索代码时优先使用 `rg`。

请使用第一性原理思考。你不能总是假设我非常清楚自己想要什么和该怎么得到。请保持审慎，从原始需求和问题出发，如果动机和目标不清晰，停下来和我讨论。如果目标清晰但是路径不是最短，告诉我，并且建议更好的办法

## 禁止git add和git commit等操作
