# Project Roadmap & Refactoring Plan

## 🚨 Critical Refactoring (>200 lines)

The following files are too large/complex and need to be broken down into smaller components.

- [ ] **`src/app/dashboard/page.tsx`** (~230 lines)
  - **Current State**: Contains Data Fetching, State Management, Stats Grid UI, Projects Table UI, and Create Project Dialog UI.
  - **Action**:
    - [ ] Extract `StatsGrid` component.
    - [ ] Extract `ProjectsTable` component.
    - [ ] Extract `CreateProjectDialog` component.
    - [ ] Move logic to a custom hook (already partly done with `useProjects`, but UI state is mixed).

## 🎨 Design System Unification

We currently have a split personality in design tokens. We need to standardize to use **Semantic Variables** (defined in `globals.css`) instead of **Raw Colors**.

- [ ] **Audit & Fix Color Usage**
  - **Issue**: `dashboard/page.tsx` uses raw colors like `text-slate-600`, `bg-blue-900`. `page.tsx` (Landing) uses semantic colors like `text-muted-foreground`.
  - **Goal**: Replace all hardcoded colors with semantic design tokens.
  - **Action**:
    - `text-slate-600` -> `text-muted-foreground`
    - `bg-white/50` -> `bg-card/50` or `bg-background/50`
    - `border-slate-200` -> `border-border`
    - gradients -> Define semantic gradients or use primary/secondary tokens.

## 🛠 Features & Improvements

- [ ] **Review `DashboardSidebar.tsx`**
  - Check if it exceeds complexity limits or uses raw colors.
- [ ] **Accessibility Check**
  - Ensure all form inputs (in Dialogs) have associated labels.
  - Check contrast ratios (fixing raw colors to semantic usually helps this if the theme is good).
- [ ] **Dark Mode Consistency**
  - Verify that raw dark mode classes (e.g. `dark:text-slate-400`) are replaced by the natural behavior of semantic tokens (which handle dark mode automatically).

## 📝 Next Steps

1.  **Refactor `dashboard/page.tsx`** (Highest Priority).
2.  **Standardize Design Tokens** in Dashboard components.
