import AboutSection from "@/components/AboutSection";
import CaseStudies from "@/components/CaseStudies";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Selfintro from "@/components/Selfintro";

export default function Home() {
  return (
    <main>
      <Hero />
      <CaseStudies />
      <div className="bg-neutral-950">
        <Selfintro showNav={false} />
      </div>
      <AboutSection />
      <ExperienceSection />
      <Footer />
    </main>
  );
}