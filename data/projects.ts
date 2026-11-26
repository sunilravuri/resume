/**
 * Cards for the Projects carousel.
 *
 * To add a real project, append an entry with `kind: "project"`. Every field
 * except `id`, `kind`, `title`, `tagline`, and `tags` is optional:
 *   - `architectureId` links the card to a diagram in data/architectures.ts
 *   - `links` adds buttons (repo, demo, write-up) to the card's detail view
 *   - `period` shows a date range on the card
 *   - `role` and `highlights` show in the detail view and the resume
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
  /** Your role on the project, e.g. "Sole architect and developer". */
  role?: string;
  /** Short, verifiable points shown in the detail view and the resume. */
  highlights?: string[];
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
    id: "worq360",
    kind: "project",
    title: "Worq360 (SDVS)",
    period: "Feb 2026 – Present",
    role: "Sole architect, developer, tester and operator",
    tagline:
      "Production staffing and vendor management platform with a 10-agent LangGraph layer over MCP and A2A, where a human approves every agent write. Live on Azure Kubernetes Service.",
    description:
      "Built end to end, alone: architecture, code, tests, deployment and operations. Worq360 covers onboarding, client assignments, timesheets, invoicing, expenses, I-9/E-Verify compliance and recruiting, with a separate Python multi-agent system that does the work under human approval.",
    highlights: [
      "37 NestJS backend modules, 6 default roles plus admin-defined custom roles, and a full audit log.",
      "10 LangGraph domain agents calling 140+ tools on 10 FastMCP servers, exposed through the Google A2A protocol with SSE streaming.",
      "Every agent write pauses for human approval (LangGraph interrupt + Postgres checkpoint). The user's own JWT is passed through every tool call.",
      "Long-term semantic memory in pgvector, role-filtered RAG with citations, natural language to read-only SQL, and Claude Vision timesheet checks.",
      "Prompt caching, a smaller routing model, a self-hosted Qwen3 fallback, rate limits, LangSmith tracing and evaluation batteries.",
      "Separate prod and dev AKS clusters, GitHub Actions CI/CD and 3,000+ automated tests behind a coverage gate.",
    ],
    tags: ["LangGraph", "MCP", "A2A", "Claude", "NestJS", "Angular", "PostgreSQL", "AKS"],
    architectureId: "worq360",
    links: [
      { label: "Project overview", href: "https://sunilravuri.github.io" },
      { label: "Build log", href: "https://sunilravuri.github.io/build-log.html" },
    ],
  },
  {
    id: "vitalsync",
    kind: "project",
    title: "VitalSync Family Health",
    period: "May 2026 – Oct 2026",
    tagline:
      "Android and web family health assistant: one chat backed by a LangChain agent on Gemini, with voice through the Gemini Live API and a tap to confirm every change.",
    highlights: [
      "Replies stream over SSE with live tool activity and inline cards for records, medications, doses, appointments, policies and bills.",
      "Tools are built per request for the verified Firebase user. Every write is held as a pending action until the user confirms it.",
      "Document reading, semantic search over health records, health and symptom analysis, and a voice health avatar.",
    ],
    tags: ["LangChain", "Gemini", "Gemini Live", "React", "Capacitor", "Firebase", "Cloud Run"],
    architectureId: "vitalsync",
  },
  {
    id: "agentic-trading",
    kind: "project",
    title: "Agentic Trading Assistant",
    period: "Aug 2026 – Present",
    tagline:
      "AI assistant that learns an expert futures and options trader's strategy. A LangGraph agent proposes, a deterministic guardrail decides, and the user approves every new rule.",
    highlights: [
      "Each recommendation runs as a LangGraph StateGraph, with every node traced in LangSmith.",
      "Feedback becomes candidate rules that take effect only after the user approves them, with no retraining.",
      "A plain-Python risk guardrail enforces stop-losses, position caps, a 1% risk rule and event blackouts. The LLM can never place a trade.",
      "Every run is graded against later prices, by symbol, source and prompt version. Target cost is under $25 a month.",
    ],
    tags: ["LangGraph", "LangSmith", "Gemini", "FastAPI", "Android", "FCM"],
    architectureId: "agentic-trading",
  },
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
