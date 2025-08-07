"use client";
// app/core/page.js

import Link from "next/link"; // Import the Link component for navigation
import React, { useState } from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import TiltedCard from "../components/Components/TiltedCard/TiltedCard";
import SmoothScroller from "../components/SmoothScroller";
import Nav from "../components/Nav";

export default function CorePage() {
  return (
    <main>
      <SmoothScroller>
        <Nav />
        {/* Render the navigation */}
       <CoreContent />
      {/* Render the core content */}
      <BackgroundContent />
      {/* Render the background content */}
      <Footer />
      {/* Render the background content */}

      </SmoothScroller>    
      </main>
  );
}
//<Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}> Go back to Home </Link>

const CoreContent = () => (
  <section className="core-content">
    <div className="container">
      <img
        src="/img/about/blurbg.png"
        className="background-video"
        alt="core page background image"
      />
    </div>
    <div className="container-content">
      <div className="left">
        <div className="outline">
          <p className="core-text">At The Core, There's Community</p>
          <h1 className="core-title">
            PEOPLE
            <br />
            PLACE
            <br />
            PURPOSE
          </h1>
          <div className="core-subtitle">
            <p className="core-description">
              this is where our story begins, <br />
              and where we draw our strength
            </p>

            <span className="material-symbols-outlined">arrow_cool_down</span>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          src="/img/about/rightimg.png"
          alt="Core Image"
          className="core-image"
        />
      </div>
    </div>
  </section>
);

const BackgroundContent = () => {
  const [currentImage, setCurrentImage] = useState(
    "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
  );
  const [currentCaption, setCurrentCaption] = useState("Kendrick Lamar - GNX");

  const teamMembers = [
    {
      name: "Bishop C.R. Opoko",
      title: "The Chairman",
      description: "Arch Bishop of Umuahia arch diocese, Methodist Church, Nigeria",
      image: "/img/about/bishop.jpg", // Replace with actual image path
    },
    {
      name: "Prof. G.C. Onuekwusi",
      title: "Vice Chairman",
      description:
        "A consultant Agriculturist, lecturer, Federal University of Agriculture, Umudike, Abia State.",
      image: "/img/about/prof.jpg", // Replace with actual image path
    },
    {
      name: "Barr. Nwazue Kingsley",
      title: "The secretary",
      description: "A legal practitioner based in Umuahia.",
      image: "/img/about/barrister.jpg", // Replace with actual image path
    },
    {
      name: "Prof. Ebere A. Ugwueje",
      title: "The Executive",
      description: "Director is a Sociologist.",
      image: "/img/about/director.jpg", // Replace with actual image path
    },
  ];

  const handleMouseEnter = (image, name) => {
    setCurrentImage(image);
    setCurrentCaption(name);
  };

  const handleMouseLeave = () => {
    setCurrentImage(
      "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
    );
    setCurrentCaption("Kendrick Lamar - GNX");
  };

  return (
    <section className="background">
      <div className="v1">
        <h1>THE ORGANIZATION:</h1>

        <p className="background-text">
          Integrated Rural Aid Foundation, (IRAID) formerly known and called
          Community Partners for Integrated Rural Development (CPIRD) is a
          Non-Governmental Organization (NGO) first formed in year 2001 and
          registered in Abia State with the Ministry of Women Affairs and Youth
          Development. In October 2008 the name changed to Integrated Rural Aid
          Foundation (IRAID) and was registered with the Cooperative Affairs
          Commission with Registration Number <span className="i">29801.</span>
        </p>
      </div>
      <div className="v2">
        <h1 className="right-text">VISION:</h1>
        <p className="background-text">
          Our vision is seeing a better rural Nigerian Community where the
          indigent dwellers are empowered economically, socially and politically.
        </p>
      </div>

      <div className="v3">
        <h1 className="right-text">MISSION:</h1>
        <p className="background-text">
          Our mission is to create an enabling environment for development where
          the rural poor are empowered through skill acquisition/capacity
          building, micro credit, and literacy program, infrastructural
          development projects that contribute to wealth creation on local rural
          level that improve standard of living.
        </p>
      </div>

      <div className="v4">
        <h1 className="right-text">ORGANISATIONAL STRUCTURE</h1>

        <div className="org-structure-container">
          <div className="org-photo-sticky">
            <TiltedCard
              imageSrc={currentImage}
              altText={currentCaption}
              captionText={currentCaption}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text">{currentCaption}</p>
              }
            />
          </div>
          <div className="org-text-right60">
            <div className="org-text">
              {teamMembers.map((member, index) => (
                <p
                  key={index}
                  onMouseEnter={() => handleMouseEnter(member.image, member.name)}
                  onMouseLeave={handleMouseLeave}
                  className="team-member"
                >
                  <span className="i">{member.title}</span> <br />
                  {member.name}, {member.description} <br />
                  <br />
                </p>
              ))}
              <p>
                <span className="i">Our Bankers</span> <br />
                The organization maintains two accounts with First Bank Plc, Umuahia
                Main Branch and Union Bank , Nigeria, Main Branch. <br /> <br />
                <span className="i">And other Professional Volunteers.</span> <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};