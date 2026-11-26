"use client";

import { Building2, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

/** Fraction of the viewport height a dot must scroll past to light up. */
const TRIGGER = 0.6;

export function ExperienceTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState<boolean[]>(() => profile.experience.map(() => false));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * TRIGGER;
      const next = itemRefs.current.map((el) => (el ? el.getBoundingClientRect().top + 14 < line : false));
      setLit((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));

      const list = listRef.current;
      if (list && fillRef.current) {
        const rect = list.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={listRef} className="relative ml-3">
      {/* Track + scroll-driven fill */}
      <div className="absolute bottom-0 left-0 top-0 w-px bg-zinc-800" aria-hidden />
      <div
        ref={fillRef}
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-emerald-400 via-emerald-400 to-cyan-400 shadow-[0_0_6px] shadow-emerald-400/70"
        style={{ transform: "scaleY(0)" }}
        aria-hidden
      />

      <ol>
        {profile.experience.map((role, i) => {
          const current = role.end === "Present";
          const on = lit[i];
          return (
            <li
              key={role.company}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative pb-10 pl-8 last:pb-0"
            >
              <span
                className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all duration-500 motion-reduce:transition-none ${
                  on
                    ? "scale-110 border-emerald-400 bg-emerald-400 shadow-[0_0_14px] shadow-emerald-400/80"
                    : "border-zinc-600 bg-zinc-950"
                }`}
                aria-hidden
              />
              <div
                className={`rounded-2xl border bg-zinc-900/60 p-5 transition-colors duration-500 motion-reduce:transition-none ${
                  on ? "border-zinc-700" : "border-zinc-800"
                }`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p
                      className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ${on ? "text-emerald-400" : "text-zinc-500"}`}
                    >
                      {String(profile.experience.length - i).padStart(2, "0")} · {role.company}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-zinc-100">{role.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    {current && (
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase text-emerald-300">
                        current
                      </span>
                    )}
                    <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-xs text-zinc-300">
                      {role.start} – {role.end}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-zinc-400">
                  {(role.employmentType || role.workplace) && (
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-zinc-600" />
                      {[role.employmentType, role.workplace].filter(Boolean).join(" · ")}
                    </span>
                  )}
                  {role.locations.map((loc) => (
                    <span key={loc.period} className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-600" />
                      {loc.location}
                      {role.locations.length > 1 && <span className="font-mono text-zinc-600">({loc.period})</span>}
                    </span>
                  ))}
                </div>

                <ul className="mt-4 space-y-1.5">
                  {role.focus.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-zinc-300">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
