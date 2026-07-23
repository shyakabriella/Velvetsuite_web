import React from 'react';

export default function VelvetWellness() {
  return (
    <section className="py-20 px-4 bg-[#faf9f6]" id="wellness-section">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404]" style={{ fontFamily: 'var(--font-heading)' }}>
            Sauna and Wellness
          </h2>
          <div className="w-24 h-1 bg-[#8caba1]"></div>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            Restore your mind, body, and soul. Step into our serene wellness sanctuary and let the healing warmth of our premium saunas melt your stress away. It's the ultimate escape for deep rejuvenation.
          </p>

          <ul className="space-y-4 my-8">
            <li className="flex items-center text-gray-700">
              <span className="text-[#8caba1] mr-3 text-xl">✨</span> Sauna & Steam room
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-[#8caba1] mr-3 text-xl">✨</span> Professional Massage
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-[#8caba1] mr-3 text-xl">✨</span> Spa treatments
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-[#8caba1] mr-3 text-xl">✨</span> Relaxation area
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-[#8caba1] mr-3 text-xl">✨</span> Beauty treatments
            </li>
          </ul>

          <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#8caba1]">
            <h4 className="font-semibold text-gray-900 mb-2">Book a Session</h4>
            <p className="text-gray-600 text-sm">Please contact reception to schedule your wellness experience.</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative rounded-md overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80" 
              alt="Spa and Wellness" 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
