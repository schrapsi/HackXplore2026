# HackXplore 2026 - Agent Context & Rules

Welcome to the **HackXplore 2026** workspace. This file defines project conventions, technical architecture, coding standards, and constraints for all AI agents working on this codebase.

---

## 🚀 Project Overview

**HackXplore 2026** is a web-based matching application designed to pair philanthropic donors with high-impact community and open-source projects based on their area of interest and budget commitment.

- **Main Objective:** Enable users to query matching projects based on a natural language prompt (societal contribution goal) and commitment tier.
- **Workflow:**
  1. **Landing View:** Prompts the user with "How do you want to contribute to society?" and allows them to pick a budget commitment tier.
  2. **Discovery View:** Lists a grid of curated matching projects with key metrics (location, category, impact metric, and visual thumbnail).

---

## 🛠️ Technology Stack & Architecture

This application is built with modern frontend tools, leveraging utility styling and semantic design components:

| Tool / Library | Role | Version | Notes / Conventions |
| :--- | :--- | :--- | :--- |
| **React** | UI library | `^19.2.7` | Standard functional components with React Hooks (`useState`). |
| **Vite** | Build tool / Bundler | `^8.1.0` | Uses `@tailwindcss/vite` plugin for build integration. |
| **TypeScript** | Language safety | `~6.0.2` | Interfaces and types are declared in [src/types.ts](file:///home/simeon/GitRepositories/HackXplore2026/src/types.ts). |
| **Tailwind CSS** | Styling engine | `^4.3.1` | Utility classes; avoid inline styles. |
| **daisyUI** | Component classes | `^5.6.3` | Semantic layout classes (`btn`, `card`, `textarea`, `badge`, `divider`). |
| **Oxlint** | Linting engine | `^1.69.0` | Configured via [.oxlintrc.json](file:///home/simeon/GitRepositories/HackXplore2026/.oxlintrc.json). |
| **Vercel** | Hosting | - | Configured with automatic previews on pull requests. |

---

## 📂 Key Codebase Map

When modifying or expanding the application, prioritize consistency with these files:

- **Routing & State:** [src/App.tsx](file:///home/simeon/GitRepositories/HackXplore2026/src/App.tsx) handles main app routing (`landing` ↔ `discovery`) and matches search states.
- **Landing Component:** [src/components/LandingPage.tsx](file:///home/simeon/GitRepositories/HackXplore2026/src/components/LandingPage.tsx) handles input textareas and budget tier options.
- **Discovery Component:** [src/components/ProjectDiscovery.tsx](file:///home/simeon/GitRepositories/HackXplore2026/src/components/ProjectDiscovery.tsx) lists search results and project cards.
- **Matching Algorithm & Data:** [src/data/projects.ts](file:///home/simeon/GitRepositories/HackXplore2026/src/data/projects.ts) houses project definitions and the scoring system (`processUserInput`).
- **Data Schemas:** [src/types.ts](file:///home/simeon/GitRepositories/HackXplore2026/src/types.ts) houses the core `Project` interface.

---

## 📝 Coding & Styling Guidelines

### 1. Styling & Components (Tailwind CSS + daisyUI)
- Leverage **daisyUI** classes (`btn-primary`, `card-body`, `badge`, etc.) rather than manually creating button or card borders.
- Utilize Tailwind's reactive classes (like `hover:shadow-2xl`, `transition-all`, and `duration-300`) to design responsive and interactive elements.
- Keep the page accessible by using semantic colors (e.g. `bg-base-100` for cards, `bg-base-200` for panels, and `text-base-content` for general text) rather than hardcoded gray/white values to support various daisyUI themes seamlessly.

### 2. Type Safety & Imports
- Import the `Project` type strictly from `src/types.ts` as `import type { Project } from '...'` to avoid import cycle issues.
- All new components must have interfaces or types declared for their props.

### 3. Verification & Linting
- Always run `npm run lint` (or `npx oxlint`) after any code additions or changes to check for lint issues.
- Verify that the production build passes via `npm run build` prior to proposing code deployment or declaring a task complete.

---

## ⚙️ Development Command Cheat Sheet

- **Install dependencies:** `npm install`
- **Run dev server:** `npm run dev`
- **Build production bundle:** `npm run build`
- **Run linter:** `npm run lint`
