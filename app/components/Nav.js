"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import gsap from "gsap";

const Nav = () => {
  // State to control the nav's appearance based on background color
  const [navColorMode, setNavColorMode] = useState('light');

  // This useEffect handles the menu open/close animation and logic
  useEffect(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuContent = document.querySelector(".menu-content");
    const menuPreviewImg = document.querySelector(".menu-preview-img");
    const menuLinks = document.querySelectorAll(".link a");

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
      const targetOut = isOpening ? open : close;
      const targetIn = isOpening ? close : open;
      
      gsap.to(targetOut, {
          x: isOpening ? 5 : -5,
          y: isOpening ? -10 : 10,
          rotation: isOpening ? -5 : 5,
          opacity: 0,
          delay: 0.25,
          duration: 0.5,
          ease: "power2.out",
      });

      gsap.to(targetIn, {
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
      window.isMenuOpen = isOpen; // Update global flag

      if (isOpen) {
        if(window.lenis) window.lenis.stop(); // Stop smooth scroll

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
            y: '0%',
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
            gsap.set([".link a", ".social a", ".menu-footer a"], { y: '120%', opacity: 0.25 });
            resetPreviewImage();
            
            if(window.lenis) window.lenis.start(); // Re-enable smooth scroll
            
            // This is a safety check for GSAP's ScrollTrigger
            if (window.ScrollTrigger) {
                window.ScrollTrigger.refresh();
            }
            
            isAnimating = false;
        };

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
            y: '120%',
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

    menuToggle.addEventListener("click", toggleMenu);
    
    menuLinks.forEach((link) => {
      link.addEventListener("mouseover", () => {
        if (!isOpen || isAnimating || !menuPreviewImg) return;

        const imgSrc = link.getAttribute("data-img");
        if (!imgSrc) return;
        
        const previewImages = menuPreviewImg.querySelectorAll("img");
        if (previewImages.length > 0 && previewImages[previewImages.length - 1].src.endsWith(imgSrc)) {
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

    // Cleanup for the menu toggle listener
    return () => {
      menuToggle.removeEventListener("click", toggleMenu);
    };
  }, []);

  // This useEffect handles the scroll-based color change
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const sections = document.querySelectorAll('.section, .timeline-section, .sticky-scroll-layout');

    const updateNavColor = () => {
      if (window.isMenuOpen) return; // Don't run this logic if the menu is open

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
        const rgb = bgcolor.match(/\d+/g);
        if (rgb) {
          const isDark = parseInt(rgb[0]) <= 50 && parseInt(rgb[1]) <= 50 && parseInt(rgb[2]) <= 50;
          setNavColorMode(isDark ? 'dark' : 'light');
        }
      }
    };

    const setupScrollListener = () => {
      if (window.lenis) {
        window.lenis.on('scroll', updateNavColor);
        updateNavColor(); // Initial check
      } else {
        setTimeout(setupScrollListener, 100);
      }
    };

    setupScrollListener();

    // Cleanup function
    return () => {
      if (window.lenis) {
        window.lenis.off('scroll', updateNavColor);
      }
    };
  }, []); // Runs once on mount

  return (
    <>
      <nav className={navColorMode === 'dark' ? 'over-dark' : 'over-light'}>
        <div className="logo">
          <a className="a logor" style={{ letterSpacing: "2px" }} href="#">
            <span className="i">I</span>RAID
          </a>
        </div>
        <div className="menu-toggle">
          <p className="p" id="menu-open">
            Menu
          </p>
          <p className="p2" id="menu-close">
            Close
          </p>
        </div>
      </nav>

      <div className="menu-overlay">
        <div className="menu-content">
          <div className="menu-items">
            <div className="col-lg">
              <div className="menu-preview-img">
                <img className="navimg" src="/img/agric/P40.jpeg" alt="Preview Image 1" />
              </div>
            </div>
            <div className="col-sm">
              <div className="menu-links">
                <div className="link">
                  <a className="a" href="#" data-img="/img/building/P57.jpeg">Visions</a>
                </div>
                <div className="link">
                  <a className="a" href="/core" data-img="/img/community/P34.jpeg">Core</a>
                </div>
                <div className="link">
                  <a className="a" href="#" data-img="/img/road/P1.jpeg">Progress</a>
                </div>
                <div className="link">
                  <a className="a" href="#" data-img="/img/water/P31.jpeg">Connect</a>
                </div>
              </div>
              <div className="menu-socials">
                <div className="social"><a className="a" href="#">TikTok</a></div>
                <div className="social"><a className="a" href="#">Instagram</a></div>
              </div>
            </div>
          </div>
          <div className="menu-footer">
            <div className="col-lg">
              <a className="a" href="#">Run Sequence</a>
            </div>
            <div className="col-sm">
              <a className="a" href="#">Origin</a>
              <a className="a" href="#">Join Signal</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;