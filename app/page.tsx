import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Expertise from "@/components/expertise/Expertise";
import ExperienceTimeline from "@/components/experience-timeline/ExperienceTimeline";
import ProjectsShowcase from "@/components/projects/ProjectsShowcase";
import ProductsSection from "@/components/products/ProductsSection";
import BlogSection from "@/components/blog/BlogSection";
import Philosophy from "@/components/philosophy/Philosophy";
import Recognition from "@/components/recognition/Recognition";
import ContactSection from "@/components/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <ExperienceTimeline />
      <ProjectsShowcase />
      <ProductsSection />
      <BlogSection />
      <Philosophy />
      <Recognition />
      <ContactSection />
    </>
  );
}
