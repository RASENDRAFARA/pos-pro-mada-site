const AUDIENCE = [
  { label: 'Épiceries', detail: 'Encaissement rapide au comptoir, même aux heures de pointe.' },
  { label: 'Quincailleries', detail: 'Catalogue de références multiples, du clou au sac de ciment.' },
  { label: 'Pharmacies', detail: 'Suivi précis des lots et des quantités, produit par produit.' },
  { label: 'Supermarchés', detail: 'Multi-caisses et multi-utilisateurs pour toute l\u2019équipe.' },
  { label: 'Grossistes', detail: 'Ventes en volume et suivi de stock sur de grandes quantités.' },
  { label: 'Restaurants', detail: 'Tickets personnalisés et bilan de caisse en fin de service.' },
]

export default function Audience() {
  return (
    <section id="commerces" className="section audience">
      <div className="container">
        <span className="eyebrow">Pour qui</span>
        <h2 className="section-title">Adapté à tous types de commerces</h2>
        <p className="section-lede">
          Le même logiciel s\u2019adapte au comptoir d\u2019une petite épicerie comme au dépôt d\u2019un grossiste.
        </p>

        <div className="audience__grid">
          {AUDIENCE.map((a) => (
            <div className="audience__card" key={a.label}>
              <h3>{a.label}</h3>
              <p>{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
