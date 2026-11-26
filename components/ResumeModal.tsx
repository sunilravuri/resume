"use client";

import { Check, Copy, FileText, Printer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/data/profile";
import { buildPlainTextResume } from "@/lib/resume";
import { Modal } from "./Modal";

type View = "formatted" | "plain";

const OPEN_EVENT = "open-resume-dossier";

/** Opens the Resume Dossier from anywhere on the page (the modal lives in Nav). */
export function openResumeDossier() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function useResumeDossierTrigger(onOpen: () => void) {
  useEffect(() => {
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [onOpen]);
}

function ResumeDocument({ variant }: { variant: "screen" | "print" }) {
  const p = profile;
  const screen = variant === "screen";
  const h = screen ? "text-ink-100" : "text-black";
  const muted = screen ? "text-ink-400" : "text-neutral-700";
  const section = screen
    ? "font-mono text-[11px] uppercase tracking-[0.2em] text-primary-400 border-b border-ink-800"
    : "text-[11px] uppercase tracking-[0.2em] font-semibold text-black border-b border-neutral-400";
  const contact = [p.contact.email, p.contact.linkedin, p.contact.github].filter(Boolean);

  return (
    <article className={screen ? "space-y-6 text-sm leading-relaxed" : "space-y-5 text-[12px] leading-snug text-black"}>
      <header>
        <h1 className={`text-2xl font-semibold tracking-tight ${h}`}>{p.name}</h1>
        <p className={`mt-1 ${screen ? "text-ink-300" : ""}`}>{p.headline}</p>
        <p className={muted}>
          {p.location}
          {contact.length > 0 && ` · ${contact.join(" · ")}`}
        </p>
      </header>

      <section>
        <h2 className={`${section} mb-2 pb-1`}>Professional Summary</h2>
        <p className={screen ? "text-ink-300" : ""}>{p.summary}</p>
      </section>

      <section>
        <h2 className={`${section} mb-2 pb-1`}>Experience</h2>
        <div className="space-y-3">
          {p.experience.map((role) => (
            <div key={role.company} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className={`font-semibold ${h}`}>
                  {role.title} · {role.company}
                </p>
                <p className={`font-mono text-xs ${muted}`}>
                  {role.start} – {role.end}
                </p>
              </div>
              <p className={`text-xs ${muted}`}>
                {role.locations.map((l) => (role.locations.length > 1 ? `${l.location} (${l.period})` : l.location)).join(" · ")}
                {[role.employmentType, role.workplace].filter(Boolean).length > 0 &&
                  ` · ${[role.employmentType, role.workplace].filter(Boolean).join(", ")}`}
              </p>
              <ul className={`mt-1 list-disc pl-5 ${screen ? "text-ink-300 marker:text-ink-600" : ""}`}>
                {role.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={`${section} mb-2 pb-1`}>Skills</h2>
        <dl className="space-y-1.5">
          {p.skills.map((cat) => (
            <div key={cat.id} className="break-inside-avoid">
              <dt className={`inline font-semibold ${h}`}>{cat.title}: </dt>
              <dd className={`inline ${screen ? "text-ink-300" : ""}`}>{cat.skills.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 print:grid-cols-2">
        <section>
          <h2 className={`${section} mb-2 pb-1`}>Education</h2>
          {p.education.map((e) => (
            <div key={e.school}>
              <p className={`font-semibold ${h}`}>{e.school}</p>
              <p className={muted}>
                {e.degree} · {e.start} – {e.end}
              </p>
            </div>
          ))}
        </section>
        <section>
          <h2 className={`${section} mb-2 pb-1`}>Certifications</h2>
          <ul className={`list-disc pl-5 ${screen ? "text-ink-300 marker:text-ink-600" : ""}`}>
            {p.certifications.map((c) => (
              <li key={c.name}>
                {c.name} <span className={muted}>({c.issuer})</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [view, setView] = useState<View>("formatted");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const plainText = buildPlainTextResume();

  useEffect(() => setMounted(true), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      // Fallback for browsers or contexts without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = plainText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [plainText]);

  return (
    <>
      {/* Always-mounted print copy: Cmd/Ctrl+P anywhere prints the resume. */}
      {mounted &&
        createPortal(
          <div id="resume-print">
            <ResumeDocument variant="print" />
          </div>,
          document.body,
        )}

      <Modal
        open={open}
        onClose={onClose}
        icon={<FileText className="h-4 w-4 text-primary-400" />}
        title={
          <>
            resume_dossier<span className="text-ink-500">.txt</span>
          </>
        }
        headerActions={
          <div className="flex rounded-lg border border-ink-800 p-0.5 font-mono text-xs">
            {(["formatted", "plain"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`rounded-md px-2.5 py-1 transition ${
                  view === v ? "bg-ink-800 text-ink-100" : "text-ink-500 hover:text-ink-300"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        }
        footer={
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-700 px-4 py-2 text-sm text-ink-200 transition hover:border-primary-500/50 hover:text-primary-300"
            >
              {copied ? <Check className="h-4 w-4 text-primary-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied to clipboard" : "Copy plain-text resume"}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-primary-400"
            >
              <Printer className="h-4 w-4" />
              Print / Save as PDF
            </button>
          </div>
        }
      >
        <div className="px-5 py-5 sm:px-8">
          {view === "formatted" ? (
            <ResumeDocument variant="screen" />
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink-300">{plainText}</pre>
          )}
        </div>
      </Modal>
    </>
  );
}
