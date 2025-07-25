"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

const Preloader = () => {
  useEffect(() => {
    gsap.registerPlugin(CustomEase, SplitText);

    CustomEase.create("hop", ".8, 0, .3, 1");

    const splitTextElements = (selector, type = "words,chars", addFirstChar = false) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const splitText = new SplitText(element, {
          type,
          wordsClass: "preloader-word",
          charsClass: "preloader-char",
        });

        if (type.includes("chars")) {
          splitText.chars.forEach((char, index) => {
            const originalText = char.textContent;
            char.innerHTML = `<span>${originalText}</span>`;

            if (addFirstChar && index === 0) {
              char.classList.add("preloader-first-char");
            }
          });
        }
      });
    };

    splitTextElements(".preloader-intro-title .preloader-h1", "words,chars", true);
    splitTextElements(".preloader-outro-title .preloader-h1", "words,chars", true);
    splitTextElements(".preloader-tag .preloader-p", "words");

    const isMobile = window.innerWidth < 1000;
    const isextrasmma = window.innerWidth < 450;

    gsap.set(
      [
        ".preloader-split-overlay .preloader-intro-title .preloader-first-char span",
        ".preloader-split-overlay .preloader-outro-title .preloader-char span",
      ],
      {
        y: "0%",
      }
    );

    gsap.set(".preloader-split-overlay .preloader-intro-title .preloader-first-char", {
      x: isMobile ? "5.5rem" : "15rem",
      y: isMobile ? "-1rem" : "-2.75rem",
      fontWeight: "900",
      scale: 0.75,
    });

    gsap.set(".preloader-split-overlay .preloader-outro-title .preloader-char", {
      x: isMobile ? "-2rem" : "-6rem",
      fontSize: isMobile ? "6rem" : "14rem",
      fontWeight: "500",
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "hop",
      },
    });

    const tags = gsap.utils.toArray(".preloader-tag");

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll(".preloader-p .preloader-word"),
        {
          y: "0%",
          duration: 0.75,
        },
        0.5 + index * 0.1
      );
    });

    tl.to(
      ".preloader .preloader-intro-title .preloader-char span",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.05,
      },
      0.5
    );

    tl.to(
      ".preloader .preloader-intro-title .preloader-char:not(.preloader-first-char) span",
      {
        y: "100%",
        duration: 0.75,
        stagger: 0.05,
      },
      2
    );

    tl.to(
      ".preloader .preloader-outro-title .preloader-char span",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.075,
      },
      2.5
    );
    if (!isextrasmma) {
      tl.to(
        ".preloader .preloader-intro-title .preloader-first-char",
        {
          x: isMobile ? "12.5rem" : "31.7rem",
          duration: 1,
        },
        3.5
      );
    } else {
      tl.to(
        ".preloader .preloader-intro-title .preloader-first-char",
        {
          x: isextrasmma ? "6rem" : "12.5rem",
          duration: 1,
          y: isextrasmma ? "1.7rem" : "0rem",
        },
        3.5
      );

    }

    

    tl.to(
      ".preloader .preloader-outro-title .preloader-char",
      {
        x: isMobile ? "-2rem" : "-6rem",
        duration: 1,
      },
      3.5
    );

    tl.to(
      [".preloader .preloader-intro-title", ".preloader .preloader-outro-title"],
      {
        scale: 0.94,
        duration: 0.75,
      },
      4.5
    );

    tl.to(
      ".preloader .preloader-outro-title",
      {
        fontSize: isMobile ? "6rem" : "14rem",
        fontWeight: "500",
        duration: 0.75,
        onComplete: () => {
          gsap.set(".preloader", {
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
          });
          gsap.set(".preloader-split-overlay", {
            visibility: "visible",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
          });
        },
      },
      4.5
    );

    tl.to(
      ".main-container",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
      },
      6
    );

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll(".preloader-p .preloader-word"),
        {
          y: "100%",
          duration: 0.75,
        },
        5.5 + index * 0.1
      );
    });

    tl.to(
      [".preloader", ".preloader-split-overlay"],
      {
        y: (i) => (i === 0 ? "-50%" : "50%"),
        duration: 1,
        onComplete: () => {
          document.querySelector(".preloader").style.display = "none";
          document.querySelector(".preloader-split-overlay").style.display = "none";
          document.querySelector(".preloader-tags-overlay").style.display = "none";
        },
      },
      6
    );
  }, []);

  return (
    <>
      <div className="preloader">
        <div className="preloader-intro-title">
          <h1 className="preloader-h1">Integrated Rural Aid</h1>
        </div>
        <div className="preloader-outro-title">
          <h1 className="preloader-h1 raida">RAID</h1>
        </div>
      </div>
      <div className="preloader-split-overlay">
        <div className="preloader-intro-title">
          <h1 className="preloader-h1 pre-span">I</h1>
        </div>
        <div className="preloader-outro-title">
          <h1 className="preloader-h1-outro">I<span className="raida">RAID</span></h1>
        </div>
      </div>
      <div className="preloader-tags-overlay">
        <div className="preloader-tag preloader-tag-1">
          <p className="preloader-p">Community First</p>
        </div>
        <div className="preloader-tag preloader-tag-2">
          <p className="preloader-p">Sustainable Growth</p>
        </div>
        <div className="preloader-tag preloader-tag-3">
          <p className="preloader-p">Global Partnership</p>
        </div>
      </div>
    </>
  );
};

export default Preloader;