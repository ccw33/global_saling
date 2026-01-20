# AGENTS.md - Development Guidelines for AI Coding Agents

## Project Overview
Global e-commerce platform (海外独立站电商平台) using Medusa v2 + Next.js 15. Phase 0-1 planning stage.

## Technology Stack
- **Backend**: Medusa v2 (TypeScript, latest stable v2.12+)
- **Frontend**: Next.js 15 App Router + Tailwind CSS
- **Admin**: Medusa Admin (built-in)
- **Database**: PostgreSQL 15+ (schema: medusa_store, localhost:5432)
- **UI**: Medusa UI + shadcn/ui (minimal, high-end)

---

## Development Commands

### Backend (Medusa v2)
```bash
cd backend
npm run dev           # Start backend + Admin at :9000
npm run build         # Build for production
npm run seed          # Seed database with demo data
npm test              # Run tests
npm test -- <file>    # Run single test file
npm run lint          # Run ESLint
```

### Frontend (Next.js 15)
```bash
cd storefront
npm run dev -- -p 3001      # Start dev server at :3001
npm run build                # Build for production
npm run start                # Start production server
npm run lint                 # Run ESLint
npm test                     # Run tests
npm test -- <test-file>      # Run single test file
npm test -- --watch          # Run tests in watch mode
```

### Database
```bash
psql -h localhost -U bulletin -d bulletin -c "\dn"
# Schema: medusa_store
```

---

## Code Style Guidelines

### General Principles
1. **务实优先** - 0-1 phase: use Medusa built-in modules, avoid premature customization
2. **简单可用** - Choose working simple solutions over clever optimizations
3. **可扩展** - Leave room for future expansion without over-engineering
4. **高感知** - Clean UI, ample whitespace, subtle micro-animations

### Imports & Dependencies
- **Ordering**: 1) React/Next.js/Medusa imports, 2) Third-party libraries, 3) Relative imports
- **Avoid**: Installing new libraries without checking existing dependencies first
- **Backend**: Use Medusa SDK and built-in modules before adding external packages
- **Frontend**: Use Next.js built-ins (Image, Link, etc.) over third-party alternatives

### Formatting & Naming
- **Language**: Chinese for comments/user-facing strings, English for code
- **Variables/Functions**: camelCase (`fetchProducts`, `addToCart`)
- **Components**: PascalCase (`ProductCard`, `CheckoutForm`)
- **Constants/Types**: PascalCase (`APIError`, `ProductType`)
- **Files**: kebab-case (`product-list.tsx`, `cart-service.ts`)
- **Interfaces**: PascalCase with descriptive names (`ICartService`)

### Type Safety
- **Backend/Frontend**: Always use TypeScript with strict mode
- **Imports**: Type-only imports when possible: `import type { Product } from '@medusajs/medusa'`
- **No Any**: Avoid `any`, use `unknown` or proper types
- **Interfaces vs Types**: Use `interface` for object shapes, `type` for unions/intersections

### Error Handling
- **Backend**: Use Medusa error classes (`MedusaError`, `notFound`, `conflict`)
- **Frontend**: Display user-friendly Chinese messages, log errors with context
- **API Errors**: Wrap in try-catch, return standardized error responses
- **Async Operations**: Always handle promise rejections

### File Structure

**Backend** (`backend/src/`):
```
api/           # Custom API routes (store/admin)
jobs/          # Scheduled tasks
links/         # Module links
modules/       # Custom modules (0-1 phase: skip)
subscribers/   # Event subscribers
workflows/     # Medusa workflows
```

**Frontend** (`storefront/src/`):
```
app/                    # Next.js App Router
  ├── (main)/           # Main pages (homepage, products, cart, checkout)
  └── layout.tsx        # Root layout
components/             # Reusable components (ui, layout, product, cart)
lib/                   # Utilities (medusa SDK wrapper, helpers)
styles/                # Global styles and Tailwind config
```

### Component Guidelines
- **Single Responsibility**: Each component does one thing well
- **Props Interface**: Always define props with TypeScript interface
- **Client Components**: Use `'use client'` only when needed (interactivity, hooks)
- **Server Components**: Default to server components for performance

### API & Data Fetching
- **Backend**: Use Medusa's built-in services and modules
- **Frontend**: Create lib wrapper for Medusa SDK, fetch on server when possible
- **Error Boundaries**: Wrap components with error boundaries
- **Loading States**: Always show loading indicators during async operations

### Testing Requirements
- **Backend**: Use Jest/Medusa test framework
- **Frontend**: Use Jest + React Testing Library
- **Run Before Commit**: Always run tests before committing
- **Single Test Command**: `npm test -- path/to/test.test.ts`
- **Real Environment**: Use real QA database and keys (avoid mocks when possible)
- **Coverage**: Maintain reasonable coverage on critical paths

### Logging & Debugging
- **Verbose Logs**: Log important steps and errors with context
- **Error Logging**: Include stack traces, request IDs, user context
- **Development**: Use console.log for debugging, remove before commit

### 0-1 Phase Constraints
- **Avoid Custom Modules**: Use Medusa built-in modules (Product, Cart, Order, Payment)
- **Avoid Over-Optimization**: No Redis, CDN, or advanced caching until Phase 5+
- **Simple Architecture**: Monolithic Medusa backend, not microservices
- **Payment**: Start with COD (Cash on Delivery) in 0-1, Stripe in Phase 5+
- **Storage**: Use local file storage initially, S3/MinIO later

### UI/UX Guidelines
- **Style**: Minimalist, high-end, ample whitespace
- **Responsiveness**: Mobile-first, breakpoints: 768px (md), 1024px (lg)
- **Accessibility**: ARIA labels, keyboard navigation, alt text
- **Loading**: Skeletons or spinners, not blank screens
- **Error States**: Clear error messages with retry options

---

## Pre-commit Checklist
- [ ] Code compiles without errors
- [ ] Tests pass (new feature + regression)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`tsc --noEmit`)
- [ ] No `any` types, no console.log in production
- [ ] Chinese comments where needed
- [ ] Documentation updated if API/behavior changed

---

## Key Resources
- **Architecture**: `docs/feature/global-ecommerce/ARCHITECTURE.md`
- **Implementation Plan**: `docs/feature/global-ecommerce/IMPLEMENT_PLAN.md`
- **Medusa Docs**: https://docs.medusajs.com
- **Next.js Docs**: https://nextjs.org/docs

---

## Notes for Agents
- Use Chinese for communication
- Research existing patterns before making changes
- Prioritize simplicity and testability
- Log errors with context
- Run full test suite after changes
- Early 0-1 phase: focus on core functionality, defer optimizations
