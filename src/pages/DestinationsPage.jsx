import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Phone, ShoppingCart, Plus, X, ChevronDown, MapPin, Star } from 'lucide-react'
import { usePanier } from '@/context/PanierContext'
import { ZONES_PANIER } from '@/lib/activites'
import useScrollReveal from '@/hooks/useScrollReveal'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

const ZONES_META = {
  'petite-cote': {
    pays: 'Région de Thiès & Fatick',
    description: 'La Petite Côte s\'étend sur 70 km au sud de Dakar. Plages de sable fin, villages de pêcheurs authentiques et sites naturels exceptionnels en font la destination balnéaire la plus prisée du Sénégal.',
    incontournables: ['Joal-Fadiouth — Île aux coquillages', 'Baobab sacré de Nianing', 'Port de pêche de Mbour', 'Safari Réserve de Bandia', 'Mangroves de Somone'],
  },
  'dakar': {
    pays: 'Capitale du Sénégal',
    description: 'Dakar est une métropole fascinante qui mêle modernité africaine et culture sénégalaise intense. Perchée à l\'extrémité ouest du continent africain, elle offre une énergie unique.',
    incontournables: ['Île de Gorée — Patrimoine UNESCO', 'Lac Rose aux eaux roses', 'Monument de la Renaissance', 'Marché Sandaga', 'Mosquée de la Divinité'],
  },
  'saloum': {
    pays: 'Région de Fatick — UNESCO',
    description: 'Le delta du Saloum est un écrin de nature préservée classé au patrimoine mondial de l\'UNESCO. Ce labyrinthe de bolongs, d\'îles et de mangroves abrite une faune exceptionnelle.',
    incontournables: ['Bolongs en pirogue', 'Village sérère de Mar Lodj', 'Île aux Oiseaux', 'Artiste Pierre sur sable', 'Déjeuner pieds dans l\'eau'],
  },
  'saint-louis': {
    pays: 'Région de Saint-Louis — UNESCO',
    description: 'Saint-Louis, première capitale de l\'Afrique occidentale française, est une île entre fleuve et mer d\'une beauté saisissante. Architecture coloniale, calèches et jazz.',
    incontournables: ['Île coloniale classée UNESCO', 'Pont Faidherbe (1897)', 'Parc des Oiseaux du Djoudj', 'Langue de Barbarie', 'Jazz de Saint-Louis'],
  },
  'casamance': {
    pays: 'Région de Ziguinchor',
    description: 'La Casamance est une région à part, séparée du Sénégal par la Gambie. Luxuriante et verdoyante, habitée par le peuple Diola, elle offre forêts, rizières et villages traditionnels.',
    incontournables: ['Cap Skirring — l\'une des plus belles plages d\'Afrique', 'Forêt de Cabrousse', 'Villages Diola traditionnels', 'Île Carabane', 'Rizières en terrasses'],
  },
  'oriental': {
    pays: 'Région de Kédougou & Tambacounda',
    description: 'Aux confins orientaux du Sénégal, une nature sauvage vous attend. Pays Bassari classé UNESCO, chutes de Dindefelo, Kédougou — un territoire d\'aventure absolue.',
    incontournables: ['Chutes de Dindefelo — 100m', 'Pays Bassari classé UNESCO', 'Kédougou — ville des orpailleurs', 'Parc Niokolo-Koba', 'Mont Assirik'],
  },
}

// ── Composant activité inline ───────────────────────────────
function ActiviteRow({ act, couleur }) {
  const { items, ajouterItem, supprimerItem } = usePanier()
  const dans = items.find(i => i.id === act.id)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.6rem 0.85rem', background: dans ? `${C.vert}0f` : 'white', borderRadius: '0.65rem', border: `1.5px solid ${dans ? C.vert : '#ede4d4'}`, transition: 'all 0.2s' }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{act.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '0.82rem', color: C.noirChaud, margin: 0, lineHeight: 1.3 }}>{act.nom}</p>
        <p style={{ color: act.surDevis ? C.or : C.vert, fontSize: '0.74rem', fontWeight: 700, margin: 0 }}>
          {act.surDevis ? 'Sur devis' : `${act.prix.toLocaleString('fr-FR')} CFA / pers`}
        </p>
      </div>
      <button onClick={() => dans ? supprimerItem(act.id) : ajouterItem({ ...act })}
        style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: dans ? '#fde8e8' : couleur, color: dans ? C.rouge : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        {dans ? <X size={12} /> : <Plus size={12} />}
      </button>
    </div>
  )
}

// ── Composant lieu ──────────────────────────────────────────
function LieuDropdown({ lieu, couleur }) {
  const [ouvert, setOuvert] = useState(false)
  const { items } = usePanier()
  const nb = items.filter(i => lieu.activites.some(a => a.id === i.id)).length

  return (
    <div style={{ borderRadius: '0.85rem', overflow: 'hidden', border: `1.5px solid ${ouvert ? couleur : '#ede4d4'}`, transition: 'all 0.25s', background: 'white' }}>
      <button onClick={() => setOuvert(!ouvert)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0.85rem 1rem', background: ouvert ? `${couleur}0a` : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
          <img src={lieu.image} alt={lieu.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{lieu.emoji}</span>
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: C.noirChaud }}>{lieu.nom}</span>
            {nb > 0 && <span style={{ background: C.vert, color: 'white', borderRadius: '9999px', padding: '1px 7px', fontSize: '0.62rem', fontWeight: 700 }}>{nb}</span>}
          </div>
          <p style={{ color: '#999', fontSize: '0.74rem', margin: 0, lineHeight: 1.4 }}>{lieu.description}</p>
        </div>
        <span style={{ color: couleur, transition: 'transform 0.25s', transform: ouvert ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }}>
          <ChevronDown size={16} />
        </span>
      </button>
      <div style={{ maxHeight: ouvert ? '800px' : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ padding: '0.5rem 0.85rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', background: '#fafaf7', borderTop: `1px solid ${couleur}18` }}>
          {lieu.activites.map(act => <ActiviteRow key={act.id} act={act} couleur={couleur} />)}
        </div>
      </div>
    </div>
  )
}

// ── Composant Zone (carte complète) ────────────────────────
function ZoneSection({ zone, index }) {
  const meta = ZONES_META[zone.id] || {}
  const { items } = usePanier()
  const nbTotal = items.filter(i => zone.lieux.some(l => l.activites.some(a => a.id === i.id))).length

  return (
    <div id={zone.id} className="reveal" style={{ scrollMarginTop: '90px', background: 'white', borderRadius: '1.75rem', overflow: 'hidden', boxShadow: '0 6px 32px rgba(28,18,8,0.09)', border: `1px solid rgba(28,18,8,0.06)`, marginBottom: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', minHeight: '420px' }}>

        {/* ── IMAGE GAUCHE ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={zone.image} alt={zone.nom}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            loading="lazy" />
          {/* Overlay bas */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: `linear-gradient(to top, ${zone.couleur}cc, transparent)` }} />
          {/* Barre top couleur */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: `linear-gradient(to right, ${zone.couleur}, transparent)` }} />
          {/* Badge activités choisies */}
          {nbTotal > 0 && (
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: C.vert, color: 'white', borderRadius: '9999px', padding: '5px 12px', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 2px 12px rgba(26,107,60,0.4)' }}>
              ✓ {nbTotal} ajouté{nbTotal > 1 ? 's' : ''}
            </div>
          )}
          {/* Emoji + Nom en bas de l'image */}
          <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '4px' }}>{zone.emoji}</div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{zone.nom}</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', margin: '3px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={11} /> {meta.pays}
            </p>
          </div>
        </div>

        {/* ── CONTENU DROITE ── */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', maxHeight: '520px' }}>

          {/* Description */}
          <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{meta.description}</p>

          {/* Incontournables */}
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.78rem', color: C.noirChaud, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Star size={12} color={zone.couleur} fill={zone.couleur} /> Incontournables
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {meta.incontournables?.map(item => (
                <span key={item} style={{ fontSize: '0.74rem', background: `${zone.couleur}12`, color: zone.couleur, padding: '3px 10px', borderRadius: '9999px', fontWeight: 600, border: `1px solid ${zone.couleur}25` }}>
                  {item.split(' — ')[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Séparateur */}
          <div style={{ height: '1px', background: `linear-gradient(to right, ${zone.couleur}30, transparent)` }} />

          {/* Activités — Lieux */}
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.78rem', color: C.noirChaud, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              🎯 Choisissez vos activités
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {zone.lieux.map(lieu => <LieuDropdown key={lieu.id} lieu={lieu} couleur={zone.couleur} />)}
            </div>
          </div>

          {/* Boutons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.5rem' }}>
            <Link to="/mon-circuit"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: zone.couleur, color: 'white', fontWeight: 600, padding: '10px 20px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <ShoppingCart size={14} /> Voir mon circuit
            </Link>
            <a href={`https://wa.me/+221788938254?text=Bonjour, je suis intéressé par : ${zone.nom}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', border: `1.5px solid ${zone.couleur}`, color: zone.couleur, fontWeight: 600, padding: '10px 20px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.25s', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = zone.couleur; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = zone.couleur }}>
              <Phone size={14} /> Demander un devis
            </a>
          </div>
        </div>
      </div>

      {/* ── VERSION MOBILE — empilé ── */}
      <style>{`
        @media (max-width: 768px) {
          #${zone.id} > div > div { grid-template-columns: 1fr !important; }
          #${zone.id} > div > div > div:first-child { height: 260px !important; }
          #${zone.id} > div > div > div:last-child { max-height: none !important; }
        }
      `}</style>
    </div>
  )
}

export default function DestinationsPage() {
  useScrollReveal()
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [hash])

  return (
    <div style={{ background: '#f5ede0', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #1a3a1a 100%)`, padding: '10rem 2rem 5rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />
        {/* Décors */}
        <div style={{ position: 'absolute', top: '20%', right: '4%', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '2%', width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.06)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
            <span style={{ color: C.or, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.28em', fontWeight: 600 }}>Découvrez le Sénégal</span>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Nos <span style={{ color: C.or }}>6 Destinations</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.72)', marginBottom: '2.5rem' }}>
            Explorez, choisissez vos activités et composez votre circuit idéal
          </p>

          {/* Navigation rapide — pilules */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {ZONES_PANIER.map(zone => (
              <a key={zone.id} href={`#${zone.id}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', padding: '7px 15px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500, transition: 'all 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.background = zone.couleur; e.currentTarget.style.borderColor = zone.couleur; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}>
                <span>{zone.emoji}</span> {zone.nom}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── ZONES ── */}
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={13} color={C.or} />
          Cliquez sur un lieu pour voir et choisir vos activités — elles s'ajoutent à votre circuit
        </p>
        {ZONES_PANIER.map((zone, i) => <ZoneSection key={zone.id} zone={zone} index={i} />)}
      </div>

      {/* ── CTA ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #1a3a1a)`, padding: '5rem 1.5rem', textAlign: 'center', borderTop: `3px solid ${C.or}` }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>Vous avez choisi vos activités ?</p>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: '2rem', lineHeight: 1.2 }}>
          Soumettez votre circuit <span style={{ color: C.or }}>sur WhatsApp</span>
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/mon-circuit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '14px 30px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <ShoppingCart size={18} /> Voir mon circuit
          </Link>
          <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '14px 30px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <Phone size={18} /> Je m'en remets à vous
          </a>
        </div>
      </div>
    </div>
  )
}