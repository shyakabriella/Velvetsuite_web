import React, { useState, useEffect } from 'react';

const galleryImages = [
  '/homepageimgs/628B0145-Edited-scaled.jpg.jpeg',
  '/homepageimgs/628B0243-Edited-1920x1280.jpg.jpeg',
  '/homepageimgs/628B0113-1920x1280.jpg.jpeg',
  '/homepageimgs/628B0197-Edited-1920x1280.jpg.jpeg',
  '/homepageimgs/628B0373-Edited-1920x1280.jpg.jpeg',
  '/homepageimgs/628B0418-Edited-1920x1280.jpg.jpeg',
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSlide = () => setCurrent(p => (p + 1) % galleryImages.length);
  const prevSlide = () => setCurrent(p => (p - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div style={{ 
      background: '#3a0202', // rich dark velvet red
      minHeight: '100vh', 
      paddingBottom: '5rem' 
    }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '480px',
        backgroundImage: `url('/homepageimgs/628B0243-Edited-1920x1280.jpg.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '60px' // account for transparent navbar
      }}>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }} />
        
        <h1 style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: "'Marcellus', serif",
          fontSize: '4.5rem',
          color: '#fff',
          fontWeight: 400,
          textAlign: 'center',
        }}>
          Gallery
        </h1>
      </section>

      {/* Main Slider Section */}
      <section style={{ padding: '5rem 2rem 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          
          {/* Previous Button */}
          <button 
            onClick={prevSlide}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: '#111',
              zIndex: 10,
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            ‹
          </button>

          {/* Current Image Wrapper */}
          <div style={{ 
            width: '82%', 
            maxWidth: '900px', 
            height: '650px', 
            margin: '0 auto', 
            overflow: 'hidden', 
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)' 
          }}>
            <img 
              src={galleryImages[current]} 
              alt={`Gallery view ${current + 1}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                transition: 'opacity 0.4s ease-in-out' 
              }}
            />
          </div>

          {/* Next Button */}
          <button 
            onClick={nextSlide}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: '#111',
              zIndex: 10,
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            ›
          </button>
        </div>

        {/* Dots Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '3rem' }}>
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: current === i ? '#fff' : 'rgba(255,255,255,0.3)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background 0.3s ease, transform 0.3s ease',
                transform: current === i ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
