import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00E5FF] selection:text-[#001827]">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Placeholder sections to allow scrolling and testing animations */}
      <section id="modes" className="relative w-full h-screen flex flex-col items-center justify-center bg-[#001827] border-t border-white/10 z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        <h2 className="text-4xl md:text-6xl font-outfit font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5FF] drop-shadow-lg z-10">
          Discover Modes
        </h2>
        <p className="mt-6 text-gray-300 font-outfit text-lg max-w-xl text-center z-10">
          This is a placeholder section to demonstrate the scrollytelling transition and that the page continues past the 500vh hero component.
        </p>
      </section>
      
      <section id="contact" className="relative w-full h-[50vh] flex flex-col items-center justify-center bg-black border-t border-white/5 z-20">
        <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4">
          Contact Us
        </h2>
        <p className="text-gray-400 font-outfit">Request info form goes here.</p>
      </section>
    </main>
  );
}
