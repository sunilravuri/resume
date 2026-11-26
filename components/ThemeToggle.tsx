"use client";

import { Moon, Sun } from "lucide-react";
import { DARK_PALETTE, DEFAULT_PALETTE, PALETTE_STORAGE_KEY, PALETTES, type PaletteId } from "@/lib/palettes";

type ViewTransitionDoc = Document & { startViewTransition?: (update: () => void) => unknown };

function applyPalette(id: PaletteId) {
  const palette = PALETTES.find((p) => p.id === id);
  if (!palette) return;
  const update = () => {
    document.documentElement.dataset.theme = id;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palette.themeColor);
  };
  const doc = document as ViewTransitionDoc;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Cross-fade between light and dark where the browser supports it.
  if (doc.startViewTransition && !reduced) doc.startViewTransition(update);
  else update();
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    /* storage blocked: the choice just won't persist */
  }
}

/**
 * Light (Sunrise, default) / dark (Sunset) switch. The current mode is read from
 * <html data-theme> at click time, and the icons swap with the `dark:` variant,
 * so the button is correct from the first paint without React state.
 */
export function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.dataset.theme === DARK_PALETTE;
    applyPalette(isDark ? DEFAULT_PALETTE : DARK_PALETTE);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light / dark"
      className="rounded-lg border border-ink-800 p-2 text-ink-400 transition hover:border-ink-600 hover:text-ink-100"
    >
      <Moon className="h-4 w-4 dark:hidden" />
      <Sun className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
