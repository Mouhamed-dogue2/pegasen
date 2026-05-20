import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, MapPin, Star, Users, Shield, Compass, ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import useScrollReveal from '@/hooks/useScrollReveal'
import LogoBackground from '@/components/ui/LogoBackground'

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

// ── HERO avec logo animé ───────────────────────────────────
function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
    const t = setInterval(() => go((current + 1) % HERO_SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [current])

  function go(next) {
    setFading(true)
    setTimeout(() => { setCurrent(next); setFading(false) }, 600)
  }

  const s = HERO_SLIDES[current]

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '650px', overflow: 'hidden' }}>

      {/* Image de fond */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${s.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.06)' : 'scale(1)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }} />

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(28,18,8,0.82) 0%, rgba(28,18,8,0.35) 50%, rgba(28,18,8,0.65) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,18,8,0.9) 0%, transparent 50%)' }} />

      {/* ── LOGO CHEVAL AILÉ EN BACKGROUND ── */}
      <LogoBackground opacity={0.09} />

      {/* Bande tricolore gauche */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: `linear-gradient(to bottom, ${C.vert}, ${C.or}, ${C.rouge})`, zIndex: 5 }} />

      {/* Particules décoratives */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${6 + i * 3}px`, height: `${6 + i * 3}px`,
          borderRadius: '50%',
          background: i % 2 === 0 ? `rgba(212,160,23,0.4)` : `rgba(26,107,60,0.3)`,
          left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%`,
          animation: `float ${5 + i}s ease-in-out ${i * 0.8}s infinite`,
          zIndex: 3,
        }} />
      ))}

      {/* Contenu principal */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1.5rem' }}>

        {/* Ligne décorative */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.2s' }}>
          <div style={{ height: '1px', width: '50px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
          <span style={{ color: C.orClair, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 600 }}>Sénégal • Excursions • Découverte</span>
          <div style={{ height: '1px', width: '50px', background: `linear-gradient(to left, transparent, ${C.or})` }} />
        </div>

        {/* Titre principal */}
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          lineHeight: 1.0,
          fontWeight: 700,
          color: 'white',
          textShadow: '0 4px 40px rgba(0,0,0,0.5)',
          marginBottom: '0.6rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s ease 0.35s',
        }}>
          Bienvenue chez<br />
          <span style={{ color: C.or, filter: 'drop-shadow(0 0 25px rgba(212,160,23,0.6))' }}>Pégasen</span>
          <span style={{ color: C.orClair }}>221</span>
        </h1>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.88)',
          marginBottom: '0.6rem',
          opacity: loaded ? 1 : 0,
          transition: 'all 0.9s ease 0.5s',
        }}>
          où vos vacances de rêve deviennent réalité.
        </p>

        <p style={{ color: C.orClair, fontSize: '0.88rem', marginBottom: '2.8rem', letterSpacing: '0.05em', opacity: loaded ? 0.85 : 0, transition: 'all 0.9s ease 0.65s' }}>
          📍 {s.lieu} — {s.sous}
        </p>

        {/* 2 CHOIX CLIENTS */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3rem',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.9s ease 0.75s',
        }}>
          <Link to="/destinations"
            style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.35)', color: 'white', padding: '16px 26px', borderRadius: '20px', textDecoration: 'none', transition: 'all 0.35s', minWidth: '270px' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
            <span style={{ fontSize: '2rem' }}>👍</span>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>Je connais le Sénégal</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', margin: 0 }}>Je compose mon propre circuit</p>
            </div>
            <ArrowRight size={18} style={{ marginLeft: 'auto', opacity: 0.7 }} />
          </Link>

          <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '14px', background: `rgba(212,160,23,0.88)`, backdropFilter: 'blur(14px)', border: `1px solid ${C.or}`, color: 'white', padding: '16px 26px', borderRadius: '20px', textDecoration: 'none', transition: 'all 0.35s', minWidth: '270px' }}
            onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(212,160,23,0.5)` }}
            onMouseLeave={e => { e.currentTarget.style.background = `rgba(212,160,23,0.88)`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
            <span style={{ fontSize: '2rem' }}>😀</span>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>Je m'en remets à vous</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: 0 }}>Formulaire personnalisé → WhatsApp</p>
            </div>
            <ArrowRight size={18} style={{ marginLeft: 'auto' }} />
          </a>
        </div>

        <a href="#destinations" style={{ color: 'rgba(255,255,255,0.5)', animation: 'bounce-soft 2.5s ease-in-out infinite' }}>
          <ChevronDown size={34} />
        </a>
      </div>

      {/* Contrôles diaporama */}
      {[{ side: 'left', fn: () => go((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), icon: <ChevronLeft size={22} /> },
        { side: 'right', fn: () => go((current + 1) % HERO_SLIDES.length), icon: <ChevronRight size={22} /> }].map(({ side, fn, icon }) => (
        <button key={side} onClick={fn} style={{ position: 'absolute', [side]: '1.25rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '46px', height: '46px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'all 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}>
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
      // Kia Carnival / minivan confortable
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
      <PourquoiNousSection />
      <CtaSection />
    </>
  )
}