
"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DarkVeil from "./Backgrounds/DarkVeil/DarkVeil";


const Hero = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    
    const animatedIcons = document.querySelector(".animated-icons");
    const iconElements = document.querySelectorAll(".animated-icon");
    const textSegments = document.querySelectorAll(".text-segment");
    const placeholders = document.querySelectorAll(".placeholder-icon");
    const heroHeader = document.querySelector(".hero-header");
    const heroSection = document.querySelector(".hero");

    let textAnimationOrder = [];
    textSegments.forEach((segment, index) => {
      textAnimationOrder.push({ segment, originalIndex: index });
    });
    for (let i = textAnimationOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [textAnimationOrder[i], textAnimationOrder[j]] = [
        textAnimationOrder[j],
        textAnimationOrder[i],
      ];
    }

    const isMobile = window.innerWidth <= 1000;
    const headerIconSize = isMobile ? 30 : 60;
    const currentIconSize = iconElements[0].getBoundingClientRect().width;
    const exactScale = headerIconSize / currentIconSize;

    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: () => {
        const multiplier = window.innerWidth <= 450 ? 4 : 8;
        return `+=${window.innerHeight * multiplier}px`;
      },
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        if (window.isMenuOpen) {
          return;
        }

        const progress = self.progress;

        textSegments.forEach((segment) => {
          gsap.set(segment, { opacity: 0 });
        });

        if (progress <= 0.3) {
          const moveProgress = progress / 0.3;
          const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

          if (progress <= 0.15) {
            const headerProgress = progress / 0.15;
            const headerMoveY = -50 * headerProgress;
            const headerOpacity = 1 - headerProgress;

            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: headerOpacity,
            });
          } else {
            gsap.set(heroHeader, {
              transform: "translate(-50%, calc(-50% + -50px))",
              opacity: 0,
            });
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) {
                duplicate.parentNode.removeChild(duplicate);
              }
            });
            window.duplicateIcons = null;
          }

          gsap.set(animatedIcons, {
            x: 0,
            y: containerMoveY,
            scale: 1,
            opacity: 1,
          });

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0 });
          });
        } else if (progress <= 0.6) {
          const scaleProgress = (progress - 0.3) / 0.3;

          gsap.set(heroHeader, {
            transform: "translate(-50%, calc(-50% + -50px))",
            opacity: 0,
          });

          if (scaleProgress > 0.5) {
            heroSection.style.backgroundColor = "#e3e3db";
          } else {
            heroSection.style.backgroundColor = "#141414";
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) {
                duplicate.parentNode.removeChild(duplicate);
              }
            });
            window.duplicateIcons = null;
          }

          const targetCenterX = window.innerWidth / 2;
          const targetCenterY = window.innerHeight / 2;

          const containerRect = animatedIcons.getBoundingClientRect();
          const currentCenterX = containerRect.left + containerRect.width / 2;
          const currentCenterY = containerRect.top + containerRect.height / 2;

          const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
          const deltaY = (targetCenterY - currentCenterY) * scaleProgress;

          const baseY = -window.innerHeight * 0.3;
          const currentScale = 1 + (exactScale - 1) * scaleProgress;

          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: currentScale,
            opacity: 1,
          });

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0 });
          });
        } else if (progress <= 0.75) {
          const moveProgress = (progress - 0.6) / 0.15;

          gsap.set(heroHeader, {
            transform: "translate(-50%, calc(-50% + -50px))",
            opacity: 0,
          });

          heroSection.style.backgroundColor = "#e3e3db";

          gsap.set(animatedIcons, { opacity: 0 });

          if (!window.duplicateIcons) {
            window.duplicateIcons = [];
            iconElements.forEach((icon, index) => {
              const duplicate = icon.cloneNode(true);
              duplicate.className = "duplicate-icon";
              duplicate.style.position = "absolute";
              duplicate.style.width = headerIconSize + "px";
              duplicate.style.height = headerIconSize + "px";
              document.body.appendChild(duplicate);
              window.duplicateIcons.push(duplicate);
            });
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index < placeholders.length) {
                const iconRect = iconElements[index].getBoundingClientRect();
                const startCenterX = iconRect.left + iconRect.width / 2;
                const startCenterY = iconRect.top + iconRect.height / 2;

                const startPageX = startCenterX + window.pageXOffset;
                const startPageY = startCenterY + window.pageYOffset;

                const targetRect = placeholders[index].getBoundingClientRect();

                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;

                const targetPageX = targetCenterX + window.pageXOffset;
                const targetPageY = targetCenterY + window.pageYOffset;

                const moveX = targetPageX - startPageX;
                const moveY = targetPageY - startPageY;

                let currentX = 0;
                let currentY = 0;

                if (moveProgress <= 0.5) {
                  const verticalProgress = moveProgress / 0.5;
                  currentY = moveY * verticalProgress;
                } else {
                  const horizontalProgress = (moveProgress - 0.5) / 0.5;
                  currentY = moveY;
                  currentX = moveX * horizontalProgress;
                }

                const finalPageX = startPageX + currentX;
                const finalPageY = startPageY + currentY;

                duplicate.style.left = finalPageX - headerIconSize / 2 + "px";
                duplicate.style.top = finalPageY - headerIconSize / 2 + "px";
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            });
          }
        } else {
          gsap.set(heroHeader, {
            transform: "translate(-50%, calc(-50% + -100px))",
            opacity: 0,
          });
          heroSection.style.backgroundColor = "#e3e3db";
          gsap.set(animatedIcons, { opacity: 0 });

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index < placeholders.length) {
                const targetRect = placeholders[index].getBoundingClientRect();

                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;

                const targetPageX = targetCenterX + window.pageXOffset;
                const targetPageY = targetCenterY + window.pageYOffset;

                duplicate.style.left = targetPageX - headerIconSize / 2 + "px";
                duplicate.style.top = targetPageY - headerIconSize / 2 + "px";
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            });
          }

          textAnimationOrder.forEach((item, randomIndex) => {
            const segmentStart = 0.75 + randomIndex * 0.03;
            const segmentEnd = segmentStart + 0.015;

            const segmentProgress = gsap.utils.mapRange(
              segmentStart,
              segmentEnd,
              0,
              1,
              progress
            );

            const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

            gsap.set(item.segment, {
              opacity: clampedProgress,
            });
          });
        }
      },
    });
  }, []);

  return (
    <section className="section hero">
    
      
      <div className="hero-header">
        
        <h1 className="scrollh1">Water Is Only The Beginning</h1>
        <p className="scrollp">
          This is what we do. We are Integrated Rural Aid Foundation{" "}
          <span className="raid">(IRAID)</span> and this is what hope looks like when it rises
          from the ground.
        </p>
        <div className="smal-space"></div>
      </div>
<DarkVeil />
      <div className="animated-icons">
        <div className="animated-icon icon-1">
          <img src="/img/agric/P12.jpeg" alt="" style={{ objectFit: "cover" }} />
        </div>
        <div className="animated-icon icon-2">
          <img src="/img/building/P54.jpeg" alt="" style={{ objectFit: "cover" }} />
        </div>
        <div className="animated-icon icon-3">
          <img src="/img/community/P25.jpeg" alt="" style={{ objectFit: "cover" }} />
        </div>
        <div className="animated-icon icon-4">
          <img src="/img/road/P3.jpeg" alt="" style={{ objectFit: "cover" }} />
        </div>
        <div className="animated-icon icon-5">
          <img src="/img/water/P38.jpeg" alt="" style={{ objectFit: "cover" }} />
        </div>
      </div>
      <div className="animated-segments">
      <h1 className="animated-text scroolh1">
        <span className="text-segment">At IRAID, we dont just dig boreholes</span>
        <div className="placeholder-icon"></div>
        <span className="text-segment">or build latrines.</span>
        <span className="text-segment">we unlock potential.</span>
        <div className="placeholder-icon"></div>
        <span className="text-segment">
          Since 2001, we've been walking alongside rural communities in Nigeria,
        </span>
        <div className="placeholder-icon"></div>
        <span className="text-segment">helping them transform water, education,</span>
        <div className="placeholder-icon"></div>
        <span className="text-segment">
          Health and Economics from obstacles into opportunities
        </span>
        <div className="placeholder-icon"></div>
      </h1>
      </div>
    </section>
  );
};

export default Hero;