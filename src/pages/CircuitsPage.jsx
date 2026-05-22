import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ShoppingCart, Clock, CheckCircle, X, Plus, ChevronDown, ChevronUp, Star, ArrowRight, Zap } from 'lucide-react'
import { usePanier } from '@/context/PanierContext'
import { ZONES_PANIER } from '@/lib/activites'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

const EXCURSIONS = [
  {
    id: 'exc-saloum', nom: 'Île du Saloum', zone: 'Sine Saloum', zoneId: 'saloum', lieuId: 'ndangane',
    duree: 'Journée · 9h–17h ou 14h–17h', image: '/images/excursions/saloum-excursion.jpg',
    badge: 'Nature', badgeEmoji: '🦅', badgeColor: C.vert,
    accroche: 'Bolongs en pirogue, mangroves UNESCO, village sérère de Mar Lodj, Île aux Oiseaux',
    activitesIds: ['saloum-pirogue', 'saloum-oiseaux', 'saloum-marlodj', 'saloum-dejeuner'],
    inclus: ['Transport A/R', 'Guide local', 'Pirogue dans les bolongs'],
    non_inclus: ['Boissons au restaurant'],
    note: 'Jumelable avec Joal-Fadiouth · –10% sur les deux',
    depart: 'Matin 9h (retour 12h) ou après-midi 14h (retour 17h)',
    prixDepuis: 25000,
  },
  {
    id: 'exc-joal', nom: 'Joal-Fadiouth', zone: 'Petite Côte', zoneId: 'petite-cote', lieuId: 'joal',
    duree: 'Demi-journée · 9h–12h ou 14h–17h', image: '/images/excursions/joal-fadiouth.jpg',
    badge: 'Incontournable', badgeEmoji: '🐚', badgeColor: '#8B6914',
    accroche: 'Île aux coquillages, ville natale de Senghor, cimetière mixte, pont de 632 m',
    activitesIds: ['joal-visite', 'joal-pirogue', 'joal-cimetiere'],
    inclus: ['Transport A/R', 'Guide local', 'Retour en pirogue'],
    non_inclus: [],
    note: 'Jumelable avec l\'Île du Saloum · –10% sur les deux',
    depart: 'Matin 9h (retour 12h) ou après-midi 14h (retour 17h)',
    prixDepuis: 13000,
  },
  {
    id: 'exc-nianing', nom: 'Nianing & Mbour', zone: 'Petite Côte', zoneId: 'petite-cote', lieuId: 'nianing',
    duree: 'Après-midi · 16h–19h', image: '/images/excursions/nianing-mbour.jpg',
    badge: 'Culture', badgeEmoji: '🌳', badgeColor: '#5a7a1a',
    accroche: 'Baobab sacré des griots, église en coquillage, retour des pêcheurs à Mbour',
    activitesIds: ['nianing-baobab', 'nianing-eglise', 'nianing-port'],
    inclus: ['Transport A/R', 'Guide local dans le port'],
    non_inclus: [],
    note: 'Parfait en fin de journée depuis votre hébergement',
    depart: 'Après-midi 16h · Retour 19h',
    prixDepuis: 8000,
  },
  {
    id: 'exc-bandia', nom: 'Réserve de Bandia', zone: 'Petite Côte', zoneId: 'petite-cote', lieuId: 'bandia',
    duree: 'Journée · 9h–12h ou 14h–17h', image: '/images/excursions/bandia.jpg',
    badge: 'Populaire', badgeEmoji: '🦁', badgeColor: C.rouge,
    accroche: 'Lions, girafes, zèbres, rhinocéros, buffles et antilopes en liberté',
    activitesIds: ['bandia-safari', 'bandia-photo'],
    inclus: ['Transport A/R', 'Guide local', 'Entrée réserve', 'Safari en véhicule'],
    non_inclus: [],
    note: 'Visite avec notre propre véhicule · Billets d\'entrée inclus',
    depart: 'Matin 9h (retour 12h) ou après-midi 14h (retour 17h)',
    prixDepuis: 25000,
  },
  {
    id: 'exc-lacrose', nom: 'Lac Rose', zone: 'Dakar', zoneId: 'dakar', lieuId: 'lac-rose',
    duree: 'Journée complète · 9h–18h', image: '/images/excursions/lac-rose.jpg',
    badge: 'Aventure', badgeEmoji: '🏜️', badgeColor: '#9B4D9B',
    accroche: 'Eaux roses uniques, quad sur les dunes, pirogue, sel, dromadaire, déjeuner au bord du lac',
    activitesIds: ['lacrose-quad', 'lacrose-pirogue', 'lacrose-sel', 'lacrose-dromadaire', 'lacrose-dejeuner'],
    inclus: ['Transport A/R', 'Guide local', 'Quad', 'Pirogue', 'Dromadaire ou cheval', 'Déjeuner + piscine'],
    non_inclus: ['Boissons au restaurant'],
    note: 'Journée complète · Départ 9h · Retour 18h',
    depart: 'Matin 9h · Retour 18h',
    prixDepuis: 66000,
  },
]

const FORFAITS = [
  {
    id: 'f5', nom: 'Forfait 5 Jours', emoji: '🌅', couleur: C.vert, duree: '5 jours',
    description: 'La première découverte idéale — les destinations emblématiques de la Petite Côte.',
    destinations: ['Joal-Fadiouth', 'Nianing & Mbour', 'Safari Bandia', 'Saly & plages'],
    inclus: ['Transport tout inclus', 'Guide francophone', 'Hébergement selon formule', 'Eau fraîche à bord'],
  },
  {
    id: 'f7', nom: 'Forfait 7 Jours', emoji: '🦁', couleur: C.or, duree: '7 jours',
    description: 'La semaine parfaite — côte, delta du Saloum et découverte de Dakar.',
    destinations: ['Petite Côte complète', 'Safari Bandia', 'Île du Saloum', 'Dakar & Lac Rose'],
    inclus: ['Transport tout inclus', 'Guide francophone', 'Hébergement selon formule', 'Safari inclus', 'Saloum inclus', 'Eau fraîche à bord'],
    populaire: true,
  },
  {
    id: 'f10', nom: 'Forfait 10 Jours', emoji: '🗺️', couleur: C.rouge, duree: '10 jours',
    description: 'Le grand tour — côte, delta, capitale et aventures vers l\'intérieur des terres.',
    destinations: ['Toute la Petite Côte', 'Dakar & Lac Rose', 'Saint-Louis ou Casamance', 'Sénégal Oriental'],
    inclus: ['Transport tout inclus', 'Guide francophone', 'Hébergement selon formule', 'Toutes excursions', 'Saint-Louis ou Casamance', 'Eau fraîche à bord'],
  },
]

function getActivites(zoneId, lieuId, ids) {
  const zone = ZONES_PANIER.find(z => z.id === zoneId)
  const lieu = zone?.lieux.find(l => l.id === lieuId)
  return lieu?.activites.filter(a => ids.includes(a.id)) || []
}

// ── Carte excursion enrichie ──────────────────────────────
function ExcursionCard({ exc }) {
  const { items, ajouterItem, supprimerItem } = usePanier()
  const [detail, setDetail] = useState(false)
  const activites = getActivites(exc.zoneId, exc.lieuId, exc.activitesIds)
  const nbPanier = items.filter(i => exc.activitesIds.includes(i.id)).length

  return (
    <div style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: nbPanier > 0 ? `0 8px 32px rgba(26,107,60,0.2)` : '0 6px 24px rgba(0,0,0,0.08)', border: nbPanier > 0 ? `2px solid ${C.vert}` : '2px solid transparent', transition: 'all 0.3s' }}>

      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img src={exc.image} alt={exc.nom}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'} loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
        {/* Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ background: exc.badgeColor, color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {exc.badgeEmoji} {exc.badge}
          </span>
        </div>
        {/* Panier badge */}
        {nbPanier > 0 && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: C.vert, color: 'white', borderRadius: '9999px', padding: '4px 10px', fontSize: '0.68rem', fontWeight: 700, boxShadow: '0 2px 10px rgba(26,107,60,0.4)' }}>
            ✓ {nbPanier} choisi{nbPanier > 1 ? 's' : ''}
          </div>
        )}
        {/* Infos bas image */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.9)', fontSize: '0.78rem' }}>
            <Clock size={12} /> {exc.duree}
          </div>
          <div style={{ color: C.orClair, fontWeight: 800, fontSize: '0.9rem', fontFamily: '"Playfair Display", serif' }}>
            Dès {exc.prixDepuis.toLocaleString('fr-FR')} CFA
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.6rem' }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 700, color: C.noirChaud, margin: 0, lineHeight: 1.2 }}>{exc.nom}</h3>
          <span style={{ color: '#aaa', fontSize: '0.72rem', flexShrink: 0, background: C.sable, padding: '3px 8px', borderRadius: '9999px' }}>{exc.zone}</span>
        </div>
        <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>{exc.accroche}</p>

        {/* Inclus rapide */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.25rem' }}>
          {exc.inclus.map(i => (
            <span key={i} style={{ fontSize: '0.68rem', background: '#f0faf4', color: C.vert, padding: '3px 9px', borderRadius: '9999px', fontWeight: 600 }}>✓ {i}</span>
          ))}
          {exc.non_inclus.map(i => (
            <span key={i} style={{ fontSize: '0.68rem', background: '#fef2f2', color: C.rouge, padding: '3px 9px', borderRadius: '9999px', fontWeight: 600 }}>✗ {i}</span>
          ))}
        </div>

        {/* Activités à choisir */}
        {activites.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontWeight: 700, fontSize: '0.75rem', color: C.noirChaud, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Zap size={11} color={C.or} fill={C.or} /> Choisissez vos activités
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {activites.map(act => {
                const dans = items.find(i => i.id === act.id)
                return (
                  <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 0.85rem', background: dans ? `${C.vert}0f` : C.sable, borderRadius: '0.65rem', border: `1.5px solid ${dans ? C.vert : 'transparent'}`, transition: 'all 0.2s' }}>
                    <span style={{ fontSize: '0.95rem' }}>{act.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.8rem', color: C.noirChaud, margin: 0 }}>{act.nom}</p>
                      <p style={{ color: act.surDevis ? C.or : C.vert, fontSize: '0.72rem', fontWeight: 700, margin: 0 }}>
                        {act.surDevis ? 'Sur devis' : `${act.prix.toLocaleString('fr-FR')} CFA/pers`}
                      </p>
                    </div>
                    <button onClick={() => dans ? supprimerItem(act.id) : ajouterItem({ ...act, zone: exc.nom })}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: dans ? '#fde8e8' : exc.badgeColor, color: dans ? C.rouge : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                      {dans ? <X size={12} /> : <Plus size={12} />}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Détails dépliables */}
        <button onClick={() => setDetail(!detail)}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', color: C.or, fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', padding: 0, marginBottom: detail ? '0.85rem' : 0 }}>
          {detail ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {detail ? 'Masquer les détails' : 'Voir les détails'}
        </button>

        {detail && (
          <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <p style={{ fontSize: '0.78rem', color: '#666', display: 'flex', gap: '6px' }}>
              <Clock size={13} color={C.or} style={{ flexShrink: 0, marginTop: '1px' }} />
              <span><strong>Départ :</strong> {exc.depart}</span>
            </p>
            {exc.note && (
              <p style={{ fontSize: '0.78rem', color: C.vert, background: '#f0faf4', padding: '8px 12px', borderRadius: '0.5rem', fontWeight: 600, margin: 0 }}>
                💡 {exc.note}
              </p>
            )}
          </div>
        )}

        <Link to="/mon-circuit"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '11px', borderRadius: '0.85rem', textDecoration: 'none', fontSize: '0.88rem', transition: 'all 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <ShoppingCart size={14} /> Voir mon circuit complet
        </Link>
      </div>
    </div>
  )
}

// ── Carte forfait ──────────────────────────────────────────
function ForfaitCard({ f }) {
  return (
    <div style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: f.populaire ? `0 12px 40px rgba(212,160,23,0.22)` : '0 6px 24px rgba(0,0,0,0.08)', border: f.populaire ? `2px solid ${C.or}` : '2px solid transparent', position: 'relative', transition: 'all 0.35s' }}
      onMouseEnter={e => { if (!f.populaire) e.currentTarget.style.transform = 'translateY(-6px)' }}
      onMouseLeave={e => { if (!f.populaire) e.currentTarget.style.transform = 'translateY(0)' }}>

      {/* Header coloré */}
      <div style={{ background: `linear-gradient(135deg, ${f.couleur}, ${f.couleur}bb)`, padding: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '6rem', opacity: 0.12 }}>{f.emoji}</div>
        {f.populaire && (
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.4)' }}>
            ⭐ LE PLUS POPULAIRE
          </div>
        )}
        <div style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>{f.emoji}</div>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: 'white', margin: '0 0 0.35rem' }}>{f.nom}</h3>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>{f.description}</p>
      </div>

      {/* Destinations */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0e8d8' }}>
        <p style={{ fontWeight: 700, fontSize: '0.75rem', color: C.noirChaud, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <MapPin size={11} color={f.couleur} /> Destinations incluses
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {f.destinations.map(d => (
            <span key={d} style={{ fontSize: '0.75rem', background: `${f.couleur}12`, color: f.couleur, padding: '4px 10px', borderRadius: '9999px', fontWeight: 600, border: `1px solid ${f.couleur}22` }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Inclus */}
      <div style={{ padding: '1.5rem' }}>
        <p style={{ fontWeight: 700, fontSize: '0.75rem', color: C.noirChaud, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Ce qui est inclus</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {f.inclus.map(i => (
            <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.85rem', color: '#555' }}>
              <CheckCircle size={14} color={f.couleur} style={{ flexShrink: 0, marginTop: '2px' }} />{i}
            </li>
          ))}
        </ul>
        <p style={{ color: '#bbb', fontSize: '0.75rem', fontStyle: 'italic', textAlign: 'center', marginBottom: '1.25rem' }}>
          Programme personnalisable selon vos envies
        </p>
        <a href={`https://wa.me/+221788938254?text=Bonjour, je suis intéressé par le ${f.nom} PEGASEN221`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: f.couleur, color: 'white', fontWeight: 700, padding: '13px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.92rem', transition: 'all 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <Phone size={16} /> Demander un devis
        </a>
      </div>
    </div>
  )
}

// ── Formule Bokkalé ────────────────────────────────────────
function BokkalePage() {
  return (
    <div style={{ animation: 'fadeUp 0.45s ease both' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Formule Bokkalé</h2>
        <p style={{ color: '#888', fontSize: '0.95rem' }}>Réservez une place · Partagez les frais · Même confort que la location privée</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

        {/* Explication */}
        <div style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🚐</div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: 'white', margin: '0 0 0.5rem' }}>C'est quoi le Bokkalé ?</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
              Réservez une ou plusieurs places dans notre Kia Carnival 11 places. Vous partagez les frais de transport avec d'autres voyageurs tout en profitant du même confort.
            </p>
          </div>
          <div style={{ padding: '1.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {[
                { emoji: '🎟️', nb: '9', label: 'Places disponibles à la réservation individuelle' },
                { emoji: '🧳', nb: '2', label: 'Places réservées aux bagages' },
                { emoji: '👫', nb: '–', label: 'Idéal seul ou en couple' },
                { emoji: '💰', nb: '–', label: 'Tarif partagé = économie garantie' },
              ].map(({ emoji, nb, label }) => (
                <div key={label} style={{ background: C.sable, borderRadius: '0.85rem', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{emoji}</div>
                  {nb !== '–' && <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', fontWeight: 700, color: C.or, margin: '0 0 2px', lineHeight: 1 }}>{nb}</p>}
                  <p style={{ color: '#666', fontSize: '0.72rem', margin: 0, lineHeight: 1.4 }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ background: `${C.vert}0f`, border: `1px solid ${C.vert}22`, borderRadius: '0.85rem', padding: '1rem 1.25rem' }}>
              <p style={{ color: C.vert, fontWeight: 600, fontSize: '0.82rem', margin: 0, lineHeight: 1.6 }}>
                ✦ Même véhicule climatisé · Même confort · Même eau fraîche à bord · Même guide professionnel
              </p>
            </div>
          </div>
        </div>

        {/* Comment réserver */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: C.noirChaud, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color={C.or} fill={C.or} /> Comment réserver ?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                { n: 1, titre: 'Choisissez votre destination', desc: 'Parmi nos excursions disponibles en formule Bokkalé', couleur: C.vert },
                { n: 2, titre: 'Contactez-nous sur WhatsApp', desc: 'Pour vérifier les disponibilités et les dates de départ', couleur: C.or },
                { n: 3, titre: 'Versez l\'acompte (25%)', desc: 'Pour confirmer votre place dans le véhicule', couleur: C.rouge },
                { n: 4, titre: 'Profitez du voyage !', desc: 'Nous gérons le reste — vous n\'avez qu\'à vous amuser', couleur: C.vert },
              ].map(({ n, titre, desc, couleur }) => (
                <div key={n} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.85rem', background: C.sable, borderRadius: '0.85rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: couleur, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{n}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: C.noirChaud, margin: '0 0 2px', fontSize: '0.9rem' }}>{titre}</p>
                    <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a href="https://wa.me/+221788938254?text=Bonjour, je suis intéressé par la formule Bokkalé PEGASEN221"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '16px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(34,197,94,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <Phone size={18} /> Je réserve une place Bokkalé
          </a>
        </div>
      </div>
    </div>
  )
}

// ── PAGE PRINCIPALE ────────────────────────────────────────
const MapPin = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function CircuitsPage() {
  const [onglet, setOnglet] = useState('excursions')

  const ONGLETS = [
    { id: 'excursions', label: 'Excursions à la journée', icon: '🗓️', count: EXCURSIONS.length },
    { id: 'forfaits', label: 'Forfaits multi-jours', icon: '📦', count: FORFAITS.length },
    { id: 'bokkale', label: 'Formule Bokkalé', icon: '🚐', count: null },
  ]

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #2a1500 100%)`, padding: '10rem 2rem 6rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />
        <div style={{ position: 'absolute', top: '15%', right: '5%', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.07)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
            <span style={{ color: C.or, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 600 }}>Nos offres</span>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.8rem, 7vw, 5rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.05 }}>
            Circuits & <span style={{ color: C.or }}>Forfaits</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.35rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.72)', marginBottom: '2.5rem', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Choisissez vos activités, composez votre circuit et soumettez votre demande directement sur WhatsApp
          </p>
          <Link to="/mon-circuit"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '14px 30px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', boxShadow: `0 4px 20px rgba(212,160,23,0.4)`, transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <ShoppingCart size={18} /> Composer mon circuit maintenant
          </Link>
        </div>
      </div>

      {/* ── ONGLETS ── */}
      <div style={{ background: 'white', position: 'sticky', top: '72px', zIndex: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', overflowX: 'auto' }}>
          {ONGLETS.map(({ id, label, icon, count }) => (
            <button key={id} onClick={() => setOnglet(id)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '1.1rem 1.5rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: onglet === id ? C.or : '#666', borderBottom: onglet === id ? `3px solid ${C.or}` : '3px solid transparent', transition: 'all 0.25s', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '1.1rem' }}>{icon}</span>
              {label}
              {count && <span style={{ background: onglet === id ? C.or : '#e8d8b8', color: onglet === id ? C.noirChaud : '#888', borderRadius: '9999px', padding: '1px 7px', fontSize: '0.72rem', fontWeight: 700, transition: 'all 0.25s' }}>{count}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {onglet === 'excursions' && (
          <div style={{ animation: 'fadeUp 0.45s ease both' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Excursions à la journée</h2>
              <p style={{ color: '#888', fontSize: '0.95rem' }}>Sélectionnez vos activités et ajoutez-les à votre circuit · Départ de Nianing</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {EXCURSIONS.map((exc, i) => (
                <div key={exc.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}>
                  <ExcursionCard exc={exc} />
                </div>
              ))}
            </div>
          </div>
        )}

        {onglet === 'forfaits' && (
          <div style={{ animation: 'fadeUp 0.45s ease both' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Forfaits Multi-jours</h2>
              <p style={{ color: '#888', fontSize: '0.95rem' }}>Programmes sur mesure · Devis personnalisé gratuit sous 24h · Paiement Wave, Orange Money</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {FORFAITS.map((f, i) => (
                <div key={f.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
                  <ForfaitCard f={f} />
                </div>
              ))}
            </div>
            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', border: `1px solid ${C.or}30`, textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                💬 <strong>Programme entièrement personnalisable</strong> — Contactez-nous sur WhatsApp pour composer votre forfait idéal. Notre équipe finalise les détails et vous envoie le devis sous 24h.
              </p>
              <a href="https://wa.me/+221788938254?text=Bonjour, je souhaite composer un forfait personnalisé au Sénégal avec PEGASEN221"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '13px 28px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem' }}>
                <Phone size={16} /> Composer mon forfait sur mesure
              </a>
            </div>
          </div>
        )}

        {onglet === 'bokkale' && <BokkalePage />}
      </div>

      {/* ── CTA ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #1a3a1a)`, padding: '5rem 2rem', textAlign: 'center', borderTop: `3px solid ${C.or}` }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>Une idée de circuit ?</p>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: '1.5rem' }}>
          Parlez-nous de votre <span style={{ color: C.or }}>voyage de rêve</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Devis gratuit sous 24h · Paiement Wave ou Orange Money · Réponse garantie
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/mon-circuit"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '14px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <ShoppingCart size={18} /> Composer mon circuit
          </Link>
          <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '14px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(34,197,94,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <Phone size={18} /> Devis gratuit sous 24h
          </a>
        </div>
      </div>
    </div>
  )
}