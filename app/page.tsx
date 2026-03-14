import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import ProjectShowcase from "@/components/ProjectShowcase";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import ContactHub from "@/components/ContactHub";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#57ff8f] selection:text-[#001827]">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* What We Do Scrollytelling Section */}
      <WhatWeDo />

      {/* Project Showcase Section */}
      <ProjectShowcase />

      {/* Blog Section */}
      <BlogSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Hub Section */}
      <ContactHub />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
