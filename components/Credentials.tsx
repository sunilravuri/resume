import { BadgeCheck, GraduationCap } from "lucide-react";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { Reveal } from "./motion/Reveal";
import { TiltCard } from "./motion/TiltCard";

export function Credentials() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Reveal>
        <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
          <GraduationCap className="h-4 w-4 text-primary-400" /> Education
        </h3>
        {profile.education.map((e) => (
          <TiltCard key={e.school} className="rounded-2xl">
            <div className="rounded-2xl border border-ink-800 bg-ink-900/60 p-5 sm:p-6">
              <span className="rounded-md border border-ink-800 bg-ink-950 px-2 py-0.5 font-mono text-xs text-ink-400">
                {e.start} – {e.end}
              </span>
              <p className="mt-3 text-lg font-semibold text-ink-100 sm:mt-4">{e.school}</p>
              <p className="mt-1 text-sm text-ink-400">{e.degree}</p>
            </div>
          </TiltCard>
        ))}
      </Reveal>

      <Reveal delay={100}>
        <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
          <BadgeCheck className="h-4 w-4 text-secondary-400" /> Certifications
          <span className="text-ink-700">({profile.certifications.length})</span>
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {profile.certifications.map((c, i) => (
            <li key={c.name} className="stagger-item" style={{ "--i": i * 2 } as CSSProperties}>
              <TiltCard glow="secondary" className="h-full rounded-xl">
                {/* Compact row on phones, stacked card from sm up. */}
                <div className="flex h-full items-start gap-3 rounded-xl border border-ink-800 bg-ink-900/60 p-3.5 transition-colors hover:border-secondary-500/40 sm:flex-col sm:gap-0 sm:p-4">
                  <span className="mt-0.5 w-20 shrink-0 rounded border border-secondary-500/25 bg-secondary-500/5 px-1.5 py-0.5 text-center font-mono text-[10px] tracking-wider text-secondary-300 sm:mt-0 sm:w-fit sm:text-left">
                    {c.short}
                  </span>
                  <div className="min-w-0 sm:mt-2 sm:flex sm:flex-1 sm:flex-col">
                    <p className="text-sm font-medium leading-snug text-ink-100">{c.name}</p>
                    <p className="mt-0.5 text-xs text-ink-500 sm:mt-auto sm:pt-2">{c.issuer}</p>
                  </div>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
