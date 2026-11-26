"use client";

import {
  Activity,
  AppWindow,
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Gauge,
  GitMerge,
  Mic,
  MousePointerClick,
  Search,
  Stethoscope,
  Undo2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Fragment, useState } from "react";
import type { ArchIconKey, ArchNode, Architecture } from "@/data/architectures";

export const ARCH_ICONS: Record<ArchIconKey, LucideIcon> = {
  mic: Mic,
  workflow: Workflow,
  search: Search,
  brain: BrainCircuit,
  gauge: Gauge,
  cloud: Cloud,
  boxes: Boxes,
  code: Code2,
  activity: Activity,
  app: AppWindow,
  database: Database,
  replicate: GitMerge,
  stethoscope: Stethoscope,
};

function Connector() {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 lg:w-10 lg:py-0" aria-hidden>
      <div className="flow-y h-6 w-0.5 rounded lg:hidden" />
      <div className="flow-x hidden h-0.5 w-full rounded lg:block" />
    </div>
  );
}

function NodeCard({ node, selected, onSelect }: { node: ArchNode; selected: boolean; onSelect: () => void }) {
  const Icon = ARCH_ICONS[node.icon];
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative w-full rounded-xl border p-4 text-left transition ${
        selected
          ? "border-emerald-500/60 bg-emerald-500/[0.07] shadow-lg shadow-emerald-500/10"
          : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-600 hover:bg-zinc-900"
      }`}
    >
      {selected && (
        <span className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
      )}
      <div className="flex items-start gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${
            selected
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
              : "border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:text-cyan-300"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-zinc-100">{node.title}</p>
          <p className="mt-0.5 font-mono text-[11px] text-zinc-500">{node.subtitle}</p>
        </div>
      </div>
    </button>
  );
}

export function ArchitectureDiagram({ architecture: arch }: { architecture: Architecture }) {
  const allNodes = arch.stages.flatMap((s) => s.nodes);
  const [nodeId, setNodeId] = useState(allNodes[0].id);
  const node = allNodes.find((n) => n.id === nodeId) ?? allNodes[0];
  const nodeStage = arch.stages.findIndex((s) => s.nodes.some((n) => n.id === node.id));

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">{arch.title}</h3>
          <p className="mt-1 max-w-3xl text-sm text-zinc-400">{arch.description}</p>
        </div>
        <p className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-zinc-600">
          <MousePointerClick className="h-3 w-3" /> click a component
        </p>
      </div>

      {/* Diagram */}
      <div className="relative rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 p-4">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {arch.stages.map((stage, si) => (
            <Fragment key={stage.label}>
              {si > 0 && <Connector />}
              <div className="flex flex-1 flex-col lg:min-w-0">
                <p
                  className={`mb-2 font-mono text-[10px] uppercase tracking-[0.18em] ${
                    si === nodeStage ? "text-emerald-400" : "text-zinc-600"
                  }`}
                >
                  {String(si + 1).padStart(2, "0")} · {stage.label}
                </p>
                <div className="flex flex-1 flex-col justify-center gap-2">
                  {stage.nodes.map((n) => (
                    <NodeCard key={n.id} node={n} selected={n.id === node.id} onSelect={() => setNodeId(n.id)} />
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        {arch.feedback && (
          <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-cyan-400/80">
            <Undo2 className="h-3.5 w-3.5" />
            <span className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 via-cyan-500/20 to-transparent" />
            <span>
              feedback loop: {arch.feedback.label} → stage {String(arch.feedback.toStage + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* Detail panel */}
      <div
        key={node.id}
        className="fade-in mt-5 grid gap-5 rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 md:grid-cols-[1.2fr_1fr]"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">
            {arch.stages[nodeStage]?.label} / component
          </p>
          <h4 className="mt-1 text-base font-semibold text-zinc-100">{node.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{node.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {node.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 font-mono text-[11px] text-cyan-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">design notes</p>
          <ul className="mt-2 space-y-2">
            {node.details.map((d) => (
              <li key={d} className="flex gap-2 text-sm leading-relaxed text-zinc-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 font-mono text-[11px] text-zinc-600">
        Reference blueprint built from my verified skill stack. It shows patterns and approaches, not a confidential employer
        system.
      </p>
    </div>
  );
}
