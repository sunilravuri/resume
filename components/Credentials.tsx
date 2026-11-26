import { BadgeCheck, GraduationCap } from "lucide-react";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { Reveal } from "./motion/Reveal";
import { TiltCard } from "./motion/TiltCard";

export function Credentials() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Reveal>
        <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
          <GraduationCap className="h-4 w-4 text-emerald-400" /> Education
        </h3>
        {profile.education.map((e) => (
          <TiltCard key={e.school} className="rounded-2xl">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-xs text-zinc-400">
                {e.start} – {e.end}
              </span>
              <p className="mt-4 text-lg font-semibold text-zinc-100">{e.school}</p>
              <p className="mt-1 text-sm text-zinc-400">{e.degree}</p>
            </div>
          </TiltCard>
        ))}
      </Reveal>

      <Reveal delay={100}>
        <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
          <BadgeCheck className="h-4 w-4 text-cyan-400" /> Certifications
          <span className="text-zinc-700">({profile.certifications.length})</span>
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {profile.certifications.map((c, i) => (
            <li key={c.name} className="stagger-item" style={{ "--i": i * 2 } as CSSProperties}>
              <TiltCard glow="cyan" className="h-full rounded-xl">
                <div className="flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition-colors hover:border-cyan-500/40">
                  <span className="w-fit rounded border border-cyan-500/25 bg-cyan-500/5 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-cyan-300">
                    {c.short}
                  </span>
                  <p className="mt-2 text-sm font-medium leading-snug text-zinc-100">{c.name}</p>
                  <p className="mt-auto pt-2 text-xs text-zinc-500">{c.issuer}</p>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
