import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VelvetEvents() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-white" id="events-section">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404]" style={{ fontFamily: 'var(--font-heading)' }}>
            Meetings and Events
          </h2>
          <div className="w-24 h-1 bg-[#c9a84c]"></div>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            Where momentous occasions come to life. From high-stakes corporate summits to breathtakingly romantic weddings, our elegant venues and dedicated event planners ensure your gathering is executed with flawless precision.
          </p>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> Conferences
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> Business meetings
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> Weddings
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> Birthday parties
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> Private events
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> Corporate events
            </div>
          </div>

          <button 
            onClick={() => navigate('')}
            className="px-8 py-3 bg-[#3b0404] hover:bg-[#c9a84c] text-white hover:text-black font-semibold uppercase tracking-wider text-sm transition-colors rounded-sm"
          >
            Plan Your Event
          </button>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative rounded-md overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80" 
              alt="Meetings and Events" 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
