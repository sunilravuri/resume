import { Mail, UserPlus } from "lucide-react";
import type { ReactNode } from "react";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { TechMarquee } from "@/components/TechMarquee";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { profile } from "@/data/profile";

function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-ink-800/50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-400">
            <span className="text-ink-600">{index} /</span> {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">{title}</h2>
          {description && <p className="mt-3 max-w-2xl text-ink-400">{description}</p>}
        </Reveal>
        {/* Each section body handles its own reveal so nested stagger effects stay independent. */}
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const { email, linkedin } = profile.contact;

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <TechMarquee />

        <Section
          id="projects"
          index="01"
          eyebrow="Projects"
          title="AI projects & architecture blueprints"
          description="Production AI systems I built end to end, followed by reference architectures that span my work: Gen-AI agents, multi-cloud Kubernetes platforms, and the mission-critical data tier underneath both. Open a card to explore its interactive diagram."
        >
          <Reveal>
            <ProjectsCarousel />
          </Reveal>
        </Section>

        <Section
          id="skills"
          index="02"
          eyebrow="Skills"
          title="Skills matrix"
          description="Filter by domain to see the full toolchain, from LLM orchestration down to execution plans."
        >
          <SkillsMatrix />
        </Section>

        <Section id="experience" index="03" eyebrow="Experience" title="Career timeline" description="From 2010 to the present.">
          <Reveal>
            <ExperienceTimeline />
          </Reveal>
        </Section>

        <Section id="credentials" index="04" eyebrow="Credentials" title="Education & certifications">
          <Credentials />
        </Section>

        <Section id="contact" index="05" eyebrow="Contact" title="Get in touch">
          <Contact />
        </Section>
      </main>

      <footer className="border-t border-ink-800/50 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 font-mono text-xs text-ink-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <div className="flex gap-4">
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-1.5 transition hover:text-primary-300">
                <Mail className="h-3.5 w-3.5" /> email
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition hover:text-secondary-300">
                <UserPlus className="h-3.5 w-3.5" /> linkedin
              </a>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
