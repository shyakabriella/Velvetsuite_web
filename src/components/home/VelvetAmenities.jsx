/* Gold outline SVG icons matching the live site style */
function WifiIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <path d="M32 50a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
      <path d="M16 34c4.3-4.3 10.2-7 16-7s11.7 2.7 16 7"/>
      <path d="M6 24C13.1 16.9 22 13 32 13s18.9 3.9 26 11"/>
    </svg>
  );
}
function TvIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <rect x="6" y="12" width="52" height="34" rx="3"/>
      <path d="M20 52h24M32 46v6"/>
    </svg>
  );
}
function ShowerIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <path d="M10 14h12v22H10z"/>
      <path d="M22 25h30"/>
      <path d="M34 14v11M40 12v13M46 14v11"/>
      <path d="M22 36c0 8 10 18 10 18s10-10 10-18"/>
    </svg>
  );
}
function WaterIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <path d="M20 10h24v8H20zM14 18h36l4 28H10z"/>
      <path d="M28 34v8M36 34v8"/>
    </svg>
  );
}
function DeskIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <rect x="6" y="24" width="52" height="8" rx="2"/>
      <path d="M14 32v16M50 32v16M20 24V16h24v8"/>
    </svg>
  );
}
function SafeIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <rect x="8" y="10" width="48" height="44" rx="3"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M32 22v5M32 37v5M22 32h5M37 32h5"/>
    </svg>
  );
}
function CurtainIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <path d="M8 10h48M16 10c0 16-8 28-8 44M48 10c0 16 8 28 8 44M32 10c0 16 0 28 0 44"/>
    </svg>
  );
}
function HousekeepingIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <path d="M20 54V30l12-14 12 14v24"/>
      <path d="M14 54h36"/>
      <path d="M28 54V40h8v14"/>
    </svg>
  );
}
function LaundryIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <circle cx="32" cy="36" r="14"/>
      <circle cx="32" cy="36" r="8"/>
      <path d="M14 20h8"/>
    </svg>
  );
}
function IronIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <path d="M8 36h48l-8 14H8z"/>
      <path d="M40 36c0-10 8-18 16-18"/>
      <path d="M18 46v6M30 46v6M42 46v6"/>
    </svg>
  );
}
function RoomServiceIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
      <circle cx="32" cy="20" r="10"/>
      <path d="M14 36a18 18 0 0 1 36 0H14z"/>
      <path d="M8 36h48"/>
      <path d="M20 50h24M32 36v14"/>
    </svg>
  );
}

const amenities = [
  { icon: <WifiIcon />,         text: 'Complimentary high-speed Wi-Fi' },
  { icon: <TvIcon />,           text: 'Smart LED TV with satellite channels' },
  { icon: <ShowerIcon />,       text: 'Luxury en-suite bathrooms with walk-in rain showers, premium toiletries, and hairdryers' },
  { icon: <WaterIcon />,        text: 'Complimentary bottled water, tea/coffee station, and kettle' },
  { icon: <DeskIcon />,         text: 'Work desk & ergonomic chair' },
  { icon: <SafeIcon />,         text: 'In-room safe' },
  { icon: <CurtainIcon />,      text: 'Blackout curtains for restful sleep' },
  { icon: <HousekeepingIcon />, text: 'Daily housekeeping' },
  { icon: <LaundryIcon />,      text: 'Laundry & ironing services (on request)' },
  { icon: <IronIcon />,         text: 'Iron board' },
  { icon: <RoomServiceIcon />,  text: 'Room service available from 7:00 AM – 1:00 AM' },
];

export default function VelvetAmenities() {
  return (
    <section className="vs-amenities-section">
      <h2 className=" text-4xl font-bold text-white ">ROOM CATEGORIES &amp; AMENITIES</h2>
      <br />
      <p className="vs-amenities-desc text-white">
        Our rooms and suites are designed with your comfort in mind, featuring modern decor,
        premium bedding, and thoughtful amenities.
      </p>
      <p className="vs-amenities-sub text-white">All rooms include:</p>

      <div className="vs-amenities-grid">
        {amenities.map((a, i) => (
          <div key={i} className="vs-amenity-item">
            <div className="vs-amenity-icon">{a.icon}</div>
            <p className="vs-amenity-text">{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
