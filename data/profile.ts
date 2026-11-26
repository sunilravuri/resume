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
  name: "Sunil Krishna Ravuri",
  firstName: "Sunil",
  headline:
    "Sr. Database / Kubernetes / Cloud Infrastructure Administrator & Gen-AI Product Engineer at American Airlines",
  location: "Dallas-Fort Worth Metroplex, Texas",
  positioning: ["Gen-AI Product Engineer", "15+ Yrs Enterprise Cloud & DB Architect"],
  valueProposition:
    "I build production Gen-AI agents, RAG, and voice applications on top of infrastructure I know inside and out: the databases, Kubernetes clusters, and multi-cloud platforms that keep 24x7 systems running.",
  summary:
    "Hands-on Gen-AI product engineer with deep experience building LangGraph agents, AutoGen multi-agent workflows, RAG solutions, voice-based applications, and AI evaluations with LangSmith and Arize—backed by 15+ years of 24x7 mission-critical Enterprise Database Administration (Oracle, Exadata, GoldenGate) and multi-cloud Kubernetes infrastructure engineering.",
  metrics: [
    { value: "15+", label: "Years Enterprise IT" },
    { value: "4", label: "Cloud Platforms" },
    { value: "6", label: "Industry Certifications" },
  ],
  contact: {
    email: "sunilkrishnaravuri@gmail.com",
    linkedin: "https://www.linkedin.com/in/sunilravuri",
  },
  experience: [
    {
      company: "American Airlines",
      title: "Infrastructure Engineer",
      start: "Apr 2017",
      end: "Present",
      employmentType: "Full-time",
      workplace: "Hybrid",
      locations: [{ period: "Apr 2017 – Present", location: "Dallas-Fort Worth Metroplex" }],
      focus: [
        "Gen-AI product engineering: LangGraph agents, AutoGen multi-agent workflows, RAG, voice AI",
        "AI evaluation and observability with LangSmith and Arize",
        "Kubernetes & multi-cloud infrastructure (Azure, OCI, AWS, GCP, Rancher)",
        "Senior database administration for mission-critical 24x7 systems",
      ],
    },
    {
      company: "Capital One",
      title: "AWS Oracle Database Administrator",
      start: "Oct 2016",
      end: "Mar 2017",
      locations: [{ period: "Oct 2016 – Mar 2017", location: "Dallas-Fort Worth Metroplex" }],
      focus: ["Oracle database administration on AWS", "AWS (EC2, RDS, S3)"],
    },
    {
      company: "Doyensys Inc",
      title: "Oracle Database Administrator",
      start: "Jun 2016",
      end: "Oct 2016",
      locations: [{ period: "Jun 2016 – Oct 2016", location: "Dallas-Fort Worth Metroplex" }],
      focus: ["Oracle database administration"],
    },
    {
      company: "Tata Consultancy Services (TCS)",
      title: "Oracle Database Administrator",
      start: "Jul 2010",
      end: "Jun 2016",
      locations: [
        { period: "Nov 2012 – Jun 2016", location: "Dallas-Fort Worth Metroplex" },
        { period: "Jul 2010 – Nov 2012", location: "Greater Chennai Area" },
      ],
      focus: ["Oracle database administration", "Performance tuning and enterprise database operations"],
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
    { name: "Microsoft Certified: Azure Administrator Associate", issuer: "Microsoft", short: "AZURE ADMIN" },
    { name: "Oracle Cloud Infrastructure Certified Architect Associate", issuer: "Oracle", short: "OCI" },
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
        "AutoGen",
        "LangChain",
        "Azure OpenAI",
        "Azure AI Search",
        "Azure AI Studio",
        "RAG Pipelines",
        "Voice-Based AI Applications",
        "LangSmith",
        "Arize",
        "Claude Code",
        "LLMs",
      ],
    },
    {
      id: "cloud",
      label: "Cloud & K8s",
      title: "Cloud & Kubernetes",
      skills: [
        "Microsoft Azure",
        "Oracle Cloud (OCI)",
        "AWS (EC2, RDS, S3)",
        "Google Cloud Platform (GCP)",
        "Kubernetes",
        "Rancher Kubernetes Management",
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
        "Oracle GoldenGate",
        "Data Guard",
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
      label: "Observability & IaC",
      title: "Observability, IaC & Scripting",
      skills: [
        "Prometheus",
        "Grafana",
        "Elasticsearch",
        "Fluentd",
        "Kibana (EFK)",
        "Terraform",
        "Ansible",
        "Linux",
        "Unix Shell Scripting",
        "Python",
        "JavaScript",
      ],
    },
  ],
};
