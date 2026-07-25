import logoFull from '../assets/logo-full.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__row">
        <div className="site-footer__brand">
          <img src={logoFull} alt="POS PRO MADA" className="site-footer__logo" width="44" height="44" />
          <span>© {new Date().getFullYear()} POS PRO MADA — RASENDRAFARA Ange Krista Pascalien Jean Jacques</span>
        </div>
        <span>Majunga, Madagascar</span>
      </div>
    </footer>
  )
}
