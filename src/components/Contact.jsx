import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const COMMERCE_TYPES = [
  'Épicerie', 'Quincaillerie', 'Pharmacie', 'Supermarché', 'Grossiste', 'Restaurant', 'Autre',
]

export default function Contact() {
  const [form, setForm] = useState({ nom: '', commerce: '', ville: '', telephone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('request-failed')
      setStatus('done')
      setForm({ nom: '', commerce: '', ville: '', telephone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact__row">
        <div className="contact__intro">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Démo gratuite</span>
          <h2 className="section-title" style={{ color: 'var(--paper)' }}>
            Prêt à moderniser la gestion de votre commerce ?
          </h2>
          <p className="section-lede" style={{ color: 'rgba(250,248,242,0.72)' }}>
            Contactez-nous pour une démonstration et un devis personnalisé. Réponse rapide,
            sans engagement.
          </p>

          <ul className="contact__details">
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L7.1 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>
              <a href="tel:+261321359022">+261 32 13 590 22</a>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
              <a href="mailto:pjjpascalien@gmail.com">pjjpascalien@gmail.com</a>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Majunga, Madagascar</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9 9h.01M9 12v6M15 15v3M15 9v3.5a2.5 2.5 0 0 1-5 0"/></svg>
              <span>Facebook — POS PRO MADA</span>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__grid">
            <label>
              Nom
              <input required type="text" value={form.nom} onChange={update('nom')} placeholder="Votre nom" />
            </label>
            <label>
              Type de commerce
              <select required value={form.commerce} onChange={update('commerce')}>
                <option value="" disabled>Choisir…</option>
                {COMMERCE_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label>
              Ville
              <input type="text" value={form.ville} onChange={update('ville')} placeholder="Ex : Majunga" />
            </label>
            <label>
              Téléphone
              <input required type="tel" value={form.telephone} onChange={update('telephone')} placeholder="034 xx xxx xx" />
            </label>
          </div>
          <label>
            Message
            <textarea rows="4" value={form.message} onChange={update('message')} placeholder="Parlez-nous de votre commerce (facultatif)" />
          </label>

          <button className="btn btn-primary contact-form__submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Envoi en cours…' : 'Demander ma démo gratuite'}
          </button>

          {status === 'done' && (
            <p className="contact-form__status contact-form__status--ok" role="status">
              Merci ! Votre demande a bien été envoyée, nous vous recontactons rapidement.
            </p>
          )}
          {status === 'error' && (
            <p className="contact-form__status contact-form__status--error" role="alert">
              L\u2019envoi a échoué. Appelez-nous directement au +261 32 13 590 22.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
