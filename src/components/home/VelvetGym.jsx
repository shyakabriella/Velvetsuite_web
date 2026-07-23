import React from 'react';

export default function VelvetGym() {
  return (
    <section className="py-20 px-4 bg-white" id="gym-section">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-md overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80" 
              alt="Gym and Fitness Centre" 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404]" style={{ fontFamily: 'var(--font-heading)' }}>
            Gym and Fitness Centre
          </h2>
          <div className="w-24 h-1 bg-[#3b0404]"></div>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            Elevate your wellness routine. Our state-of-the-art fitness center features the latest high-performance equipment and dedicated training zones, ensuring you never have to compromise your health goals while traveling.
          </p>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="flex items-center text-gray-700">
              <span className="text-[#3b0404] mr-3 text-xl">💪</span> Modern exercise equipment
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#3b0404] mr-3 text-xl">🏃</span> Cardio machines
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#3b0404] mr-3 text-xl">🏋️</span> Weight-training
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#3b0404] mr-3 text-xl">🤝</span> Personal training
            </div>
          </div>

          <div className="bg-[#faf9f6] p-6 rounded-sm border-l-4 border-[#3b0404]">
            <h4 className="font-semibold text-gray-900 mb-2">Gym Opening Hours</h4>
            <p className="text-gray-600 text-sm">24/7 Access for Hotel Guests</p>
          </div>
        </div>
      </div>
    </section>
  );
}
