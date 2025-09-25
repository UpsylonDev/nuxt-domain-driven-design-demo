# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Domain-Driven Design (DDD)** demonstration project built with Nuxt 4. The architecture implements DDD principles through Nuxt's layer system, showcasing:

- **Domain Boundaries**: Clear separation of business domains with dedicated layers
- **Ubiquitous Language**: Domain-specific terminology reflected in code structure
- **Bounded Contexts**: Each domain operates as an independent bounded context
- **Separation of Concerns**: Business logic isolated within domain boundaries
- **Modular Architecture**: Self-contained domains that can evolve independently

## Development Commands

- **Start development server**: `npm run dev` or `pnpm run dev` (runs on http://localhost:3000)
- **Build for production**: `npm run build` or `pnpm run build`
- **Preview production build**: `npm run preview` or `pnpm run preview`
- **Generate static site**: `npm run generate` or `pnpm run generate`

## Testing Commands

### Unit Tests (Vitest)
- **Run tests**: `npm run test` or `npm run test:run` (single run)
- **Watch mode**: `npm run test:watch` (watch for changes and re-run)
- **Coverage**: `npm run test:coverage` (generate coverage report)
- **Coverage watch**: `npm run test:coverage:watch` (coverage in watch mode)

Vitest is configured for unit testing Vue components and composables with:
- **Test environment**: happy-dom for DOM simulation
- **Vue support**: @vue/test-utils for component testing
- **Global setup**: Vue composables and Nuxt mocks available globally
- **Domain-based tests**: Tests are located in each domain's `tests/` directory
- **Test pattern**: `domains/**/*.test.ts` - tests are co-located with domain logic
- **Coverage**: V8 provider with HTML/JSON/text reports, 80% thresholds

### E2E Tests (Playwright)
- **Run E2E tests**: `npm run test:e2e` (headless mode)
- **Interactive mode**: `npm run test:e2e:ui` (Playwright UI mode)
- **View reports**: `npm run test:e2e:report` (HTML test report)

Playwright is configured for end-to-end testing with:
- **Multiple browsers**: Chromium, Firefox, WebKit, Mobile Chrome/Safari
- **Auto dev server**: Automatically starts Nuxt dev server for tests
- **Cross-domain testing**: Tests navigation between domain layers

## Domain-Driven Design Architecture

### DDD Principles Implementation

This project demonstrates core DDD concepts through practical implementation:

#### **Bounded Contexts**
Each domain represents a bounded context with clear boundaries:
- **Users Domain**: Identity and access management context
- **Posts Domain**: Content management and publishing context

#### **Domain Layers Structure**
The application uses Nuxt's layer system to enforce domain boundaries:

- **Application Layer** (`nuxt.config.ts`): Orchestrates domain layers and defines application-wide concerns
- **Domain Layers** (`domains/`): Independent bounded contexts implementing domain logic
  - `domains/users/`: User management domain with authentication, profiles, and user operations
  - `domains/posts/`: Content domain handling blog posts, publishing, and content lifecycle

#### **Strategic Design Patterns**
- **Layer Architecture**: Each domain is implemented as a separate Nuxt layer
- **Anti-Corruption Layer**: Domain boundaries prevent cross-contamination of business logic
- **Context Mapping**: Clear relationships defined between Users and Posts domains

### Domain Structure (DDD Tactical Patterns)

Each domain follows DDD tactical patterns implemented through Nuxt conventions:

```
domains/{domain-name}/
├── components/          # UI Layer - Domain-specific Vue components (Views/Presenters)
├── composables/         # Application Services - Domain logic orchestration (useUsers, usePosts)
├── pages/{domain}/      # Interface Layer - Domain routes and entry points
├── server/api/          # Infrastructure Layer - External interfaces and data access
├── tests/               # Domain Testing - Unit tests for domain logic
│   ├── components/      # UI Layer tests
│   └── composables/     # Application Service tests
├── types.ts             # Domain Model - Entities, Value Objects, and Domain Types
├── utils/               # Domain Services - Pure domain logic utilities
└── nuxt.config.ts       # Domain Configuration - Bounded context setup
```

#### **DDD Pattern Mapping**
- **Entities & Value Objects**: Defined in `types.ts` with clear identity and behavior
- **Domain Services**: Implemented in `utils/` for complex domain logic
- **Application Services**: Exposed through `composables/` for use case orchestration
- **Repositories**: Simulated through API endpoints in `server/api/`
- **Domain Events**: Handled through Nuxt's reactive state management

### DDD Implementation Patterns

#### **Domain Logic Encapsulation**
- **Application Services** (`composables/`): Orchestrate use cases and domain workflows
  - `useUsers()`: Manages user operations and state
  - `usePosts()`: Handles content management workflows
- **Domain Models** (`types.ts`): Define entities with clear identity and business rules
- **Domain Services** (`utils/`): Implement complex business logic that doesn't belong to entities

#### **Bounded Context Integration**
- **Context Mapping**: Explicit relationships between domains via TypeScript imports
- **Anti-Corruption Layer**: Type-safe interfaces prevent domain contamination
- **Shared Kernel**: Common types and utilities shared across contexts when appropriate

#### **Infrastructure Abstraction**
- **Repository Pattern**: API endpoints abstract data persistence concerns
- **Dependency Inversion**: Domain logic independent of infrastructure details
- **Interface Segregation**: Clean separation between domain and infrastructure layers

### Domain Relationships & Context Mapping

The project demonstrates proper context mapping between bounded contexts:

```typescript
// Posts domain references Users domain (Downstream relationship)
import type { User } from "@/domains/users/types"

// Clear dependency direction: Posts → Users
// Users domain remains independent and unaware of Posts
```

This pattern shows:
- **Customer-Supplier**: Posts domain consumes User types as a downstream client
- **Conformist Pattern**: Posts accepts Users domain model without modification
- **Published Language**: Users domain provides stable interfaces for other contexts

## Technology Stack

- **Framework**: Nuxt 4.1.2
- **Styling**: Tailwind CSS (@nuxtjs/tailwindcss)
- **Dev Tools**: Nuxt DevTools enabled
- **Data Generation**: @faker-js/faker for mock data
- **TypeScript**: Full TypeScript support with domain-specific types