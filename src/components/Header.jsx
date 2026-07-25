import { useEffect, useState } from 'react'
import logoEmblem from '../assets/logo-emblem.png'

const NAV = [
  { href: '#fonctionnalites', label: 'Fonctionnalités' },
  { href: '#commerces', label: 'Pour qui' },
  { href: '#plateformes', label: 'Plateformes' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__row">
        <a href="#top" className="brand-mark" aria-label="POS PRO MADA — accueil">
          <img src={logoEmblem} alt="" className="brand-mark__logo" width="44" height="27" />
          <span>
            POS <b>PRO</b> MADA
          </span>
        </a>

        <nav className="site-nav" aria-label="Navigation principale">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="btn btn-primary" href="#contact">Démo gratuite</a>
          <button
            className="nav-toggle"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>Démo gratuite</a>
        </div>
      )}
    </header>
  )
}
