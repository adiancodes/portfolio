import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { ContactTerminal } from "@/components/ContactTerminal";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 md:gap-24 pb-24">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <ContactTerminal />
    </div>
  );
}
