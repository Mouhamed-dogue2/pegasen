import { Link } from 'react-router-dom'
import { Phone, ShoppingCart } from 'lucide-react'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', noirChaud: '#1C1208' }

export default function CtaSection({ titre, orMot, texte, whatsappText = '' }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #1a3a1a)`, padding: '5rem 1.5rem', textAlign: 'center', borderTop: `3px solid ${C.or}` }}>
      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>
        Prêt pour l'aventure ?
      </p>
      <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
        {titre} <span style={{ color: C.or }}>{orMot}</span>
      </h2>
      {texte && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>{texte}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: texte ? 0 : '2rem' }}>
        <a href={`https://wa.me/+221788938254${whatsappText ? `?text=${encodeURIComponent(whatsappText)}` : ''}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '14px 30px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.transform = 'translateY(0)' }}>
          <Phone size={18} /> Réserver sur WhatsApp
        </a>
        <Link to="/mon-circuit"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '14px 30px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <ShoppingCart size={18} /> Composer mon circuit
        </Link>
      </div>
    </div>
  )
}