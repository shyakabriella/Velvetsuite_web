import React, { useEffect } from 'react';
import './Gallery.css';

const galleryImages = [
  '/homepageimgs/628B0145-Edited-scaled.jpg.jpeg',
  '/homepageimgs/628B0243-Edited-1920x1280.jpg.jpeg',
  '/homepageimgs/628B0113-1920x1280.jpg.jpeg',
  '/homepageimgs/628B0197-Edited-1920x1280.jpg.jpeg',
  '/homepageimgs/628B0373-Edited-1920x1280.jpg.jpeg',
  '/homepageimgs/628B0418-Edited-1920x1280.jpg.jpeg',
];

export default function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="vs-gallery-page">
      {/* Hero Section */}
      <section className="vs-gallery-hero">
        <div className="vs-gallery-hero-overlay" />
        <h1 className="vs-gallery-hero-title">Gallery</h1>
      </section>

      {/* Grid Section */}
      <section className="vs-gallery-content">
        <div className="vs-gallery-grid">
          {galleryImages.map((src, index) => (
            <div key={index} className="vs-gallery-item">
              <img 
                src={src} 
                alt={`Velvet Suites Gallery - View ${index + 1}`} 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
