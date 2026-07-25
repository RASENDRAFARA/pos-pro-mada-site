import ReceiptPrinter from './ReceiptPrinter.jsx'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__row">
        <div className="hero__copy">
          <span className="badge-origin">Conçu à Madagascar, pour les commerçants malgaches</span>
          <h1>
            La caisse et le stock de votre commerce,
            <span className="hero__accent"> sans surprise à la fin du mois.</span>
          </h1>
          <p className="hero__lede">
            POS PRO MADA encaisse vos ventes, suit votre stock en temps réel et sort vos
            rapports en un clic — même sans connexion internet. Pensé pour les épiceries,
            quincailleries, pharmacies, supermarchés et grossistes.
          </p>
          <div className="hero__actions">
            <a className="btn btn-primary" href="#contact">Demander une démo gratuite</a>
            <a className="btn btn-outline-navy" href="#fonctionnalites">Voir les fonctionnalités</a>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>100%</dt>
              <dd>hors ligne</dd>
            </div>
            <div>
              <dt>1 clic</dt>
              <dd>pour encaisser</dd>
            </div>
            <div>
              <dt>6+</dt>
              <dd>types de commerces</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <ReceiptPrinter />
        </div>
      </div>
    </section>
  )
}
