import React from 'react';
import { 
  FaWifi, 
  FaUtensils, 
  FaSwimmingPool, 
  FaDumbbell, 
  FaHotTub, 
  FaSpa, 
  FaGlassMartiniAlt, 
  FaCoffee, 
  FaParking, 
  FaPlane, 
  FaBriefcase, 
  FaConciergeBell, 
  FaTshirt, 
  FaBed, 
  FaShieldAlt 
} from 'react-icons/fa';

const facilities = [
  { name: 'Free Wi-Fi', icon: <FaWifi /> },
  { name: 'Restaurant', icon: <FaUtensils /> },
  { name: 'Swimming pool', icon: <FaSwimmingPool /> },
  { name: 'Gym', icon: <FaDumbbell /> },
  { name: 'Sauna', icon: <FaHotTub /> },
  { name: 'Spa and massage', icon: <FaSpa /> },
  { name: 'Bar', icon: <FaGlassMartiniAlt /> },
  { name: 'Coffee shop', icon: <FaCoffee /> },
  { name: 'Free parking', icon: <FaParking /> },
  { name: 'Airport transfer', icon: <FaPlane /> },
  { name: 'Conference rooms', icon: <FaBriefcase /> },
  { name: '24-hour reception', icon: <FaConciergeBell /> },
  { name: 'Laundry service', icon: <FaTshirt /> },
  { name: 'Room service', icon: <FaBed /> },
  { name: 'Security', icon: <FaShieldAlt /> },
];

export default function VelvetFacilities() {
  return (
    <section className="py-20 px-4 bg-[#faf9f6]" id="facilities-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          Hotel Facilities
        </h2>
        <div className="w-24 h-1 bg-[#c9a84c] mx-auto mb-12"></div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {facilities.map((fac, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center p-6 bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-[#c9a84c]/20 group"
            >
              <div className="text-4xl mb-4 text-[#c9a84c] group-hover:scale-110 transition-transform duration-300">{fac.icon}</div>
              <h4 className="text-gray-900 font-semibold text-sm text-center">{fac.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
