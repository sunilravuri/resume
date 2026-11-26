import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const rule = (char = "=") => char.repeat(72);

/** Formatted plain-text resume, built from data/profile.ts and the real projects in data/projects.ts. */
export function buildPlainTextResume(): string {
  const p = profile;
  const lines: string[] = [];

  lines.push(p.name.toUpperCase());
  lines.push(p.headline);
  lines.push(p.location);
  const contact = [p.contact.email, p.contact.linkedin, p.contact.github].filter(Boolean);
  if (contact.length) lines.push(contact.join(" | "));
  lines.push(rule());
  lines.push("");

  lines.push("PROFESSIONAL SUMMARY");
  lines.push(rule("-"));
  lines.push(p.summary);
  lines.push("");

  lines.push("CORE SKILLS");
  lines.push(rule("-"));
  for (const cat of p.skills) {
    lines.push(`${cat.title}:`);
    lines.push(`  ${cat.skills.join(", ")}`);
  }
  lines.push("");

  lines.push("PROFESSIONAL EXPERIENCE");
  lines.push(rule("-"));
  for (const role of p.experience) {
    const meta = [role.employmentType, role.workplace].filter(Boolean).join(", ");
    lines.push(`${role.company} | ${role.title}`);
    lines.push(`${role.start} – ${role.end}${meta ? ` (${meta})` : ""}`);
    for (const loc of role.locations) lines.push(`  • ${loc.period}: ${loc.location}`);
    for (const f of role.focus) lines.push(`  - ${f}`);
    lines.push("");
  }

  const realProjects = projects.filter((proj) => proj.kind === "project");
  if (realProjects.length) {
    lines.push("INDEPENDENT AI PROJECTS");
    lines.push(rule("-"));
    for (const proj of realProjects) {
      lines.push(`${proj.title}${proj.period ? ` | ${proj.period}` : ""}`);
      const meta = [proj.role, proj.links?.[0]?.href].filter(Boolean);
      if (meta.length) lines.push(meta.join(" | "));
      lines.push(proj.tagline);
      for (const hl of proj.highlights ?? []) lines.push(`  - ${hl}`);
      lines.push("");
    }
  }

  lines.push("EDUCATION");
  lines.push(rule("-"));
  for (const e of p.education) lines.push(`${e.school}: ${e.degree} (${e.start} – ${e.end})`);
  lines.push("");

  lines.push("CERTIFICATIONS");
  lines.push(rule("-"));
  for (const c of p.certifications) lines.push(`  • ${c.name} (${c.issuer})`);

  return lines.join("\n");
}
