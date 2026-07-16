const checks = [
  'Just 5 minutes from the airport – quick access with stress-free shuttle service',
  'Family House – unparalleled space and comfort for groups',
  'Rooftop dining with city skyline views – a Kigali highlight',
  'Modern amenities with the warmth of Rwandan hospitality',
  'Ideal for business travelers, families, and short layovers',
];

export default function VelvetWelcome() {
  return (
    <section className="vs-why-section">
      <h2 className="vs-why-title">Why Choose Velvet Suites</h2>
      <ul className="vs-why-list">
        {checks.map((item, i) => (
          <li key={i} className="vs-why-item">
            <span className="vs-why-check">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
