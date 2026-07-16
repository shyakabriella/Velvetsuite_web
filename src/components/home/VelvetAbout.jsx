import React from 'react';

export default function VelvetAbout() {
  return (
    <section className="py-24 bg-white">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift">
              <img
                src="/homepageimgs/628B0243-Edited-768x512.jpg.jpeg"
                alt="Velvet Suites Experience"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-4">
              <span className="h-px w-8 bg-[#c9a84c]/60"></span> Discover Velvet
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#3b0404] mb-6">
              A Haven of <br /> <span className="italic text-[#c9a84c]">Tranquility</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At Velvet Suites, we redefine hospitality by blending modern luxury with the rich warmth of Rwandan culture. Whether you are seeking a peaceful retreat after a long flight, a sophisticated space for your family, or an inspiring environment for business, our suites are designed to cater to your every need.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Located just minutes from the airport, our exceptional location offers unparalleled convenience without compromising on serenity. Experience world-class dining, breathtaking rooftop views, and a team dedicated to making your stay unforgettable.
            </p>
            <a 
              href="/about" 
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3b0404]/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#3b0404] transition-all duration-300 hover:border-[#3b0404] hover:bg-[#3b0404] hover:text-white"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
