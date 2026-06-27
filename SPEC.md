# Technical Specification - HackXplore 2026

Welcome to the **HackXplore 2026** technical specification. This document outlines the project's architecture, technology stack, and deployment pipeline.

## 🚀 Tech Stack Overview

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Library** | [React](https://react.dev/) | Component-based UI library for building interactive user interfaces. |
| **Build Tool & Bundler** | [Vite](https://vite.dev/) | Fast build tool and development server for modern web projects. |
| **Styling Framework** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for rapid UI styling. |
| **Component Library** | [daisyUI](https://daisyui.com/) | Tailwind CSS component library offering semantic class names and pre-designed UI elements. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Static typing to ensure code reliability and robust autocompletion. |
| **Deployment & Hosting** | [Vercel](https://vercel.com/) | Cloud platform for static sites and Serverless Functions, optimized for React. |

---

## 🎨 UI & Styling Architecture

We use **Tailwind CSS** as our styling engine combined with **daisyUI** to speed up component prototyping while retaining complete styling control.

### daisyUI Integration
- **Themes**: daisyUI provides built-in dark/light modes and custom themes. We will configure themes in `tailwind.config.js`.
- **Component Classes**: Leverage daisyUI's clean syntax (e.g., `btn`, `card`, `modal`, `navbar`) to build responsive layouts quickly.

Example configuring `tailwind.config.js` with daisyUI:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave"],
  },
}
```

---

## 📦 Deployment Pipeline (Vercel)

The application is configured for deployment on **Vercel** with automatic Git integration.

### CI/CD Workflow
1. **Preview Deployments**: Every pull request or non-main push automatically generates a unique preview URL.
2. **Production Deployment**: Merging or pushing to the main branch triggers a production build.
3. **Environment Variables**: Configured securely via the Vercel Dashboard.

### Build Configuration (Vite/React)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## ⚙️ Development Guide

To set up the development environment:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```
