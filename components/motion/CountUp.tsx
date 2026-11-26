"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Counts a value like "15+" up from 0 the first time it scrolls into view. */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // Server render and no-JS show the final value.
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!match || reduced || !el) {
      setCurrent(target);
      return;
    }
    setCurrent(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setCurrent(Math.round(eased * target));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduced, duration]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref} className="tabular-nums" aria-label={value}>
      <span aria-hidden>
        {current}
        {suffix}
      </span>
    </span>
  );
}
