import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import { About, Education, ExperienceSection, Notes, Projects, Skills } from "@/components/Sections";
import { jsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RevealOnScroll />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <ExperienceSection />
        <Notes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
