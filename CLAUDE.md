# Project Architecture

## Overview
Interactive personal portfolio for Naga V Sunil K Ravuri: a single static Next.js page with a projects carousel (opening interactive architecture diagrams), technology marquees, skills matrix, scroll-driven career timeline, credentials, contact, and a copyable/printable resume.

## Tech Stack
- Runtime: Node.js 22, Next.js 16 (App Router, Turbopack). The page is fully static (`○ /`).
- Language: TypeScript 5.9 (strict). TS 7 is intentionally not used, because Next's build-time type check relies on the JS TypeScript API.
- Styling: Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`, no tailwind.config)
- Icons: lucide-react for UI icons, simple-icons for brand logos. Neither ships a LinkedIn logo, so `UserPlus` is used instead.
- Deployment: Vercel free Hobby plan. **Hard constraint: no API routes, API keys, or paid services.**

## Project Structure
- `data/`: content only. `profile.ts` (facts), `projects.ts` (carousel cards), `architectures.ts` (diagrams), `technologies.ts` (marquee logos).
- `lib/`: `palettes.ts` (color palettes + generated CSS), `resume.ts` (plain-text resume), `useReducedMotion.ts` (useSyncExternalStore hook).
- `components/`: one component per section. `components/motion/` holds the reusable motion primitives (Reveal, CountUp, TiltCard, ScrollProgress). `Modal.tsx` is the shared dialog shell.

## Conventions
- Never hard-code profile facts in components. Read them from `data/`.
- **No invented projects, metrics, or results.** Real projects use `kind: "project"` and come first in the carousel; their facts come from each project's code and public pages. The three reference cards are `kind: "blueprint"` and labeled "Reference Blueprint". `ArchitectureDiagram` takes `isProject` so the footnote matches the card kind.
- Tailwind classes that vary by category must be full literal strings in a lookup map (see `SkillsMatrix.tsx`).
- **Colors are semantic tokens, never raw hues.** Use `ink-*` (neutrals: `bg-ink-950` page, `bg-ink-900/60` cards, `border-ink-800`, `text-ink-100` headings), `primary-*`, `secondary-*`, and `tertiary-*` / `quaternary-*` (skill categories only). Writing `emerald-400` or `zinc-800` in a component breaks palette switching. The scale is called `ink` because `base` would clash with Tailwind's `text-base` font size.
- Monospace for tags and metrics.

## Architectural Decisions
- **Palettes:** `lib/palettes.ts` is the single source. Each palette maps the tokens onto Tailwind color scales; `paletteCss()` generates `:root[data-theme=…]` blocks that are inlined in `<head>` by `app/layout.tsx`, and `paletteInitScript()` applies the saved choice (localStorage `palette`) before first paint. `globals.css` registers the tokens in `@theme` with Terminal defaults and imports Tailwind with `theme(static)` so every hue variable exists at runtime. Light palettes reuse the same classes by inverting the scales (`LIGHT_INK`, `LIGHT_ACCENT`). The site ships two palettes: **Sunrise (light, default)** and **Sunset (dark)**. `ThemeToggle` in the nav switches between them (View Transition cross-fade when supported); its icons swap through the `dark:` custom variant (`[data-theme="sunset"]`), so no React state is needed. A saved id that no longer exists falls back to the default.
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

## Color palettes and mobile pass (2026-11-26)
- **Added:** five palettes (Terminal default, Ocean, Aurora, Sunset, and Paper light mode) in `lib/palettes.ts`, plus `components/PaletteSwitcher.tsx` in the nav. Renamed all color classes to the semantic tokens (emerald→primary, cyan→secondary, amber→tertiary, violet→quaternary, zinc→ink). `TiltCard` glow prop is now `"primary" | "secondary"`. Raw rgb values in globals.css became `color-mix()` on tokens.
- **Mobile:** tighter section padding, "Resume" label on phones, swipeable skill filter row, certifications as compact rows, contact cards with side-by-side icon headers, "hover to pause" hidden on touch devices, and modal titles truncate instead of wrapping the close button. Mobile page height went from 7792px to 6785px.
- **Verified in headless Chrome:** all five palettes at 1440px, Terminal and Paper at 390px, no horizontal overflow, picker opens/closes (outside tap), switching updates the page and `theme-color`, choice persists across reload, diagram modal readable in Paper, zero console errors. `tsc` and `next build` clean, page still static.
- **Warm palettes added (same day):** the user liked Sunset, so Dusk, Ember, Copper, Golden Hour and Sunrise (light) were added. That makes 11 palettes; the picker list now scrolls (`max-h` on the radiogroup). The default is still Terminal until the user picks one.

## Sunrise default + light/dark toggle (2026-11-26)
- The user chose **Sunrise** (light) as the look, with **Sunset** as the dark option. The other nine palettes were removed (never committed; recreate them in `PALETTES` if wanted). `PaletteSwitcher.tsx` was replaced by `ThemeToggle.tsx` (☾/☀ button). `globals.css` `@theme` fallbacks are now the Sunset hues, and a `dark:` custom variant targets Sunset.
- **Verified:** first visit is light; toggling switches to dark and saves it; the choice survives a reload; toggling back works; an old saved palette id falls back to light; no console errors; build is static.

## Resume refresh: AI projects (2026-11-26)
- **Profile:** name is now "Naga V Sunil K Ravuri" (user's choice). AA title is Sr. Infrastructure Engineer, with the Grievance Code RAG agent, RADAR and ExaPatch as focus items. Doyensys and Capital One merged into one entry ("Doyensys Inc (client: Capital One)", Jun 2016 – Mar 2017). TCS dates are Aug 2010 – May 2016. Certifications are the user's list of 5 (Azure Solutions Architect replaces Azure Admin; OCI Architect left out pending the user's confirmation). Skills gained MCP, A2A, Claude, Gemini, DeepEval, Document Intelligence and app-dev items; the fourth category is now "Development, IaC & Observability". GitHub added to contact.
- **Projects:** three real projects (Worq360/SDVS, VitalSync Family Health, Agentic Trading Assistant) with `period`, `role`, `highlights` and their own diagrams in `architectures.ts` (Worq360 has 5 stages). The project modal shows period, role and highlights. Only Worq360 has public links (sunilravuri.github.io and its build log); the other repos are private. Worq360 figures match its public page (10 agents, 140+ tools, 37 modules, 3,000+ tests).
- **Resume:** the formatted, print and plain-text resumes gained an "Independent AI Projects" section built from `kind: "project"` entries.
- **Diagram icons:** added `shield`, `phone` and `chat`. Marquee gained MCP, Anthropic, Gemini, Ollama, Copilot, FastAPI, TypeScript, NestJS, Angular, Docker and Firebase.
- **Verified in headless Chrome:** `tsc` and `next build` clean, page static; project cards and all three diagram modals at 1440px; Worq360 modal at 390px; no horizontal overflow; print resume includes the projects; no page errors. The only console error is a pre-existing `/favicon.ico` 404.

