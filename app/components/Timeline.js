"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Image from 'next/image';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Timeline = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timelineItems = document.querySelectorAll(".timeline-section__item");

    timelineItems.forEach((item) => {
      const textContent = item.querySelector(".timeline-section__text-content");
      const imageWrapper = item.querySelector(".timeline-section__image-wrapper");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      });

      tl.to(textContent, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        imageWrapper,
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    });
  }, []);

  return (
    <section className="timeline-section">
      <div className="timeline-section">
        <div className="timeline-header">
          <h1 className="newscrollh1">Our Journey</h1>
          <p className="newscrollp">
            Explore the milestones of our journey, from community engagement to global
            partnerships.
          </p>
        </div>
      </div>
      <div className="timeline-section__container">
        <div className="timeline-section__line"></div>
        <div className="timeline-section__content-wrapper">
          <div className="timeline-section__item">
            <div className="timeline-section__dot"></div>
            <div className="timeline-section__grid">
              <div className="timeline-section__text-content">
                <h2 className="timeline-section__date">2001</h2>
                <h3 className="timeline-section__title">Community Engagement Event</h3>
                <p className="timeline-section__description">
                  Our community engagement event in 2001 brought together diverse voices. It
                  was a pivotal moment for collaboration.
                </p>
                <div className="timeline-section__actions">
                  <button className="timeline-section__button--secondary">Join</button>
                  <button className="timeline-section__button--link">Participate →</button>
                </div>
              </div>
              <div className="timeline-section__image-wrapper">
                <div className="timeline-section__placeholder-image">
                  <Image alt="description" src="/img/signPost/P21.jpeg" />
                </div>
              </div>
            </div>
          </div>
          <div className="timeline-section__item">
            <div className="timeline-section__dot"></div>
            <div className="timeline-section__grid timeline-section__grid--reversed">
              <div className="timeline-section__text-content">
                <h2 className="timeline-section__date">2019</h2>
                <h3 className="timeline-section__title">Partnership Development</h3>
                <p className="timeline-section__description">
                  In 2019, we forged essential partnerships that expanded our reach. These
                  collaborations were vital for our growth.
                </p>
                <div className="timeline-section__actions">
                  <button className="timeline-section__button--secondary">Connect</button>
                  <button className="timeline-section__button--link">Engage →</button>
                </div>
              </div>
              <div className="timeline-section__image-wrapper">
                <div className="timeline-section__placeholder-image">
                  <Image alt="description" src="/img/signPost/P59.jpeg" />
                </div>
              </div>
            </div>
          </div>
          <div className="timeline-section__item">
            <div className="timeline-section__dot"></div>
            <div className="timeline-section__grid">
              <div className="timeline-section__text-content">
                <h2 className="timeline-section__date">2018</h2>
                <h3 className="timeline-section__title">First Initiative Launch</h3>
                <p className="timeline-section__description">
                  Our first initiative in 2018 marked the beginning of our journey. It laid
                  the groundwork for our mission.
                </p>
                <div className="timeline-section__actions">
                  <button className="timeline-section__button--secondary">Support</button>
                  <button className="timeline-section__button--link">Donate →</button>
                </div>
              </div>
              <div className="timeline-section__image-wrapper">
                <div className="timeline-section__placeholder-image">
                  <Image alt="description" src="/img/signPost/P55.jpeg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
         
  );
};

export default Timeline;