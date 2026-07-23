import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VelvetHero() {
  const navigate = useNavigate();

  return (
    <section className="vs-hero relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/homepageimgs/628B0145-Edited-scaled.jpg.jpeg')` }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Comfort, Relaxation and Luxury in One Place
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light">
          Step into a world of refined elegance. Discover unmatched luxury, impeccable service, and a sanctuary of comfort designed exclusively for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">

          <a
            href="https://direct-book.com/properties/velvetsuites?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2026-07-16&checkOutDate=2026-07-17&trackPage=no"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-sm transition-all transform hover:scale-105 uppercase tracking-wider text-sm text-center"
          >
            View Rooms
          </a>
          
          <button 
            onClick={() => {
              const facilities = document.getElementById('facilities-section');
              if (facilities) facilities.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-transparent hover:bg-white/5 border border-[#c9a84c] text-[#c9a84c] hover:text-[#d4b45a] hover:border-[#d4b45a] font-semibold rounded-sm transition-all transform hover:scale-105 uppercase tracking-wider text-sm"
          >
            Explore Facilities
          </button>
        </div>
      </div>
    </section>
  );
}
