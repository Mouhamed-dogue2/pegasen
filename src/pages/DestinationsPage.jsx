import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Phone, ShoppingCart, Plus, X, ChevronDown, MapPin, Star } from 'lucide-react'
import { usePanier } from '@/context/PanierContext'
import { ZONES_PANIER } from '@/lib/activites'
import useScrollReveal from '@/hooks/useScrollReveal'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

const ZONES_META = {
  'petite-cote': { pays: 'Région de Thiès & Fatick', description: 'La Petite Côte s\'étend sur 70 km au sud de Dakar. Plages de sable fin, villages de pêcheurs authentiques, réserve animalière de Bandia et sites naturels font de cette région la destination balnéaire la plus prisée du Sénégal.', incontournables: ['Joal-Fadiouth', 'Baobab sacré de Nianing', 'Port de Mbour', 'Safari Bandia', 'Mangroves de Somone'] },
  'dakar': { pays: 'Capitale du Sénégal', description: 'Dakar mêle modernité africaine, histoire coloniale et culture intense. Perchée à l\'extrémité ouest du continent, la capitale offre une énergie unique entre marchés colorés, architecture diverse et couchers de soleil sur l\'Atlantique.', incontournables: ['Île de Gorée UNESCO', 'Lac Rose', 'Monument Renaissance', 'Marché Sandaga', 'Mosquée de la Divinité'] },
  'saloum': { pays: 'Région de Fatick — UNESCO', description: 'Le delta du Saloum est un écrin de nature classé au patrimoine mondial de l\'UNESCO. Ce labyrinthe de bolongs, d\'îles et de mangroves abrite une faune exceptionnelle. Villages sérères, pirogues colorées et couchers de soleil magiques.', incontournables: ['Bolongs en pirogue', 'Village Mar Lodj', 'Île aux Oiseaux', 'Artiste Pierre', 'Déjeuner pieds dans l\'eau'] },
  'saint-louis': { pays: 'Région de Saint-Louis — UNESCO', description: 'Saint-Louis, première capitale de l\'AOF, est une île entre fleuve et mer d\'une beauté saisissante. Architecture coloniale préservée, calèches, jazz et atmosphère hors du temps classée au patrimoine mondial.', incontournables: ['Île coloniale UNESCO', 'Pont Faidherbe 1897', 'Parc du Djoudj', 'Langue de Barbarie', 'Jazz de Saint-Louis'] },
  'casamance': { pays: 'Région de Ziguinchor', description: 'La Casamance est séparée du Sénégal par la Gambie. Luxuriante et verdoyante, habitée par le peuple Diola, elle offre forêts de fromagers, rizières en terrasses et villages traditionnels d\'une authenticité absolue.', incontournables: ['Cap Skirring', 'Forêt de Cabrousse', 'Villages Diola', 'Île Carabane', 'Rizières en terrasses'] },
  'oriental': { pays: 'Région de Kédougou', description: 'Aux confins du Sénégal, une nature sauvage vous attend. Pays Bassari classé UNESCO, chutes de Dindefelo tombant de 100m, Kédougou et ses mines d\'or — un territoire d\'aventure absolue pour les explorateurs.', incontournables: ['Chutes de Dindefelo 100m', 'Pays Bassari UNESCO', 'Kédougou', 'Parc Niokolo-Koba', 'Mont Assirik'] },
}

function ActiviteRow({ act, couleur }) {
  const { items, ajouterItem, supprimerItem } = usePanier()
  const dans = items.find(i => i.id === act.id)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 0.85rem', background: dans ? `${C.vert}0f` : 'white', borderRadius: '0.65rem', border: `1.5px solid ${dans ? C.vert : '#ede4d4'}`, transition: 'all 0.2s' }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{act.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '0.82rem', color: C.noirChaud, margin: 0, lineHeight: 1.3 }}>{act.nom}</p>
        <p style={{ color: act.surDevis ? C.or : C.vert, fontSize: '0.74rem', fontWeight: 700, margin: 0 }}>
          {act.surDevis ? 'Sur devis' : `${act.prix.toLocaleString('fr-FR')} CFA/pers`}
        </p>
      </div>
      <button onClick={() => dans ? supprimerItem(act.id) : ajouterItem({ ...act })}
        style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: dans ? '#fde8e8' : couleur, color: dans ? C.rouge : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
        {dans ? <X size={12} /> : <Plus size={12} />}
      </button>
    </div>
  )
}

function LieuDropdown({ lieu, couleur }) {
  const [ouvert, setOuvert] = useState(false)
  const { items } = usePanier()
  const nb = items.filter(i => lieu.activites.some(a => a.id === i.id)).length
  return (
    <div style={{ borderRadius: '0.85rem', overflow: 'hidden', border: `1.5px solid ${ouvert ? couleur : '#ede4d4'}`, transition: 'all 0.25s', background: 'white', marginBottom: '0.5rem' }}>
      <button onClick={() => setOuvert(!ouvert)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0.85rem 1rem', background: ouvert ? `${couleur}0a` : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
          <img src={lieu.image} alt={lieu.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span>{lieu.emoji}</span>
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: C.noirChaud }}>{lieu.nom}</span>
            {nb > 0 && <span style={{ background: C.vert, color: 'white', borderRadius: '9999px', padding: '1px 7px', fontSize: '0.62rem', fontWeight: 700 }}>{nb} choisi{nb > 1 ? 's' : ''}</span>}
          </div>
          <p style={{ color: '#999', fontSize: '0.72rem', margin: 0, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lieu.description}</p>
        </div>
        <span style={{ color: couleur, transition: 'transform 0.25s', transform: ouvert ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }}>
          <ChevronDown size={16} />
        </span>
      </button>
      <div style={{ maxHeight: ouvert ? '1000px' : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ padding: '0.5rem 0.85rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', background: '#fafaf7', borderTop: `1px solid ${couleur}18` }}>
          {lieu.activites.map(act => <ActiviteRow key={act.id} act={act} couleur={couleur} />)}
        </div>
      </div>
    </div>
  )
}

function ZoneSection({ zone }) {
  const meta = ZONES_META[zone.id] || {}
  const { items } = usePanier()
  const nbTotal = items.filter(i => zone.lieux.some(l => l.activites.some(a => a.id === i.id))).length

  return (
    <div id={zone.id} style={{ scrollMarginTop: '80px', background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 24px rgba(28,18,8,0.09)', marginBottom: '1.5rem' }}>

      {/* IMAGE EN HAUT — pleine largeur sur mobile */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img src={zone.image} alt={zone.nom}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${zone.couleur}, transparent)` }} />

        {/* Badge ajoutés */}
        {nbTotal > 0 && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: C.vert, color: 'white', borderRadius: '9999px', padding: '4px 10px', fontSize: '0.68rem', fontWeight: 700 }}>
            ✓ {nbTotal} ajouté{nbTotal > 1 ? 's' : ''}
          </div>
        )}

        {/* Titre sur l'image */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontSize: '1.6rem' }}>{zone.emoji}</span>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem, 5vw, 2rem)', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.1 }}>{zone.nom}</h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={10} /> {meta.pays}
          </p>
        </div>
      </div>

      {/* CONTENU EN BAS */}
      <div style={{ padding: '1.25rem' }}>

        {/* Description */}
        <p style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1rem' }}>{meta.description}</p>

        {/* Incontournables */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: 700, fontSize: '0.75rem', color: C.noirChaud, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Star size={11} color={zone.couleur} fill={zone.couleur} /> À ne pas manquer
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {meta.incontournables?.map(item => (
              <span key={item} style={{ fontSize: '0.72rem', background: `${zone.couleur}12`, color: zone.couleur, padding: '3px 9px', borderRadius: '9999px', fontWeight: 600, border: `1px solid ${zone.couleur}22` }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div style={{ height: '1px', background: `linear-gradient(to right, ${zone.couleur}30, transparent)`, marginBottom: '1rem' }} />

        {/* Activités */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontWeight: 700, fontSize: '0.75rem', color: C.noirChaud, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            🎯 Choisissez vos activités
          </p>
          {zone.lieux.map(lieu => <LieuDropdown key={lieu.id} lieu={lieu} couleur={zone.couleur} />)}
        </div>

        {/* Boutons */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Link to="/mon-circuit"
            style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: zone.couleur, color: 'white', fontWeight: 600, padding: '10px 16px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.84rem', transition: 'all 0.25s', textAlign: 'center' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <ShoppingCart size={13} /> Mon circuit
          </Link>
          <a href={`https://wa.me/+221788938254?text=Bonjour, je suis intéressé par : ${zone.nom}`}
            target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: `1.5px solid ${zone.couleur}`, color: zone.couleur, fontWeight: 600, padding: '10px 16px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.84rem', transition: 'all 0.25s', background: 'transparent', textAlign: 'center' }}
            onMouseEnter={e => { e.currentTarget.style.background = zone.couleur; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = zone.couleur }}>
            <Phone size={13} /> Devis WhatsApp
          </a>
        </div>
      </div>
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

      {/* HERO */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #1a3a1a 100%)`, padding: 'clamp(6rem, 15vw, 10rem) 1.25rem 3rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '30px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
            <span style={{ color: C.or, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>Découvrez le Sénégal</span>
            <div style={{ height: '1px', width: '30px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 8vw, 4rem)', color: 'white', marginBottom: '0.75rem', lineHeight: 1.1 }}>
            Nos <span style={{ color: C.or }}>6 Destinations</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.72)', marginBottom: '2rem' }}>
            Explorez, choisissez vos activités et composez votre circuit
          </p>

          {/* Navigation rapide — scroll horizontal sur mobile */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {ZONES_PANIER.map(zone => (
              <a key={zone.id} href={`#${zone.id}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', padding: '6px 12px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.background = zone.couleur; e.currentTarget.style.borderColor = zone.couleur }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}>
                {zone.emoji} {zone.nom}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ZONES */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem 3rem' }}>
        <p style={{ color: '#999', fontSize: '0.82rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <MapPin size={12} color={C.or} />
          Ouvrez un lieu pour voir et ajouter des activités à votre circuit
        </p>
        {ZONES_PANIER.map(zone => <ZoneSection key={zone.id} zone={zone} />)}
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #1a3a1a)`, padding: 'clamp(3rem, 8vw, 5rem) 1.25rem', textAlign: 'center', borderTop: `3px solid ${C.or}` }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>
          Prêt à composer votre circuit ?
        </p>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', color: 'white', marginBottom: '2rem', lineHeight: 1.2 }}>
          Soumettez votre demande <span style={{ color: C.or }}>sur WhatsApp</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'center', maxWidth: '380px', margin: '0 auto' }}>
          <Link to="/mon-circuit"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '14px 24px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem' }}>
            <ShoppingCart size={17} /> Voir mon circuit
          </Link>
          <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '14px 24px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem' }}>
            <Phone size={17} /> Je m'en remets à vous
          </a>
        </div>
      </div>
    </div>
  )
}