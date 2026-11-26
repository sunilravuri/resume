# Project Architecture

## Overview
Interactive personal portfolio for Sunil Krishna Ravuri: a single static Next.js page with a projects carousel (opening interactive architecture diagrams), technology marquees, skills matrix, scroll-driven career timeline, credentials, contact, and a copyable/printable resume.

## Tech Stack
- Runtime: Node.js 22, Next.js 16 (App Router, Turbopack). The page is fully static (`○ /`).
- Language: TypeScript 5.9 (strict). TS 7 is intentionally not used, because Next's build-time type check relies on the JS TypeScript API.
- Styling: Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`, no tailwind.config)
- Icons: lucide-react for UI icons, simple-icons for brand logos. Neither ships a LinkedIn logo, so `UserPlus` is used instead.
- Deployment: Vercel free Hobby plan. **Hard constraint: no API routes, API keys, or paid services.**

## Project Structure
- `data/`: content only. `profile.ts` (facts), `projects.ts` (carousel cards), `architectures.ts` (diagrams), `technologies.ts` (marquee logos).
- `lib/`: `resume.ts` (plain-text resume), `useReducedMotion.ts` (useSyncExternalStore hook).
- `components/`: one component per section. `components/motion/` holds the reusable motion primitives (Reveal, CountUp, TiltCard, ScrollProgress). `Modal.tsx` is the shared dialog shell.

## Conventions
- Never hard-code profile facts in components. Read them from `data/`.
- **No invented projects, metrics, or results.** The three carousel cards are `kind: "blueprint"` and labeled "Reference Blueprint". Real projects are added with `kind: "project"`.
- Tailwind classes that vary by category must be full literal strings in a lookup map (see `SkillsMatrix.tsx`).
- Palette: zinc-950 background, zinc-900/60 cards, zinc-800 borders, emerald (primary) and cyan (secondary) accents, monospace for tags and metrics.

## Architectural Decisions
- **Motion is CSS-first.** JS only sets data attributes and CSS variables (`data-revealed`, `--rx/--ry/--gx/--gy`, `--sx/--sy`, `--i`). Every effect is turned off under `prefers-reduced-motion: reduce` in globals.css, and `@media (scripting: none)` keeps content visible without JS.
- **Stagger scoping:** `.stagger-item` animates when its ancestor `.reveal` is revealed. Section bodies are NOT wrapped in an outer Reveal when they contain stagger items (SkillsMatrix, Credentials, Contact manage their own), or the outer reveal would trigger the cascade early.
- **Modals render in a portal on `<body>`**, because TiltCard and Reveal use transforms, which would otherwise trap `position: fixed`.
- **Carousel:** native overflow scrolling with scroll-snap handles touch swipe. Mouse drag is done with pointer events plus window listeners, and a click-suppression flag stops a drag from opening a card. Arrow buttons step relative to `scrollLeft` (not an index), because the last slides can't reach the track start.
- **Resume Dossier:** the modal state lives in `Nav`. Other components open it through `openResumeDossier()` (a window event). The always-mounted `#resume-print` portal plus print CSS make Cmd/Ctrl+P print only the resume.
- **Count-up:** the server render shows the final value (SEO and no-JS). The client resets to 0 and animates when the element enters the viewport.

---

# Runbook: What Has Been Built

## Project Initialized (2026-11-25)
- Scaffolded Next.js 16 + TS + Tailwind v4 manually. Built the Hero, Architecture tabs, Skills, Experience, Credentials, and Resume Dossier.

## Static rebuild, interactive pass (2026-11-25)
- **Removed:** the AI Twin chat, `/api/chat`, `lib/prompt.ts`, `Markdown.tsx`, `.env.example`, and the `ai` / `@ai-sdk/*` dependencies.
- **Added:** Contact section (email with copy button, LinkedIn, Resume Dossier card) and `profile.contact` filled in. Added TechMarquee (two opposite rows that pause on hover), ProjectsCarousel plus `data/projects.ts` (the three blueprints; opening a card shows `ArchitectureDiagram` in a modal), and a scroll progress bar. Timeline dots and line now light up as you scroll. Also added scroll reveals, staggered badges, hero count-up, tilt and glow cards, and the hero spotlight.
- **Renamed:** `ArchitectureViewer.tsx` → `ArchitectureDiagram.tsx` (single diagram, no tabs). Nav is now Overview / Projects / Skills / Experience / Credentials / Contact.
- **Verified in headless Chrome:** `tsc` and `next build` are clean and the page is static. Checked all reveals, count-up, progress bar, progressive timeline lighting, opposite marquee directions, carousel arrows in both directions at 1440px and 390px, drag that doesn't open a card, tilt variables, modal open and Esc close, no horizontal overflow at 390px, reduced-motion behavior (no marquee animation, duplicates hidden, content visible, counters final), and zero console errors.

## Git and deploy setup (2026-11-26)
- Remote: `https://github.com/sunilravuri/resume.git`, branch `main`. The site commit sits on top of the repo's original "Initial commit" (its one-line README was replaced).
- Deploy: import the repo in Vercel (Framework preset: Next.js, no env vars). Vercel redeploys on every push to `main`.
