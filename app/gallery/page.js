// /app/gallery/page.js

import Head from 'next/head';
import Image from 'next/image';
// Correct the import path based on your file structure.
// This path assumes `page.js` is in /app/gallery/ and the css is in /app/gallery/styles/
import styles from './styles/Gallery.module.css';

const GalleryPage = () => {
  return (
    <>
      <Head>
        <title>Discover Designers</title>
        {/* Font links are fine here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.mainContent}>
              <div className={styles.leftPanel}>
                <div className={styles.headerText}>
                  <h1 className={styles.headerTitle}>Witness the Faces of Real Change</h1>
                  <p className={styles.headerSubtitle}>
                    Explore powerful stories of hope, empowerment, and
                    transformation from the rural communities we serve.
                  </p>
                </div>
                <div className={styles.controls}>
                  <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.active}`}>
                      <svg className={styles.tabIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      Impact Stories
                    </button>
                    {/* ... other buttons ... */}
                  </div>
                  <div className={styles.searchContainer}>
                    <input
                      type="text"
                      placeholder="Search for stories, communities, or projects..."
                      className={styles.searchInput}
                    />
                    <button className={styles.searchBtn}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </button>
                  </div>
                  <div className={styles.popularTags}>
                    <span>Popular:</span>
                    <a href="#">Clean Water</a>
                    <a href="#">Women's Empowerment</a>
                    <a href="#">Education</a>
                  </div>
                </div>
              </div>
              <div className={styles.rightPanel}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/img/water/P38.jpeg"
                    alt="Illustration of a man running with his dog"
                    className={styles.mainIllustration}
                    width={1000}
                    height={667}
                    priority
                  />
                  <div className={styles.artistCredit}>
                    <Image
                      src="https://randomuser.me/api/portraits/men/8.jpg"
                      alt="Wanda Arca profile picture"
                      className={styles.artistAvatar}
                      width={28}
                      height={28}
                    />
                    <span>Nkata Community, Abia State</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <nav className={styles.mainNav}>
            {/* ... rest of the nav structure with styles classes ... */}
          </nav>

          <div className={styles.projectGalleryContainer}>
            {/* Card 1: Clean Water, New Hope */}
            <div className={styles.projectCard}>
              <div className={styles.cardContent}>
                <div className={styles.cardImageWrapper}>
                  <Image
                    className={styles.cardImage}
                    src="/img/water/P38.jpeg" // IMPORTANT: Assumes images are in the `public/img` folder
                    alt="A child drinking clean water from a tap."
                    width={400}
                    height={225}
                    unoptimized // Add this if you're using external image paths for now
                  />
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>Clean Water, New Hope</h3>
                  <p className={styles.cardSubtitle}>Nkata Community</p>
                  
                  <div className={styles.cardDescription}>
                    <p className={styles.descriptionText}>In Nkata, the daily, miles-long trek for contaminated water is over. This solar-powered borehole provides safe water, reducing disease and freeing up time for women and girls.</p>
                    <button className={styles.learnMoreBtn}>
                      <span>Learn More</span>
                      <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                        <path d="M5 12l14 0"></path>
                        <path d="M13 18l6 -6"></path>
                        <path d="M13 6l6 6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ... other cards ... */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;