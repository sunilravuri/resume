"use client";

import { FileText, Menu, Terminal, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeModal, useResumeDossierTrigger } from "./ResumeModal";

export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const [active, setActive] = useState<string>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  const openResume = useCallback(() => setResumeOpen(true), []);
  useResumeDossierTrigger(openResume);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink-800/80 bg-ink-950/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#overview" className="group flex items-center gap-2 font-mono text-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/60 text-primary-400 transition group-hover:border-primary-500/50">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="text-ink-100">{initials.toLowerCase()}</span>
            <span className="hidden text-ink-600 sm:inline">~/portfolio</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`rounded-md px-3 py-1.5 text-sm transition ${
                    active === item.id ? "bg-ink-800/70 text-ink-100" : "text-ink-400 hover:text-ink-100"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={openResume}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-500/40 bg-primary-500/10 px-3 py-1.5 text-sm font-medium text-primary-300 transition hover:border-primary-400 hover:bg-primary-500/20"
            >
              <FileText className="h-4 w-4" />
              <span>
                Resume<span className="hidden sm:inline"> Dossier</span>
              </span>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="rounded-lg border border-ink-800 p-2 text-ink-400 transition hover:border-ink-600 hover:text-ink-100 lg:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <ul className="grid grid-cols-2 gap-1 border-t border-ink-800 px-4 py-3 lg:hidden">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm ${
                    active === item.id ? "bg-ink-800/70 text-ink-100" : "text-ink-400"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <ResumeModal open={resumeOpen} onClose={closeResume} />
    </>
  );
}
