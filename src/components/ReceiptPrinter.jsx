import { useEffect, useRef, useState } from 'react'

const LINES = [
  { label: 'Sucre 1kg', qty: '2', price: '5 000' },
  { label: 'Riz 5kg', qty: '1', price: '12 000' },
  { label: 'Huile 1L', qty: '1', price: '5 000' },
  { label: 'Savon 250g', qty: '1', price: '1 500' },
  { label: 'Lait 1L', qty: '1', price: '3 000' },
]

const TOTAL = '26 500 Ar'

export default function ReceiptPrinter() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showTotal, setShowTotal] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runSequence()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function runSequence() {
    LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), 420 * (i + 1))
    })
    setTimeout(() => setShowTotal(true), 420 * (LINES.length + 1))
  }

  return (
    <div className="receipt-rig" ref={ref}>
      <div className="receipt-rig__printer">
        <div className="receipt-rig__slot" />
      </div>
      <div className="receipt-paper" role="img" aria-label="Aperçu d'un ticket de caisse généré par POS PRO MADA">
        <p className="receipt-paper__shop">POS PRO MADA</p>
        <p className="receipt-paper__meta">Épicerie Tsara — Majunga</p>
        <div className="receipt-paper__rule" />
        {LINES.map((line, i) => (
          <div
            key={line.label}
            className={`receipt-paper__line ${i < visibleLines ? 'is-visible' : ''}`}
          >
            <span>{line.qty}× {line.label}</span>
            <span>{line.price}</span>
          </div>
        ))}
        <div className="receipt-paper__rule" />
        <div className={`receipt-paper__total ${showTotal ? 'is-visible' : ''}`}>
          <span>TOTAL</span>
          <span>{TOTAL}</span>
        </div>
        <p className={`receipt-paper__thanks ${showTotal ? 'is-visible' : ''}`}>Misaotra tompoko !</p>
      </div>
    </div>
  )
}
