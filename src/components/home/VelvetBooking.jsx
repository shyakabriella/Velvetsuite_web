import React, { useState, useEffect } from 'react';

export default function VelvetBooking() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1 Guest');
  const [rooms, setRooms] = useState('1 Room');

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const fmt = (d) => d.toISOString().split('T')[0];
    setCheckIn(fmt(today));
    setCheckOut(fmt(tomorrow));
  }, []);

  return (
    <section className="relative -mt-16 z-20 px-4 max-w-6xl mx-auto mb-16" id="booking-section">
      <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t-4 border-[#c9a84c]">
        
        {/* Check-in */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Check-in Date</label>
          <input 
            type="date" 
            value={checkIn} 
            onChange={e => setCheckIn(e.target.value)}
            className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#c9a84c] text-gray-800 text-lg transition-colors bg-transparent"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Check-out Date</label>
          <input 
            type="date" 
            value={checkOut} 
            onChange={e => setCheckOut(e.target.value)}
            className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#c9a84c] text-gray-800 text-lg transition-colors bg-transparent"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Guests</label>
          <select 
            value={guests} 
            onChange={e => setGuests(e.target.value)}
            className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#c9a84c] text-gray-800 text-lg transition-colors bg-transparent appearance-none cursor-pointer"
          >
            {['1 Guest', '2 Guests', '3 Guests', '4+ Guests'].map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Rooms */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Rooms</label>
          <select 
            value={rooms} 
            onChange={e => setRooms(e.target.value)}
            className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#c9a84c] text-gray-800 text-lg transition-colors bg-transparent appearance-none cursor-pointer"
          >
            {['1 Room', '2 Rooms', '3 Rooms', '4+ Rooms'].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <button className="w-full md:w-auto px-8 py-4 bg-[#3b0404] hover:bg-[#c9a84c] text-white hover:text-black font-semibold uppercase tracking-wider text-sm transition-all duration-300 rounded-sm whitespace-nowrap">
            Check Availability
          </button>
        </div>

      </div>
    </section>
  );
}
