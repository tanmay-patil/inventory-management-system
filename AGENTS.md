<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# System Guidelines & Rules

This file serves as the strict operating manual for all AI agents working on the Inventory Management System. You MUST read and adhere to these guidelines for every task.

## 1. Architectural Philosophy

- **Strict Separation of Concerns (Plug & Play)**: Each layer (UI, API, Data, Core Logic) must be completely decoupled and pluggable. If the UI framework changes tomorrow, the business logic must remain untouched.
- **Core Library (`src/core/`)**: All business logic (Entities, Services, Repositories, Providers) MUST live here. This code must be written as a UI-agnostic, standalone TypeScript library. It must have absolutely zero knowledge of React, Next.js, or DOM APIs.
- **Data Layer Isolation**: Server actions should be thin wrappers that call `src/core/` services. Do NOT embed database queries or complex domain logic directly inside UI components or Next.js API routes.

## 2. Code Quality, Scale & Constraints

- **150 Lines of Code Limit**: Strictly NO code file should exceed 150 lines of code. If a file approaches this limit, it must be aggressively refactored, split into smaller modules, or abstracted.
- **Super Testable & Scalable**: Write pure functions. Dependency injection should be used where applicable. Code must be structured to easily accommodate unit and integration testing.
- **TypeScript Strictness**: Avoid `any`. Always define explicit interfaces and types for payloads, API responses, and function parameters.
- **Super DRY & Zero Redundancy**: Absolutely zero code duplication. Extract shared logic into utility functions or base classes.
- **Component Design**: Build small, reusable, pure functions and React components. Favor composition over inheritance.
- **Linting**: Run `npm run lint` and `npm run test:e2e` to verify no regressions are introduced.

## 3. Styling & CSS Guidelines

- **SCSS over CSS**: We strictly use SCSS for custom styling. All global styling files must be `.scss`.
- **Zero Duplicity (DRY)**: Repeated UI patterns must be abstracted.
  - Utilize SCSS variables (`_variables.scss`) for consistent spacing, colors, and shadows.
  - Utilize SCSS mixins (`_mixins.scss`) for repeated property combinations.
  - Use Tailwind's `@apply` directive inside SCSS for extracting repeated utility class combinations into logical classes when component abstraction is overkill.
- **Modularity**: Avoid massive global stylesheets. Component-specific SCSS should be scoped or imported cleanly.
- **Tailwind v4 Integration**: Maintain compatibility with Tailwind v4 by keeping base directives intact but enhancing them with SCSS capabilities.

## 4. UI/UX Principles (Apple-like Minimalism)

- **Minimalism**: Maximize whitespace. Reduce borders to the absolute minimum necessary.
- **Typography**: Rely on font weight, size, and subtle color contrast to establish hierarchy rather than boxes and lines.
- **Micro-interactions**: Use subtle transitions and active-state scaling (e.g., `active:scale-[0.98]`) to provide tactile feedback without being distracting.
- **Mobile-First & Responsive**: The UI MUST be designed mobile-first. Every single screen must be 100% responsive across all device sizes (mobile, tablet, desktop) now and in the future.
- **Accessibility**: The application MUST be 100% ADA compliant. Ensure proper ARIA labels, semantic HTML, keyboard navigability, and sufficient color contrast at all times.

## 5. Component Library & Reusability

- **Internal Component Library**: ALL UI components must be created within our internal `src/components/` library.
- **Zero Redundancy**: Before building a new component, you MUST check if an existing one can be extended or reused. Do not create new components unnecessarily. Reusability is a top priority.

## 6. Performance & Rendering Strategy

- **Heavy Optimization**: The UI must be super performant. Optimize images, code splitting, and bundle sizes.
- **Rendering Paradigms**: Intelligently leverage Next.js rendering strategies (CSR vs SSR vs SSG vs Hybrid). Use Server Components (SSR) by default for data fetching and performance, and only use Client Components (CSR, `"use client"`) when interactivity or browser APIs are strictly required.
