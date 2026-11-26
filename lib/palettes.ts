/**
 * Color palettes: Sunrise (light, default) and Sunset (dark), switched with the
 * ThemeToggle in the nav. Components never use raw hues: they use semantic tokens
 * (`primary`, `secondary`, `tertiary`, `quaternary`, `ink`) that each palette
 * maps onto Tailwind's built-in color scales. The CSS for every palette is
 * generated from this file and inlined in <head> (see app/layout.tsx).
 */

type Hue =
  | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan"
  | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
type Neutral = "slate" | "gray" | "zinc" | "neutral" | "stone";

export interface Palette {
  id: string;
  name: string;
  description: string;
  mode: "dark" | "light";
  ink: Neutral;
  primary: Hue;
  secondary: Hue;
  /** Used for skill-category colors. */
  tertiary: Hue;
  quaternary: Hue;
  /** Browser UI color (mobile address bar), matches the page background. */
  themeColor: string;
}

export const PALETTES = [
  {
    id: "sunrise",
    name: "Light",
    description: "Sunrise: amber and rose on warm white",
    mode: "light",
    ink: "stone",
    primary: "amber",
    secondary: "rose",
    tertiary: "teal",
    quaternary: "violet",
    themeColor: "#fafaf9",
  },
  {
    id: "sunset",
    name: "Dark",
    description: "Sunset: amber and rose on warm charcoal",
    mode: "dark",
    ink: "stone",
    primary: "amber",
    secondary: "rose",
    tertiary: "teal",
    quaternary: "violet",
    themeColor: "#0c0a09",
  },
] as const satisfies readonly Palette[];

export type PaletteId = (typeof PALETTES)[number]["id"];
export const DEFAULT_PALETTE: PaletteId = "sunrise";
/** The palette the light/dark toggle switches to from the default. */
export const DARK_PALETTE: PaletteId = "sunset";
export const PALETTE_STORAGE_KEY = "palette";

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
type Step = (typeof STEPS)[number];
const ACCENTS = ["primary", "secondary", "tertiary", "quaternary"] as const;

/**
 * Light mode flips the scales so the same classes read correctly on a light page:
 * `bg-ink-950` (page) becomes near-white, `text-ink-100` (headings) near-black,
 * and `text-primary-300` (accent text) a darker, readable shade.
 */
const LIGHT_INK: Record<Step, string> = {
  50: "950", 100: "900", 200: "800", 300: "700", 400: "600", 500: "500",
  600: "400", 700: "300", 800: "200", 900: "white", 950: "50",
};
const LIGHT_ACCENT: Record<Step, Step> = {
  50: 950, 100: 900, 200: 800, 300: 700, 400: 600, 500: 700,
  600: 500, 700: 400, 800: 300, 900: 200, 950: 100,
};

function scale(token: string, hue: string, map: (s: Step) => string): string {
  return STEPS.map((s) => {
    const target = map(s);
    const value = target === "white" ? "#fff" : `var(--color-${hue}-${target})`;
    return `--color-${token}-${s}:${value};`;
  }).join("");
}

function paletteVars(p: Palette): string {
  const light = p.mode === "light";
  const ink = scale("ink", p.ink, (s) => (light ? LIGHT_INK[s] : String(s)));
  const accents = ACCENTS.map((t) => scale(t, p[t], (s) => String(light ? LIGHT_ACCENT[s] : s))).join("");
  return `color-scheme:${p.mode};${ink}${accents}`;
}

/** CSS for every palette. The default also applies when no data-theme is set. */
export function paletteCss(): string {
  return PALETTES.map((p) => {
    const selector = p.id === DEFAULT_PALETTE ? `:root,:root[data-theme="${p.id}"]` : `:root[data-theme="${p.id}"]`;
    return `${selector}{${paletteVars(p)}}`;
  }).join("\n");
}

/** Runs before first paint so a saved palette never flashes the default one. */
export function paletteInitScript(): string {
  const ids = JSON.stringify(PALETTES.map((p) => p.id));
  const colors = JSON.stringify(Object.fromEntries(PALETTES.map((p) => [p.id, p.themeColor])));
  return `(function(){try{var p=localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)});if(${ids}.indexOf(p)<0)return;document.documentElement.dataset.theme=p;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=${colors}[p];}catch(e){}})();`;
}
