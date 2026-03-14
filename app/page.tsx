import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import ProjectShowcase from "@/components/ProjectShowcase";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00E5FF] selection:text-[#001827]">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* What We Do Scrollytelling Section */}
      <WhatWeDo />

      {/* Project Showcase Section */}
      <ProjectShowcase />

      {/* Blog Section */}
      <BlogSection />
      
      <section id="contact" className="relative w-full h-[50vh] flex flex-col items-center justify-center bg-black border-t border-white/5 z-20">
        <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4">
          Contact Us
        </h2>
        <p className="text-gray-400 font-outfit">Request info form goes here.</p>
      </section>
    </main>
  );
}
