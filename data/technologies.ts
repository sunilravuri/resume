import {
  siAngular,
  siAnsible,
  siAnthropic,
  siDocker,
  siFastapi,
  siFirebase,
  siGithubcopilot,
  siGooglegemini,
  siNestjs,
  siOllama,
  siTypescript,
  siApachehadoop,
  siClaude,
  siCloudera,
  siElasticsearch,
  siFluentd,
  siGnubash,
  siGooglecloud,
  siGrafana,
  siJavascript,
  siKibana,
  siKubernetes,
  siLangchain,
  siLanggraph,
  siLinux,
  siPostgresql,
  siPrometheus,
  siPython,
  siRancher,
  siTerraform,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

/**
 * Technologies for the scrolling logo rows. Brand marks come from the free
 * simple-icons set (CC0). Brands that simple-icons doesn't include (Oracle,
 * Microsoft, AWS, and a few AI tools) use a neutral icon instead.
 */

export type FallbackIcon = "cloud" | "database" | "brain" | "search" | "gauge" | "workflow" | "server" | "replicate";

export interface Technology {
  name: string;
  brand?: Pick<SimpleIcon, "path" | "hex">;
  fallback?: FallbackIcon;
}

export const techRowA: Technology[] = [
  { name: "LangGraph", brand: siLanggraph },
  { name: "LangChain", brand: siLangchain },
  { name: "MCP", fallback: "workflow" },
  { name: "AutoGen", fallback: "workflow" },
  { name: "Anthropic Claude", brand: siAnthropic },
  { name: "Google Gemini", brand: siGooglegemini },
  { name: "Ollama", brand: siOllama },
  { name: "Azure OpenAI", fallback: "brain" },
  { name: "Azure AI Search", fallback: "search" },
  { name: "Claude Code", brand: siClaude },
  { name: "GitHub Copilot", brand: siGithubcopilot },
  { name: "LangSmith", fallback: "gauge" },
  { name: "Arize", fallback: "gauge" },
  { name: "Microsoft Azure", fallback: "cloud" },
  { name: "Oracle Cloud (OCI)", fallback: "cloud" },
  { name: "AWS", fallback: "cloud" },
  { name: "Google Cloud", brand: siGooglecloud },
  { name: "Kubernetes", brand: siKubernetes },
  { name: "Rancher", brand: siRancher },
  { name: "Cloudera", brand: siCloudera },
  { name: "Apache Hadoop", brand: siApachehadoop },
];

export const techRowB: Technology[] = [
  { name: "Oracle Exadata", fallback: "server" },
  { name: "Oracle GoldenGate", fallback: "replicate" },
  { name: "Data Guard", fallback: "database" },
  { name: "PostgreSQL", brand: siPostgresql },
  { name: "SQL Server", fallback: "database" },
  { name: "Prometheus", brand: siPrometheus },
  { name: "Grafana", brand: siGrafana },
  { name: "Elasticsearch", brand: siElasticsearch },
  { name: "Fluentd", brand: siFluentd },
  { name: "Kibana", brand: siKibana },
  { name: "Terraform", brand: siTerraform },
  { name: "Ansible", brand: siAnsible },
  { name: "Linux", brand: siLinux },
  { name: "Shell Scripting", brand: siGnubash },
  { name: "Python", brand: siPython },
  { name: "FastAPI", brand: siFastapi },
  { name: "TypeScript", brand: siTypescript },
  { name: "NestJS", brand: siNestjs },
  { name: "Angular", brand: siAngular },
  { name: "Docker", brand: siDocker },
  { name: "Firebase", brand: siFirebase },
  { name: "JavaScript", brand: siJavascript },
];
