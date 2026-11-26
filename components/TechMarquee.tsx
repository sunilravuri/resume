import { BrainCircuit, Cloud, Database, Gauge, GitMerge, Search, Server, Workflow, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { techRowA, techRowB, type FallbackIcon, type Technology } from "@/data/technologies";

const FALLBACK_ICONS: Record<FallbackIcon, LucideIcon> = {
  cloud: Cloud,
  database: Database,
  brain: BrainCircuit,
  search: Search,
  gauge: Gauge,
  workflow: Workflow,
  server: Server,
  replicate: GitMerge,
};

/** Brand colors that are too dark on zinc-950 fall back to a light neutral. */
function readableHex(hex: string): string {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.28 ? "#e4e4e7" : `#${hex}`;
}

function TechTile({ tech }: { tech: Technology }) {
  const Fallback = tech.fallback ? FALLBACK_ICONS[tech.fallback] : null;
  const style = { "--brand": tech.brand ? readableHex(tech.brand.hex) : "#6ee7b7" } as CSSProperties;

  return (
    <div className="pr-3">
      <div
        style={style}
        className="group/tile flex items-center gap-2.5 whitespace-nowrap rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-(color:--brand)"
      >
        {tech.brand ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden>
            <path d={tech.brand.path} />
          </svg>
        ) : Fallback ? (
          <Fallback className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
        ) : null}
        <span className="text-sm text-zinc-300 transition-colors group-hover/tile:text-zinc-50">{tech.name}</span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse, duration }: { items: Technology[]; reverse?: boolean; duration: number }) {
  return (
    <div className="marquee">
      <div
        className="marquee-track"
        data-direction={reverse ? "reverse" : "forward"}
        style={{ "--duration": `${duration}s` } as CSSProperties}
      >
        <ul className="flex" aria-label="Technologies">
          {items.map((t) => (
            <li key={t.name}>
              <TechTile tech={t} />
            </li>
          ))}
        </ul>
        {/* Duplicate set makes the loop seamless; hidden from assistive tech and under reduced motion. */}
        <ul className="marquee-dup flex" aria-hidden>
          {items.map((t) => (
            <li key={t.name}>
              <TechTile tech={t} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section aria-label="Technology stack" className="border-y border-zinc-900 bg-zinc-950/60 py-8">
      <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-600">
        the stack · hover to pause
      </p>
      <div className="space-y-3">
        <MarqueeRow items={techRowA} duration={55} />
        <MarqueeRow items={techRowB} duration={60} reverse />
      </div>
    </section>
  );
}
