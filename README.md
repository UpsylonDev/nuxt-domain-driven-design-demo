# Domain-Driven Design with Nuxt 4

A practical demonstration of **Domain-Driven Design (DDD)** principles implemented using Nuxt 4's layer system. This project showcases how to build scalable, maintainable applications with clear domain boundaries and separation of concerns.

## 🏗️ Architecture Overview

This project demonstrates core DDD concepts through a modular architecture:

- **Bounded Contexts**: Independent domains with clear boundaries
- **Domain Layers**: Self-contained Nuxt layers for each business domain
- **Strategic Design**: Context mapping and anti-corruption layers
- **Tactical Patterns**: Entities, services, and repositories

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
nuxt-domain-driven-design-demo/
├── domains/                    # Domain layers (bounded contexts)
│   ├── users/                 # User management domain
│   │   ├── components/        # Domain UI components
│   │   ├── composables/       # Application services
│   │   ├── pages/            # Domain routes
│   │   ├── server/api/       # Domain API endpoints
│   │   ├── types.ts          # Domain model
│   │   └── nuxt.config.ts    # Domain configuration
│   └── posts/                # Content management domain
│       ├── components/
│       ├── composables/
│       ├── pages/
│       ├── server/api/
│       ├── types.ts
│       └── nuxt.config.ts
├── tests/                     # Cross-domain integration tests
├── nuxt.config.ts            # Application layer configuration
└── README.md
```

## 🎯 Domain-Driven Design Implementation

### Bounded Contexts

Each domain represents an independent bounded context:

- **Users Domain**: Identity and access management
  - User registration, authentication
  - Profile management
  - User-related operations

- **Posts Domain**: Content management and publishing
  - Blog post creation and editing
  - Content lifecycle management
  - Publishing workflows

### DDD Patterns in Nuxt

| DDD Pattern | Nuxt Implementation |
|-------------|-------------------|
| **Entities & Value Objects** | `types.ts` - Domain models with TypeScript |
| **Domain Services** | `utils/` - Pure business logic |
| **Application Services** | `composables/` - Use case orchestration |
| **Repositories** | `server/api/` - Data access abstraction |
| **Anti-Corruption Layer** | Type-safe domain boundaries |
| **Context Mapping** | Explicit type imports between domains |

### Domain Relationships

```typescript
// Clear dependency direction: Posts → Users
// Posts domain can reference Users, but not vice versa
import type { User } from "@/domains/users/types"

interface Post {
  id: string
  title: string
  content: string
  author: User  // Downstream dependency
}
```

## 🧪 Testing Strategy

### Unit Tests (Vitest)
```bash
npm run test                # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
```

### E2E Tests (Playwright)
```bash
npm run test:e2e           # Run E2E tests
npm run test:e2e:ui        # Interactive mode
npm run test:e2e:report    # View reports
```

## 🛠️ Development

### Adding a New Domain

1. **Create domain layer structure**:
```bash
mkdir domains/new-domain
cd domains/new-domain
```

2. **Add domain configuration**:
```typescript
// domains/new-domain/nuxt.config.ts
export default defineNuxtConfig({
  // Domain-specific configuration
})
```

3. **Register in application**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './domains/users',
    './domains/posts',
    './domains/new-domain'  // Add here
  ]
})
```

### Domain Communication

Domains communicate through well-defined interfaces:

```typescript
// ✅ Allowed: Type-only imports
import type { User } from "@/domains/users/types"

// ❌ Avoid: Direct implementation coupling
import { useUsers } from "@/domains/users/composables"
```

## 🎨 Technology Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) - Full-stack Vue framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type safety
- **Architecture**: Domain-Driven Design principles

## 📚 Key Benefits

### ✅ Domain Isolation
- Clear boundaries between business contexts
- Independent development and deployment
- Reduced coupling and dependencies

### ✅ Scalability
- Add new domains without affecting existing ones
- Team ownership of specific domains
- Parallel development capabilities

### ✅ Maintainability
- Ubiquitous language reflected in code
- Business logic centralized in domain layers
- Clear separation of concerns

### ✅ Type Safety
- End-to-end TypeScript support
- Compile-time validation of domain contracts
- Safe refactoring across domain boundaries

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run generate` | Generate static site |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Lint code |
| `npm run typecheck` | Type checking |

## 📖 Learning Resources

- [Domain-Driven Design by Eric Evans](https://domainlanguage.com/ddd/)
- [Nuxt Layers Documentation](https://nuxt.com/docs/getting-started/layers)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vue.js Guide](https://vuejs.org/guide/)

## 🤝 Contributing

This is a demonstration project showcasing DDD principles with Nuxt 4. Feel free to explore, experiment, and adapt the patterns for your own projects.

## 📄 License

MIT License - feel free to use this as a reference for your own DDD implementations.
