import { useState, useEffect } from 'react';

export default function VelvetHero() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState('1 Room');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const fmt = (d) => d.toISOString().split('T')[0];
    setCheckIn(fmt(today));
    setCheckOut(fmt(tomorrow));
  }, []);

  return (
    <section className="vs-hero">
      {/* Background image */}
      <div
        className="vs-hero-bg"
        style={{ backgroundImage: `url('/homepageimgs/628B0145-Edited-scaled.jpg.jpeg')` }}
      />

      {/* Dark overlay */}
      <div className="vs-hero-overlay" />

      {/* Two-column content: text LEFT, booking card RIGHT */}
      <div className="vs-hero-content">
        {/* Left: welcome text */}
        <div className="vs-hero-text" style={{
          background: 'rgba(0,0,0,0.65)',
          padding: '3rem',
          borderRadius: '2px',
        }}>
          <p>
            Welcome to Velvet Suites — Where Comfort Meets Class, Nestled just five minutes
            from Kigali International Airport, Velvet Suites your perfect gateway to comfort,
            convenience, and a refined hospitality experience. Whether you're travelling for
            business, leisure, or a bit of both, our hotel offers the ideal blend of proximity, peace,
            and premium service in the heart of Rwanda's vibrant capital.
          </p>
          <p>
            From the moment you arrive, Velvet suites welcomes you with a warm Rwandan smile,
            elegant ambience, and world-class amenities tailored to meet your every need. Our
            location offers a strategic advantage—perfect for international travellers, business
            executives, and tourists seeking swift airport access without compromising luxury or
            tranquillity.
          </p>
        </div>

        {/* Right: booking card */}
        <div className="vs-booking-card">
          <div className="vs-booking-eyebrow">CHOOSE DATE TO SEARCH</div>
          <div className="vs-booking-title">BOOK YOUR STAY</div>

          {/* Check In */}
          <div className="vs-booking-field">
            <span className="vs-booking-field-label">Check In</span>
            <div className="vs-booking-field-value">
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
              <span>▾</span>
            </div>
          </div>

          {/* Check Out */}
          <div className="vs-booking-field">
            <span className="vs-booking-field-label">Check Out</span>
            <div className="vs-booking-field-value">
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
              <span>▾</span>
            </div>
          </div>

          {/* Rooms */}
          <div className="vs-booking-field">
            <span className="vs-booking-field-label">Rooms</span>
            <div className="vs-booking-field-value">
              <select value={rooms} onChange={e => setRooms(e.target.value)}>
                {['1 Room', '2 Rooms', '3 Rooms', '4 Rooms'].map(r => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <span>▾</span>
            </div>
          </div>

          {/* Adults + Children */}
          <div className="vs-booking-guests-row">
            <div className="vs-booking-field" style={{ marginBottom: 0 }}>
              <span className="vs-booking-field-label">Adults</span>
              <div className="vs-booking-field-value">
                <select value={adults} onChange={e => setAdults(e.target.value)}>
                  {['1','2','3','4','5','6'].map(n => <option key={n}>{n}</option>)}
                </select>
                <span>▾</span>
              </div>
            </div>
            <div className="vs-booking-field" style={{ marginBottom: 0 }}>
              <span className="vs-booking-field-label">Children</span>
              <div className="vs-booking-field-value">
                <select value={children} onChange={e => setChildren(e.target.value)}>
                  {['0','1','2','3','4'].map(n => <option key={n}>{n}</option>)}
                </select>
                <span>▾</span>
              </div>
            </div>
          </div>

          <button className="vs-check-availability-btn">
            Check Availability
          </button>
        </div>
      </div>
    </section>
  );
}
