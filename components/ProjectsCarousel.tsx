"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Network } from "lucide-react";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { architectures } from "@/data/architectures";
import { PROJECT_KIND_LABEL, projects, type Project } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ARCH_ICONS, ArchitectureDiagram } from "./ArchitectureDiagram";
import { Modal } from "./Modal";
import { TiltCard } from "./motion/TiltCard";

const DRAG_THRESHOLD = 6;

/** scrollLeft that brings slide `i` to the start of the track (measured from the first slide, so padding is respected). */
function slideOffset(el: HTMLElement, i: number): number {
  const first = el.children[0] as HTMLElement | undefined;
  const child = el.children[i] as HTMLElement | undefined;
  return first && child ? child.offsetLeft - first.offsetLeft : 0;
}

/** Index of the slide closest to the track's start (the last slide when scrolled to the end). */
function nearestIndex(el: HTMLElement): number {
  if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) return el.children.length - 1;
  let nearest = 0;
  let best = Infinity;
  Array.from(el.children).forEach((_, i) => {
    const d = Math.abs(slideOffset(el, i) - el.scrollLeft);
    if (d < best) {
      best = d;
      nearest = i;
    }
  });
  return nearest;
}

function MiniFlow({ architectureId }: { architectureId: string }) {
  const arch = architectures.find((a) => a.id === architectureId);
  if (!arch) return null;
  return (
    <div className="flex items-center" aria-hidden>
      {arch.stages.map((stage, i) => (
        <Fragment key={stage.label}>
          {i > 0 && (
            <span className="flow-x mx-1 h-0.5 min-w-3 flex-1 rounded opacity-60 transition-opacity group-hover:opacity-100" />
          )}
          <div className="flex flex-col gap-1">
            {stage.nodes.map((n) => {
              const Icon = ARCH_ICONS[n.icon];
              return (
                <span
                  key={n.id}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-800 bg-ink-950 text-ink-400 transition-colors group-hover:border-primary-500/40 group-hover:text-primary-300"
                >
                  <Icon className="h-4 w-4" />
                </span>
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <TiltCard className="h-full rounded-2xl">
      <button
        onClick={onOpen}
        className="group flex h-full w-full flex-col rounded-2xl border border-ink-800 bg-ink-900/60 p-6 text-left transition-colors hover:border-primary-500/40 focus-visible:border-primary-500/60 focus-visible:outline-none"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-secondary-500/30 bg-secondary-500/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-secondary-300">
            {PROJECT_KIND_LABEL[project.kind]}
          </span>
          <span className="font-mono text-xs text-ink-600">{String(index + 1).padStart(2, "0")}</span>
        </div>

        {project.architectureId && (
          <div className="mt-6 rounded-xl border border-dashed border-ink-800 bg-ink-950/40 p-4">
            <MiniFlow architectureId={project.architectureId} />
          </div>
        )}

        <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink-50">{project.title}</h3>
        {project.period && <p className="mt-1 font-mono text-xs text-ink-500">{project.period}</p>}
        <p className="mt-2 text-sm leading-relaxed text-ink-400">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-ink-800 bg-ink-950 px-2 py-0.5 font-mono text-[11px] text-ink-400"
            >
              {t}
            </span>
          ))}
        </div>

        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-primary-400">
          {project.architectureId ? "Open interactive diagram" : "View details"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </button>
    </TiltCard>
  );
}

export function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; scrollLeft: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [openId, setOpenId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const openProject = projects.find((p) => p.id === openId) ?? null;
  const openArch = openProject?.architectureId ? architectures.find((a) => a.id === openProject.architectureId) : undefined;
  const close = useCallback(() => setOpenId(null), []);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setActive(nearestIndex(el));
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4 });
  }, []);

  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [updateState]);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.max(0, Math.min(projects.length - 1, i));
    el.scrollTo({ left: slideOffset(el, index), behavior: reduced ? "auto" : "smooth" });
  };

  // Step relative to the current scroll position, so it works even when the last
  // slides can't reach the track start (scrolled to the end).
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const offsets = projects.map((_, i) => slideOffset(el, i));
    const target =
      dir === 1
        ? offsets.findIndex((o) => o > el.scrollLeft + 4)
        : offsets.findLastIndex((o) => o < el.scrollLeft - 4);
    if (target !== -1) scrollToIndex(target);
  };

  // Mouse drag-to-scroll. Touch uses native swipe with scroll-snap.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
    drag.current = { startX: e.clientX, scrollLeft: trackRef.current.scrollLeft, moved: false };

    const onMove = (ev: globalThis.PointerEvent) => {
      const d = drag.current;
      const el = trackRef.current;
      if (!d || !el) return;
      const dx = ev.clientX - d.startX;
      if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
        d.moved = true;
        setDragging(true);
      }
      if (d.moved) el.scrollLeft = d.scrollLeft - dx;
    };
    const onUp = () => {
      if (drag.current?.moved) {
        suppressClick.current = true;
        // Snap to the nearest card once snapping is re-enabled.
        requestAnimationFrame(() => {
          setDragging(false);
          requestAnimationFrame(() => trackRef.current && scrollToIndex(nearestIndex(trackRef.current)));
        });
      }
      drag.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onClickCapture = (e: MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects" onKeyDown={onKeyDown}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-ink-600">drag · swipe · ← → keys</p>
        <div className="flex gap-2">
          <button
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label="Previous project"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-800 bg-ink-900/60 text-ink-300 transition hover:border-primary-500/50 hover:text-primary-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink-800 disabled:hover:text-ink-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label="Next project"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-800 bg-ink-900/60 text-ink-300 transition hover:border-primary-500/50 hover:text-primary-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink-800 disabled:hover:text-ink-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateState}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className={`no-scrollbar -mx-4 flex scroll-px-4 gap-5 overflow-x-auto overscroll-x-contain px-4 py-3 sm:-mx-6 sm:scroll-px-6 sm:px-6 ${
          dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {projects.map((p, i) => (
          <div
            key={p.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${projects.length}: ${p.title}`}
            className="w-[85%] shrink-0 snap-start sm:w-[62%] lg:w-[44%]"
          >
            <ProjectCard project={p} index={i} onOpen={() => setOpenId(p.id)} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${p.title}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-primary-400" : "w-3 bg-ink-700 hover:bg-ink-500"}`}
          />
        ))}
      </div>

      <Modal
        open={openProject !== null}
        onClose={close}
        size="xl"
        icon={<Network className="h-4 w-4 text-primary-400" />}
        title={
          openProject && (
            <>
              {openProject.title} <span className="text-ink-500">· {PROJECT_KIND_LABEL[openProject.kind].toLowerCase()}</span>
            </>
          )
        }
      >
        {openProject && (
          <div className="p-5 sm:p-6">
            {(openProject.period || openProject.role) && (
              <p className="mb-3 font-mono text-xs text-ink-500">
                {[openProject.period, openProject.role].filter(Boolean).join(" · ")}
              </p>
            )}
            {openProject.description && (
              <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-400">{openProject.description}</p>
            )}
            {openProject.highlights && openProject.highlights.length > 0 && (
              <ul className="mb-6 max-w-3xl space-y-1.5">
                {openProject.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-ink-300">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-secondary-400" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {openArch && <ArchitectureDiagram key={openArch.id} architecture={openArch} isProject={openProject.kind === "project"} />}
            {openProject.links && openProject.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {openProject.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 px-3 py-1.5 text-sm text-ink-200 transition hover:border-primary-500/50 hover:text-primary-300"
                  >
                    {l.label} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
