import { Link } from './Link';

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7L15.5 12l-5.75 3.5z"/>
    </svg>
  );
}

function TripAdvisorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3.18.51 4.43 1.38L15 7.75A4.96 4.96 0 0 0 12 7c-1.1 0-2.12.36-2.94.96L7.57 6.38A7.96 7.96 0 0 1 12 5zm-5 7a5 5 0 1 1 10 0 5 5 0 0 1-10 0zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"/>
    </svg>
  );
}

function BookingDotComIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H7v-7h2v7zm-1-8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm9 8h-2v-3.5c0-.83-.67-1.5-1.5-1.5S12 12.67 12 13.5V17h-2v-7h2v1.07A3.5 3.5 0 0 1 17 14.5V17z"/>
    </svg>
  );
}

const quickLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Policies', to: '/policies' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'Menu',     to: '/restaurant' },
];

export default function VelvetFooter() {
  return (
    <footer className="vs-footer">
      <div className="vs-footer-inner">

        {/* ── Column 1: Brand ── */}
        <div>
          <h3 className="vs-footer-brand-name">VELVET SUITES</h3>
          <p className="vs-footer-brand-desc">
            Experience unparalleled comfort and elegance at Velvet Suites, your
            premier destination for luxury hospitality in the heart of the city.
          </p>
          <div className="vs-footer-socials">
            {/* YouTube – red */}
            <a
              href="https://www.youtube.com/@VelvetSuitesKigali"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="vs-social-btn"
              style={{ background: '#ff0000', color: '#fff' }}
            >
              <YoutubeIcon />
            </a>
            {/* TripAdvisor – green */}
            <a
              href="https://www.tripadvisor.com/Hotel_Review-g293829-d26635262-Reviews-Velvet_Suites-Kigali_Kigali_Province.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripAdvisor"
              className="vs-social-btn"
              style={{ background: '#34e0a1', color: '#000' }}
            >
              <TripAdvisorIcon />
            </a>
            {/* Instagram – dark */}
            <a
              href="https://www.instagram.com/velve_tsuites/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="vs-social-btn"
              style={{ background: '#222', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <InstagramIcon />
            </a>
            {/* Booking.com – dark crimson */}
            <a
              href="https://direct-book.com/properties/velvetsuites"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Booking.com"
              className="vs-social-btn"
              style={{ background: '#6B0000', color: '#fff' }}
            >
              <BookingDotComIcon />
            </a>
          </div>
        </div>

        {/* ── Column 2: Reach Out ── */}
        <div>
          <h3 className="vs-footer-col-title">Reach Out</h3>
          <div className="vs-footer-contact">
            <p><a href="mailto:info@velvetsuites.rw" style={{color:'rgba(255,255,255,0.7)'}}>Email: info@velvetsuites.rw</a></p>
            <p><a href="tel:+250780925118" style={{color:'rgba(255,255,255,0.7)'}}>Tel: +250 780 925 118</a></p>
            <p>10 KG 111 Street, Remera, Kigali</p>
          </div>
          <a
            href="https://maps.app.goo.gl/JRdiYDvtasDyTqYV7"
            target="_blank"
            rel="noopener noreferrer"
            className="vs-view-map-btn"
          >
            VIEW ON MAP &nbsp;›
          </a>
        </div>

        {/* ── Column 3: Quick Links ── */}
        <div>
          <h3 className="vs-footer-col-title">Quick Links</h3>
          <ul className="vs-footer-links">
            {quickLinks.map((l, i) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="vs-footer-link"
                  style={{ color: i === 0 ? '#7a0000' : undefined }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="vs-footer-bottom">
        © {new Date().getFullYear()} Velvet Suites. All rights reserved.
      </div>
    </footer>
  );
}
