import AboutSection from "@/components/AboutSection";
import CaseStudies from "@/components/CaseStudies";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <CaseStudies />
      <AboutSection />
      <ExperienceSection />
      <Footer />
    </main>
  );
}