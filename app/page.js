import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LearningLog from "@/components/LearningLog";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Skills from "@/components/Skills";
import ToolMarquee from "@/components/ToolMarquee";
import { initials } from "@/lib/format";
import { getSiteData } from "@/lib/site";

export default async function Home() {
  const { profile, projects, log, skills, stats, lastUpdated } = await getSiteData();

  return (
    <>
      <Navbar initials={initials(profile.full_name)} />
      <main className="flex-1">
        <Hero profile={profile} stats={stats} />
        <ToolMarquee tools={skills.map((s) => s.name)} />

        <section id="projects" className="scroll-mt-24 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow="Featured work" title="Projects I'm proud of">
              Each one comes with the full story: the question, the data, the method, and what I&apos;d improve next.
            </SectionHeading>
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 120}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <LearningLog entries={log} lastUpdated={lastUpdated} />
        <Skills skills={skills} />
        <About profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer name={profile.full_name} lastUpdated={lastUpdated} />
    </>
  );
}
