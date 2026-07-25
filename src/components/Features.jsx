const FEATURES = [
  {
    icon: (
      <path d="M6 8h20l-2 14a3 3 0 0 1-3 2.6H11A3 3 0 0 1 8 22L6 8Z" />
    ),
    title: 'Caisse rapide',
    text: 'Encaissez en quelques clics et générez des tickets professionnels, en boutique comme au comptoir.',
  },
  {
    icon: (
      <path d="M6 11l10-5 10 5-10 5-10-5Zm0 6 10 5 10-5M6 17l10 5 10-5" />
    ),
    title: 'Gestion de stock',
    text: 'Suivez vos quantités en temps réel, produit par produit, et évitez les ruptures.',
  },
  {
    icon: (
      <path d="M8 24V14M16 24V8M24 24v-9" />
    ),
    title: 'Rapports & statistiques',
    text: 'Chiffre d\u2019affaires, ventes du jour et état du stock en un coup d\u2019œil, pour décider vite.',
  },
  {
    icon: (
      <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-8 11c0-4.4 3.6-7 8-7s8 2.6 8 7M22 12a4 4 0 1 0 0-8M25 26c0-3.4-2.2-5.6-5-6.4" />
    ),
    title: 'Gestion des utilisateurs',
    text: 'Un compte par employé, avec des rôles et des droits distincts pour sécuriser l\u2019accès.',
  },
  {
    icon: (
      <path d="M16 5 6 9v7c0 6.6 4.3 11 10 13 5.7-2 10-6.4 10-13V9l-10-4Z" />
    ),
    title: 'Sécurisé & fiable',
    text: 'Vos données de vente et de stock sont protégées et sauvegardées en toute sécurité.',
  },
  {
    icon: (
      <path d="M16 6v3M16 23v3M6 16h3M23 16h3M9 9l2 2M21 21l2 2M9 23l2-2M21 11l2-2" />
      ),
    title: '100% hors ligne',
    text: 'Fonctionne sans connexion internet, un point essentiel là où le réseau n\u2019est pas garanti.',
  },
]

export default function Features() {
  return (
    <section id="fonctionnalites" className="section features">
      <div className="container">
        <span className="eyebrow">Fonctionnalités clés</span>
        <h2 className="section-title">Tout ce dont un commerce a besoin, rien de superflu</h2>
        <p className="section-lede">
          Chaque fonction répond à un problème concret du comptoir : encaisser vite, savoir ce qu\u2019il reste
          en rayon, et fermer la caisse du soir sans y passer la soirée.
        </p>

        <div className="features__grid">
          {FEATURES.map((f) => (
            <article className="feature-card" key={f.title}>
              <svg className="feature-card__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {f.icon}
              </svg>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
