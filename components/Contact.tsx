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
      <div className="relative overflow-hidden rounded-3xl border border-ink-800 bg-ink-900/40 p-4 sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl" aria-hidden />

        <div className="relative">
          <p className="max-w-2xl px-1 text-base text-ink-300 sm:px-0 sm:text-lg">
            Reach out about Gen-AI engineering, cloud and Kubernetes infrastructure, or enterprise database architecture.
          </p>
          <p className="mt-2 flex items-center gap-2 px-1 font-mono text-sm text-ink-500 sm:px-0">
            <MapPin className="h-4 w-4 text-ink-600" /> {profile.location}
          </p>

          <ul className="mt-6 grid gap-3 sm:mt-8 md:grid-cols-3 md:gap-4">
            {email && (
              <li className="stagger-item" style={{ "--i": 0 } as CSSProperties}>
                <TiltCard className="h-full rounded-2xl">
                  <div className="flex h-full flex-col rounded-2xl border border-ink-800 bg-ink-950/70 p-4 transition-colors hover:border-primary-500/40 md:p-5">
                    <div className="flex items-center gap-3 md:block">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary-500/30 bg-primary-500/10 text-primary-300">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 md:mt-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">email</p>
                        <a href={`mailto:${email}`} className="mt-0.5 block break-all text-sm font-medium text-ink-100 hover:text-primary-300 md:mt-1">
                          {email}
                        </a>
                      </div>
                    </div>
                    <div className="mt-auto flex gap-2 pt-4 md:pt-5">
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary-500 px-3 py-2 text-sm font-medium text-ink-950 transition hover:bg-primary-400"
                      >
                        Send email
                      </a>
                      <button
                        onClick={copyEmail}
                        aria-label="Copy email address"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-ink-700 px-3 py-2 text-sm text-ink-300 transition hover:border-primary-500/50 hover:text-primary-300"
                      >
                        {copied ? <Check className="h-4 w-4 text-primary-400" /> : <Copy className="h-4 w-4" />}
                        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </li>
            )}

            {linkedin && (
              <li className="stagger-item" style={{ "--i": 3 } as CSSProperties}>
                <TiltCard glow="secondary" className="h-full rounded-2xl">
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-ink-800 bg-ink-950/70 p-4 transition-colors hover:border-secondary-500/40 md:p-5"
                  >
                    <div className="flex items-center gap-3 md:block">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-secondary-500/30 bg-secondary-500/10 text-secondary-300">
                        <UserPlus className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 md:mt-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">linkedin</p>
                        <p className="mt-0.5 break-all text-sm font-medium text-ink-100 group-hover:text-secondary-300 md:mt-1">{linkedinHandle}</p>
                      </div>
                    </div>
                    <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-secondary-400 md:pt-5">
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
                  className="group flex h-full w-full flex-col rounded-2xl border border-ink-800 bg-ink-950/70 p-4 text-left transition-colors hover:border-primary-500/40 md:p-5"
                >
                  <span className="flex items-center gap-3 md:block">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-700 bg-ink-900 text-ink-300 group-hover:text-primary-300">
                      <FileText className="h-5 w-5" />
                    </span>
                    <span className="block min-w-0 md:mt-4">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">resume</span>
                      <span className="mt-0.5 block text-sm font-medium text-ink-100 md:mt-1">Resume Dossier</span>
                    </span>
                  </span>
                  <span className="mt-2 block text-sm text-ink-500 md:mt-1">Copy as plain text, or print / save as PDF.</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-primary-400 md:pt-5">
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
