import { useState, useEffect } from 'react';
import { Link } from '../Link';

const rooms = [
  {
    slug: 'standard-single',
    name: 'Standard Single Room',
   
    size: '20 m²',
    guests: 1,
    beds: '1 Single Bed',
    image: '/homepageimgs/628B0243-Edited-1024x683.jpg.jpeg',
  },
  {
    slug: 'standard-double',
    name: 'Standard Double Room',
   
    size: '22–25 m²',
    guests: 2,
    beds: '1 Queen Bed',
    image: '/homepageimgs/628B0113-1024x683.jpg.jpeg',
  },
  {
    slug: 'standard-twin',
    name: 'Standard Twin Room',
   
    size: '22–25 m²',
    guests: 2,
    beds: '2 Single Beds',
    image: '/homepageimgs/628B0418-Edited-1024x683.jpg.jpeg',
  },
  {
    slug: 'double-suite',
    name: 'Double Suite with Balcony',
   
    size: '30–35 m²',
    guests: 2,
    beds: '1 King-size Bed',
    image: '/homepageimgs/628B0197-Edited-1024x683.jpg.jpeg',
  },
  {
    slug: 'family-house',
    name: 'Family House',
   
    size: '120 m²',
    guests: 5,
    beds: '5 Queen Beds',
    image: '/homepageimgs/628B0373-Edited-1024x683.jpg.jpeg',
  },
  {
    slug: 'executive-suite',
    name: 'Executive Suite',
   
    size: '40–45 m²',
    guests: 2,
    beds: '1 King-size Bed',
    image: '/homepageimgs/628B0243-Edited-1920x1280.jpg.jpeg',
  },
];

function IconExpand() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
    </svg>
  );
}
function IconGuests() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function IconBed() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"/>
      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5"/>
      <path d="M2 11h20"/>
      <path d="M6 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
    </svg>
  );
}

export default function VelvetRooms() {
  const [start, setStart] = useState(0);
  const visible = 3;
  const maxStart = rooms.length - visible;

  useEffect(() => {
    const timer = setInterval(() => {
      setStart(s => (s >= maxStart ? 0 : s + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxStart]);

  return (
    <section style={{ background: '#f5f4f0', padding: '3rem 0 4rem' }}>
      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '0 4.5rem' }}>

        {/* Prev arrow */}
        <button
          onClick={() => setStart(s => Math.max(0, s - 1))}
          disabled={start === 0}
          aria-label="Previous rooms"
          style={{
            position: 'absolute',
            top: '45%',
            left: 0,
            transform: 'translateY(-50%)',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: '#6B0000',
            color: '#fff',
            border: 'none',
            cursor: start === 0 ? 'default' : 'pointer',
            opacity: start === 0 ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            lineHeight: 1,
            zIndex: 10,
            transition: 'background 0.2s',
          }}
        >
          ‹
        </button>

        {/* Room cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {rooms.slice(start, start + visible).map((room) => (
            <Link
              key={room.slug}
              to={`/stays/${room.slug}`}
              style={{
                background: '#fff',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.13)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s' }}
                />
 
              </div>

              {/* Info */}
              <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
                <h3 style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  color: '#111',
                  margin: '0 0 0.75rem',
                }}>{room.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.2rem', fontFamily: "'Lato', sans-serif", fontSize: '0.82rem', color: '#555' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <IconExpand /> {room.size}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <IconGuests /> {room.guests} Guest{room.guests > 1 ? 's' : ''}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', width: '100%', marginTop: '0.25rem' }}>
                    <IconBed /> {room.beds}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => setStart(s => Math.min(maxStart, s + 1))}
          disabled={start >= maxStart}
          aria-label="Next rooms"
          style={{
            position: 'absolute',
            top: '45%',
            right: 0,
            transform: 'translateY(-50%)',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: '#6B0000',
            color: '#fff',
            border: 'none',
            cursor: start >= maxStart ? 'default' : 'pointer',
            opacity: start >= maxStart ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            lineHeight: 1,
            zIndex: 10,
            transition: 'background 0.2s',
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}
