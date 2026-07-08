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
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/homepageimgs/628B0145-Edited-scaled.jpg.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.52)',
        zIndex: 1,
      }} />

      {/* Two-column content: text LEFT, booking card RIGHT */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '240px 2rem 4rem',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}>
        {/* Left: welcome text */}
        <div style={{
          background: 'rgba(0,0,0,0.65)',
          padding: '3rem',
          borderRadius: '2px',
        }}>
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '15px',
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '1.5rem',
          }}>
            Welcome to Velvet Suites — Where Comfort Meets Class, Nestled just five minutes
            from Kigali International Airport, Velvet Suites your perfect gateway to comfort,
            convenience, and a refined hospitality experience. Whether you're travelling for
            business, leisure, or a bit of both, our hotel offers the ideal blend of proximity, peace,
            and premium service in the heart of Rwanda's vibrant capital.
          </p>
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '15px',
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.95)',
          }}>
            From the moment you arrive, Velvet suites welcomes you with a warm Rwandan smile,
            elegant ambience, and world-class amenities tailored to meet your every need. Our
            location offers a strategic advantage—perfect for international travellers, business
            executives, and tourists seeking swift airport access without compromising luxury or
            tranquillity.
          </p>
        </div>

        {/* Right: booking card */}
        <div style={{
          background: 'rgba(51, 12, 12, 0.85)', /* slightly transparent version of #330c0c */
          padding: '0.8rem',
          flexShrink: 0,
        }}>
          <div style={{
            border: '1px solid rgba(201, 168, 76, 0.6)',
            padding: '2.5rem 2rem',
          }}>
            <div style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              textAlign: 'center',
              marginBottom: '0.8rem',
            }}>CHOOSE DATE TO SEARCH</div>
            <div style={{
              fontFamily: "'Marcellus', serif",
              fontSize: '32px',
              fontWeight: 400,
              color: '#fff',
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: 1.1,
            }}>BOOK YOUR STAY</div>

            {/* Check In */}
            <div style={fieldStyle}>
              <span style={labelStyle}>Check In</span>
              <div style={valueStyle}>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} style={inputStyle} />
                <span style={arrowStyle}>▾</span>
              </div>
            </div>

            {/* Check Out */}
            <div style={fieldStyle}>
              <span style={labelStyle}>Check Out</span>
              <div style={valueStyle}>
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} style={inputStyle} />
                <span style={arrowStyle}>▾</span>
              </div>
            </div>

            {/* Rooms */}
            <div style={fieldStyle}>
              <span style={labelStyle}>Rooms</span>
              <div style={valueStyle}>
                <select value={rooms} onChange={e => setRooms(e.target.value)} style={inputStyle}>
                  {['1 Room', '2 Rooms', '3 Rooms', '4 Rooms'].map(r => (
                    <option key={r} style={{ background: '#330c0c' }}>{r}</option>
                  ))}
                </select>
                <span style={arrowStyle}>▾</span>
              </div>
            </div>

            {/* Adults + Children */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{ ...fieldStyle, marginBottom: 0 }}>
                <span style={labelStyle}>Adults</span>
                <div style={valueStyle}>
                  <select value={adults} onChange={e => setAdults(e.target.value)} style={{...inputStyle, width: '30px'}}>
                    {['1','2','3','4','5','6'].map(n => <option key={n} style={{ background: '#330c0c' }}>{n}</option>)}
                  </select>
                  <span style={arrowStyle}>▾</span>
                </div>
              </div>
              <div style={{ ...fieldStyle, marginBottom: 0 }}>
                <span style={labelStyle}>Children</span>
                <div style={valueStyle}>
                  <select value={children} onChange={e => setChildren(e.target.value)} style={{...inputStyle, width: '30px'}}>
                    {['0','1','2','3','4'].map(n => <option key={n} style={{ background: '#330c0c' }}>{n}</option>)}
                  </select>
                  <span style={arrowStyle}>▾</span>
                </div>
              </div>
            </div>

            <button style={{
              width: '100%',
              background: '#eebb73',
              border: 'none',
              padding: '1.1rem',
              fontFamily: "'Lato', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#222',
              cursor: 'pointer',
              transition: 'background 0.25s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#fad28e'}
              onMouseLeave={e => e.currentTarget.style.background = '#eebb73'}
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const fieldStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid rgba(201, 168, 76, 0.6)',
  padding: '0.8rem 1.2rem',
  marginBottom: '0.8rem',
  cursor: 'pointer',
};

const labelStyle = {
  fontFamily: "'Lato', sans-serif",
  fontSize: '13px',
  color: '#fff',
};

const valueStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const inputStyle = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#fff',
  fontFamily: "'Lato', sans-serif",
  fontSize: '13px',
  cursor: 'pointer',
  colorScheme: 'dark',
  textAlign: 'right',
  padding: 0,
};

const arrowStyle = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: '10px',
};
