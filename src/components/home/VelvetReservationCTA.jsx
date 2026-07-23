import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VelvetReservationCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 bg-[#3b0404] relative overflow-hidden" id="reservation-section">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c9a84c] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c9a84c] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          Enjoy a Complete Hotel Experience
        </h2>
        
        <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">
          Your extraordinary escape awaits. Secure your sanctuary today and let us treat you to the stay of a lifetime.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a 
            href="https://direct-book.com/properties/velvetsuites?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2026-07-16&checkOutDate=2026-07-17&trackPage=no"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[#c9a84c] hover:bg-[#d4b45a] text-black font-semibold rounded-sm transition-all transform hover:scale-105 uppercase tracking-wider shadow-[0_0_20px_rgba(201,168,76,0.3)] text-center"
          >
            Book Your Stay
          </a>
          
          <a 
            href="https://direct-book.com/properties/velvetsuites/contact?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2026-07-23&checkOutDate=2026-07-24&trackPage=no"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-transparent hover:bg-white/10 border border-white/50 text-white font-semibold rounded-sm transition-all transform hover:scale-105 uppercase tracking-wider text-center"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
