# AntFE Developer Community

## 🌟 Project Overview

**AntFE Developer Community** is a modern technology exchange platform designed for programmers, dedicated to connecting outstanding developers worldwide, sharing cutting-edge technologies, discussing programming practices, and building open-source projects. Here, every programmer can find like-minded partners.

---

## 🛠 Technical Architecture

**Based on template: [nextjs-ai-starter](https://github.com/vadxq/nextjs-ai-starter)**

### Frontend Framework

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwind-css) ![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=flat) ![SWR](https://img.shields.io/badge/SWR-000000?style=flat&logo=vercel) ![Next-intl](https://img.shields.io/badge/Next--intl-000000?style=flat) ![Serwist](https://img.shields.io/badge/Serwist-000000?style=flat)

---

## 📁 Project Structure

```bash
antfe/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalization routes
│   │   ├── layout.tsx           # Global layout
│   │   ├── page.tsx             # Homepage
│   │   └── ~offline/            # PWA offline page
│   ├── api/                     # API routes
│   ├── manifest.ts              # PWA manifest
│   └── sw.ts                    # Service Worker
├── components/                   # React components
│   ├── ui/                      # Shadcn UI components
│   ├── layout/                  # Layout components
│   │   ├── header.tsx           # Community navigation
│   │   ├── footer.tsx           # Footer
│   │   └── pageLayout.tsx       # Page layout
│   ├── provider/                # Context providers
│   └── themeToggle.tsx          # Theme toggle
├── lib/                         # Utility libraries
│   ├── http/                    # HTTP client
│   ├── i18n/                    # Internationalization config
│   └── utils.ts                 # Common utilities
├── locales/                     # Language files
│   ├── en.json                  # English
│   └── zh-CN.json               # Chinese
└── styles/                      # Style files
    └── globals.css              # Global styles (with liquid glass effects)
```

---

## ✨ Community Features

### 🤝 Technical Exchange

- **Technical Discussions**: Participate in in-depth discussions on various programming languages and technology frameworks
- **Experience Sharing**: Share project experiences, best practices, and lessons learned
- **Code Reviews**: Get code feedback and suggestions from community members

### 🌍 Open Source Projects

- **Project Showcase**: Showcase your open source projects and gain community attention
- **Collaborative Development**: Build interesting projects with other developers
- **Skill Enhancement**: Improve programming skills by participating in open source projects

### 💼 Career Development

- **Interview Guidance**: Get technical interview experience and advice
- **Career Planning**: Discuss career development paths with senior developers
- **Talent Recommendations**: Discover excellent job opportunities and talent

### 📚 Learning Resources

- **Technical Articles**: Read high-quality technical articles shared by community members
- **Online Courses**: Participate in technical training and seminars organized by the community
- **Development Tools**: Discover and share useful development tools and resources

---

## 🏠 Personal Homepage

Every community member can build their own personal homepage, which will be displayed in the community. This is a space to showcase yourself!

### How to Add Your Homepage

1. **Add Your Info**:
   - Open the `me.json` file in the root directory.
   - Add a new JSON object with your information. Please refer to the existing format.
   - name: Your nickname
   - path: Your route path
   - type: Optional: `nextjs`/`markdown`/`iframe` (markdown support coming soon)
   - description: Description
   - avatar: Avatar
   - tags: Your personal tags
   - links: Your links. Icon can be an online image

   ```json
   {
     "name": "vadxq",
     "path": "vadxq",
     "type": "nextjs",
     "description": "A developer who loves to code and build things.",
     "avatar": "https://avatars.githubusercontent.com/u/123456789?v=4",
     "tags": ["developer", "frontend", "backend", "fullstack"],
     "links": [
       {
         "name": "GitHub",
         "icon": "Github",
         "url": "https://github.com/vadxq"
       }
     ]
   }
   ```

2. **Create Your Directory**:
   - In the `app/(me)/` directory, create a new folder with your GitHub username (e.g., `app/(me)/your_username/`).
   - This directory is entirely yours to manage.

3. **Build Your Page**:
   You have complete freedom in how you build your page. Here are a few options:
   - **Next.js Page**: Create a `page.tsx` file and build your page with React components.
   - **iframe**: Embed your existing personal website using an `iframe`.
   - **MDX**: Write your page content using Markdown.

We encourage you to be creative and make your personal page unique!

---

## 🚀 Quick Start

### 1. Requirements

- Node.js 22+
- Git

### 2. Local Development

```bash
# Clone the project
git clone https://github.com/gentleman-org/antfe.git
cd antfe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### 3. Development Scripts

```bash
# Code checking and formatting
npm run lint              # Run ESLint + Prettier
npm run lint:pretty       # Quick formatting

# Generate changelog
npm run log               # Generate CHANGELOG based on Git commits
```

---

## 🌟 Community Statistics

- 🧑‍💻 **1000+** Active developers
- 📝 **500+** Technical articles
- 🔧 **100+** Open source projects
- 🌍 **24/7** Community activities

---

## 📋 Development Plan

### 🎯 Short-term Goals

- [ ] **User System**
  - [ ] User registration and login

---

## 🤝 Contributing

We welcome all forms of contributions!

### Ways to Contribute

1. **Code Contributions**: Fix bugs, add features, optimize performance
2. **Documentation Improvements**: Improve documentation, translate content
3. **Community Operations**: Organize events, content moderation, user support
4. **Feedback and Suggestions**: Propose improvements, report issues

### Contribution Process

1. Fork the project
2. Create a feature branch
3. Submit code
4. Create a Pull Request
5. Code review
6. Merge code

---

## 📚 Related Resources

### Official Links

- [GitHub Repository](https://github.com/gentleman-org/antfe)
- [Online Preview](https://antfe.com)
- [Technical Documentation](https://github.com/gentleman-org/antfe/wiki)
- [Issue Feedback](https://github.com/gentleman-org/antfe/issues)

### Community Resources

- [Discord Group](https://antfe.com/dc)
- [Technical Discussions](https://github.com/gentleman-org/antfe/discussions)

---

## 📄 Open Source License

This project is open source under [Apache License 2.0](https://github.com/gentleman-org/antfe/blob/main/LICENSE).

This project is based on the original template project [Apache License 2.0](https://github.com/vadxq/nextjs-ai-starter/blob/main/LICENSE).

---

## 💬 Contact Us

- **Project Maintainer**: [@vadxq](https://github.com/vadxq)
- **Twitter**: [@vadxqDon](https://twitter.com/vadxqDon)

---

**Thank you for your attention to the AntFE Developer Community! Let's build a better developer ecosystem together!** 🚀
