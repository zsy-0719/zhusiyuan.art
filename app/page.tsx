import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Workflow from "@/components/Workflow";
import FutureVision from "@/components/FutureVision";
import VibeCoding from "@/components/VibeCoding";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import BackToTopDog from "@/components/BackToTopDog";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Workflow />
        <FutureVision />
        <VibeCoding />
        <Gallery />
        <Footer />
      </main>
      <BackToTopDog />
    </>
  );
}
