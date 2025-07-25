import React from "react";

const Footer = () => {
  return (
    <section className="section footer">
      <footer className="site-footer">
        <div className="site-footer__container">
          <div className="site-footer__grid">
            <div className="site-footer__column">
              <div className="site-footer__logo">I R A I D</div>
              <div className="site-footer__info-block">
                <p className="site-footer__info-label">Address:</p>
                <p className="site-footer__info-text">
                  Level 1, 12 Sample St, Sydney NSW 2000
                </p>
              </div>
              <div className="site-footer__info-block">
                <p className="site-footer__info-label">Contact:</p>
                <p className="site-footer__info-text">1800 123 456</p>
                <p className="site-footer__info-text">hello@nonprofit.org</p>
              </div>
            </div>
            <div className="site-footer__column">
              <h3 className="site-footer__column-title">Get Involved</h3>
              <ul className="site-footer__link-list">
                <li>
                  <a href="#" className="site-footer__link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="site-footer__link">
                    Our Impact
                  </a>
                </li>
                <li>
                  <a href="#" className="site-footer__link">
                    Donate Now
                  </a>
                </li>
                <li>
                  <a href="#" className="site-footer__link">
                    Volunteer With Us
                  </a>
                </li>
                <li>
                  <a href="#" className="site-footer__link">
                    Events Calendar
                  </a>
                </li>
              </ul>
            </div>
            <div className="site-footer__column">
              <h3 className="site-footer__column-title">Success Stories</h3>
              <ul className="site-footer__link-list">
                <li>
                  <a href="#" className="site-footer__link">
                    Join Us
                  </a>
                </li>
                <li>
                  <a href="#" className="site-footer__link">
                    News Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="site-footer__link">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="site-footer__link">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="site-footer__column">
              <div className="site-footer__social-links">
                <a href="#" className="site-footer__social-icon">
                  <i data-lucide="facebook" width="20" height="20"></i>
                </a>
                <a href="#" className="site-footer__social-icon">
                  <i data-lucide="instagram" width="20" height="20"></i>
                </a>
                <a href="#" className="site-footer__social-icon">
                  <i data-lucide="twitter" width="20" height="20"></i>
                </a>
                <a href="#" className="site-footer__social-icon">
                  <i data-lucide="youtube" width="20" height="20"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="site-footer__bottom-bar">
            <p className="site-footer__copyright">
              © 2023 Nonprofit Agency. All rights reserved.
            </p>
            <p>
              Made with <span className="site-footer__heart" style={{ color: "red" }}>♥</span> by{" "}
              <a
                href="https://digiking.com.ng"
                target="_blank"
                rel="noopener"
                className="site-footer__link"
              >
                CETF - DIGIKING
              </a>
            </p>
            <div className="site-footer__legal-links">
              <a href="#" className="site-footer__legal-link">
                Privacy Policy
              </a>
              <a href="#" className="site-footer__legal-link">
                Terms of Service
              </a>
              <a href="#" className="site-footer__legal-link">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;