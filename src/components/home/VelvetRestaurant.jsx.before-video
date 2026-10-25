import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VelvetRestaurant() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-white" id="restaurant-section">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-md overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" 
              alt="Hotel Restaurant" 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404]" style={{ fontFamily: 'var(--font-heading)' }}>
            Exquisite Dining
          </h2>
          <div className="w-24 h-1 bg-[#c9a84c]"></div>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            Embark on a culinary journey. Our master chefs blend the finest local ingredients with global inspirations to create dishes that are as visually stunning as they are delicious. Savor every bite in an atmosphere of understated luxury.
          </p>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> Breakfast, Lunch & Dinner
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> Local Rwandan Cuisine
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> International Delicacies
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-[#c9a84c] mr-3 text-xl">✓</span> 24/7 Room Service
            </div>
          </div>

          <div className="bg-[#faf9f6] p-6 rounded-sm border-l-4 border-[#c9a84c] mb-8">
            <h4 className="font-semibold text-gray-900 mb-2">Opening Hours</h4>
            <p className="text-gray-600 text-sm">Every day from 6:30 AM to 11:00 PM</p>
          </div>

          <button 
            onClick={() => navigate('/menu')}
            className="px-8 py-3 bg-transparent border border-[#3b0404] text-[#3b0404] hover:bg-[#3b0404] hover:text-white font-semibold uppercase tracking-wider text-sm transition-colors rounded-sm"
          >
            View Restaurant Menu
          </button>
        </div>
      </div>
    </section>
  );
}
