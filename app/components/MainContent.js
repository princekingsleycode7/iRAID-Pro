// app/components/MainContent.js

"use client";

import { useEffect } from "react";

// Import all your section components
import Preloader from "./Preloader";
import Nav from "./Nav";
import Hero from "./Hero";
import StickyScroll from "./StickyScroll";
import Timeline from "./Timeline";
import SectionHeader from "./SectionHeader";
import ScrollingGallery from "./ScrollingGallery";
import ImpactSection from "./ImpactSection";
import JoinUsSection from "./JoinUsSection";
import BlogSection from "./BlogSection";
import Footer from "./Footer";

export default function MainContent() {
  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    // It's the perfect place to initialize libraries that need the `window` object.
    const initializeScroll = () => {
      const Lenis = window.Lenis;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      // Ensure the libraries are loaded before using them
      if (!Lenis || !gsap || !ScrollTrigger) {
        // Retry initialization after a short delay if scripts are not ready
        setTimeout(initializeScroll, 50);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis for smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.5,
        smoothTouch: false,
      });

      // Make the Lenis instance globally available for other component animations
      window.lenis = lenis;

      // Connect Lenis to GSAP's ticker for synchronized updates
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Use a more standard time multiplier
      });
      gsap.ticker.lagSmoothing(0);
      
      // A global flag for the nav menu animation to use
      window.isMenuOpen = false;
    };

    initializeScroll();

    // Cleanup function to run when the component unmounts
    return () => {
      if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
      }
      // You may also want to kill GSAP tickers if they cause issues on page transitions
    };
  }, []);

  return (
    <>
      <Preloader />
      <Nav />
      {/* This container div is crucial, as it's targeted by the menu animation */}
      <div className="container">
        <Hero />
        <StickyScroll />
        <Timeline />
          <SectionHeader 
          title="Our Gallery" 
          description="Explore the milestones of our journey, from community engagement to global partnerships." 
        />
        <ScrollingGallery />
        <ImpactSection />
        <JoinUsSection />
        <BlogSection />
        <Footer />
      </div>
    </>
  );
}