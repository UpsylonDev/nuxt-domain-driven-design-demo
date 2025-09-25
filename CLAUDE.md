# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application demonstrating Domain-Driven Design (DDD) architecture using Nuxt Layers. The project showcases how to organize code into discrete domains while maintaining modularity and separation of concerns.

## Development Commands

- **Start development server**: `npm run dev` or `pnpm run dev` (runs on http://localhost:3000)
- **Build for production**: `npm run build` or `pnpm run build`
- **Preview production build**: `npm run preview` or `pnpm run preview`
- **Generate static site**: `npm run generate` or `pnpm run generate`

## Architecture & Structure

### Domain-Driven Design with Nuxt Layers

The application uses Nuxt's layer system to implement domain boundaries. Each domain is a self-contained Nuxt layer with its own configuration:

- **Root Layer** (`nuxt.config.ts`): Main application that extends domain layers
- **Domains Directory** (`domains/`): Contains individual domain layers
  - `domains/users/`: User management domain
  - `domains/posts/`: Blog post/content domain

### Domain Structure

Each domain follows a consistent structure:

```
domains/{domain-name}/
├── components/          # Domain-specific Vue components
├── composables/         # Domain composables (useUsers, usePosts)
├── pages/{domain}/      # Domain routes (auto-routed by Nuxt)
├── server/api/          # Domain API endpoints
├── types.ts             # Domain type definitions
├── utils/               # Domain utilities
└── nuxt.config.ts       # Domain-specific Nuxt configuration
```

### Key Patterns

- **Composables**: Each domain provides composables (e.g., `useUsers()`, `usePosts()`) that encapsulate domain logic and state management using Nuxt's `useState`
- **Type Safety**: TypeScript interfaces defined in `types.ts` with cross-domain imports (Posts reference User types)
- **API Integration**: Domain composables use `useFetch` to call domain-specific API endpoints
- **Route Configuration**: Domain layers can define custom route rules (e.g., `/blog` redirects to `/posts`)

### Cross-Domain Communication

Domains can reference each other through type imports:
- Posts domain imports User types: `import type { User } from "@/domains/users/types"`
- This demonstrates how domains can have dependencies while maintaining clear boundaries

## Technology Stack

- **Framework**: Nuxt 3.11.2
- **Styling**: Tailwind CSS (@nuxtjs/tailwindcss)
- **Dev Tools**: Nuxt DevTools enabled
- **Data Generation**: @faker-js/faker for mock data
- **TypeScript**: Full TypeScript support with domain-specific types