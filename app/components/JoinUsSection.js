import React from "react";

const JoinUsSection = () => {
  return (
    <section className="section join-us-section">
      <div className="join-us-section__container">
        <div className="join-us-section__content">
          <h2 className="join-us-section__title">Join Us in Making a Difference</h2>
          <p className="join-us-section__description">
            Your support can transform lives. Sponsor a project or make a donation today to
            help us.
          </p>
          <div className="join-us-section__actions">
            <button className="join-us-section__button--primary">Donate</button>
            <button className="join-us-section__button--secondary">Sponsor</button>
          </div>
        </div>
        <div className="join-us-section__placeholder-image"></div>
      </div>
    </section>
  );
};

export default JoinUsSection;