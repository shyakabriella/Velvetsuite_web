import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function VelvetGallerySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4" 
      style={{ backgroundColor: '#3b0404' }}
      id="gallery-section"
    >
      <div 
        className={`max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Description & Button */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            A Glimpse into Velvetsuite
          </h2>
          <div className="w-24 h-1 bg-[#c9a84c] mb-6"></div>
          <p className="text-gray-200 text-lg leading-relaxed mb-8">
            Experience the elegance, comfort, and luxury of Velvetsuite before you even arrive. 
            Browse through our stunning visual gallery to explore our exquisitely designed rooms, state-of-the-art facilities, 
            world-class dining, and serene wellness spaces. 
            Every detail is meticulously crafted to ensure an unforgettable stay.
          </p>
          <Link 
            to="/gallery" 
            className="inline-block px-8 py-3 bg-[#c9a84c] hover:bg-white text-black font-semibold uppercase tracking-wider text-sm transition-colors duration-300 rounded-sm shadow-md hover:shadow-lg"
          >
            View More
          </Link>
        </div>
        
        {/* Feature Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-md overflow-hidden shadow-2xl group">
            <img 
              src="/homepageimgs/628B0243-Edited-1024x683.jpg.jpeg" 
              alt="Velvetsuite Gallery Feature" 
              className="w-full h-auto max-h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
