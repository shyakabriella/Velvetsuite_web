const checks = [
  'Just 5 minutes from the airport – quick access with stress-free shuttle service',
  'Family House – unparalleled space and comfort for groups',
  'Rooftop dining with city skyline views – a Kigali highlight',
  'Modern amenities with the warmth of Rwandan hospitality',
  'Ideal for business travelers, families, and short layovers',
];

export default function VelvetWelcome() {
  return (
    <section style={{
      background: '#f5f4f0',
      padding: '5rem 2rem',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: "'Marcellus', serif",
        fontSize: '2.2rem',
        fontStyle: 'italic',
        fontWeight: 400,
        color: '#c9a84c',
        marginBottom: '3rem',
        marginTop: 0,
      }}>Why Choose Velvet Suites</h2>
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.1rem',
        alignItems: 'center',
      }}>
        {checks.map((item, i) => (
          <li key={i} style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '1rem',
            color: '#222',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
            maxWidth: '650px',
          }}>
            <span style={{ flexShrink: 0, fontSize: '1rem', marginTop: '1px', color: '#222' }}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
