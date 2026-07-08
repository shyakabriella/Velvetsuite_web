export default function VelvetHighlights() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '520px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/NGALI-Video-1.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(40, 0, 0, 0.65)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          fontFamily: "'Marcellus', serif",
          fontSize: '2.2rem',
          fontWeight: 400,
          letterSpacing: '0.08em',
          color: '#c9a84c',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>VELVET HGHLIGHTS</div>

        <div style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.85)',
          marginBottom: '3rem',
        }}>Take a Sneak Peek at What We Offer</div>

        <a
          href="/about"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: '#6B0000',
            fontFamily: "'Marcellus', serif",
            fontSize: '1rem',
            color: '#fff',
            textDecoration: 'none',
            transition: 'background 0.25s, transform 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#8a0000';
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#6B0000';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Discover More
        </a>
      </div>
    </section>
  );
}
