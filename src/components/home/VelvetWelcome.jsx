import React from 'react';

export default function VelvetWelcome() {
  return (
    <section className="py-20 px-4 bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
          Welcome to the Hotel
        </h2>
        <div className="w-24 h-1 bg-[#c9a84c] mx-auto mb-8"></div>
          Welcome to Velvetsuite—where sophisticated design meets unrivaled comfort. From the moment you arrive, immerse yourself in an atmosphere of pure tranquility. Whether you are indulging in our world-class culinary creations, unwinding by the pristine pool, or retreating to your meticulously appointed suite, every detail of your stay is curated to exceed your highest expectations.
      </div>
    </section>
  );
}
