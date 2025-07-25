import React from "react";

const ImpactSection = () => {
  return (
    <section className="section impact-section">
      <div className="impact-section__container">
        <div className="impact-section__header">
          <h4 className="impact-section__eyebrow">Empower</h4>
          <h2 className="impact-section__title">Our Core Areas of Impact</h2>
          <p className="impact-section__description">
            We focus on creating sustainable solutions that uplift communities. Our
            initiatives span across vital sectors to foster growth and well-being.
          </p>
        </div>
        <div className="impact-section__grid">
          <div className="impact-section__card">
            <div className="impact-section__icon-wrapper">
              <i data-lucide="home" className="impact-section__icon"></i>
            </div>
            <h3 className="impact-section__card-title">
              Community Development: Building Stronger Neighborhoods
            </h3>
            <p className="impact-section__card-text">
              We enhance local resources and promote engagement
            </p>
          </div>
          <div className="impact-section__card">
            <div className="impact-section__icon-wrapper">
              <i data-lucide="graduation-cap" className="impact-section__icon"></i>
            </div>
            <h3 className="impact-section__card-title">
              Education: Empowering Future Generations
            </h3>
            <p className="impact-section__card-text">
              We provide access to quality education for all
            </p>
          </div>
          <div className="impact-section__card">
            <div className="impact-section__icon-wrapper">
              <i data-lucide="heart" className="impact-section__icon"></i>
            </div>
            <h3 className="impact-section__card-title">
              Healthcare: Ensuring Wellness for Everyone
            </h3>
            <p className="impact-section__card-text">
              We deliver essential health services to communities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;