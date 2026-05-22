import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ShoppingCart } from 'lucide-react'
import { usePanier } from '@/context/PanierContext'

// Liens essentiels seulement
const NAV = [
  { to: '/destinations', label: 'Destinations' },
  { to: '/circuits', label: 'Circuits' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/brochures', label: 'Brochures' },
  { to: '/solidarite', label: 'Solidarité' },
  { to: '/vlog', label: 'Vlog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { nombreItems } = usePanier()
  const transparent = isHome && !scrolled

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: transparent ? 'transparent' : 'rgba(20,12,4,0.97)',
      backdropFilter: transparent ? 'none' : 'blur(18px)',
      borderBottom: transparent ? 'none' : '1px solid rgba(212,160,23,0.18)',
      transition: 'all 0.4s ease',
      boxShadow: transparent ? 'none' : '0 2px 24px rgba(0,0,0,0.35)',
    }}>
      {!transparent && <div style={{ height: '3px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />}

      <nav style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

        {/* ── LOGO ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}
          onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.08) rotate(-2deg)'}
          onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1) rotate(0deg)'}>
          <img src="/images/logo/pegasen-logo.png" alt="PEGASEN221"
            style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(212,160,23,0.5))', transition: 'transform 0.3s ease', animation: 'float 6s ease-in-out infinite' }} />
          <div>
            <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '1.1rem', color: transparent ? 'white' : '#F0C040', margin: 0, lineHeight: 1.1, letterSpacing: '0.02em' }}>
              PÉGA<span style={{ color: '#D4A017' }}>SEN</span><span style={{ fontSize: '0.85em' }}>221</span>
            </p>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.68rem', color: transparent ? 'rgba(255,255,255,0.6)' : 'rgba(212,160,23,0.65)', margin: 0, letterSpacing: '0.1em' }}>
              Excursions
            </p>
          </div>
        </Link>

        {/* ── LIENS DESKTOP ── */}
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '2px', alignItems: 'center', flex: 1, justifyContent: 'center' }} className="nav-desktop">
          {NAV.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to}
                style={({ isActive }) => ({
                  display: 'block', padding: '7px 12px', borderRadius: '8px',
                  fontSize: '0.84rem', fontWeight: 500, textDecoration: 'none',
                  transition: 'all 0.2s',
                  color: isActive ? '#D4A017' : transparent ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.72)',
                  background: isActive ? 'rgba(212,160,23,0.12)' : 'transparent',
                  borderBottom: isActive ? '2px solid #D4A017' : '2px solid transparent',
                })}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── ACTIONS DROITE ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }} className="nav-actions">
          {/* Panier */}
          {nombreItems > 0 && (
            <Link to="/mon-circuit" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.35)', color: '#D4A017', padding: '7px 14px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,160,23,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,160,23,0.15)' }}>
              <ShoppingCart size={14} />
              <span>Circuit</span>
              <span style={{ background: '#D4A017', color: '#1C1208', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>{nombreItems}</span>
            </Link>
          )}
          {/* WhatsApp */}
          <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#22c55e', color: 'white', fontSize: '0.84rem', fontWeight: 700, padding: '8px 16px', borderRadius: '9999px', textDecoration: 'none', transition: 'all 0.25s', boxShadow: '0 2px 10px rgba(34,197,94,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <Phone size={13} /> Réserver
          </a>
        </div>

        {/* ── BURGER MOBILE ── */}
        <button onClick={() => setOpen(!open)} className="nav-burger"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', color: transparent ? 'white' : '#D4A017' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── MENU MOBILE ── */}
      <div style={{ overflow: 'hidden', maxHeight: open ? '600px' : '0', opacity: open ? 1 : 0, transition: 'all 0.38s ease', background: 'rgba(20,12,4,0.98)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(212,160,23,0.15)' }}>
        <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
          {NAV.map(({ to, label }, i) => (
            <NavLink key={to} to={to}
              style={({ isActive }) => ({
                display: 'block', padding: '11px 14px', borderRadius: '10px', marginBottom: '4px',
                fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none',
                color: isActive ? '#D4A017' : 'rgba(255,255,255,0.8)',
                background: isActive ? 'rgba(212,160,23,0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid #D4A017' : '3px solid transparent',
                transition: 'all 0.2s',
                opacity: open ? 1 : 0,
                transform: open ? 'translateX(0)' : 'translateX(-16px)',
                transitionDelay: `${i * 0.04}s`,
              })}>
              {label}
            </NavLink>
          ))}
          <div style={{ borderTop: '1px solid rgba(212,160,23,0.15)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {nombreItems > 0 && (
              <Link to="/mon-circuit" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)', color: '#D4A017', padding: '11px 14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                <ShoppingCart size={15} /> Mon circuit ({nombreItems} activité{nombreItems > 1 ? 's' : ''})
              </Link>
            )}
            <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '13px', borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem' }}>
              <Phone size={16} /> Réserver sur WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .nav-actions { display: flex !important; }
          .nav-burger { display: none !important; }
        }
        @media (max-width: 1023px) {
          .nav-desktop { display: none !important; }
          .nav-actions { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </header>
  )
}