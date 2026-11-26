"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail, MapPin, UserPlus } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { profile } from "@/data/profile";
import { Reveal } from "./motion/Reveal";
import { TiltCard } from "./motion/TiltCard";
import { openResumeDossier } from "./ResumeModal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const { email, linkedin } = profile.contact;
  const linkedinHandle = linkedin?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden />

        <div className="relative">
          <p className="max-w-2xl text-lg text-zinc-300">
            Reach out about Gen-AI engineering, cloud and Kubernetes infrastructure, or enterprise database architecture.
          </p>
          <p className="mt-2 flex items-center gap-2 font-mono text-sm text-zinc-500">
            <MapPin className="h-4 w-4 text-zinc-600" /> {profile.location}
          </p>

          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {email && (
              <li className="stagger-item" style={{ "--i": 0 } as CSSProperties}>
                <TiltCard className="h-full rounded-2xl">
                  <div className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 transition-colors hover:border-emerald-500/40">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      <Mail className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">email</p>
                    <a href={`mailto:${email}`} className="mt-1 break-all text-sm font-medium text-zinc-100 hover:text-emerald-300">
                      {email}
                    </a>
                    <div className="mt-auto flex gap-2 pt-5">
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400"
                      >
                        Send email
                      </a>
                      <button
                        onClick={copyEmail}
                        aria-label="Copy email address"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-emerald-500/50 hover:text-emerald-300"
                      >
                        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </li>
            )}

            {linkedin && (
              <li className="stagger-item" style={{ "--i": 3 } as CSSProperties}>
                <TiltCard glow="cyan" className="h-full rounded-2xl">
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 transition-colors hover:border-cyan-500/40"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                      <UserPlus className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">linkedin</p>
                    <p className="mt-1 break-all text-sm font-medium text-zinc-100 group-hover:text-cyan-300">{linkedinHandle}</p>
                    <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-cyan-400">
                      Connect on LinkedIn
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </TiltCard>
              </li>
            )}

            <li className="stagger-item" style={{ "--i": 6 } as CSSProperties}>
              <TiltCard className="h-full rounded-2xl">
                <button
                  onClick={openResumeDossier}
                  className="group flex h-full w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 text-left transition-colors hover:border-emerald-500/40"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 group-hover:text-emerald-300">
                    <FileText className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">resume</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100">Resume Dossier</p>
                  <p className="mt-1 text-sm text-zinc-500">Copy as plain text, or print / save as PDF.</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-emerald-400">
                    Open dossier
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </TiltCard>
            </li>
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
