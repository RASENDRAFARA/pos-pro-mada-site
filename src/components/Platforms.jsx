export default function Platforms() {
  return (
    <section id="plateformes" className="section platforms">
      <div className="container">
        <span className="eyebrow">Disponibilité</span>
        <h2 className="section-title">Sur l\u2019ordinateur de la caisse, bientôt sur tablette</h2>

        <div className="platforms__grid">
          <div className="platform-card platform-card--ready">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="12" rx="1.5" />
              <path d="M8 20h8M12 16v4" strokeLinecap="round" />
            </svg>
            <h3>Windows</h3>
            <span className="platform-card__status platform-card__status--ready">Disponible maintenant</span>
            <p>Installez POS PRO MADA sur le poste de caisse existant, sans matériel supplémentaire.</p>
          </div>

          <div className="platform-card">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="6" y="2" width="12" height="20" rx="2" />
              <path d="M11 19h2" strokeLinecap="round" />
            </svg>
            <h3>Tablette Android</h3>
            <span className="platform-card__status">Bientôt disponible</span>
            <p>Une version mobile pour encaisser depuis le rayon ou en livraison.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
