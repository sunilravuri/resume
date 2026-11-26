"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Accessible modal rendered in a portal on <body>, so transformed ancestors
 * (tilt cards, reveal wrappers) can't trap its fixed positioning.
 */
export function Modal({
  open,
  onClose,
  title,
  icon,
  headerActions,
  footer,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  icon?: ReactNode;
  headerActions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  size?: "md" | "xl";
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`modal-panel flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-emerald-500/5 sm:rounded-2xl ${
          size === "xl" ? "max-w-6xl" : "max-w-3xl"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/60 px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            {icon}
            <h2 id={titleId} className="truncate font-mono text-sm text-zinc-100">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {headerActions}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="scroll-thin flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="border-t border-zinc-800 bg-zinc-900/60 px-5 py-3">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
