const ROWS = [
  {
    before: 'Calculs et écritures à la main',
    after: 'Calcul automatique et fiable',
  },
  {
    before: 'Stock difficile à suivre',
    after: 'Stock suivi en temps réel',
  },
  {
    before: 'Bilan du jour long à établir',
    after: 'Rapports générés instantanément',
  },
]

export default function Comparison() {
  return (
    <section className="section comparison">
      <div className="container">
        <span className="eyebrow">Avant / après</span>
        <h2 className="section-title">Le cahier de comptes prend sa retraite</h2>

        <div className="comparison__table" role="table">
          <div className="comparison__col comparison__col--before" role="rowgroup">
            <div className="comparison__head" role="columnheader">
              <span className="comparison__mark comparison__mark--no">✕</span>
              Gestion manuelle
            </div>
            {ROWS.map((r) => (
              <div className="comparison__cell" role="cell" key={r.before}>{r.before}</div>
            ))}
          </div>

          <div className="comparison__col comparison__col--after" role="rowgroup">
            <div className="comparison__head" role="columnheader">
              <span className="comparison__mark comparison__mark--yes">✓</span>
              Avec POS PRO MADA
            </div>
            {ROWS.map((r) => (
              <div className="comparison__cell" role="cell" key={r.after}>{r.after}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
