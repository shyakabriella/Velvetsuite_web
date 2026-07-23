import React from 'react';

export default function VelvetPool() {
  return (
    <section className="py-20 px-4 bg-[#faf9f6]" id="pool-section">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404]" style={{ fontFamily: 'var(--font-heading)' }}>
            Swimming Pool
          </h2>
          <div className="w-24 h-1 bg-[#4ca6c9]"></div>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            Escape to our sparkling azure oasis. Whether you're starting your morning with invigorating laps or lounging with a signature cocktail as the sun sets, our pristine pool area is your private haven of relaxation.
          </p>

          <ul className="space-y-4 my-8">
            <li className="flex items-center text-gray-700">
              <span className="text-[#4ca6c9] mr-3 text-xl">💧</span> Adult swimming pool
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-[#4ca6c9] mr-3 text-xl">💧</span> Children's pool
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-[#4ca6c9] mr-3 text-xl">💧</span> Poolside seating & loungers
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-[#4ca6c9] mr-3 text-xl">💧</span> Changing rooms
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-[#4ca6c9] mr-3 text-xl">💧</span> Fresh towels and refreshments
            </li>
          </ul>

          <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#4ca6c9]">
            <h4 className="font-semibold text-gray-900 mb-2">Pool Opening Hours</h4>
            <p className="text-gray-600 text-sm">Every day from 7:00 AM to 8:00 PM</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative rounded-md overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80" 
              alt="Swimming Pool" 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
