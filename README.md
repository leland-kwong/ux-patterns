# 🚀 Leland Admin Starter (The "No-Nonsense" Stack)

A high-performance, type-safe React admin dashboard designed for **Enterprise workflows**, not social media apps.

This starter kit is built by Leland Studio for clients who value **Clarity** and **Execution** over flashy complexity.

## 🧠 The Philosophy

Most admin templates are over-engineered. They prioritize virtualization demos over actual usability. This starter kit is built on three contrarian opinions that save engineering time and improve user outcomes:

### 1. Pagination > Virtualization

**Virtual Scrolling is an anti-pattern in Enterprise UI.**

- **The Problem:** Virtualization breaks fundamental browser features (like native `Cmd+F` search) and introduces massive engineering overhead when dealing with variable-height rows and complex state management.
- **The Solution:** We use **Server-Side Pagination** and **High-Density Layouts**. This respects the DOM, respects accessibility standards, and eliminates scroll jitter.

### 2. Search First, Scroll Second

If a user has to scroll past row 50, the UI has failed.

- Instead of optimizing for "rendering 10,000 rows," we optimize for **filtering down to the 10 rows that matter.**
- This starter features a **Command Palette-style filter bar** that empowers the user to build precise queries, treating the grid as the _result_ of a search, not the primary navigation tool.

### 3. Boring Code is Better

- We prioritize **Stability**, **Type Safety**, and **Respect for the User’s CPU**.
- The code is built with clear separation of concerns (TanStack for logic, Tailwind for presentation). The complexity should live in your business logic, not your UI library.

---

## 🛠 Tech Stack

| Component      | Purpose                                           |
| :------------- | :------------------------------------------------ |
| **Framework**  | Next.js 14 (App Router)                           |
| **Styling**    | Tailwind CSS + `shadcn/ui` (Enterprise Aesthetic) |
| **Data Grid**  | TanStack Table (Logic)                            |
| **State Sync** | `nuqs` (URL Query String Management)              |
| **Utility**    | `clsx`, `tailwind-merge`                          |

## 🚀 Key Features

- **URL-Syncable Filters:** Every query is reflected in the URL, making views instantly shareable and bookmarkable (a critical feature for SRE/SecOps).
- **Performance-Focused Data Handling:** Optimized for fetching and displaying data fast, without relying on computationally expensive virtualization libraries.
- **Clean, Accessible UI:** Built on Radix Primitives for keyboard navigation and WCAG compliance.

---

**Need help implementing this philosophy in your existing application?**
I am a Senior Design Engineer with specialized experience building high-performance, data-heavy applications. I offer short-term consultation sprints to upgrade your existing UI or architect a new one.

_Connect with Leland Kwong at https://www.linkedin.com/in/lelandkwong/ or lelandkwong.com._
