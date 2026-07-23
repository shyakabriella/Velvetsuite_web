import React from 'react';
import { Link } from '../Link';

const rooms = [
  {
    slug: 'standard-room',
    name: 'Standard Room',
    facilities: ['1 Queen Bed', 'Free Wi-Fi', 'Air Conditioning', 'Ensuite Bathroom'],
    image: '/homepageimgs/628B0243-Edited-1024x683.jpg.jpeg',
  },
  {
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    facilities: ['1 King Bed', 'City View', 'Mini Bar', 'Breakfast Included'],
    image: '/homepageimgs/628B0113-1024x683.jpg.jpeg',
  },
  {
    slug: 'family-room',
    name: 'Family Room',
    facilities: ['2 Queen Beds', 'Spacious Area', 'Kitchenette', 'Kid Friendly'],
    image: '/homepageimgs/628B0373-Edited-1024x683.jpg.jpeg',
  },
  {
    slug: 'executive-suite',
    name: 'Executive Suite',
    facilities: ['1 King Bed', 'Separate Living Room', 'Lounge Access', 'Premium Toiletries'],
    image: '/homepageimgs/628B0243-Edited-1920x1280.jpg.jpeg',
  },
  {
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    facilities: ['Master Bedroom', 'Private Balcony', 'Butler Service', 'Jacuzzi'],
    image: '/homepageimgs/628B0197-Edited-1024x683.jpg.jpeg',
  },
];

export default function VelvetRooms() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="rooms-section">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3b0404] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          Rooms and Suites
        </h2>
        <div className="w-24 h-1 bg-[#c9a84c] mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Discover a sanctuary of elegance. Each of our rooms and suites is meticulously designed with plush furnishings, modern amenities, and breathtaking views to provide you with the ultimate retreat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room) => (
          <div 
            key={room.slug} 
            className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden group hover:shadow-[0_20px_50px_rgba(59,4,4,0.08)] transition-all duration-500 flex flex-col"
          >
            {/* Image Section - Framed inside the card */}
            <div className="relative h-72 overflow-hidden m-3 rounded-[1.5rem]">
              <img 
                src={room.image} 
                alt={room.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* Content Section */}
            <div className="p-8 pt-4 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-[#3b0404] mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                {room.name}
              </h3>
              
              {/* Modern Tags for Facilities */}
              <div className="flex flex-wrap gap-2 mb-8">
                {room.facilities.map((fac, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs rounded-full font-medium tracking-wide"
                  >
                    {fac}
                  </span>
                ))}
              </div>

              {/* Minimalist Action Button */}
              <div className="mt-auto pt-5 border-t border-gray-100">
                <Link 
                  to="https://direct-book.com/properties/velvetsuites" 
                  className="flex items-center justify-between w-full group/btn"
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] group-hover/btn:text-[#c9a84c] transition-colors">
                    Explore Details
                  </span>
                  <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 group-hover/btn:border-[#c9a84c] group-hover/btn:bg-[#c9a84c] group-hover/btn:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
