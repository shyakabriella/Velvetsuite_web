import React from 'react';

export default function VelvetBar() {
  return (
    <section className="py-20 px-4 bg-white" id="bar-section">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-md overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80" 
              alt="Bar and Coffee Shop" 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404]" style={{ fontFamily: 'var(--font-heading)' }}>
            Bar and Coffee Shop
          </h2>
          <div className="w-24 h-1 bg-[#c9a84c]"></div>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            Sip, socialize, and savor. From artisanal morning espressos to masterfully mixed evening cocktails, our vibrant bar and lounge provide the perfect backdrop for intimate conversations and unforgettable nights.
          </p>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">☕</span> Coffee and tea
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">🍹</span> Fresh juice
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">🍸</span> Cocktails
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">🍷</span> Wine
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">🥨</span> Snacks
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">🎵</span> Live music
            </div>
          </div>

          <div className="bg-[#faf9f6] p-6 rounded-sm border-l-4 border-[#c9a84c]">
            <h4 className="font-semibold text-gray-900 mb-2">Atmosphere</h4>
            <p className="text-gray-600 text-sm">Experience the perfect blend of cozy mornings and energetic evenings.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
