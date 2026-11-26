/**
 * Cards for the Projects carousel.
 *
 * To add a real project, append an entry with `kind: "project"`. Every field
 * except `id`, `kind`, `title`, `tagline`, and `tags` is optional:
 *   - `architectureId` links the card to a diagram in data/architectures.ts
 *   - `links` adds buttons (repo, demo, write-up) to the card's detail view
 *   - `period` shows a date range on the card
 *
 * Keep entries factual: describe what was built, and only state results that
 * can be verified.
 */

export type ProjectKind = "blueprint" | "project";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  kind: ProjectKind;
  title: string;
  tagline: string;
  description?: string;
  tags: string[];
  architectureId?: string;
  period?: string;
  links?: ProjectLink[];
}

export const PROJECT_KIND_LABEL: Record<ProjectKind, string> = {
  blueprint: "Reference Blueprint",
  project: "Project",
};

export const projects: Project[] = [
  {
    id: "genai-voice-agents",
    kind: "blueprint",
    title: "Gen-AI & Voice Agents",
    tagline: "LangGraph / AutoGen orchestration over Azure AI Search hybrid RAG and Azure OpenAI, with a LangSmith & Arize eval loop.",
    tags: ["LangGraph", "AutoGen", "Azure AI Search", "Azure OpenAI", "LangSmith", "Arize"],
    architectureId: "genai",
  },
  {
    id: "multi-cloud-k8s",
    kind: "blueprint",
    title: "Multi-Cloud Kubernetes",
    tagline: "Rancher-managed clusters across Azure, OCI, AWS, and GCP, provisioned with Terraform & Ansible and observed with Prometheus, Grafana & EFK.",
    tags: ["Kubernetes", "Rancher", "Terraform", "Ansible", "Prometheus", "Grafana"],
    architectureId: "k8s",
  },
  {
    id: "exadata-ha-fabric",
    kind: "blueprint",
    title: "Exadata HA Fabric",
    tagline: "Mission-critical OLTP on Exadata Smart Scans & Storage Indexes, replicated with GoldenGate & Data Guard, and tuned with AWR / ADDM / SPM.",
    tags: ["Oracle Exadata", "GoldenGate", "Data Guard", "AWR", "ADDM", "SQL Plan Management"],
    architectureId: "exadata",
  },
];
