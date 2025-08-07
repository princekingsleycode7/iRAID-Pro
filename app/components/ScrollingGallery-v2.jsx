"use client";

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Import the scoped styles
import styles from './ScrollingGallery.module.css';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollingGallery = () => {
  // An array of image URLs to be displayed.
  // This makes the component reusable and easy to update.
  const imageURLs = [
    '/img/road/p1.jpg',
    '/img/road/p2.jpg',
    '/img/road/p3.jpg',
    '/img/road/p4.jpg',
    '/img/road/p5.jpg', 
    '/img/road/p32.jpg',
    '/img/agric/p10.jpg',
    '/img/agric/p11.jpg', 
    '/img/agric/p12.jpg',
    '/img/agric/p13.jpg',
    '/img/agric/p14.jpg',
    '/img/agric/p33.jpg',
    '/img/agric/p40.jpg',
    '/img/agric/p17.jpg',
    '/img/agric/p41.jpg',
  ];

  useEffect(() => {
    // --- Smooth Scrolling with Lenis ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // --- GSAP Parallax Animation ---
    // We target the specific, non-modular class name 'gsap-image'
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.gallery}`, // Use the module class for the trigger
        scrub: true,
      },
    });

    tl.to('.gsap-image', { // Target the stable GSAP class
      stagger: 0.2,
      y: -700,
      scrub: true,
    });
    
    // --- Cleanup Function ---
    // This runs when the component is unmounted
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      tl.kill(); // Kill the timeline
      ScrollTrigger.killAll(); // Kill all ScrollTriggers
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>so sick</h1>

      {/* This section creates the vertical lines */}
      <section className={styles.linesSection}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </section>

      {/* This is the main gallery for the images */}
      <section className={styles.gallery}>
        {imageURLs.map((url, index) => (
          <div
            key={index}
            // We add a stable class 'gsap-image' for GSAP to target,
            // along with the scoped 'styles.image' for styling.
            className={`${styles.image} gsap-image`}
            style={{ backgroundImage: `url(${url})` }}
          ></div>
        ))}
      </section>

      {/* An empty section to provide scrolling space at the end */}
      <section className={styles.endSection}></section>
    </div>
  );
};

export default ScrollingGallery;