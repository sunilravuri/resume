/**
 * Reference architecture blueprints. Each one is put together from the verified
 * skill stack in data/profile.ts. They show how these technologies fit together,
 * not a specific employer's confidential system, and they contain no invented metrics.
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
  | "stethoscope";

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
];
