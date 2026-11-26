"use client";

import { ArrowRight, Mail, MapPin, Network } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { profile } from "@/data/profile";
import { CountUp } from "./motion/CountUp";
import { Reveal } from "./motion/Reveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Spotlight follows the mouse via CSS variables (no re-renders).
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="overview"
      ref={ref}
      onPointerMove={onPointerMove}
      className="spotlight group/hero relative scroll-mt-20 overflow-hidden"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="spotlight-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="spotlight-glow pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {profile.positioning[0]}
            </span>
            <span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
              {profile.positioning[1]}
            </span>
          </div>

          <h1 className="mt-6 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-zinc-300 sm:text-xl">{profile.headline}</p>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{profile.valueProposition}</p>
          <p className="mt-5 flex items-center gap-2 font-mono text-sm text-zinc-500">
            <MapPin className="h-4 w-4 text-zinc-600" />
            {profile.location}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:shadow-emerald-400/30"
            >
              <Network className="h-4 w-4" />
              Explore System Architectures
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-cyan-500/50 hover:text-cyan-200"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <dl className="mt-14 grid grid-cols-3 divide-x divide-zinc-800 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
            {profile.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse px-3 py-5 sm:px-6">
                <dt className="mt-1 text-xs text-zinc-500 sm:text-sm">{m.label}</dt>
                <dd className="font-mono text-2xl font-semibold text-zinc-50 sm:text-4xl">
                  <CountUp value={m.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
