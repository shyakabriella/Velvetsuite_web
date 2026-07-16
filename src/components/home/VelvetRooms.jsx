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
    <section className="vs-rooms-section">
      <div className="vs-rooms-slider-wrap">

        {/* Prev arrow */}
        <button
          onClick={() => setStart(s => Math.max(0, s - 1))}
          disabled={start === 0}
          aria-label="Previous rooms"
          className="vs-slider-arrow left"
        >
          ‹
        </button>

        {/* Room cards */}
        <div className="vs-rooms-grid">
          {rooms.slice(start, start + visible).map((room) => (
            <Link
              key={room.slug}
              to={`https://direct-book.com/properties/velvetsuites`}
              className="vs-room-card"
            >
              {/* Image */}
              <div className="vs-room-img-wrap">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="vs-room-info">
                <h3 className="vs-room-name">{room.name}</h3>
                <div className="vs-room-specs">
                  <span className="vs-room-spec">
                    <IconExpand /> {room.size}
                  </span>
                  <span className="vs-room-spec">
                    <IconGuests /> {room.guests} Guest{room.guests > 1 ? 's' : ''}
                  </span>
                  <span className="vs-room-spec" style={{ width: '100%', marginTop: '0.25rem' }}>
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
          className="vs-slider-arrow right"
        >
          ›
        </button>
      </div>
    </section>
  );
}
