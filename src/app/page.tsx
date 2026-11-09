import { AiWorkflows } from "@/components/ai-workflows";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { ProjectIndex } from "@/components/project-index";
import { Projects } from "@/components/projects";
import { Stack } from "@/components/stack";
import { Testimonial } from "@/components/testimonial";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Experience />
        <Testimonial />
        <Projects />
        <ProjectIndex />
        <AiWorkflows />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
