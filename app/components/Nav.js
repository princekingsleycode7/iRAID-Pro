"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

const Nav = () => {
  // State to control the nav's appearance based on background color
  const [navColorMode, setNavColorMode] = useState("light");

  // This useEffect handles the menu open/close animation and logic
  useEffect(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuContent = document.querySelector(".menu-content");
    const menuPreviewImg = document.querySelector(".menu-preview-img");
    const menuLinks = document.querySelectorAll(".link a");
    const menuCloseBtn = document.querySelector("#menu-close"); // new

    let isOpen = false;
    let isAnimating = false;

    const cleanupPreviewImages = () => {
      if (!menuPreviewImg) return;
      const previewImages = menuPreviewImg.querySelectorAll("img");
      if (previewImages.length > 3) {
        for (let i = 0; i < previewImages.length - 3; i++) {
          menuPreviewImg.removeChild(previewImages[i]);
        }
      }
    };

    const resetPreviewImage = () => {
      if (!menuPreviewImg) return;
      menuPreviewImg.innerHTML = "";
      const defaultPreviewImg = document.createElement("img");
      // Use a valid image path from your public folder
      defaultPreviewImg.src = "/img/agric/P40.jpeg";
      menuPreviewImg.appendChild(defaultPreviewImg);
    };

    const animateMenuToggle = (isOpening) => {
      const open = document.querySelector("#menu-open");
      const close = document.querySelector("#menu-close");

      gsap.to(isOpening ? open : close, {
        x: isOpening ? 5 : -5,
        y: isOpening ? -10 : 10,
        rotation: isOpening ? -5 : 5,
        opacity: 0,
        delay: 0.25,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(isOpening ? close : open, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        delay: 0.5,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const toggleMenu = () => {
      if (isAnimating) return;
      isAnimating = true;
      isOpen = !isOpen;
      window.isMenuOpen = isOpen;

      if (isOpen) {
        if (window.lenis) window.lenis.stop();

        gsap.to("#menu-close", {
          opacity: 1,
          duration: 0.3,
          delay: 0.6,
          onStart: () => {
            menuCloseBtn.style.pointerEvents = "auto";
          },
        });

        animateMenuToggle(true);

        gsap.to(".container", {
          rotation: 10,
          x: 300,
          y: 450,
          scale: 1.5,
          duration: 1.25,
          ease: "power4.inOut",
        });

        gsap.to(menuContent, {
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.25,
          ease: "power4.inOut",
        });

        gsap.to([".link a", ".social a", ".menu-footer a"], {
          y: "0%",
          opacity: 1,
          duration: 1,
          delay: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        });

        gsap.to(menuOverlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.25,
          ease: "power4.inOut",
          onComplete: () => {
            isAnimating = false;
          },
        });
      } else {
        const onComplete = () => {
          gsap.set(".container", { clearProps: "transform" });
          gsap.set([".link a", ".social a", ".menu-footer a"], {
            y: "120%",
            opacity: 0.25,
          });
          resetPreviewImage();

          if (window.lenis) window.lenis.start();
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();

          isAnimating = false;
        };

        gsap.to("#menu-close", {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            menuCloseBtn.style.pointerEvents = "none";
          },
        });

        animateMenuToggle(false);

        gsap.to(".container", {
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power4.inOut",
        });

        gsap.to(menuContent, {
          rotation: -15,
          x: -100,
          y: -100,
          scale: 1.5,
          opacity: 0.25,
          duration: 1.25,
          ease: "power4.inOut",
        });

        gsap.to([".link a", ".social a", ".menu-footer a"], {
          y: "120%",
          opacity: 0.25,
          duration: 1,
          stagger: { each: 0.05, from: "end" },
          ease: "power3.out",
        });

        gsap.to(menuOverlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      }
    };

    // Main menu toggle button
    menuToggle.addEventListener("click", toggleMenu);
    // Close button inside menu
    menuCloseBtn.addEventListener("click", toggleMenu);

    menuLinks.forEach((link) => {
      link.addEventListener("mouseover", () => {
        if (!isOpen || isAnimating || !menuPreviewImg) return;
        const imgSrc = link.getAttribute("data-img");
        if (!imgSrc) return;

        const previewImages = menuPreviewImg.querySelectorAll("img");
        if (
          previewImages.length > 0 &&
          previewImages[previewImages.length - 1].src.endsWith(imgSrc)
        ) {
          return;
        }

        const newPreviewImg = document.createElement("img");
        newPreviewImg.src = imgSrc;
        newPreviewImg.style.opacity = "0";
        newPreviewImg.style.transform = "scale(1.25) rotate(10deg)";
        menuPreviewImg.appendChild(newPreviewImg);
        cleanupPreviewImages();

        gsap.to(newPreviewImg, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.75,
          ease: "power2.out",
        });
      });
    });

    return () => {
      menuToggle.removeEventListener("click", toggleMenu);
      menuCloseBtn.removeEventListener("click", toggleMenu);
    };
  }, []);

  // This useEffect handles the scroll-based color change

  // This useEffect handles the scroll-based color change AND hide/show behavior (robust)
useEffect(() => {
  const nav = document.querySelector("nav");
  if (!nav) return;

  const sections = document.querySelectorAll(".section, .timeline-section, .sticky-scroll-layout");

  let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
  let ticking = false;

  // core logic: hide on scroll down, show on scroll up, and detect section background color
  const updateNav = () => {
    if (window.isMenuOpen) return; // don't hide when menu is open

    const currentScrollY = window.scrollY || 0;

    // threshold to avoid tiny scroll jitter
    if (currentScrollY > lastScrollY + 10) {
      nav.classList.add("hidden");
    } else if (currentScrollY < lastScrollY - 10) {
      nav.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;

    // ====== ORIGINAL COLOR MODE DETECTION ======
    const navRect = nav.getBoundingClientRect();
    const navMidpoint = navRect.top + navRect.height / 2;
    let currentSection = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navMidpoint && rect.bottom >= navMidpoint) {
        currentSection = section;
      }
    });

    if (currentSection) {
      const bgcolor = window.getComputedStyle(currentSection).backgroundColor;
      const rgb = bgcolor && bgcolor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const r = parseInt(rgb[0], 10);
        const g = parseInt(rgb[1], 10);
        const b = parseInt(rgb[2], 10);
        const isDark = r <= 50 && g <= 50 && b <= 50;
        setNavColorMode(isDark ? "dark" : "light");
      }
    }
  };

  // small RAF wrapper to throttle calls
  const rafWrapper = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  };

  // Named handlers so we can remove them later
  const lenisHandler = () => rafWrapper();
  const nativeHandler = () => rafWrapper();

  // Try to attach to Lenis if available, else fallback to native scroll.
  let lenisAttached = false;
  let lenisCheckInterval = null;

  const attachLenis = () => {
    if (window.lenis && !lenisAttached) {
      // attach the named handler
      window.lenis.on("scroll", lenisHandler);
      lenisAttached = true;
      // once attached, stop polling
      if (lenisCheckInterval) {
        clearInterval(lenisCheckInterval);
        lenisCheckInterval = null;
      }
      // run one update in case scroll position changed while waiting
      updateNav();
    }
  };

  // initial attempt
  attachLenis();

  // always add native listener as a reliable fallback (won't harm if Lenis also triggers)
  window.addEventListener("scroll", nativeHandler, { passive: true });

  // if Lenis not yet present, poll briefly (100ms up to ~3s) to attach once it becomes available
  if (!lenisAttached) {
    let tries = 0;
    lenisCheckInterval = setInterval(() => {
      tries++;
      if (window.lenis) {
        attachLenis();
      } else if (tries > 30) {
        // stop after ~3s
        clearInterval(lenisCheckInterval);
        lenisCheckInterval = null;
      }
    }, 100);
  }

  // small delayed initial check (fonts/images/layout might change initial positions)
  const initialTimeout = setTimeout(updateNav, 200);

  // cleanup on unmount
  return () => {
    if (lenisAttached && window.lenis?.off) {
      // remove lenis listener
      window.lenis.off("scroll", lenisHandler);
    }
    window.removeEventListener("scroll", nativeHandler);
    if (lenisCheckInterval) {
      clearInterval(lenisCheckInterval);
      lenisCheckInterval = null;
    }
    clearTimeout(initialTimeout);
  };
}, []); // run once


  return (
    <>
      <nav className={navColorMode === "dark" ? "over-dark" : "over-light"}>
        <div className="logo">
          <a href="/" className="a logor" style={{ letterSpacing: "2px" }} href="#">
            <span className="i">I</span>RAID
          </a>
        </div>
        <div className="menu-toggle">
          <p className="p" id="menu-open">
            Menu
          </p>
        </div>
      </nav>

      <div className="menu-overlay">
        <div className="menu-content">
          <div className="menu-close-btn" id="menu-close">
            Close
          </div>
          <div className="menu-items">
            <div className="col-lg">
              <div className="menu-preview-img">
                <img
                  className="navimg"
                  src="/img/agric/P40.jpeg"
                  alt="Preview Image 1"
                />
              </div>
            </div>
            <div className="col-sm">
              <div className="menu-links">
                <div className="link">
                  <a className="a" href="#" data-img="/img/building/P57.jpeg">
                    Visions
                  </a>
                </div>
                <div className="link">
                  <a
                    className="a"
                    href="/core"
                    data-img="/img/community/P34.jpeg"
                  >
                    Core
                  </a>
                </div>
                <div className="link">
                  <a className="a" href="/gallery" data-img="/img/road/P1.jpeg">
                    Progress
                  </a>
                </div>
                <div className="link">
                  <a
                    className="a"
                    href="/connect"
                    data-img="/img/water/P31.jpeg"
                  >
                    Connect
                  </a>
                </div>
              </div>
              <div className="menu-socials">
                <div className="social">
                  <a className="a" href="#">
                    TikTok
                  </a>
                </div>
                <div className="social">
                  <a className="a" href="#">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-footer">
            <div className="col-lg">
              <a
                className="a"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Run Sequence
              </a>
            </div>
            <div className="col-sm">
              <a className="a" href="#">
                Origin
              </a>
              <a className="a" href="#">
                Join Signal
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
