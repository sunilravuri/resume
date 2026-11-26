"use client";

import { useState, type CSSProperties } from "react";
import { profile, type SkillCategoryId } from "@/data/profile";
import { Reveal } from "./motion/Reveal";
import { TiltCard } from "./motion/TiltCard";

type Filter = "all" | SkillCategoryId;

/** Literal class strings so Tailwind can see them at build time. */
const CATEGORY_STYLES: Record<SkillCategoryId, { dot: string; badge: string; pill: string }> = {
  genai: {
    dot: "bg-emerald-400",
    badge: "border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-200 hover:border-emerald-400/60",
    pill: "border-emerald-500/50 bg-emerald-500/15 text-emerald-200",
  },
  cloud: {
    dot: "bg-cyan-400",
    badge: "border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-200 hover:border-cyan-400/60",
    pill: "border-cyan-500/50 bg-cyan-500/15 text-cyan-200",
  },
  database: {
    dot: "bg-amber-400",
    badge: "border-amber-500/25 bg-amber-500/[0.06] text-amber-200 hover:border-amber-400/60",
    pill: "border-amber-500/50 bg-amber-500/15 text-amber-200",
  },
  observability: {
    dot: "bg-violet-400",
    badge: "border-violet-500/25 bg-violet-500/[0.06] text-violet-200 hover:border-violet-400/60",
    pill: "border-violet-500/50 bg-violet-500/15 text-violet-200",
  },
};

export function SkillsMatrix() {
  const [filter, setFilter] = useState<Filter>("all");
  const total = profile.skills.reduce((n, c) => n + c.skills.length, 0);
  const visible = profile.skills.filter((c) => filter === "all" || c.id === filter);

  return (
    <div>
      <div role="group" aria-label="Filter skills" className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          className={`rounded-full border px-4 py-1.5 text-sm transition ${
            filter === "all" ? "border-zinc-500 bg-zinc-800 text-zinc-100" : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
          }`}
        >
          All <span className="ml-1 font-mono text-xs text-zinc-500">{total}</span>
        </button>
        {profile.skills.map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={active}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition ${
                active ? CATEGORY_STYLES[c.id].pill : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
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
      <div key={filter} className={`mt-6 grid gap-4 ${filter === "all" ? "md:grid-cols-2" : ""}`}>
        {visible.map((c, ci) => (
          <Reveal key={c.id} delay={ci * 80}>
            <TiltCard maxTilt={3} className="h-full rounded-2xl">
              <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-100">
                    <span className={`h-2 w-2 rounded-full ${CATEGORY_STYLES[c.id].dot}`} />
                    {c.title}
                  </h3>
                  <span className="font-mono text-[11px] text-zinc-600">{String(c.skills.length).padStart(2, "0")} skills</span>
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
