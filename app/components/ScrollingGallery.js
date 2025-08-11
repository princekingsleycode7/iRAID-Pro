"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Image from 'next/image';

const ScrollingGallery = () => {
  useEffect(() => {
    const gallerySection = document.querySelector(".scrolling-gallery-section");

    if (gallerySection) {
      const setupInfiniteScroll = (rowId, duration, direction = "left") => {
        const row = document.getElementById(rowId);
        if (!row) return;

        const items = Array.from(row.children);

        items.forEach((item) => {
          const clone = item.cloneNode(true);
          row.appendChild(clone);
        });

        let animation;

        if (direction === "left") {
          animation = gsap.to(row, {
            xPercent: -50,
            ease: "none",
            duration: duration,
            repeat: -1,
          });
        } else {
          gsap.set(row, { xPercent: -50 });
          animation = gsap.to(row, {
            xPercent: 0,
            ease: "none",
            duration: duration,
            repeat: -1,
          });
        }

        row.addEventListener("mouseenter", () => animation.pause());
        row.addEventListener("mouseleave", () => animation.play());
      };

      setupInfiniteScroll("gallery-row-1", 40, "left");
      setupInfiniteScroll("gallery-row-2", 50, "right");
      setupInfiniteScroll("gallery-row-3", 45, "left");
    }
  }, []);

  return (
    <section className="section scrolling-gallery-section">
      <div className="scrolling-gallery__background">
        <div className="scrolling-gallery__row" id="gallery-row-1">
          <div className="scrolling-gallery__item">
            <Image src="/img/agric/P12.jpeg" alt="UI Element 2" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/building/P54.jpeg" alt="UI Element 3" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/community/P25.jpeg" alt="UI Element 4" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img//road/P3.jpeg" alt="UI Element 5" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/water/P38.jpeg" alt="UI Element 6" />
          </div>
        </div>
        <div className="scrolling-gallery__row" id="gallery-row-2">
          <div className="scrolling-gallery__item">
            <Image src="/img/agric/P12.jpeg" alt="Code Element 1" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/building/P54.jpeg" alt="Code Element 2" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/community/P25.jpeg" alt="Code Element 3" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/road/P3.jpeg" alt="Code Element 4" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/water/P38.jpeg" alt="Code Element 5" />
          </div>
        </div>
        <div className="scrolling-gallery__row" id="gallery-row-3">
          <div className="scrolling-gallery__item">
            <Image src="/img/water/P48.jpeg" alt="3D Render 1" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/water/P51.jpeg" alt="3D Render 3" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/signPost/P15.jpeg" alt="3D Render 4" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/agric/P40.jpeg" alt="3D Render 5" />
          </div>
          <div className="scrolling-gallery__item">
            <Image src="/img/community/P28.jpeg" alt="3D Render 6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingGallery;