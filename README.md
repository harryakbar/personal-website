# harryakbar.github.io — Personal Website

<!-- Automated daily improvement target -->

[![codecov](https://codecov.io/github/harryakbar/personal-website/graph/badge.svg?token=TLR57M27LA)](https://codecov.io/github/harryakbar/personal-website)

Personal website and blog for Harry Akbar Ali Munir — Software Engineer at NTUC FairPrice.

## Features

- About / bio page
- Markdown-powered blog
- Static site generation (SSG) with Next.js
- Vercel Analytics + Speed Insights
- SEO optimized with canonical URLs and meta tags
- Unit tests with Jest + React Testing Library

## Tech Stack

- **Framework:** Next.js (TypeScript)
- **Styling:** Tailwind CSS
- **Content:** Markdown with frontmatter (`gray-matter`, `remark`)
- **Testing:** Jest + React Testing Library
- **CI:** GitHub Actions
- **Deploy:** Vercel

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

### Test

```bash
pnpm test
```

## Writing a Blog Post

Add a `.md` file to `/_posts/` with frontmatter:

```md
---
title: "My Post Title"
date: "2024-01-01"
excerpt: "Short description"
---

Your content here...
```

The post will be automatically picked up on the next build.

## Project Structure

```
├── _posts/           # Markdown blog posts
├── components/       # Reusable UI components
├── pages/            # Next.js pages
├── lib/              # Helpers (markdown parsing, constants)
└── public/           # Static assets
```
