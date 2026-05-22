import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, MapPin, Star, Users, Shield, Compass, ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import useScrollReveal from '@/hooks/useScrollReveal'

const C = {
  or: '#D4A017', orClair: '#F0C040',
  vert: '#1A6B3C', rouge: '#C0392B',
  noirChaud: '#1C1208', sable: '#FDF3E3',
}

const HERO_SLIDES = [
  { image: 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=1600&q=85', titre: 'Petite Côte', lieu: 'Nianing, Sénégal', sous: 'Plages dorées de l\'Atlantique' },
  { image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=85', titre: 'Savane & Safari', lieu: 'Réserve de Bandia', sous: 'Girafes, lions, rhinocéros' },
  { image: 'https://images.unsplash.com/photo-1574068468398-5e4b5aa61b29?w=1600&q=85', titre: 'Delta du Saloum', lieu: 'Sine Saloum', sous: 'Bolongs, pirogues & mangroves' },
  { image: 'https://images.unsplash.com/photo-1559521783-1d1599583485?w=1600&q=85', titre: 'Lac Rose', lieu: 'Lac Retba, Dakar', sous: 'Eaux roses & extraction de sel' },
]

const ZONES = [
  { id: 'petite-cote', nom: 'Petite Côte', accroche: 'Plages, villages de pêcheurs & réserves', image: '/images/destinations/petite-cote.jpg', couleur: C.vert },
  { id: 'dakar', nom: 'Dakar', accroche: 'La capitale vibrante du Sénégal', image: '/images/destinations/dakar.jpg', couleur: C.rouge },
  { id: 'saloum', nom: 'Sine Saloum', accroche: 'Delta enchanteur, bolongs & UNESCO', image: '/images/destinations/saloum.jpg', couleur: C.vert },
  { id: 'saint-louis', nom: 'Saint-Louis', accroche: 'Île coloniale classée UNESCO', image: '/images/destinations/saint-louis.jpg', couleur: C.or },
  { id: 'casamance', nom: 'Casamance', accroche: 'Le Sénégal vert & mystérieux', image: '/images/destinations/casamance.jpg', couleur: '#2E7D32' },
  { id: 'oriental', nom: 'Sénégal Oriental', accroche: 'Savane sauvage & Kédougou', image: '/images/destinations/senegal-oriental.jpg', couleur: '#8B4513' },
]

const EXCURSIONS = [
  { nom: 'Safari Réserve de Bandia', duree: 'Journée', prix: 'Dès 25 000 CFA', image: '/images/excursions/bandia.jpg', badge: '🦁 Populaire', badgeColor: C.rouge },
  { nom: 'Île aux Coquillages – Joal-Fadiouth', duree: 'Demi-journée', prix: 'Dès 13 000 CFA', image: '/images/excursions/joal-fadiouth.jpg', badge: '🐚 Incontournable', badgeColor: '#8B6914' },
  { nom: 'Lac Rose & Quad', duree: 'Journée complète', prix: 'Dès 66 000 CFA', image: '/images/excursions/lac-rose.jpg', badge: '🏜️ Aventure', badgeColor: '#8B6914' },
  { nom: 'Delta du Saloum en Pirogue', duree: 'Journée', prix: 'Dès 25 000 CFA', image: '/images/excursions/saloum-excursion.jpg', badge: '🦅 Nature', badgeColor: C.vert },
]

const STATS = [
  { valeur: '6', label: 'Zones touristiques', emoji: '🗺️' },
  { valeur: '100%', label: 'Clients satisfaits', emoji: '⭐' },
  { valeur: '11', label: 'Places confort', emoji: '🚐' },
  { valeur: '24h', label: 'Réponse garantie', emoji: '⚡' },
]

// ── HERO REDESIGNÉ ────────────────────────────────────────
function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [textAnim, setTextAnim] = useState(0)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 120)
    const t = setInterval(() => go((current + 1) % HERO_SLIDES.length), 6500)
    return () => clearInterval(t)
  }, [current])

  // Anime les lettres du titre une par une
  useEffect(() => {
    const letters = ['B','i','e','n','v','e','n','u','e']
    let i = 0
    const t = setInterval(() => {
      if (i < letters.length) { setTextAnim(i + 1); i++ }
      else clearInterval(t)
    }, 80)
    return () => clearInterval(t)
  }, [])

  function go(next) {
    setFading(true)
    setTimeout(() => { setCurrent(next); setFading(false) }, 700)
  }

  const s = HERO_SLIDES[current]

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '680px', overflow: 'hidden' }}>

      {/* ── IMAGES DIAPORAMA ── */}
      {HERO_SLIDES.map((slide, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: i === current ? (fading ? 0 : 1) : 0,
          transform: i === current ? (fading ? 'scale(1.06)' : 'scale(1)') : 'scale(1.02)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }} />
      ))}

      {/* ── OVERLAYS MULTICOUCHES ── */}
      {/* Gradient principal */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,6,0,0.88) 0%, rgba(10,6,0,0.45) 55%, rgba(10,6,0,0.65) 100%)' }} />
      {/* Gradient bas */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,6,0,0.95) 0%, transparent 45%)' }} />
      {/* Vignette haut */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,6,0,0.5) 0%, transparent 25%)' }} />

      {/* ── DÉCORS GÉOMÉTRIQUES ── */}
      {/* Cercles décoratifs */}
      <div style={{ position: 'absolute', top: '8%', right: '6%', width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.12)', zIndex: 2, animation: 'rotateSlow 30s linear infinite' }} />
      <div style={{ position: 'absolute', top: '12%', right: '10%', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.18)', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: '18%', right: '14%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(212,160,23,0.06)', zIndex: 2, animation: 'float 7s ease-in-out infinite' }} />

      {/* Ligne décorative gauche */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(to bottom, ${C.vert} 0%, ${C.or} 50%, ${C.rouge} 100%)`, zIndex: 5 }} />

      {/* Losange décoratif droite */}
      <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '60px', height: '60px', border: `2px solid rgba(212,160,23,0.3)`, transform: 'rotate(45deg)', zIndex: 2, animation: 'float 8s ease-in-out 1s infinite' }} />

      {/* Petites étoiles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', zIndex: 2,
          width: '3px', height: '3px', borderRadius: '50%',
          background: i % 3 === 0 ? C.or : i % 3 === 1 ? C.vert : 'white',
          left: `${8 + i * 11}%`, top: `${12 + (i % 4) * 18}%`,
          opacity: 0.6,
          animation: `float ${4 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
        }} />
      ))}

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        height: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5vw',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>

        {/* Badge destination actuelle */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '9999px', padding: '7px 16px',
          marginBottom: '1.5rem', width: 'fit-content',
          opacity: loaded ? 1 : 0,
          transition: 'all 0.7s ease 0.1s',
        }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.or, animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em' }}>
            📍 {s.lieu} — {s.sous}
          </span>
        </div>

        {/* Ligne déco */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '1.25rem',
          opacity: loaded ? 1 : 0, transition: 'all 0.7s ease 0.25s',
        }}>
          <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
          <span style={{ color: C.or, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 600 }}>
            Sénégal · Excursions · Authenticité
          </span>
        </div>

        {/* TITRE PRINCIPAL */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s ease 0.35s',
          marginBottom: '1.25rem',
        }}>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 0.2rem',
            letterSpacing: '0.05em',
          }}>
            Bienvenue chez
          </p>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
            lineHeight: 0.92,
            fontWeight: 900,
            margin: '0 0 0.3rem',
            letterSpacing: '-0.02em',
          }}>
            <span style={{
              color: 'white',
              textShadow: '0 2px 0 rgba(0,0,0,0.3)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            }}>Péga</span>
            <span style={{
              color: C.or,
              filter: 'drop-shadow(0 0 30px rgba(212,160,23,0.7))',
              WebkitTextStroke: '0px',
            }}>sen</span>
            <span style={{
              color: C.orClair,
              fontSize: '0.75em',
              filter: 'drop-shadow(0 0 20px rgba(240,192,64,0.5))',
            }}>221</span>
          </h1>
          {/* Ligne sous le titre */}
          <div style={{
            height: '3px',
            width: loaded ? 'min(400px, 80%)' : '0px',
            background: `linear-gradient(to right, ${C.or}, ${C.vert}, transparent)`,
            borderRadius: '9999px',
            transition: 'width 1.2s ease 0.8s',
            marginTop: '0.6rem',
          }} />
        </div>

        {/* Sous-titre */}
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1.15rem, 2.8vw, 1.55rem)',
          color: 'rgba(255,255,255,0.82)',
          marginBottom: '3rem',
          maxWidth: '560px',
          lineHeight: 1.5,
          opacity: loaded ? 1 : 0,
          transition: 'all 0.9s ease 0.6s',
        }}>
          où vos vacances de rêve deviennent réalité.
        </p>

        {/* 2 CHOIX CLIENTS */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          marginBottom: '4rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.9s ease 0.8s',
        }}>
          <Link to="/mon-circuit"
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.28)',
              color: 'white', padding: '16px 26px',
              borderRadius: '16px', textDecoration: 'none',
              transition: 'all 0.35s',
              minWidth: '260px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.boxShadow = 'none' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>👍</div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 2px' }}>Je connais le Sénégal</p>
              <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.78rem', margin: 0 }}>Je compose mon propre circuit</p>
            </div>
            <ArrowRight size={17} style={{ opacity: 0.6, flexShrink: 0 }} />
          </Link>

          <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              background: `linear-gradient(135deg, rgba(212,160,23,0.82), rgba(180,130,15,0.9))`,
              backdropFilter: 'blur(16px)',
              border: `1px solid rgba(212,160,23,0.5)`,
              color: 'white', padding: '16px 26px',
              borderRadius: '16px', textDecoration: 'none',
              transition: 'all 0.35s',
              minWidth: '260px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${C.or}, #c4920f)`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(212,160,23,0.45)` }}
            onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, rgba(212,160,23,0.82), rgba(180,130,15,0.9))`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>😀</div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 2px' }}>Je m'en remets à vous</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', margin: 0 }}>Formulaire → WhatsApp</p>
            </div>
            <ArrowRight size={17} style={{ flexShrink: 0 }} />
          </a>
        </div>

        {/* Scroll indicator */}
        <a href="#destinations" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', textDecoration: 'none', width: 'fit-content' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Défiler</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ height: '1px', background: C.or, borderRadius: '9999px', opacity: 1 - i * 0.3, width: `${28 - i * 6}px`, animation: `fadeIn 1s ease ${i * 0.2}s infinite alternate` }} />
            ))}
          </div>
        </a>
      </div>

      {/* ── SLIDE INFO DROITE ── */}
      <div style={{ position: 'absolute', bottom: '3rem', right: '2rem', zIndex: 10, textAlign: 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 2px' }}>Destination</p>
        <p style={{ color: C.orClair, fontWeight: 700, fontSize: '0.95rem', margin: 0, fontFamily: '"Playfair Display", serif' }}>{s.titre}</p>
        {/* Compteur slides */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', marginTop: '8px' }}>
          <span style={{ color: C.or, fontWeight: 700, fontSize: '1rem', fontFamily: '"Playfair Display", serif' }}>
            {String(current + 1).padStart(2, '0')}
          </span>
          <div style={{ height: '1px', width: '24px', background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>
            {String(HERO_SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── CONTRÔLES DIAPORAMA ── */}
      {[
        { side: 'left', fn: () => go((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), icon: <ChevronLeft size={20} /> },
        { side: 'right', fn: () => go((current + 1) % HERO_SLIDES.length), icon: <ChevronRight size={20} /> },
      ].map(({ side, fn, icon }) => (
        <button key={side} onClick={fn} style={{
          position: 'absolute', [side]: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: '44px', height: '44px',
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', cursor: 'pointer', transition: 'all 0.25s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.borderColor = C.or; e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}>
          {icon}
        </button>
      ))}

      {/* Indicateurs */}
      <div style={{ position: 'absolute', bottom: '5.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '8px', alignItems: 'center' }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ height: '6px', width: i === current ? '32px' : '6px', borderRadius: '9999px', background: i === current ? C.or : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.4s ease' }} />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: '3.5rem', right: '1.5rem', zIndex: 10, textAlign: 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>Destination</p>
        <p style={{ color: C.orClair, fontWeight: 700, fontSize: '0.95rem', margin: 0, fontFamily: '"Playfair Display", serif' }}>{s.titre}</p>
      </div>
    </section>
  )
}

// ── STATS ─────────────────────────────────────────────────
function StatsSection() {
  return (
    <section style={{ background: `linear-gradient(135deg, ${C.noirChaud} 0%, #2a1000 100%)`, padding: '3.5rem 1.5rem', borderTop: `3px solid ${C.or}` }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {STATS.map(({ valeur, label, emoji }, i) => (
          <div key={label} className="reveal" style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRight: i < STATS.length - 1 ? '1px solid rgba(212,160,23,0.15)' : 'none', animationDelay: `${i * 0.1}s` }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{emoji}</div>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', fontWeight: 700, color: C.orClair, margin: '0 0 4px', lineHeight: 1 }}>{valeur}</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── DESTINATIONS ──────────────────────────────────────────
function DestinationsSection() {
  return (
    <section id="destinations" style={{ padding: '6rem 1.5rem', background: C.sable }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="badge-label" style={{ color: C.vert, justifyContent: 'center', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, display: 'flex' }}>Explorez le Sénégal</p>
          <h2 className="section-title">Nos 6 Destinations</h2>
          <p className="section-subtitle">6 zones d'exception au cœur du Sénégal</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {ZONES.map((zone, i) => (
            <Link key={zone.id} to={`/destinations#${zone.id}`}
              className={`reveal img-zoom-wrap ${i % 2 === 0 ? '' : ''}`}
              style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '16/10', display: 'block', textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.18)', animationDelay: `${i * 0.1}s` }}
              onMouseEnter={e => { e.currentTarget.querySelector('.zone-overlay').style.opacity = '1'; e.currentTarget.querySelector('.zone-arrow').style.opacity = '1'; e.currentTarget.querySelector('.zone-arrow').style.transform = 'translateY(0)' }}
              onMouseLeave={e => { e.currentTarget.querySelector('.zone-overlay').style.opacity = '0'; e.currentTarget.querySelector('.zone-arrow').style.opacity = '0'; e.currentTarget.querySelector('.zone-arrow').style.transform = 'translateY(8px)' }}>
              <img src={zone.image} alt={zone.nom} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} loading="lazy" />
              {/* Gradient permanent */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
              {/* Overlay hover */}
              <div className="zone-overlay" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${zone.couleur}cc 0%, transparent 60%)`, opacity: 0, transition: 'opacity 0.4s' }} />
              {/* Barre couleur */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${zone.couleur}, transparent)` }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: '0 0 4px', textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>{zone.nom}</h3>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem', margin: '0 0 10px' }}>{zone.accroche}</p>
                <div className="zone-arrow" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: C.orClair, fontSize: '0.82rem', fontWeight: 700, opacity: 0, transform: 'translateY(8px)', transition: 'all 0.3s' }}>
                  Découvrir <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/destinations" className="btn-secondary">Voir toutes les destinations <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

// ── EXCURSIONS ────────────────────────────────────────────
function ExcursionsSection() {
  return (
    <section style={{ padding: '6rem 1.5rem', background: 'white' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="badge-label" style={{ color: C.rouge, justifyContent: 'center', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, display: 'flex' }}>Nos circuits</p>
          <h2 className="section-title">Excursions Phares</h2>
          <p className="section-subtitle">Des expériences inoubliables, soigneusement préparées</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))', gap: '1.5rem' }}>
          {EXCURSIONS.map((exc, i) => (
            <div key={exc.nom} className="card reveal img-zoom-wrap" style={{ animationDelay: `${i * 0.12}s` }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '210px' }}>
                <img src={exc.image} alt={exc.nom} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.55s ease' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)' }} />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: exc.badgeColor, color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '5px 12px', borderRadius: '9999px' }}>{exc.badge}</span>
              </div>
              <div style={{ padding: '1.35rem' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', fontWeight: 700, color: C.noirChaud, marginBottom: '0.75rem', lineHeight: 1.35 }}>{exc.nom}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(212,160,23,0.15)' }}>
                  <span style={{ color: '#999', fontSize: '0.82rem' }}>⏱ {exc.duree}</span>
                  <span style={{ color: C.vert, fontWeight: 700, fontSize: '0.95rem' }}>{exc.prix}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/circuits" className="btn-primary">Voir tous les circuits <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

// ── VÉHICULE ──────────────────────────────────────────────
function VehiculeSection() {
  const caracteristiques = [
    {
      // Minibus 11 places
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=85',
      titre: '11 places climatisées',
      desc: 'Kia Carnival spacieux, sièges confortables, climatisation puissante pour tous.',
      emoji: '🚐',
      couleur: C.vert,
    },
    {
      // Bouteilles d'eau fraîche
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=85',
      titre: 'Eau fraîche à bord',
      desc: 'Bouteilles d\'eau fraîche offertes à bord pour chaque excursion.',
      emoji: '💧',
      couleur: '#0E7496',
    },
    {
      // Souvenirs artisanaux africains
      image: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=600&q=85',
      titre: 'Souvenirs offerts',
      desc: 'Des souvenirs artisanaux sénégalais offerts à nos passagers.',
      emoji: '🎁',
      couleur: C.rouge,
    },
    {
      // Passagers dans un bus / groupe
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=85',
      titre: 'Formule Bokkalé',
      desc: 'Réservez une place individuelle et partagez les frais avec d\'autres voyageurs.',
      emoji: '🎟️',
      couleur: C.or,
    },
    {
      // Petite voiture SUV
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=85',
      titre: 'Petits véhicules',
      desc: 'Véhicules confortables disponibles pour les groupes de 1 à 5 personnes.',
      emoji: '🚗',
      couleur: '#7A5016',
    },
  ]

  return (
    <section style={{ padding: '6rem 1.5rem', background: 'white', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Titre */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="badge-label" style={{ color: C.or, justifyContent: 'center', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, display: 'flex' }}>Notre flotte</p>
          <h2 className="section-title">
            Le confort au cœur<br />
            <span style={{ color: C.or }}>de chaque voyage</span>
          </h2>
          <p className="section-subtitle">
            Voyagez à bord de notre Kia Carnival 11 places, climatisée, avec eau fraîche et souvenirs à bord.
          </p>
        </div>

        {/* Grille 5 cartes lumineuses */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {caracteristiques.map((item, i) => (
            <div key={item.titre} className="reveal"
              style={{
                borderRadius: '1.25rem', overflow: 'hidden',
                background: 'white',
                boxShadow: '0 6px 24px rgba(0,0,0,0.10)',
                border: `2px solid ${item.couleur}25`,
                transition: 'all 0.35s ease',
                animationDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.15)`
                e.currentTarget.style.border = `2px solid ${item.couleur}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.10)'
                e.currentTarget.style.border = `2px solid ${item.couleur}25`
              }}>

              {/* Image avec overlay coloré */}
              <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.titre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  loading="lazy"
                />
                {/* Overlay dégradé coloré */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${item.couleur}dd 0%, ${item.couleur}44 40%, transparent 70%)` }} />
                {/* Emoji en bas */}
                <div style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '2rem' }}>{item.emoji}</div>
                {/* Numéro */}
                <div style={{ position: 'absolute', top: '10px', right: '12px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', color: item.couleur }}>
                  {i + 1}
                </div>
              </div>

              {/* Texte clair sur fond blanc */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
                  <span style={{ color: item.couleur, fontSize: '1rem', fontWeight: 900 }}>✦</span>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.95rem', fontWeight: 700, color: C.noirChaud, margin: 0, lineHeight: 1.3 }}>{item.titre}</h3>
                </div>
                <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>

              {/* Barre couleur en bas */}
              <div style={{ height: '4px', background: `linear-gradient(to right, ${item.couleur}, ${item.couleur}44)` }} />
            </div>
          ))}
        </div>

        {/* Bouton centré */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <Link to="/circuits" className="btn-primary">
            Voir nos formules <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── SECTION VIDÉO ─────────────────────────────────────────
function VideoSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', height: '520px' }}>

      {/* Vidéo en background — corrections mobile */}
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          // Cache le bouton play sur tous les navigateurs
          pointerEvents: 'none',
        }}>
        <source src="/videos/deploreailes.mp4" type="video/mp4" />
      </video>

      {/* CSS pour cacher les contrôles natifs webkit/iOS */}
      <style>{`
        section video::-webkit-media-controls { display:none!important; }
        section video::-webkit-media-controls-enclosure { display:none!important; }
        section video::-webkit-media-controls-panel { display:none!important; }
        section video::-webkit-media-controls-play-button { display:none!important; }
        section video::-webkit-media-controls-start-playback-button { display:none!important; }
        section video::-webkit-media-controls-overlay-play-button { display:none!important; }
      `}</style>

      {/* Overlay dégradé */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(28,18,8,0.82) 0%, rgba(26,107,60,0.45) 50%, rgba(28,18,8,0.82) 100%)',
      }} />

      {/* Bande tricolore haut */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />
      {/* Bande tricolore bas */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #C0392B, #D4A017, #1A6B3C)' }} />

      {/* Contenu centré */}
      <div className="reveal" style={{
        position: 'relative', zIndex: 10,
        height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 1.5rem',
      }}>
        {/* Logo animé par-dessus */}
        <img
          src="/images/logo/pegasen-logo.png"
          alt="PEGASEN221"
          style={{
            width: 'min(35vw, 160px)',
            height: 'auto',
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 0 25px rgba(212,160,23,0.85))',
            animation: 'float 5s ease-in-out infinite',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
          <span style={{ color: '#F0C040', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 600 }}>
            L'esprit PEGASEN221
          </span>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
        </div>

        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'white', lineHeight: 1.1,
          marginBottom: '1rem',
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
        }}>
          Le Sénégal s'ouvre<br />
          <span style={{ color: '#D4A017' }}>devant vous</span>
        </h2>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: 'rgba(255,255,255,0.82)',
          maxWidth: '520px',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          Comme le cheval ailé déploie ses ailes, laissez-vous porter vers des horizons nouveaux.
        </p>

        <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(212,160,23,0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212,160,23,0.6)',
            color: 'white', fontWeight: 700,
            padding: '14px 32px', borderRadius: '9999px',
            textDecoration: 'none', fontSize: '1rem',
            transition: 'all 0.3s',
            boxShadow: '0 4px 20px rgba(212,160,23,0.4)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#D4A017'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,160,23,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,160,23,0.9)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,160,23,0.4)' }}>
          ✈️ Planifier mon voyage
        </a>
      </div>
    </section>
  )
}

// ── POURQUOI NOUS ─────────────────────────────────────────
function PourquoiNousSection() {
  const raisons = [
    { icon: '🧭', titre: 'Expertise locale', texte: 'Des guides passionnés qui connaissent chaque recoin du Sénégal.', couleur: C.vert },
    { icon: '🛡️', titre: 'Tout inclus disponible', texte: 'Transport, guides, entrées, pirogues, repas. Vous ne payez rien sur place.', couleur: C.or },
    { icon: '💚', titre: 'Tourisme responsable', texte: 'Excursions solidaires, plantation d\'arbres, respect des communautés.', couleur: '#2E7D32' },
    { icon: '⚡', titre: 'Réponse en 24h', texte: 'Devis personnalisé sous 24h. Paiement Wave, Orange Money ou virement.', couleur: C.rouge },
  ]
  return (
    <section style={{ padding: '6rem 1.5rem', background: C.sable }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="badge-label" style={{ color: C.or, justifyContent: 'center', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, display: 'flex' }}>Notre différence</p>
          <h2 className="section-title">Pourquoi nous choisir ?</h2>
          <p className="section-subtitle">L'excellence au service de votre découverte</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {raisons.map(({ icon, titre, texte, couleur }, i) => (
            <div key={titre} className="reveal" style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem 1.5rem', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', borderTop: `4px solid ${couleur}`, transition: 'all 0.35s', animationDelay: `${i * 0.1}s` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.14)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: `float ${5 + i}s ease-in-out ${i * 0.5}s infinite` }}>{icon}</div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', fontWeight: 700, color: C.noirChaud, marginBottom: '0.75rem' }}>{titre}</h3>
              <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA FINAL ─────────────────────────────────────────────
function CtaSection() {
  return (
    <section style={{ position: 'relative', padding: '8rem 1.5rem', overflow: 'hidden', backgroundImage: 'url(https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Logo en background */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(28,18,8,0.88) 0%, rgba(26,107,60,0.65) 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <img src="/images/logo/pegasen-logo.png" alt="" aria-hidden style={{ width: 'min(70vw, 600px)', opacity: 0.06, filter: 'brightness(0) invert(1)', animation: 'wingPulse 6s ease-in-out infinite' }} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <div className="reveal">
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>Prêt pour l'aventure ?</p>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, color: 'white', marginBottom: '1.5rem' }}>
            Votre voyage de rêve<br /><span style={{ color: C.or }}>commence ici</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '3rem', maxWidth: '480px', margin: '0 auto 3rem', fontSize: '1rem', lineHeight: 1.7 }}>
            Contactez-nous sur WhatsApp pour un devis personnalisé. Nous répondons sous 24 heures.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-glow">
              <Phone size={20} /> Réserver sur WhatsApp
            </a>
            <Link to="/circuits" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              <Compass size={20} /> Voir les circuits
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────
export default function HomePage() {
  useScrollReveal()

  return (
    <>
      <HeroSection />
      <StatsSection />
      <DestinationsSection />
      <ExcursionsSection />
      <VehiculeSection />
      <VideoSection />
      <PourquoiNousSection />
      <CtaSection />
    </>
  )
}