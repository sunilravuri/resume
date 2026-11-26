"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Tilts toward the mouse and shows a glow that follows the cursor.
 * Mouse only: touch and reduced-motion visitors get a static card.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  glow = "emerald",
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: "emerald" | "cyan";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    if (!reduced) {
      el.style.setProperty("--rx", `${((0.5 - py) * maxTilt * 2).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * maxTilt * 2).toFixed(2)}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} data-glow={glow} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
