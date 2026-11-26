/**
 * Single source of truth for the portfolio.
 *
 * Everything the UI and the plain-text resume render comes from this file.
 * Keep it factual: no invented employers, dates, metrics, or results.
 */

export type SkillCategoryId = "genai" | "cloud" | "database" | "observability";

export interface SkillCategory {
  id: SkillCategoryId;
  /** Short label used on filter pills. */
  label: string;
  /** Full heading used in the resume and knowledge base. */
  title: string;
  skills: string[];
}

export interface ExperienceLocation {
  period: string;
  location: string;
}

export interface Experience {
  company: string;
  title: string;
  start: string;
  end: string;
  employmentType?: string;
  workplace?: string;
  locations: ExperienceLocation[];
  /** Focus areas: drawn only from the verified skill set, no invented metrics. */
  focus: string[];
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface Certification {
  name: string;
  issuer: string;
  short: string;
}

export interface Profile {
  name: string;
  firstName: string;
  headline: string;
  location: string;
  positioning: [string, string];
  valueProposition: string;
  summary: string;
  metrics: { value: string; label: string }[];
  /** Public contact links. Leave a field undefined to hide it. */
  contact: { linkedin?: string; email?: string; github?: string };
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: SkillCategory[];
}

export const profile: Profile = {
  name: "Naga V Sunil K Ravuri",
  firstName: "Sunil",
  headline: "Sr. Infrastructure Engineer at American Airlines · GenAI & Agentic AI Engineer",
  location: "Dallas-Fort Worth Metroplex, Texas",
  positioning: ["GenAI & Agentic AI Engineer", "15+ Yrs Enterprise Cloud & DB Infrastructure"],
  valueProposition:
    "I build production AI agents, RAG and voice applications on top of infrastructure I know inside and out: the databases, Kubernetes clusters and multi-cloud platforms that keep 24x7 systems running.",
  summary:
    "Senior infrastructure and GenAI engineer with 15+ years running 24x7 mission-critical Oracle, Exadata and multi-cloud Kubernetes platforms, now building production AI agents on top of them. At American Airlines, builds RAG and agentic tools for customer relations and database operations, including a pgvector RAG agent, an AI-driven database diagnostics agent and an Exadata patch automation portal on OKE. Independently architected, built, tested and deployed Worq360, a production staffing platform with a 10-agent LangGraph layer over MCP and A2A, live on Azure Kubernetes Service. Hands-on across the full path, from LLM orchestration, retrieval and evaluation (LangSmith, Arize, DeepEval) down to the Kubernetes, database and cloud infrastructure that runs it.",
  metrics: [
    { value: "15+", label: "Years Enterprise IT" },
    { value: "4", label: "Cloud Platforms" },
    { value: "5", label: "Industry Certifications" },
  ],
  contact: {
    email: "sunilkrishnaravuri@gmail.com",
    linkedin: "https://www.linkedin.com/in/sunilravuri",
    github: "https://github.com/sunilravuri",
  },
  experience: [
    {
      company: "American Airlines",
      title: "Sr. Infrastructure Engineer",
      start: "Apr 2017",
      end: "Present",
      employmentType: "Full-time",
      workplace: "Hybrid",
      locations: [{ period: "Apr 2017 – Present", location: "Fort Worth, TX" }],
      focus: [
        "Grievance Code RAG Agent: helps customer relations agents find the right grievance codes to categorize and classify customer complaints. LangChain, Azure OpenAI, PostgreSQL + pgvector, evaluated and traced with Arize.",
        "RADAR (Rapid Automated Database Analysis & Reporting): an AI diagnostics agent built with GitHub Copilot. It connects over SSH with read-only OS and DB users, scans Oracle DB, Grid, ASM and CRS logs, and queries dictionary views to speed up production troubleshooting.",
        "ExaPatch: a central portal that schedules and automates OS, DB and Grid patching for OCI Exadata on dedicated infrastructure across environments and regions. Runs on OKE behind an ingress load balancer, with data in OCI Object Storage.",
        "Migrated databases from on-premises to Oracle Cloud (GoldenGate replication, upgrades to 19c, DR setup) and to Oracle SuperCluster (Exadata).",
        "Implement, monitor and upgrade Kubernetes clusters on Azure and OCI through Rancher, with Prometheus and Grafana on OKE.",
        "GoldenGate and Data Guard on cloud, database design, and SQL reviews with development teams.",
      ],
    },
    {
      company: "Doyensys Inc (client: Capital One)",
      title: "Consultant – Oracle Database Administrator",
      start: "Jun 2016",
      end: "Mar 2017",
      locations: [{ period: "Jun 2016 – Mar 2017", location: "Dallas-Fort Worth Metroplex" }],
      focus: [
        "Oracle 12c on AWS EC2 and PostgreSQL on Amazon RDS",
        "Fail-safe Oracle cluster on AWS with Data Guard and Data Guard Broker",
        "GoldenGate across 6 database nodes alongside Data Guard, plus replication designs for Informatica, OBIEE, Siebel, Salesforce and J2EE apps",
        "Cloudera Hadoop (CDH5) with Sqoop and Hive on AWS and GCP",
      ],
    },
    {
      company: "Tata Consultancy Services (TCS)",
      title: "IT Analyst · Systems Engineer",
      start: "Aug 2010",
      end: "May 2016",
      locations: [
        { period: "Nov 2012 – May 2016", location: "Dallas, TX (IT Analyst)" },
        { period: "Aug 2010 – Nov 2012", location: "Chennai, India (Systems Engineer)" },
      ],
      focus: [
        "24x7 production Oracle SuperCluster and Exadata administration, support and monitoring",
        "SQL Server administration, RMAN backups, Data Pump, and upgrades from 11g to 12c",
        "Performance tuning with AWR, ADDM, STATSPACK, TKPROF and Explain Plan",
        "Partitioning for very large tables, capacity planning and schema management",
      ],
    },
  ],
  education: [
    {
      school: "Vellore Institute of Technology (VIT)",
      degree: "B.E. in Computer Science Engineering",
      start: "2006",
      end: "2010",
    },
  ],
  certifications: [
    { name: "CKA: Certified Kubernetes Administrator", issuer: "The Linux Foundation", short: "CKA" },
    { name: "Microsoft Certified: Azure Solutions Architect", issuer: "Microsoft", short: "AZURE SA" },
    { name: "AWS Certified Solutions Architect", issuer: "Amazon", short: "AWS SA" },
    { name: "Cloudera Certified Administrator for Apache Hadoop – CCAH", issuer: "Cloudera", short: "CCAH" },
    { name: "Oracle Certified Professional – OCP", issuer: "Oracle", short: "OCP" },
  ],
  skills: [
    {
      id: "genai",
      label: "Gen-AI & Agents",
      title: "Gen-AI & Agents",
      skills: [
        "LangGraph",
        "LangChain",
        "AutoGen",
        "MCP (FastMCP)",
        "Google A2A Protocol",
        "RAG Pipelines",
        "Human-in-the-Loop Agents",
        "Azure OpenAI",
        "OpenAI GPT-4",
        "Anthropic Claude",
        "Google Gemini (incl. Live API)",
        "Ollama",
        "Azure AI Search",
        "Azure AI Studio",
        "Azure Document Intelligence",
        "pgvector",
        "Voice-Based AI Applications",
        "LangSmith",
        "Arize",
        "DeepEval",
        "GitHub Copilot",
        "Claude Code",
      ],
    },
    {
      id: "cloud",
      label: "Cloud & K8s",
      title: "Cloud & Kubernetes",
      skills: [
        "Microsoft Azure (AKS)",
        "Oracle Cloud (OCI, OKE)",
        "AWS (EC2, RDS, S3)",
        "Google Cloud Platform (Cloud Run, Firebase)",
        "Kubernetes",
        "Rancher Kubernetes Management",
        "Docker",
        "GitHub Actions CI/CD",
        "Cloudera Hadoop (CDH5)",
      ],
    },
    {
      id: "database",
      label: "Databases & Tuning",
      title: "Databases & Performance Tuning",
      skills: [
        "Oracle Database",
        "Oracle Exadata (Migrations, Smart Scans, Storage Indexes)",
        "Oracle SuperCluster",
        "Oracle GoldenGate",
        "Data Guard",
        "RAC / ASM / Grid Infrastructure",
        "Oracle Exalogic",
        "Oracle RTD",
        "PostgreSQL",
        "Microsoft SQL Server",
        "Oracle Enterprise Manager",
        "AWR",
        "ADDM",
        "ASH",
        "SQL Plan Management",
        "TKPROF",
        "STATSPACK",
        "Explain Plan",
        "PL/SQL",
        "Data Migration",
      ],
    },
    {
      id: "observability",
      label: "Dev, IaC & Observability",
      title: "Development, IaC & Observability",
      skills: [
        "Python",
        "FastAPI",
        "TypeScript",
        "Node.js / NestJS",
        "Angular",
        "React",
        "JavaScript",
        "Prometheus",
        "Grafana",
        "Elasticsearch",
        "Fluentd",
        "Kibana (EFK)",
        "Terraform",
        "Ansible",
        "Linux",
        "Unix Shell Scripting",
      ],
    },
  ],
};
