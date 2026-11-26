"use client";

import { useState, type CSSProperties } from "react";
import { profile, type SkillCategoryId } from "@/data/profile";
import { Reveal } from "./motion/Reveal";
import { TiltCard } from "./motion/TiltCard";

type Filter = "all" | SkillCategoryId;

/** Literal class strings so Tailwind can see them at build time. */
const CATEGORY_STYLES: Record<SkillCategoryId, { dot: string; badge: string; pill: string }> = {
  genai: {
    dot: "bg-primary-400",
    badge: "border-primary-500/25 bg-primary-500/[0.06] text-primary-200 hover:border-primary-400/60",
    pill: "border-primary-500/50 bg-primary-500/15 text-primary-200",
  },
  cloud: {
    dot: "bg-secondary-400",
    badge: "border-secondary-500/25 bg-secondary-500/[0.06] text-secondary-200 hover:border-secondary-400/60",
    pill: "border-secondary-500/50 bg-secondary-500/15 text-secondary-200",
  },
  database: {
    dot: "bg-tertiary-400",
    badge: "border-tertiary-500/25 bg-tertiary-500/[0.06] text-tertiary-200 hover:border-tertiary-400/60",
    pill: "border-tertiary-500/50 bg-tertiary-500/15 text-tertiary-200",
  },
  observability: {
    dot: "bg-quaternary-400",
    badge: "border-quaternary-500/25 bg-quaternary-500/[0.06] text-quaternary-200 hover:border-quaternary-400/60",
    pill: "border-quaternary-500/50 bg-quaternary-500/15 text-quaternary-200",
  },
};

export function SkillsMatrix() {
  const [filter, setFilter] = useState<Filter>("all");
  const total = profile.skills.reduce((n, c) => n + c.skills.length, 0);
  const visible = profile.skills.filter((c) => filter === "all" || c.id === filter);

  return (
    <div>
      {/* Single swipeable row on phones, wrapping row from sm up. */}
      <div
        role="group"
        aria-label="Filter skills"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      >
        <button
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${
            filter === "all" ? "border-ink-500 bg-ink-800 text-ink-100" : "border-ink-800 text-ink-400 hover:border-ink-600 hover:text-ink-200"
          }`}
        >
          All <span className="ml-1 font-mono text-xs text-ink-500">{total}</span>
        </button>
        {profile.skills.map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={active}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${
                active ? CATEGORY_STYLES[c.id].pill : "border-ink-800 text-ink-400 hover:border-ink-600 hover:text-ink-200"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_STYLES[c.id].dot}`} />
              {c.label}
              <span className="font-mono text-xs opacity-60">{c.skills.length}</span>
            </button>
          );
        })}
      </div>

      {/* Keyed by filter so switching categories replays the badge cascade. */}
      <div key={filter} className={`mt-5 grid gap-3 sm:mt-6 sm:gap-4 ${filter === "all" ? "md:grid-cols-2" : ""}`}>
        {visible.map((c, ci) => (
          <Reveal key={c.id} delay={ci * 80}>
            <TiltCard maxTilt={3} className="h-full rounded-2xl">
              <div className="h-full rounded-2xl border border-ink-800 bg-ink-900/60 p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-ink-100">
                    <span className={`h-2 w-2 rounded-full ${CATEGORY_STYLES[c.id].dot}`} />
                    {c.title}
                  </h3>
                  <span className="font-mono text-[11px] text-ink-600">{String(c.skills.length).padStart(2, "0")} skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((s, i) => (
                    <span
                      key={s}
                      style={{ "--i": i } as CSSProperties}
                      className={`stagger-item rounded-md border px-2.5 py-1 font-mono text-xs ${CATEGORY_STYLES[c.id].badge}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
