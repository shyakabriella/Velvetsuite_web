import { useState, useEffect } from 'react';
import { useNavigate } from './Link';

const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'POLICIES', to: '/policies' },
  { label: 'GALLERY', to: '/gallery' },
  { label: 'MENU', to: '/menu' },
];

export default function VelvetNavbar({ currentPath }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleToggle = () => setOpen(v => !v);
    window.addEventListener('toggle-mobile-menu', handleToggle);
    return () => window.removeEventListener('toggle-mobile-menu', handleToggle);
  }, []);

  const handleNav = (e, to) => {
    e.preventDefault();
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <header className={`vs-navbar ${scrolled ? 'scrolled' : ''}`} style={{
        minHeight: 'clamp(80px, 14vw, 140px)',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? '#3b0404' : 'transparent',
        borderBottom: scrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.15)'
      }}>
        <div className="vs-navbar-inner" style={{ position: 'relative', width: '100%' }}>

          {/* ── LEFT: hamburger, then nav links ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flex: 1 }}>

            {/* Hamburger icon */}
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
              className="vs-hamburger"
            >
              <span style={{
                transform: open ? 'translateY(4.5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                transform: open ? 'translateY(-4.5px) rotate(-45deg)' : 'none',
              }} />
            </button>

            {/* Desktop nav links */}
            <nav className="vs-nav-links">
              {navLinks.map(l => {
                const active = currentPath === l.to;
                return (
                  <a
                    key={l.to}
                    href={l.to}
                    onClick={e => handleNav(e, l.to)}
                    className={`vs-nav-link ${active ? 'active' : ''}`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* ── CENTER: Logo ── */}
          <a
            href="/"
            onClick={e => handleNav(e, '/')}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              textDecoration: 'none',
              display: 'block',
              zIndex: 10,
            }}
          >
            <img
              src="/homepageimgs/cropped-Velvet-.png"
              alt="Velvet Suites Logo"
              style={{ height: 'clamp(60px, 12vw, 120px)', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </a>

          {/* ── RIGHT: tel + reserve button ── */}
          <div className="vs-nav-right" style={{ flex: 1, justifyContent: 'flex-end' }}>
            <span className="vs-nav-tel">Tel: +250 781 423 080</span>

            <a
              href="/stays"
              onClick={e => handleNav(e, '/stays')}
              className="vs-reserve-btn"
              style={{
                color: scrolled ? '#111' : '#fff',
                background: scrolled ? '#fff' : 'transparent',
              }}
              onMouseEnter={e => { 
                  if (!scrolled) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; 
                  } else {
                      e.currentTarget.style.background = '#f0f0f0';
                  }
              }}
              onMouseLeave={e => { 
                  if (!scrolled) {
                      e.currentTarget.style.background = 'transparent'; 
                  } else {
                      e.currentTarget.style.background = '#fff';
                  }
              }}
            >
              Reserve Now {scrolled && <span style={{ fontSize: '14px', lineHeight: 1 }}>›</span>}
            </a>
          </div>

        </div>
      </header>

      {/* ══ MOBILE DRAWER ══ */}
      <div className={`vs-mobile-drawer ${open ? 'open' : ''}`} style={{ top: 'clamp(80px, 14vw, 140px)', background: 'rgba(30,0,0,0.97)' }}>
        {navLinks.map(l => (
          <a
            key={l.to}
            href={l.to}
            onClick={e => handleNav(e, l.to)}
            className="vs-mobile-link"
            style={{
              color: currentPath === l.to ? '#c9a84c' : '#fff',
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="/stays"
          onClick={e => handleNav(e, '/stays')}
          className="vs-mobile-link"
          style={{ color: '#c9a84c', marginTop: '0.5rem' }}
        >
          Reserve Now →
        </a>
      </div>
    </>
  );
}
