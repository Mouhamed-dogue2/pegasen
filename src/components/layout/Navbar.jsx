import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/circuits', label: 'Circuits & Forfaits' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/brochures', label: 'Brochures' },
  { to: '/solidarite', label: 'Solidarité' },
  { to: '/vlog', label: 'Vlog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  const transparent = isHome && !scrolled

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: transparent ? 'transparent' : 'rgba(28,18,8,0.96)',
      backdropFilter: transparent ? 'none' : 'blur(16px)',
      borderBottom: transparent ? 'none' : '1px solid rgba(212,160,23,0.2)',
      transition: 'all 0.45s ease',
      boxShadow: transparent ? 'none' : '0 4px 30px rgba(0,0,0,0.3)',
    }}>
      {/* Barre tricolore */}
      {!transparent && (
        <div style={{ height: '3px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />
      )}

      <nav style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo avec image PNG */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', transition: 'transform 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <img
            src="/images/logo/pegasen-logo.png"
            alt="PEGASEN221 Logo"
            style={{ width: '44px', height: '44px', objectFit: 'contain', filter: transparent ? 'none' : 'none', transition: 'all 0.3s' }}
          />
          <div style={{ lineHeight: 1 }}>
            <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '1.1rem', color: transparent ? 'white' : '#F0C040', margin: 0, lineHeight: 1.1 }}>
              PÉGA<span style={{ color: '#D4A017' }}>SEN</span><span style={{ fontSize: '0.88em' }}>221</span>
            </p>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.7rem', color: transparent ? 'rgba(255,255,255,0.65)' : 'rgba(212,160,23,0.65)', margin: 0 }}>
              Excursions
            </p>
          </div>
        </Link>

        {/* Liens desktop */}
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '2px', alignItems: 'center' }} className="nav-desktop">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'}
                style={({ isActive }) => ({
                  display: 'block', padding: '8px 11px', borderRadius: '8px',
                  fontSize: '0.84rem', fontWeight: 500, textDecoration: 'none',
                  transition: 'all 0.2s',
                  color: isActive ? '#D4A017' : transparent ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.75)',
                  background: isActive ? 'rgba(212,160,23,0.15)' : 'transparent',
                  borderBottom: isActive ? '2px solid #D4A017' : '2px solid transparent',
                })}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
          className="nav-cta"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#22c55e', color: 'white', fontSize: '0.84rem', fontWeight: 700, padding: '9px 18px', borderRadius: '9999px', textDecoration: 'none', transition: 'all 0.25s', boxShadow: '0 2px 12px rgba(34,197,94,0.4)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(34,197,94,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(34,197,94,0.4)' }}>
          <Phone size={14} /> Réserver
        </a>

        {/* Burger */}
        <button onClick={() => setIsOpen(!isOpen)} className="nav-burger"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: transparent ? 'white' : '#D4A017', transition: 'transform 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Menu mobile */}
      <div style={{ overflow: 'hidden', maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0, transition: 'all 0.4s ease', background: 'rgba(28,18,8,0.98)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(212,160,23,0.2)' }}>
        <ul style={{ listStyle: 'none', padding: '1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navLinks.map(({ to, label }, i) => (
            <li key={to} style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.3s ease ${i * 0.05}s` }}>
              <NavLink to={to} end={to === '/'}
                style={({ isActive }) => ({
                  display: 'block', padding: '12px 16px', borderRadius: '10px',
                  fontSize: '1rem', fontWeight: 500, textDecoration: 'none',
                  color: isActive ? '#D4A017' : 'rgba(255,255,255,0.82)',
                  background: isActive ? 'rgba(212,160,23,0.12)' : 'transparent',
                  transition: 'all 0.2s',
                  borderLeft: isActive ? '3px solid #D4A017' : '3px solid transparent',
                })}>
                {label}
              </NavLink>
            </li>
          ))}
          <li style={{ paddingTop: '8px', borderTop: '1px solid rgba(212,160,23,0.2)', marginTop: '8px' }}>
            <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '13px', borderRadius: '12px', textDecoration: 'none' }}>
              <Phone size={16} /> Réserver sur WhatsApp
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .nav-cta { display: inline-flex !important; }
          .nav-burger { display: none !important; }
        }
        @media (max-width: 1023px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </header>
  )
}