# Sunil Krishna Ravuri: Portfolio

An interactive single-page portfolio. It has a projects carousel with interactive architecture diagrams, scrolling technology rows, a filterable skills matrix, a scroll-driven career timeline, credentials, a contact section, and a printable **Resume Dossier**.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Lucide React · simple-icons

The whole site is statically prerendered. It has no API routes, no environment variables, and no paid services, so it fits Vercel's free Hobby plan.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static)
```

## Deploy to Vercel

Push this folder to a Git repo, import it in Vercel, and deploy. No settings or environment variables are needed.

## Editing content

| File | What it controls |
|---|---|
| `data/profile.ts` | Name, headline, summary, metrics, contact, experience, education, certifications, skills |
| `data/projects.ts` | Projects carousel cards. Add real projects here (see below). |
| `data/architectures.ts` | Interactive diagrams (stages, nodes, design notes) |
| `data/technologies.ts` | Logo rows in the tech marquee |
| `lib/palettes.ts` | The light and dark color palettes, and which is the default (`DEFAULT_PALETTE`) |

The page and the plain-text / printable resume are all generated from these files.

### Adding a real project

Append to `projects` in `data/projects.ts`:

```ts
{
  id: "my-project",
  kind: "project",                // shows a "Project" badge instead of "Reference Blueprint"
  title: "Project name",
  tagline: "One-sentence summary of what was built.",
  description: "Optional longer text shown when the card is opened.",
  tags: ["LangGraph", "Azure AI Search"],
  period: "2025",                 // optional
  architectureId: "genai",        // optional: link to a diagram in data/architectures.ts
  links: [{ label: "GitHub", href: "https://github.com/…" }], // optional
}
```

## Interactions

- Scroll progress bar, sections that fade in as you scroll, skill and certification badges that cascade in
- Hero numbers count up, and a spotlight follows the mouse in the hero
- Cards tilt and glow on hover (mouse only)
- Two logo rows scroll in opposite directions and pause on hover or keyboard focus
- Projects carousel: drag with the mouse, swipe on touch, use the arrow buttons or ← → keys, and click a card to open its diagram
- Timeline dots and the timeline line light up as you scroll past each role
- **Reduced motion:** when the OS asks for it, every animation is off. Content appears immediately, the logo rows become a static grid, and tilt and spotlight are disabled.
- Light mode (Sunrise) by default, with a ☾/☀ button in the nav to switch to dark mode (Sunset). The choice is remembered.
- Cmd/Ctrl+P anywhere prints only the resume

## Structure

```
app/            layout.tsx, page.tsx, globals.css (theme, motion, print styles)
components/
  Nav.tsx, Hero.tsx, TechMarquee.tsx, ProjectsCarousel.tsx, ArchitectureDiagram.tsx,
  SkillsMatrix.tsx, ExperienceTimeline.tsx, Credentials.tsx, Contact.tsx,
  ResumeModal.tsx, Modal.tsx, ThemeToggle.tsx
  motion/       Reveal, CountUp, TiltCard, ScrollProgress
data/           profile, projects, architectures, technologies
lib/            palettes.ts, resume.ts (plain-text resume), useReducedMotion.ts
```

Logos: brand marks come from [simple-icons](https://simpleicons.org) (CC0). Brands not included there (Oracle, Microsoft, AWS, and some AI tools) use neutral Lucide icons.
