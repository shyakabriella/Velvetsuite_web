export default function VelvetHighlights() {
  return (
    <section className="vs-highlights-section">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="vs-highlights-bg"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/videos/NGALI-Video-1.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="vs-highlights-overlay" />

      {/* Content */}
      <div className="vs-highlights-content">
        <div className="text-4xl font-bold text-white">VELVET HIGHLIGHTS</div>
        <div className="vs-highlights-subtitle">Take a Sneak Peek at What We Offer</div>

        <a href="/about" className="vs-discover-circle">
          Discover More
        </a>
      </div>
    </section>
  );
}
