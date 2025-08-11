import React from "react";
import Image from 'next/image';

const BlogSection = () => {
  return (
    <div className="section blog-section">
      <div className="blog-section__container">
        <div className="blog-section__header">
          <h4 className="blog-section__eyebrow">Blog</h4>
          <h2 className="blog-section__title">Latest Insights and Updates</h2>
          <p className="blog-section__description">
            Discover our recent projects and their impact on communities.
          </p>
        </div>
        <div className="blog-section__grid">
          <article className="blog-section__post">
            <div className="blog-section__post-image-wrapper">
              <div className="blog-section__post-placeholder">
                <Image src="/img/bg.png" alt="Blog post image" />
              </div>
            </div>
            <div className="blog-section__post-content">
              <span className="blog-section__post-category">Updates</span>
              <h3 className="blog-section__post-title">
                Empowering Communities Through Education
              </h3>
              <p className="blog-section__post-excerpt">
                Learn how our educational programs are transforming lives and fostering
                growth.
              </p>
              <div className="blog-section__author-info">
                <div className="blog-section__author-avatar">
                       <Image alt="description" className="blog-section__author-avatar" src="https://randomuser.me/api/portraits/men/68.jpg"/>
                </div>
                <div>
                  <p className="blog-section__author-name">Jane Doe</p>
                  <p className="blog-section__author-meta">11 Jan 2022 · 5 min read</p>
                </div>
              </div>
            </div>
          </article>
          <article className="blog-section__post">
            <div className="blog-section__post-image-wrapper">
              <div className="blog-section__post-placeholder">
                <Image src="/img/family.jpg" alt="Blog post image" />
              </div>
            </div>
            <div className="blog-section__post-content">
              <span className="blog-section__post-category">News</span>
              <h3 className="blog-section__post-title">
                Sustainable Practices in Action
              </h3>
              <p className="blog-section__post-excerpt">
                Explore our initiatives promoting sustainability and environmental
                stewardship.
              </p>
              <div className="blog-section__author-info">
                <div className="blog-section__author-avatar">
                  <Image alt="description" className="blog-section__author-avatar" src="https://randomuser.me/api/portraits/men/8.jpg"/>
                </div>
                <div>
                  <p className="blog-section__author-name">John Smith</p>
                  <p className="blog-section__author-meta">15 Feb 2022 · 6 min read</p>
                </div>
              </div>
            </div>
          </article>
          <article className="blog-section__post">
            <div className="blog-section__post-image-wrapper">
              <div className="blog-section__post-placeholder">
                <Image src="/img/farmer.jpg" alt="Blog post image" />
              </div>
            </div>
            <div className="blog-section__post-content">
              <span className="blog-section__post-category">Impact</span>
              <h3 className="blog-section__post-title">
                Celebrating Our Volunteers&apos;s Contributions
              </h3>
              <p className="blog-section__post-excerpt">
                Join us in recognizing the dedication of our amazing volunteers.
              </p>
              <div className="blog-section__author-info">
                <div className="blog-section__author-avatar">
                  <Image className="blog-section__author-avatar" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Author Avatar"/>
                </div>
                <div>
                  <p className="blog-section__author-name">Emily White</p>
                  <p className="blog-section__author-meta">20 Mar 2022 · 4 min read</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="blog-section__footer">
          <button className="blog-section__view-all-button">View all</button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;