// app/components/SmoothScroller.jsx

"use client";

import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother'; // From the bonus package

const SmoothScroller = ({ children }) => {
  // Use useLayoutEffect to run the effect after the DOM is painted but before the screen is updated.
  // This is ideal for layout-affecting operations to prevent flickering.
  useLayoutEffect(() => {
    // Register the GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Create the ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5, // How long it takes to "catch up" to the native scroll position
      effects: true, // Look for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // Much shorter smoothing on touch devices
    });

    // --- Cleanup function ---
    // This is crucial for Next.js development. When the component unmounts (e.g., due to hot-reloading),
    // we kill the ScrollSmoother instance to prevent memory leaks and errors.
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // The component just returns the children, but wrapped in the necessary divs for ScrollSmoother.
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroller;