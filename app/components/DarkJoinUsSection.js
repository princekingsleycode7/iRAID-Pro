import React from "react";
import Particles from "./Backgrounds/Particles/Particles";
import StarBorder from "./Animations/StarBorder/StarBorder"

const DarkJoinUsSection = () => {
  return (
    <div className="section" >
  <Particles className={'particles-js'}
    particleColors={['#FF8C00','#FF8C00']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={150}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
  <section className="dark-join-us-section">
      <div className="dark-join-us-section__container">
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
           </div>
      
    </section>
</div>
    
  );
};

export default DarkJoinUsSection;