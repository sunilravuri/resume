/**
 * Architecture diagrams.
 *
 * The first three are reference blueprints put together from the verified skill
 * stack in data/profile.ts. They show how these technologies fit together, not a
 * specific employer's confidential system.
 *
 * The rest describe real projects (see data/projects.ts). Their facts come from
 * each project's own code and public pages. No invented metrics in either kind.
 */

export type ArchIconKey =
  | "mic"
  | "workflow"
  | "search"
  | "brain"
  | "gauge"
  | "cloud"
  | "boxes"
  | "code"
  | "activity"
  | "app"
  | "database"
  | "replicate"
  | "stethoscope"
  | "shield"
  | "phone"
  | "chat";

export interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  icon: ArchIconKey;
  tech: string[];
  summary: string;
  details: string[];
}

export interface ArchStage {
  label: string;
  nodes: ArchNode[];
}

export interface Architecture {
  id: string;
  tab: string;
  title: string;
  description: string;
  stages: ArchStage[];
  /** Optional feedback edge drawn from the last stage back to an earlier one. */
  feedback?: { label: string; toStage: number };
}

export const architectures: Architecture[] = [
  {
    id: "genai",
    tab: "Gen-AI & Voice Agents",
    title: "Gen-AI & Voice Agent Pipeline",
    description:
      "Stateful agent orchestration over hybrid retrieval, with every trace flowing into an evaluation loop that gates quality before release.",
    stages: [
      {
        label: "Ingress",
        nodes: [
          {
            id: "voice",
            title: "User / Voice Channel",
            subtitle: "Chat + speech entry points",
            icon: "mic",
            tech: ["Voice-Based AI Applications", "Speech I/O", "Session Context"],
            summary:
              "Users reach the agent through text or voice. Voice turns are transcribed, normalized, and passed to the orchestrator with conversation state attached.",
            details: [
              "Voice and text share one conversation contract, so the agent logic stays channel-agnostic.",
              "Latency budgets are tighter for voice: streaming responses and short tool hops matter more than in chat.",
              "Session metadata (channel, user context) travels with each turn for routing and evaluation.",
            ],
          },
        ],
      },
      {
        label: "Orchestration",
        nodes: [
          {
            id: "orchestrator",
            title: "LangGraph / AutoGen Orchestrator",
            subtitle: "Stateful graphs & multi-agent teams",
            icon: "workflow",
            tech: ["LangGraph", "AutoGen", "LangChain", "Tool Calling"],
            summary:
              "LangGraph models the agent as an explicit state machine with nodes, edges, and checkpoints. AutoGen coordinates multi-agent collaboration where specialist agents hand off work.",
            details: [
              "Explicit graph state makes agent behavior inspectable and testable, unlike opaque prompt chains.",
              "Conditional edges route between retrieval, tool use, clarification, and answer synthesis.",
              "AutoGen multi-agent patterns split work across planner, researcher, and critic roles for complex workflows.",
            ],
          },
        ],
      },
      {
        label: "Grounding & Reasoning",
        nodes: [
          {
            id: "search",
            title: "Azure AI Search Hybrid RAG",
            subtitle: "Keyword + vector retrieval",
            icon: "search",
            tech: ["Azure AI Search", "RAG Pipelines", "Hybrid Retrieval", "Semantic Ranking"],
            summary:
              "Hybrid retrieval combines keyword (BM25) and vector similarity so that exact terms such as codes and identifiers and fuzzy semantic matches both come back.",
            details: [
              "Chunking strategy and metadata filters are tuned per corpus. Retrieval quality limits answer quality.",
              "Hybrid search covers what pure vector search misses: acronyms, IDs, and domain jargon.",
              "Retrieved passages are cited back into the prompt to keep answers grounded and auditable.",
            ],
          },
          {
            id: "llm",
            title: "Azure OpenAI",
            subtitle: "Enterprise LLM inference",
            icon: "brain",
            tech: ["Azure OpenAI", "Azure AI Studio", "LLMs", "Prompt Engineering"],
            summary:
              "Azure OpenAI provides enterprise-governed model endpoints. Azure AI Studio supports prompt iteration, deployment management, and content safety configuration.",
            details: [
              "Grounded prompts constrain the model to the retrieved context to reduce hallucination.",
              "Model and deployment choices trade off latency, cost, and reasoning depth per use case.",
              "Enterprise controls (network isolation, content filtering) are first-class requirements, not afterthoughts.",
            ],
          },
        ],
      },
      {
        label: "Evaluation",
        nodes: [
          {
            id: "evals",
            title: "LangSmith & Arize Eval Loop",
            subtitle: "Tracing, evals, monitoring",
            icon: "gauge",
            tech: ["LangSmith", "Arize", "LLM-as-Judge", "Regression Datasets"],
            summary:
              "LangSmith captures end-to-end traces and runs offline evaluation datasets. Arize monitors production behavior and drift so the team can see quality regressions early.",
            details: [
              "Evaluate retrieval and generation separately: context relevance, faithfulness, and answer correctness.",
              "Curated regression datasets run before prompt, model, or graph changes ship.",
              "Production traces feed back into the dataset, closing the loop between real usage and the next release.",
            ],
          },
        ],
      },
    ],
    feedback: { label: "trace → eval → improve", toStage: 1 },
  },
  {
    id: "k8s",
    tab: "Multi-Cloud K8s",
    title: "Multi-Cloud Kubernetes & Observability",
    description:
      "One operating model across four clouds: Rancher-managed clusters provisioned as code, with metrics and logs consolidated into a single observability plane.",
    stages: [
      {
        label: "Cloud Footprint",
        nodes: [
          {
            id: "clouds",
            title: "Azure / OCI / AWS / GCP",
            subtitle: "Four-cloud foundation",
            icon: "cloud",
            tech: ["Microsoft Azure", "Oracle Cloud (OCI)", "AWS (EC2, RDS, S3)", "GCP"],
            summary:
              "Workloads land on the cloud that fits them best, and the platform team keeps one consistent operating model across all four providers.",
            details: [
              "Provider-specific primitives (networking, identity, storage) are abstracted behind a common cluster contract.",
              "Certifications across Azure, OCI, and AWS reflect hands-on depth in each provider's native services.",
              "Cloud selection weighs data gravity, managed service fit, and enterprise agreements.",
            ],
          },
        ],
      },
      {
        label: "Control Plane",
        nodes: [
          {
            id: "rancher",
            title: "Rancher Managed K8s Clusters",
            subtitle: "Fleet-wide cluster management",
            icon: "boxes",
            tech: ["Kubernetes", "Rancher Kubernetes Management", "CKA", "RBAC"],
            summary:
              "Rancher gives one pane of glass for cluster lifecycle, access control, and policy across clouds. CKA-level Kubernetes depth covers operations below the UI.",
            details: [
              "Centralized RBAC and project boundaries keep multi-tenant clusters governable.",
              "Standardized cluster templates reduce drift between environments and providers.",
              "Upgrades, node pools, and workload troubleshooting are handled at the Kubernetes primitive level.",
            ],
          },
        ],
      },
      {
        label: "Provisioning",
        nodes: [
          {
            id: "iac",
            title: "Terraform & Ansible IaC",
            subtitle: "Declarative infra + config",
            icon: "code",
            tech: ["Terraform", "Ansible", "Linux", "Unix Shell Scripting", "Python"],
            summary:
              "Terraform declares cloud infrastructure and Ansible handles host and configuration management, so environments can be reproduced and every change goes through review.",
            details: [
              "Infrastructure changes go through version control and plan review, not console clicks.",
              "Terraform owns cloud resources and Ansible owns OS and application configuration, with a clear boundary between them.",
              "Shell and Python automation covers the operational gaps between tools.",
            ],
          },
        ],
      },
      {
        label: "Observability",
        nodes: [
          {
            id: "obs",
            title: "Prometheus, Grafana & EFK Stack",
            subtitle: "Metrics + centralized logs",
            icon: "activity",
            tech: ["Prometheus", "Grafana", "Elasticsearch", "Fluentd", "Kibana (EFK)"],
            summary:
              "Prometheus scrapes cluster and application metrics and Grafana visualizes and alerts on them. Fluentd ships logs into Elasticsearch, where they are searched in Kibana.",
            details: [
              "Metrics answer what is wrong. Centralized logs answer why.",
              "Dashboards and alerts are built around service health, not only node health.",
              "A consistent logging pipeline across clouds makes cross-provider incident triage possible.",
            ],
          },
        ],
      },
    ],
    feedback: { label: "alerts → remediate as code", toStage: 2 },
  },
  {
    id: "exadata",
    tab: "Exadata HA Fabric",
    title: "Mission-Critical Exadata & HA Data Fabric",
    description:
      "24x7 enterprise data tier: Exadata offload for performance, GoldenGate and Data Guard for replication and resilience, and AWR-driven tuning in a continuous loop.",
    stages: [
      {
        label: "Workloads",
        nodes: [
          {
            id: "oltp",
            title: "OLTP / Enterprise Apps",
            subtitle: "Mission-critical transactional load",
            icon: "app",
            tech: ["Oracle Database", "PL/SQL", "Oracle Exalogic", "Oracle RTD"],
            summary:
              "High-concurrency transactional applications with strict availability expectations. Exalogic and Oracle RTD sit in the broader Oracle engineered-systems ecosystem.",
            details: [
              "Workload characterization (OLTP vs. reporting) drives indexing, partitioning, and offload decisions.",
              "PL/SQL code paths are reviewed alongside SQL for performance impact.",
              "24x7 operation means maintenance is planned around zero- or minimal-downtime techniques.",
            ],
          },
        ],
      },
      {
        label: "Engineered Platform",
        nodes: [
          {
            id: "exadata",
            title: "Oracle Exadata Smart Scans & Storage Indexes",
            subtitle: "Storage-tier offload",
            icon: "database",
            tech: ["Oracle Exadata", "Smart Scans", "Storage Indexes", "Exadata Migrations"],
            summary:
              "Smart Scans push predicate filtering and column projection down to the storage cells, and Storage Indexes let cells skip regions that cannot match.",
            details: [
              "Offload only happens on direct-path full scans, so plan shape decides whether Exadata features engage.",
              "Storage Indexes are automatic and in-memory. Data clustering affects how effective they are.",
              "Exadata migrations need a plan for re-validating execution plans and offload behavior after the move.",
            ],
          },
        ],
      },
      {
        label: "Replication & HA",
        nodes: [
          {
            id: "replication",
            title: "GoldenGate Real-Time Replication & Data Guard",
            subtitle: "Logical + physical resilience",
            icon: "replicate",
            tech: ["Oracle GoldenGate", "Data Guard", "Data Migration", "PostgreSQL", "SQL Server"],
            summary:
              "GoldenGate provides log-based logical replication for integration and migrations, including heterogeneous targets. Data Guard maintains standby databases for disaster recovery.",
            details: [
              "GoldenGate suits near-real-time data movement and low-downtime migrations. Data Guard suits DR and failover.",
              "The two are complementary: logical flexibility on one side, physical fidelity on the other.",
              "Replication lag and apply health are monitored continuously, not checked after incidents.",
            ],
          },
        ],
      },
      {
        label: "Performance Intelligence",
        nodes: [
          {
            id: "tuning",
            title: "AWR / ADDM / SQL Plan Management",
            subtitle: "Diagnose, stabilize, tune",
            icon: "stethoscope",
            tech: ["AWR", "ADDM", "ASH", "SQL Plan Management", "TKPROF", "STATSPACK", "Explain Plan", "OEM"],
            summary:
              "AWR and ASH capture workload history. ADDM points to likely bottlenecks. SQL Plan Management keeps known-good execution plans from regressing.",
            details: [
              "ASH sampling isolates short-lived spikes that hourly AWR snapshots average away.",
              "SQL Plan Baselines guard against plan flips after stats refreshes, patches, or upgrades.",
              "TKPROF and Explain Plan are used for precise statement-level analysis, and Oracle Enterprise Manager provides fleet visibility.",
            ],
          },
        ],
      },
    ],
    feedback: { label: "baseline → tune → stabilize", toStage: 1 },
  },
  {
    id: "worq360",
    tab: "Worq360",
    title: "Worq360: Agentic Workforce Platform",
    description:
      "A production staffing platform and a Python multi-agent system running side by side on Azure Kubernetes Service. Both go through the same API and the same permission checks, and every agent write waits for a human to approve it.",
    stages: [
      {
        label: "Clients",
        nodes: [
          {
            id: "w360-web",
            title: "Angular Web Apps",
            subtitle: "Main app + Agentic App",
            icon: "app",
            tech: ["Angular", "Angular Material", "Signals", "Socket.io", "SSE"],
            summary:
              "Two Angular apps: the main Worq360 app with the built-in AskMe assistant, and the Agentic App that streams each agent step and shows approval cards.",
            details: [
              "Menus are built from the user's live permissions, so each role sees only what it can use.",
              "Route guards and interceptors refresh short-lived JWTs.",
              "The Agent Activity panel streams every step over SSE, with Approve and Reject buttons on writes.",
            ],
          },
        ],
      },
      {
        label: "Platform API",
        nodes: [
          {
            id: "w360-api",
            title: "NestJS Modular Monolith",
            subtitle: "37 backend modules",
            icon: "code",
            tech: ["NestJS", "TypeScript", "TypeORM", "JWT", "RBAC"],
            summary:
              "One API covers onboarding, assignments, timesheets, invoicing, expenses, I-9/E-Verify compliance and recruiting. Every state-changing action is written to the audit log.",
            details: [
              "Roles and permissions are admin-editable data, so a new role needs no deploy.",
              "An LLM business rules engine (Claude Haiku) checks timesheets and expenses against rules written in plain English and can block a submission.",
              "Claude Vision checks timesheet hours against the client's screenshot before a timesheet can be submitted.",
            ],
          },
        ],
      },
      {
        label: "Agent Layer",
        nodes: [
          {
            id: "w360-agents",
            title: "LangGraph Orchestrator + 10 Agents",
            subtitle: "Routing, ReAct loops, A2A",
            icon: "workflow",
            tech: ["LangGraph", "LangChain", "Google A2A", "FastAPI", "Human-in-the-loop"],
            summary:
              "A small model routes each request to one of ten domain agents, filtered by the user's role. The graph can hop to another domain up to three times when a request spans several.",
            details: [
              "Before any write, the graph pauses with interrupt() and saves its state in a Postgres checkpoint until someone approves or rejects it.",
              "Agents are exposed through the Google A2A JSON-RPC protocol, with an AgentCard for discovery and SSE streaming.",
              "Small invoices and expenses can be auto-approved below a limit the admin sets. If that limit can't be checked, the agent asks anyway.",
            ],
          },
          {
            id: "w360-mcp",
            title: "10 FastMCP Tool Servers",
            subtitle: "140+ tools",
            icon: "boxes",
            tech: ["MCP", "FastMCP", "Read-only SQL", "Azure Cost Management"],
            summary:
              "Tool servers for HR, finance, recruitment, compliance, support, DevOps, budget, security, read-only SQL and external APIs. They call the same REST API the app's own screens use.",
            details: [
              "The user's own JWT is passed through every tool call, so an agent can never see or do more than the person chatting.",
              "The token is removed before the tool's input is checked, so the model never sees it.",
              "Plain-English questions become parameterized, read-only SQL through a dedicated server.",
            ],
          },
        ],
      },
      {
        label: "Data & Models",
        nodes: [
          {
            id: "w360-pg",
            title: "PostgreSQL + pgvector",
            subtitle: "Records, checkpoints, memory",
            icon: "database",
            tech: ["PostgreSQL", "pgvector", "Voyage embeddings", "RAG"],
            summary:
              "One database holds the platform's records, the agents' checkpoints and their long-term semantic memory.",
            details: [
              "After each conversation, useful facts are saved as Voyage embeddings. Near-duplicates strengthen an existing memory instead of adding a new one.",
              "AskMe answers from help docs and company documents with citations, using only documents meant for the asker's role.",
              "The owner of each memory is set by the server, never by the model.",
            ],
          },
          {
            id: "w360-llm",
            title: "Claude + Self-Hosted Fallback",
            subtitle: "Cost and reliability controls",
            icon: "brain",
            tech: ["Anthropic Claude", "Ollama", "Qwen3", "Prompt caching", "LangSmith"],
            summary:
              "Claude is the main model, with an optional self-hosted Qwen3 fallback through Ollama. Every agent run is traced in LangSmith.",
            details: [
              "Prompt caching covers agent system prompts and tool lists.",
              "A smaller, cheaper model handles routing and memory extraction.",
              "Rate limits (60 requests per user per hour, 600 overall) are checked before a stream opens.",
            ],
          },
        ],
      },
      {
        label: "Run & Operate",
        nodes: [
          {
            id: "w360-aks",
            title: "Azure Kubernetes Service",
            subtitle: "Isolated prod and dev clusters",
            icon: "cloud",
            tech: ["AKS", "Docker", "GitHub Actions", "Key Vault", "Blob Storage"],
            summary:
              "Production and development run on separate clusters, with separate registries, databases and ingress.",
            details: [
              "Multi-arch container builds and path-filtered CI/CD, so a frontend-only change doesn't redeploy the backend.",
              "3,000+ automated tests run behind a CI coverage gate.",
              "Security audits of the app and infrastructure recur on a schedule, and findings are re-verified against the live environment.",
            ],
          },
        ],
      },
    ],
    feedback: { label: "traces → evals → better routing", toStage: 2 },
  },
  {
    id: "vitalsync",
    tab: "VitalSync",
    title: "VitalSync: AI Family Health Assistant",
    description:
      "One chat runs the whole app. A LangChain agent reads the family's health data and documents, and every change it proposes waits for the user to tap Confirm.",
    stages: [
      {
        label: "Apps",
        nodes: [
          {
            id: "vs-app",
            title: "Android & Web App",
            subtitle: "Chat-first UI + voice",
            icon: "phone",
            tech: ["React", "TypeScript", "Capacitor", "Local notifications"],
            summary:
              "The whole interface is a chat. Replies render inline cards for records, medications, doses, appointments, insurance policies and bills.",
            details: [
              "After a confirmed change, the phone schedules or cancels its local medication and appointment reminders.",
              "The Talk button opens a voice session with the health avatar.",
              "Files attached in chat are uploaded to the user's own storage folder, then read by the agent.",
            ],
          },
        ],
      },
      {
        label: "Agent",
        nodes: [
          {
            id: "vs-agent",
            title: "LangChain Agent",
            subtitle: "Streams tokens, tools and cards",
            icon: "workflow",
            tech: ["LangChain.js", "Express", "SSE", "Zod"],
            summary:
              "Each message runs a LangChain agent on the server and streams text, tool activity and cards back over Server-Sent Events.",
            details: [
              "Tools are built per request for the verified Firebase user, so they can only reach that user's data.",
              "Tools cover family data, semantic search, health and symptom analysis, reading documents, and writes.",
              "The system prompt is built on the server, so clients can't change it.",
            ],
          },
        ],
      },
      {
        label: "Models & Guardrails",
        nodes: [
          {
            id: "vs-gemini",
            title: "Gemini + Live API",
            subtitle: "Chat, documents and voice",
            icon: "brain",
            tech: ["Gemini 2.5 Flash", "Gemini Live API", "WebSockets", "TTS"],
            summary:
              "Gemini powers the chat agent and document reading. Voice mode streams through the Gemini Live API over a WebSocket.",
            details: [
              "The opening health briefing is recorded once per analysis and replayed for free. Only the follow-up conversation uses Live.",
              "Each user has a daily voice limit, and sessions are capped at 10 minutes.",
            ],
          },
          {
            id: "vs-confirm",
            title: "Confirm-to-Write",
            subtitle: "Every change needs a tap",
            icon: "shield",
            tech: ["Pending actions", "Human-in-the-loop"],
            summary:
              "Write tools never change data directly. They store a pending action and show a confirm card.",
            details: [
              "Confirm runs the action once and Cancel discards it.",
              "Pending actions expire after 15 minutes.",
            ],
          },
        ],
      },
      {
        label: "Data & Hosting",
        nodes: [
          {
            id: "vs-firebase",
            title: "Firebase on Cloud Run",
            subtitle: "Auth, Firestore, Storage",
            icon: "database",
            tech: ["Firebase Auth", "Firestore", "Firebase Storage", "Google Cloud Run"],
            summary:
              "Each family's data lives under its own user path in Firestore and Storage, and the server runs on Cloud Run.",
            details: [
              "Security rules and per-request tools both scope access to the signed-in user.",
              "Chat sessions are kept per user (the last 30).",
              "Agent tests use a scripted LangChain model and an in-memory Firestore, so they never call Gemini.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "agentic-trading",
    tab: "Trading Assistant",
    title: "Agentic Trading Assistant",
    description:
      "An LLM proposes trades from market context and the trader's own rules. A deterministic risk guardrail checks every proposal, the user approves every new rule, and the LLM can never place a trade.",
    stages: [
      {
        label: "Market Context",
        nodes: [
          {
            id: "at-market",
            title: "Market Data & Events",
            subtitle: "Prices, news, calendar",
            icon: "activity",
            tech: ["TradingView data", "Yahoo Finance RSS", "Economic calendar", "WASDE"],
            summary:
              "Each account's watchlist of up to 15 symbols (US stocks, ETFs and grain, oil and gold futures) is scanned during market hours.",
            details: [
              "Inputs: daily bars, stock fundamentals, headlines, high-importance US releases, the WASDE schedule and earnings dates.",
              "Failed or rate-limited sources are treated as no data, never as a signal.",
            ],
          },
        ],
      },
      {
        label: "Reasoning",
        nodes: [
          {
            id: "at-graph",
            title: "LangGraph Recommendation Graph",
            subtitle: "Context → rules → Gemini → trade",
            icon: "workflow",
            tech: ["LangGraph", "Gemini Flash-Lite", "LangSmith", "FastAPI"],
            summary:
              "Each recommendation runs as a StateGraph: market data, news, the trader's active rules, the prompt, the Gemini call, parsing and the proposed trade.",
            details: [
              "Every node is traced in LangSmith, and each run's id links to its trace.",
              "A model allowlist and token cap hold cost to a target of under $25 a month.",
            ],
          },
        ],
      },
      {
        label: "Risk Control",
        nodes: [
          {
            id: "at-risk",
            title: "Deterministic Risk Guardrail",
            subtitle: "Plain Python, not the LLM",
            icon: "shield",
            tech: ["Position limits", "Stop-losses", "1% risk rule", "Event blackout"],
            summary:
              "Every proposed trade is approved, rejected or modified by plain Python checks before anything else sees it.",
            details: [
              "Mandatory stop-losses, position-value caps and the 1% dollar-risk rule.",
              "No new entries within set hours of macro or WASDE releases or the stock's own earnings.",
              "Every surface is propose-and-notify only. The LLM can never place a trade.",
            ],
          },
        ],
      },
      {
        label: "Delivery & Learning",
        nodes: [
          {
            id: "at-app",
            title: "Android App + Push",
            subtitle: "Desk, chat, results, strategy",
            icon: "phone",
            tech: ["Android", "Firebase Auth", "FCM"],
            summary:
              "Recommendations arrive as push alerts. Each one shows its chart, the risk checks it passed and the rules it used, with one-tap feedback.",
            details: [
              "Accounts are fully isolated, with their own rules, history, alerts and paper account.",
              "Self sign-up is off, and the backend only serves an allowlist of users.",
            ],
          },
          {
            id: "at-eval",
            title: "Run Grading & Rule Learning",
            subtitle: "Measured, human-approved",
            icon: "gauge",
            tech: ["Outcome grading", "Rule suggestions", "Prompt versioning"],
            summary:
              "Every agent run is logged and graded against later prices. Feedback becomes candidate rules that only take effect after the user approves them.",
            details: [
              "Hit rate and average return are broken down by symbol, source, risk decision and prompt version.",
              "Approved rules apply to the next recommendation immediately, with no retraining.",
            ],
          },
        ],
      },
    ],
    feedback: { label: "feedback → approved rules", toStage: 1 },
  },
];
