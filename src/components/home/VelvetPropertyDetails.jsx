import React, { useState } from 'react';

/* ── Dummy image URLs (Picsum Photos – fixed seed per slot) ── */
const IMG = {
  p1:       'https://picsum.photos/seed/velvet1/1200/700',
  p3:       'https://picsum.photos/seed/velvet3/800/600',
  p4:       'https://picsum.photos/seed/velvet4/800/600',
  p5:       'https://picsum.photos/seed/velvet5/1200/700',
  p6:       'https://picsum.photos/seed/velvet6/800/600',
  p7:       'https://picsum.photos/seed/velvet7/900/600',
  p8:       'https://picsum.photos/seed/velvet8/800/600',
  p9:       'https://picsum.photos/seed/velvet9/900/600',
  p10:      'https://picsum.photos/seed/velvet10/800/600',
  roomOne:  'https://picsum.photos/seed/room1/800/500',
  roomTwo:  'https://picsum.photos/seed/room2/800/500',
  laundry:  'https://picsum.photos/seed/laundry/800/500',
  nightView:'https://picsum.photos/seed/nightview/800/600',
};

/* ── SVG Icons ── */
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconBed = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
  </svg>
);
const IconUsers = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPlane = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-1.5 0-2.5.5-3.5 1.5L12 9l-8.2-1.8L2 8.5l7 4L5.5 16H4l-1.5 1.5 4 1.5 1.5 4L10 21.5 11.5 20H15l4-7z"/>
  </svg>
);
const IconFork = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Data ── */
const roomTypes = [
  {
    name: 'Standard Double Room',
    desc: 'A beautifully appointed room with a plush queen bed, private ensuite, balcony overlooking the garden, and complimentary WiFi.',
    beds: '1 Queen Bed',
    guests: 2,
    size: '32 m²',
    price: 'From $120 / night',
    img: IMG.roomOne,
    features: ['Private bathroom', 'Garden balcony', 'Air conditioning', 'Free WiFi'],
  },
  {
    name: 'Standard Twin Room',
    desc: 'Ideal for friends or colleagues — two comfortable twin beds, bright décor, and a spacious en-suite bathroom with free toiletries.',
    beds: '2 Twin Beds',
    guests: 2,
    size: '30 m²',
    price: 'From $115 / night',
    img: IMG.roomTwo,
    features: ['Private bathroom', 'Work desk', 'Air conditioning', 'Free WiFi'],
  },
  {
    name: 'Five-Bedroom House',
    desc: 'The ultimate family retreat — five generous queen bedrooms, a fully equipped kitchen, spacious living area, and a private outdoor terrace.',
    beds: '5 Queen + 7 Sofa Beds',
    guests: 10,
    size: '280 m²',
    price: 'From $650 / night',
    img: IMG.p4,
    features: ['Full kitchen', 'Private terrace', 'Hot tub', 'Family rooms'],
  },
  {
    name: 'Budget Single Room',
    desc: 'Smart and comfortable — everything you need for a short stay. A cosy twin room with all essentials and access to shared garden spaces.',
    beds: '1 Twin Bed',
    guests: 1,
    size: '18 m²',
    price: 'From $75 / night',
    img: IMG.p3,
    features: ['Free WiFi', 'Air conditioning', 'Garden access', '24-hr desk'],
  },
];

const nearby = [
  { name: 'Parklands Garden',                   dist: '500 m' },
  { name: 'Kigali Centenary Park',              dist: '5 km'  },
  { name: 'Jardin du Pentagone',                dist: '5 km'  },
  { name: 'Presidential Palace Museum',         dist: '6 km'  },
  { name: 'Kigali Genocide Memorial',           dist: '9 km'  },
  { name: 'Belgian Peacekeepers Memorial',      dist: '10 km' },
];

const nearbyRestaurants = [
  { name: 'Sago Palm Garden Center', dist: '800 m'  },
  { name: 'Amarembo Garden',         dist: '1 km'   },
  { name: 'Darnim Link',             dist: '1.1 km' },
];

const airports = [
  { name: 'Kigali International Airport', dist: '450 m' },
  { name: 'Kirundo Airport',              dist: '99 km' },
];

const onSiteRestaurants = [
  {
    title:   'The Garden Terrace',
    desc:    'A relaxed open-air terrace surrounded by lush garden views. Perfect for a leisurely breakfast or a romantic candlelit dinner under the stars.',
    cuisine: 'African · American · French · Italian',
    openFor: 'Breakfast · Lunch · Dinner · High tea',
    dietary: 'Vegetarian · Vegan options',
    img:     IMG.p7,
  },
  {
    title:   'The Velvet Grill',
    desc:    'Our flagship restaurant serves international and African fusion cuisine. Features an indoor bar, a curated wine list, and live music on weekends.',
    cuisine: 'African · British · French · Steakhouse · European',
    openFor: 'Breakfast · Lunch · Dinner',
    dietary: null,
    img:     IMG.p9,
  },
];

const facilitiesCategories = [
  {
    emoji: '🏠',
    title: 'Great for Your Stay',
    items: ['2 Restaurants','Private bathroom','Balcony','Air conditioning','Free Wifi','Pet friendly','View','Airport shuttle (free)','Family rooms'],
  },
  {
    emoji: '🍳',
    title: 'Kitchen',
    items: ['Dining table','Cleaning products','Dryer','Washing machine','Refrigerator'],
  },
  {
    emoji: '🛎',
    title: 'Front Desk Services',
    items: ['Invoice provided','Private check-in/out','Baggage storage','Currency exchange','Express check-in/out','24-hour front desk'],
  },
  {
    emoji: '🛁',
    title: 'Bathroom',
    items: ['Towels','Bath or shower','Slippers','Private bathroom','Free toiletries','Bathrobe','Hairdryer','Shower'],
  },
  {
    emoji: '🛋',
    title: 'Room Amenities',
    items: ['Socket near the bed','Sofa bed','Drying rack for clothing','Fold-up bed','Clothes rack'],
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Family Friendly',
    items: ['Child safety socket covers','Interconnected rooms','Family rooms','Children\'s high chair'],
  },
  {
    emoji: '🐾',
    title: 'Pets',
    items: ['Pets are allowed. Charges may apply.'],
    isNote: true,
  },
  {
    emoji: '🎨',
    title: 'Activities',
    items: ['Temporary art galleries (Additional charge)','Hot tub'],
  },
  {
    emoji: '🧹',
    title: 'Cleaning Services',
    items: ['Daily housekeeping','Suit press (Additional charge)','Ironing service','Laundry (Additional charge)'],
  },
  {
    emoji: '🔒',
    title: 'Safety & Security',
    items: ['Fire extinguishers','CCTV in common areas','Smoke alarms','Security alarm','24-hour security','Safe'],
  },
];

const reviewCategories = [
  { label: 'Comfort',         score: 8.0 },
  { label: 'Location',        score: 8.8 },
  { label: 'Cleanliness',     score: 7.5 },
  { label: 'Value for money', score: 7.9 },
  { label: 'Facilities',      score: 7.6 },
  { label: 'Staff',           score: 8.2 },
];

const galleryPhotos = [
  { src: IMG.p1,        alt: 'Hotel exterior at dusk'  },
  { src: IMG.p5,        alt: 'Suite living area'        },
  { src: IMG.p6,        alt: 'Pool and garden terrace'  },
  { src: IMG.p8,        alt: 'Private balcony view'     },
  { src: IMG.nightView, alt: 'Night view of hotel'      },
  { src: IMG.p10,       alt: 'Hotel lounge'             },
];

/* ── Component ── */
export default function VelvetPropertyDetails() {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <section className="vpd-root">

      {/* ══════════════════════════════════
          1. ABOUT
      ══════════════════════════════════ */}
      <div className="vpd-section vpd-about-section">
        <div className="vpd-container vpd-about-layout">

          {/* Left: text + gallery */}
          <div className="vpd-about-main">
            <span className="vpd-eyebrow">Overview</span>
            <h2 className="vpd-h2">About This Property</h2>

            <div className="vpd-about-body">
              <p>
                <strong>Comfortable Accommodations:</strong> Velvet Suites in Kigali offers family
                rooms with private bathrooms, air-conditioning, and garden views. Each room includes
                a balcony, work desk, and free WiFi.
              </p>
              <p>
                <strong>Dining &amp; Leisure:</strong> Guests can enjoy two on-site restaurants serving
                African, British, French, and Italian cuisines, alongside a bar with an extensive wine list.
                The hotel features a terrace, garden, and outdoor dining area.
              </p>
              <p>
                <strong>Convenient Location:</strong> Located just 450 m from Kigali International
                Airport, the hotel provides a complimentary airport shuttle. Nearby highlights include
                Kigali Convention Center and the Inema Art Center.
              </p>
              <p>
                <strong>Guest Services:</strong> Private check-in and check-out, a 24-hour front desk,
                daily housekeeping, room service, hot tub, balcony, and free toiletries.
              </p>
              <p className="vpd-couples-note">
                ❤️ Couples particularly love the location — rated <strong>8.6 / 10</strong> for a two-person trip.
              </p>
            </div>

            {/* Photo gallery */}
            <div className="vpd-gallery">
              <div className="vpd-gallery-main">
                <img
                  src={galleryPhotos[activePhoto].src}
                  alt={galleryPhotos[activePhoto].alt}
                  className="vpd-gallery-main-img"
                />
                <span className="vpd-gallery-counter">
                  {activePhoto + 1} / {galleryPhotos.length}
                </span>
              </div>
              <div className="vpd-gallery-thumbs">
                {galleryPhotos.map((ph, i) => (
                  <button
                    key={i}
                    className={`vpd-gallery-thumb ${i === activePhoto ? 'vpd-gallery-thumb--active' : ''}`}
                    onClick={() => setActivePhoto(i)}
                    aria-label={ph.alt}
                  >
                    <img src={ph.src} alt={ph.alt} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: highlights sidebar */}
          <aside className="vpd-about-aside">
            {/* Rating card */}
            <div className="vpd-highlight-card">
              <div className="vpd-highlight-score">
                <span className="vpd-hl-score-num">8.3</span>
                <span className="vpd-hl-score-label">Very Good</span>
              </div>
              <p className="vpd-hl-reviews">Based on 173 guest reviews</p>
              <div className="vpd-hl-stars">
                {[1,2,3,4,5].map(s => <span key={s} className="vpd-star"><IconStar /></span>)}
              </div>
            </div>

            {/* Location card */}
            <div className="vpd-highlight-card">
              <div className="vpd-hl-row">
                <span className="vpd-hl-icon"><IconPin /></span>
                <div>
                  <p className="vpd-hl-tag">Prime Location</p>
                  <p className="vpd-hl-val">450 m from Kigali Int'l Airport</p>
                </div>
              </div>
              <div className="vpd-hl-row" style={{marginTop:'0.75rem'}}>
                <span className="vpd-hl-icon"><IconPlane /></span>
                <div>
                  <p className="vpd-hl-tag">Free Airport Shuttle</p>
                  <p className="vpd-hl-val">Available on request, 24 hours</p>
                </div>
              </div>
            </div>

            {/* Breakfast card */}
            <div className="vpd-highlight-card">
              <p className="vpd-hl-card-title">🍳 Breakfast Included</p>
              <p className="vpd-hl-val">
                Continental · Full English/Irish · Vegetarian · Vegan · Gluten-free · Asian · Buffet · Breakfast to go
              </p>
            </div>

            <a href="https://direct-book.com/properties/velvetsuites?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2026-07-16&checkOutDate=2026-07-17&trackPage=no" target="_blank" rel="noopener noreferrer" className="vpd-cta-btn">Book Your Stay <IconArrow /></a>
          </aside>
        </div>
      </div>

      {/* ══════════════════════════════════
          3. GUEST REVIEWS
      ══════════════════════════════════ */}
      <div className="vpd-section vpd-reviews-section">
        <div className="vpd-container">
          <span className="vpd-eyebrow">Testimonials</span>
          <h2 className="vpd-h2">What Our Guests Say</h2>

          <div className="vpd-reviews-layout">
            {/* Big score display */}
            <div className="vpd-review-score-block">
              <div className="vpd-review-circle">
                <span className="vpd-review-num">8.3</span>
                <span className="vpd-review-word">Very Good</span>
              </div>
              <p className="vpd-review-count">173 verified guest reviews</p>
              <div className="vpd-review-stars">
                {[1,2,3,4,5].map(s => <span key={s} className="vpd-star vpd-star--gold"><IconStar /></span>)}
              </div>
              <a href="https://direct-book.com/properties/velvetsuites?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2026-07-16&checkOutDate=2026-07-17&trackPage=no" target="_blank" rel="noopener noreferrer" className="vpd-cta-btn" style={{marginTop:'1.5rem'}}>
                Book Now <IconArrow />
              </a>
            </div>

            {/* Category bars */}
            <div className="vpd-rating-cats">
              {reviewCategories.map((cat, i) => (
                <div key={i} className="vpd-rating-row">
                  <span className="vpd-rating-label">{cat.label}</span>
                  <div className="vpd-rating-bar-track">
                    <div
                      className="vpd-rating-bar-fill"
                      style={{ width: `${(cat.score / 10) * 100}%` }}
                    />
                  </div>
                  <span className="vpd-rating-score">{cat.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          4. LOCATION
      ══════════════════════════════════ */}
      <div className="vpd-section vpd-area-section">
        <div className="vpd-container">
          <span className="vpd-eyebrow">Location</span>
          <h2 className="vpd-h2">Perfectly Positioned in Kigali</h2>
          <p className="vpd-section-sub">Guests love the neighbourhood — great location, easy access to key attractions and the airport.</p>

          {/* Photo strip */}
          <div className="vpd-area-photos">
            <img src={IMG.p5}        alt="Hotel neighbourhood" className="vpd-area-photo vpd-area-photo--wide" />
            <img src={IMG.nightView} alt="Night view"          className="vpd-area-photo" />
            <img src={IMG.p6}        alt="Garden area"         className="vpd-area-photo" />
          </div>

          <div className="vpd-area-grid">
            <div className="vpd-area-col">
              <h4 className="vpd-area-col-h">🚶 What's Nearby</h4>
              <ul className="vpd-dist-list">
                {nearby.map((item, i) => (
                  <li key={i} className="vpd-dist-row">
                    <span>{item.name}</span>
                    <span className="vpd-dist">{item.dist}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="vpd-area-col">
              <h4 className="vpd-area-col-h"><IconFork /> Restaurants Nearby</h4>
              <ul className="vpd-dist-list">
                {nearbyRestaurants.map((r, i) => (
                  <li key={i} className="vpd-dist-row">
                    <span>{r.name}</span>
                    <span className="vpd-dist">{r.dist}</span>
                  </li>
                ))}
              </ul>
              <h4 className="vpd-area-col-h vpd-area-col-h--mt"><IconPlane /> Closest Airports</h4>
              <ul className="vpd-dist-list">
                {airports.map((a, i) => (
                  <li key={i} className="vpd-dist-row">
                    <span>{a.name}</span>
                    <span className="vpd-dist">{a.dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="vpd-legal-note" style={{marginTop:'1.25rem'}}>
            Shortest estimated walking or driving distances. Actual distances may vary.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════
          5. DINING
      ══════════════════════════════════ */}
      <div className="vpd-section vpd-dining-section">
        <div className="vpd-container">
          <span className="vpd-eyebrow">Dining</span>
          <h2 className="vpd-h2">On-Site Restaurants</h2>
          <p className="vpd-section-sub">Two distinct dining experiences — from a garden terrace breakfast to an evening at the grill.</p>
          <div className="vpd-rest-cards">
            {onSiteRestaurants.map((r, i) => (
              <div key={i} className="vpd-rest-card">
                <div className="vpd-rest-img-wrap">
                  <img src={r.img} alt={r.title} className="vpd-rest-img" />
                </div>
                <div className="vpd-rest-body">
                  <h4 className="vpd-rest-card-h">{r.title}</h4>
                  <p className="vpd-rest-desc">{r.desc}</p>
                  <div className="vpd-rest-row">
                    <span className="vpd-rest-label">Cuisine</span>
                    <span className="vpd-rest-val">{r.cuisine}</span>
                  </div>
                  <div className="vpd-rest-row">
                    <span className="vpd-rest-label">Open for</span>
                    <span className="vpd-rest-val">{r.openFor}</span>
                  </div>
                  {r.dietary && (
                    <div className="vpd-rest-row">
                      <span className="vpd-rest-label">Dietary options</span>
                      <span className="vpd-rest-val">{r.dietary}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          6. FACILITIES
      ══════════════════════════════════ */}
      <div className="vpd-section vpd-fac-section">
        <div className="vpd-container">
          <span className="vpd-eyebrow">Amenities</span>
          <h2 className="vpd-h2">Facilities of Velvet Suites</h2>
          <p className="vpd-section-sub">Rated <strong>8.3</strong> for facilities — everything thoughtfully curated for your comfort.</p>

          {/* Facility photo strip */}
          <div className="vpd-fac-photos">
            <img src={IMG.laundry} alt="Laundry service"   className="vpd-fac-photo" />
            <img src={IMG.p8}      alt="Room amenities"    className="vpd-fac-photo" />
            <img src={IMG.p10}     alt="Hotel lounge"      className="vpd-fac-photo" />
            <img src={IMG.p3}      alt="Garden facilities" className="vpd-fac-photo" />
          </div>

          <div className="vpd-fac-grid">
            {facilitiesCategories.map((cat, i) => (
              <div key={i} className="vpd-fac-cat">
                <h5 className="vpd-fac-cat-h">
                  <span className="vpd-fac-emoji">{cat.emoji}</span>
                  {cat.title}
                </h5>
                {cat.isNote ? (
                  <p className="vpd-fac-note">{cat.items[0]}</p>
                ) : (
                  <ul className="vpd-fac-list">
                    {cat.items.map((item, j) => {
                      const hasCharge = item.includes('(Additional charge)') || item.includes('(extra fee)');
                      const text = item.replace(' (Additional charge)', '').replace(' (extra fee)', '');
                      return (
                        <li key={j} className="vpd-fac-item">
                          <span className="vpd-fac-check"><IconCheck /></span>
                          <span>
                            {text}
                            {hasCharge && <em className="vpd-fac-charge"> · Additional charge</em>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
