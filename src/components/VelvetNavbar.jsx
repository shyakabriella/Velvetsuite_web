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

  const handleNav = (e, to) => {
    e.preventDefault();
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? '#3b0404' : 'transparent',
        borderBottom: scrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        minHeight: '140px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2.5rem',
          maxWidth: '1700px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
        }}>

          {/* ── LEFT: hamburger, then nav links ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flex: 1 }}>

            {/* Hamburger icon — 2 thin lines */}
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: 0,
                width: 'fit-content',
              }}
            >
              <span style={{
                display: 'block', width: '32px', height: '1px', background: '#fff',
                transition: 'transform 0.3s',
                transform: open ? 'translateY(4.5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', width: '32px', height: '1px', background: '#fff',
                transition: 'transform 0.3s',
                transform: open ? 'translateY(-4.5px) rotate(-45deg)' : 'none',
              }} />
            </button>

            {/* Desktop nav links */}
            <nav style={{ display: 'flex', gap: '2.5rem' }}>
              {navLinks.map(l => {
                const active = currentPath === l.to;
                return (
                  <a
                    key={l.to}
                    href={l.to}
                    onClick={e => handleNav(e, l.to)}
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      textDecoration: 'none',
                      paddingBottom: '6px',
                      borderBottom: active ? '1px solid #fff' : '1px solid transparent',
                      transition: 'border-color 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.6)'; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.borderBottomColor = 'transparent'; }}
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
              style={{ height: '120px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </a>

          {/* ── RIGHT: tel + reserve button ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            flex: 1,
            justifyContent: 'flex-end',
          }}>
            <span style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '13px',
              color: '#fff',
              whiteSpace: 'nowrap',
            }}>Tel: +250 781 423 080</span>

            <a
              href="/stays"
              onClick={e => handleNav(e, '/stays')}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '12px',
                color: scrolled ? '#111' : '#fff',
                background: scrolled ? '#fff' : 'transparent',
                border: '1px solid #fff',
                padding: '0.6rem 1.6rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
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
      {open && (
        <div style={{
          position: 'fixed',
          top: '220px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(30,0,0,0.97)',
          zIndex: 99,
          overflowY: 'auto',
          padding: '1.5rem 2.5rem 3rem',
          borderTop: '1px solid rgba(255,255,255,0.12)',
        }}>
          {navLinks.map(l => (
            <a
              key={l.to}
              href={l.to}
              onClick={e => handleNav(e, l.to)}
              style={{
                display: 'block',
                fontFamily: "'Lato', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: currentPath === l.to ? '#c9a84c' : '#fff',
                textDecoration: 'none',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'color 0.2s',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/stays"
            onClick={e => handleNav(e, '/stays')}
            style={{
              display: 'block',
              fontFamily: "'Lato', sans-serif",
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              textDecoration: 'none',
              padding: '1rem 0',
              marginTop: '0.5rem',
            }}
          >
            Reserve Now →
          </a>
        </div>
      )}
    </>
  );
}
