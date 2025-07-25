"use client";

import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ImpactSection from "./components/ImpactSection";
import JoinUsSection from "./components/JoinUsSection";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import ScrollingGallery from "./components/ScrollingGallery";
import StickyScroll from "./components/StickyScroll";
import Timeline from "./components/Timeline";
import SectionHeader from "./components/SectionHeader";
import SmoothScroller from "./components/SmoothScroller";


export default function Home() {
  return (
    <main>
      <SmoothScroller>
    
      <Preloader />

      <Nav />
      <Hero />
      <StickyScroll />
      <Timeline />
      <SectionHeader 
          title="Our Gallery" 
          description="Explore the milestones of our journey, from community engagement to global partnerships." />
      <ScrollingGallery />
      <ImpactSection />
      <JoinUsSection />
      <BlogSection />
      <Footer />
      
      </SmoothScroller>
    </main>
  );
}