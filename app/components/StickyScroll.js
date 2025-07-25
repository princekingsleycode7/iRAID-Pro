"use client";

import React from "react";
import ShinyText from "./TextAnimations/ShinyText/ShinyText";
import BlurText from "./TextAnimations/BlurText/BlurText";

export default function StickyScroll() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div className="sticky-scroll-layout outro">
      <div className="sticky-scroll-layout__fixed-pane">
        <div className="sticky-scroll-layout__fixed-content">
          <h1>
            OUR <br></br>ARCHIEMENTS
          </h1>
        </div>
      </div>
      <div className="sticky-scroll-layout__scrollable-pane">
        <div className="sticky-scroll-layout__item">
          <h2>
            <ShinyText
              text="Sponsors"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </h2>
          <BlurText
            text="With support from global and national partners including the World Bank, UNDP, EU MPP, and USAID"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          />
        </div>
        <div className="sticky-scroll-layout__item">
          <h2>
            <ShinyText
              text="Dedicated Team"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </h2>

          <BlurText
            text="Delivered 20+ micro projects across Abia State "
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          />
        </div>
        <div className="sticky-scroll-layout__item">
          <h2>
            <ShinyText
              text="Community"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </h2>
          <BlurText
            text="Led community-based TB care, gender training, and WASH programs "
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          />
        </div>
        <div className="sticky-scroll-layout__item">
          <h2>
            <ShinyText
              text="Empowered"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </h2>
          <BlurText
            text="Built solar-powered water systems managed by women cooperatives, Constructed schools, roads, and health centerz"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          />
        </div>
      </div>
    </div>
  );
}
