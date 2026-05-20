import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Clock, Users, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react'

const C = {
  or: '#D4A017',
  orClair: '#F0C040',
  vert: '#1A6B3C',
  rouge: '#C0392B',
  noirChaud: '#1C1208',
  sable: '#FDF3E3',
}

// ── EXCURSIONS À LA JOURNÉE ────────────────────────────────
const EXCURSIONS = [
  {
    id: 'saloum',
    nom: 'Île du Saloum',
    duree: 'Journée (9h–12h ou 14h–17h)',
    image: '/images/excursions/saloum-excursion.jpg',
    badge: '🦅 Nature',
    badgeColor: C.vert,
    description: 'Naviguez à travers les bolongs du delta du Saloum. Halte à Mar Lodj, village sérère authentique avec cohabitation de 3 religions. Visite de l\'Île aux Oiseaux, sanctuaire naturel avec pélicans, hérons et cormorans.',
    inclus: ['Transport aller-retour en véhicule confort', 'Guide local', 'Trajet en pirogue dans les bolongs'],
    non_inclus: ['Boissons au restaurant'],
    prix: [
      { groupe: '2 adultes', cfa: '35 000' },
      { groupe: '3 adultes', cfa: '30 000' },
      { groupe: '4 adultes', cfa: '25 000' },
      { groupe: '1 enfant (–12 ans)', cfa: '16 000' },
    ],
    depart: 'Matin 9h (retour 12h) ou après-midi 14h (retour 17h)',
    combinable: 'Jumelable avec l\'Île aux Coquillages (–10% sur les deux)',
  },
  {
    id: 'joal-fadiouth',
    nom: 'Île aux Coquillages – Joal-Fadiouth',
    duree: 'Demi-journée (9h–12h ou 14h–17h)',
    image: '/images/excursions/joal-fadiouth.jpg',
    badge: '🐚 Incontournable',
    badgeColor: '#8B6914',
    description: 'Découvrez l\'île de Fadiouth construite sur des coquillages, ville natale de Léopold Sédar Senghor. Visite du cimetière mixte chrétien-musulman, du pont de bois de 632 m et du baobab multi-centenaire.',
    inclus: ['Transport aller-retour en véhicule confort', 'Guide local', 'Trajet en pirogue'],
    non_inclus: [],
    prix: [
      { groupe: '2 adultes', cfa: '20 000' },
      { groupe: '3 adultes', cfa: '16 000' },
      { groupe: '4 adultes', cfa: '13 000' },
      { groupe: '1 enfant (–12 ans)', cfa: '6 500' },
    ],
    depart: 'Matin 9h (retour 12h) ou après-midi 14h (retour 17h)',
    combinable: 'Jumelable avec l\'Île du Saloum (–10% sur les deux)',
  },
  {
    id: 'nianing-mbour',
    nom: 'Nianing Baobab Sacré & Mbour Port',
    duree: 'Après-midi (16h–19h)',
    image: '/images/excursions/nianing-mbour.jpg',
    badge: '🌳 Culture',
    badgeColor: C.vert,
    description: 'Visite du baobab sacré de Nianing, ancien cimetière des griots sérères. Découverte de l\'église unique en forme de coquillage. Puis immersion totale au port de Mbour au retour des pêcheurs : pirogues colorées, déchargement des prises, marché artisanal animé.',
    inclus: ['Transport aller-retour en véhicule confort', 'Guide local dans le port'],
    non_inclus: [],
    prix: [
      { groupe: '2 adultes', cfa: '13 000' },
      { groupe: '3 adultes', cfa: '10 000' },
      { groupe: '4 adultes', cfa: '8 000' },
      { groupe: '1 enfant (–12 ans)', cfa: '4 000' },
    ],
    depart: 'Après-midi 16h (retour 19h)',
    combinable: null,
  },
  {
    id: 'bandia',
    nom: 'Réserve de Bandia – Safari',
    duree: 'Journée (9h–12h ou 14h–17h)',
    image: '/images/excursions/bandia.jpg',
    badge: '🦁 Populaire',
    badgeColor: C.rouge,
    description: 'Safari dans la réserve de Bandia, l\'un des sites les plus visités du Sénégal. Observez lions, girafes, zèbres, buffles, rhinocéros, antilopes et de nombreux oiseaux dans un cadre naturel préservé. La visite se fait avec notre propre véhicule.',
    inclus: ['Transport aller-retour en véhicule confort', 'Guide local', 'Entrée à la réserve', 'Visite du parc avec notre véhicule'],
    non_inclus: [],
    prix: [
      { groupe: '2 adultes', cfa: '35 000' },
      { groupe: '3 adultes', cfa: '30 000' },
      { groupe: '4 adultes', cfa: '25 000' },
      { groupe: '1 enfant (–12 ans)', cfa: '8 000' },
    ],
    depart: 'Matin 9h (retour 12h) ou après-midi 14h (retour 17h)',
    combinable: null,
  },
  {
    id: 'lac-rose',
    nom: 'Lac Rose (Lac Retba)',
    duree: 'Journée complète (9h–18h)',
    image: '/images/excursions/lac-rose.jpg',
    badge: '🏜️ Aventure',
    badgeColor: '#8B6914',
    description: 'Découvrez le célèbre lac aux eaux roses dû aux algues et à la forte concentration de sel. Balade en quad à travers dunes et plages, traversée du lac en pirogue traditionnelle, découverte de la récolte du sel, balade à cheval ou dromadaire, déjeuner au bord du lac.',
    inclus: ['Transport aller-retour en véhicule confort', 'Guide local', 'Balade en quad', 'Traversée en pirogue', 'Balade cheval ou dromadaire', 'Déjeuner au bord du Lac Rose', 'Accès piscine du restaurant'],
    non_inclus: ['Boissons au restaurant'],
    prix: [
      { groupe: '2 adultes', cfa: '85 000' },
      { groupe: '3 adultes', cfa: '79 000' },
      { groupe: '4 adultes', cfa: '66 000' },
      { groupe: '1 enfant (–10 ans)', cfa: '20 000' },
    ],
    depart: 'Matin 9h (retour 18h)',
    combinable: null,
  },
]

// ── FORFAITS ───────────────────────────────────────────────
const FORFAITS = [
  {
    id: 'forfait-5j',
    nom: 'Forfait 5 Jours',
    emoji: '🌅',
    couleur: C.vert,
    description: 'Idéal pour une première découverte du Sénégal. Les destinations emblématiques de la Petite Côte.',
    inclus: ['Transport tout inclus', 'Guide local francophone', 'Hébergement (selon formule choisie)', 'Excursions selon programme', 'Eau fraîche à bord'],
    note: 'Programme personnalisable selon vos envies',
  },
  {
    id: 'forfait-7j',
    nom: 'Forfait 7 Jours',
    emoji: '🦁',
    couleur: C.or,
    description: 'La semaine parfaite pour explorer la Petite Côte, le delta du Saloum et découvrir Dakar.',
    inclus: ['Transport tout inclus', 'Guide local francophone', 'Hébergement (selon formule choisie)', 'Safari Bandia inclus', 'Excursion Saloum incluse', 'Eau fraîche à bord'],
    note: 'Programme personnalisable selon vos envies',
    populaire: true,
  },
  {
    id: 'forfait-10j',
    nom: 'Forfait 10 Jours',
    emoji: '🗺️',
    couleur: C.rouge,
    description: 'Le grand tour : côte, delta, capitale et aventures vers l\'intérieur des terres.',
    inclus: ['Transport tout inclus', 'Guide local francophone', 'Hébergement (selon formule choisie)', 'Toutes excursions incluses', 'Saint-Louis ou Casamance', 'Eau fraîche à bord'],
    note: 'Programme personnalisable selon vos envies',
  },
]

// ── FORMULE BOKKALÉ ────────────────────────────────────────
// ── Composant carte excursion ─────────────────────────────
function ExcursionCard({ exc }) {
  const [ouvert, setOuvert] = useState(false)

  return (
    <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'all 0.3s', border: '1px solid #f0e8d8' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img src={exc.image} alt={exc.nom}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)' }} />
        <span style={{ position: 'absolute', top: '12px', left: '12px', background: exc.badgeColor, color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '5px 12px', borderRadius: '9999px' }}>{exc.badge}</span>
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'white', fontSize: '0.8rem' }}>
          <Clock size={13} />{exc.duree}
        </div>
      </div>

      {/* Contenu */}
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', fontWeight: 700, color: C.noirChaud, marginBottom: '0.6rem', lineHeight: 1.3 }}>{exc.nom}</h3>
        <p style={{ color: '#666', fontSize: '0.87rem', lineHeight: 1.65, marginBottom: '1rem' }}>{exc.description}</p>

        {/* Tableau prix */}
        <div style={{ background: C.sable, borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ fontWeight: 700, fontSize: '0.8rem', color: C.noirChaud, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Prix par personne
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            {exc.prix.map(({ groupe, cfa }) => (
              <div key={groupe} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderRadius: '0.5rem', padding: '0.4rem 0.6rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#666' }}>{groupe}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: C.vert }}>{cfa} CFA</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: '#999', marginTop: '0.5rem', fontStyle: 'italic' }}>
            * Prix sous réserve de modification — Paiement : CFA, Wave, Orange Money
          </p>
        </div>

        {/* Détails dépliables */}
        <button onClick={() => setOuvert(!ouvert)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: C.or, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', marginBottom: ouvert ? '1rem' : 0, padding: 0 }}>
          {ouvert ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {ouvert ? 'Masquer les détails' : 'Voir les détails'}
        </button>

        {ouvert && (
          <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: '1rem', marginBottom: '1rem' }}>
            {/* Inclus */}
            <p style={{ fontWeight: 700, fontSize: '0.8rem', color: C.noirChaud, marginBottom: '0.5rem' }}>✅ Ce qui est inclus</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {exc.inclus.map(item => (
                <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.83rem', color: '#444' }}>
                  <CheckCircle size={14} color={C.vert} style={{ flexShrink: 0, marginTop: '2px' }} />{item}
                </li>
              ))}
            </ul>
            {/* Non inclus */}
            {exc.non_inclus.length > 0 && (
              <>
                <p style={{ fontWeight: 700, fontSize: '0.8rem', color: C.noirChaud, marginBottom: '0.5rem' }}>❌ Non inclus</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {exc.non_inclus.map(item => (
                    <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.83rem', color: '#666' }}>
                      <XCircle size={14} color={C.rouge} style={{ flexShrink: 0, marginTop: '2px' }} />{item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {/* Départ */}
            <p style={{ fontSize: '0.83rem', color: '#555', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Clock size={14} color={C.or} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Départ :</strong> {exc.depart}</span>
            </p>
            {/* Combinable */}
            {exc.combinable && (
              <p style={{ fontSize: '0.83rem', color: C.vert, marginTop: '0.5rem', fontWeight: 600, background: '#f0faf4', padding: '8px 12px', borderRadius: '0.5rem' }}>
                💡 {exc.combinable}
              </p>
            )}
          </div>
        )}

        {/* Bouton réserver */}
        <a href={`https://wa.me/+221788938254?text=Bonjour, je souhaite réserver l'excursion : ${exc.nom}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 600, padding: '12px', borderRadius: '0.75rem', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
          onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}>
          <Phone size={15} /> Réserver sur WhatsApp
        </a>
      </div>
    </div>
  )
}

// ── Composant carte forfait ────────────────────────────────
function ForfaitCard({ forfait }) {
  return (
    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: forfait.populaire ? `0 8px 40px rgba(212,160,23,0.25)` : '0 4px 20px rgba(0,0,0,0.08)', border: forfait.populaire ? `2px solid ${C.or}` : '1px solid #f0e8d8', position: 'relative', transition: 'all 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}>

      {forfait.populaire && (
        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontSize: '0.75rem', fontWeight: 700, padding: '5px 16px', borderRadius: '9999px', whiteSpace: 'nowrap' }}>
          ⭐ Le plus populaire
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{forfait.emoji}</div>
        <div style={{ width: '40px', height: '3px', background: forfait.couleur, borderRadius: '9999px', margin: '0 auto 1rem' }} />
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontWeight: 700, color: C.noirChaud, marginBottom: '0.5rem' }}>{forfait.nom}</h3>
        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>{forfait.description}</p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {forfait.inclus.map(item => (
          <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: '#444' }}>
            <CheckCircle size={15} color={forfait.couleur} style={{ flexShrink: 0, marginTop: '2px' }} />{item}
          </li>
        ))}
      </ul>

      <p style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic', marginBottom: '1.25rem', textAlign: 'center' }}>
        💬 {forfait.note}
      </p>

      <a href={`https://wa.me/+221788938254?text=Bonjour, je suis intéressé par le ${forfait.nom}`}
        target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: forfait.couleur, color: 'white', fontWeight: 700, padding: '13px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.opacity = '0.9' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1' }}>
        <Phone size={16} /> Demander un devis
      </a>
    </div>
  )
}

// ── PAGE PRINCIPALE ────────────────────────────────────────
export default function CircuitsPage() {
  const [onglet, setOnglet] = useState('excursions')

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #2a1500 100%)`, padding: '10rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
            <span style={{ color: C.or, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>Nos offres</span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${C.or})` }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Circuits & <span style={{ color: C.or }}>Forfaits</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', maxWidth: '550px', margin: '0 auto' }}>
            Des excursions à la journée aux séjours complets, vivez le Sénégal à votre rythme
          </p>
        </div>
      </div>

      {/* ── ONGLETS ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #f0e8d8', position: 'sticky', top: '70px', zIndex: 40, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {[
            { id: 'excursions', label: '🗓️ Excursions à la journée' },
            { id: 'forfaits', label: '📦 Forfaits multi-jours' },
            { id: 'bokkale', label: '🚐 Formule Bokkalé' },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setOnglet(id)}
              style={{ padding: '1.1rem 1.5rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: onglet === id ? C.or : '#777', borderBottom: onglet === id ? `3px solid ${C.or}` : '3px solid transparent', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* ── EXCURSIONS ── */}
        {onglet === 'excursions' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: C.noirChaud, marginBottom: '0.5rem' }}>Excursions à la journée</h2>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontStyle: 'italic', color: C.or }}>Prix par personne · Départ de Nianing · Paiement CFA, Wave ou Orange Money</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {EXCURSIONS.map(exc => <ExcursionCard key={exc.id} exc={exc} />)}
            </div>
          </div>
        )}

        {/* ── FORFAITS ── */}
        {onglet === 'forfaits' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: C.noirChaud, marginBottom: '0.5rem' }}>Forfaits Multi-jours</h2>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontStyle: 'italic', color: C.or }}>Programmes sur mesure · Tarif selon composition · Devis gratuit sous 24h</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {FORFAITS.map(f => <ForfaitCard key={f.id} forfait={f} />)}
            </div>
            {/* Note forfaits */}
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', border: `1px solid ${C.or}40`, textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', color: C.noirChaud, marginBottom: '1rem' }}>
                💬 Pour la composition personnalisée de chaque forfait, contactez-nous directement sur WhatsApp. Notre service client finalise le programme et le tarif avec vous.
              </p>
              <a href="https://wa.me/+221788938254?text=Bonjour, je souhaite composer un forfait personnalisé"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '13px 28px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem' }}>
                <Phone size={16} /> Composer mon forfait sur WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ── BOKKALÉ ── */}
        {onglet === 'bokkale' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: C.noirChaud, marginBottom: '0.5rem' }}>Formule Bokkalé</h2>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontStyle: 'italic', color: C.or }}>Réservation à la place · Partagez les frais · Confort Kia Carnival</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              {/* Explication */}
              <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: `4px solid ${C.or}` }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚐</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: C.noirChaud, marginBottom: '1rem' }}>C'est quoi le Bokkalé ?</h3>
                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  <strong>Bokkalé</strong> est une formule où plusieurs voyageurs réservent des places individuelles dans notre Kia Carnival 11 places. Vous partagez les frais de transport avec d'autres voyageurs et bénéficiez du même confort qu'une location privée, pour un coût bien inférieur.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { txt: '9 places ouvertes à la réservation individuelle', col: C.vert },
                    { txt: '2 places réservées aux bagages', col: C.or },
                    { txt: 'Idéal pour voyageurs seuls ou en couple', col: C.vert },
                    { txt: 'Même confort que la location complète', col: C.vert },
                    { txt: 'Tarif partagé entre tous les passagers', col: C.vert },
                  ].map(({ txt, col }) => (
                    <li key={txt} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: '#444' }}>
                      <CheckCircle size={16} color={col} style={{ flexShrink: 0, marginTop: '2px' }} />{txt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Comment réserver */}
              <div>
                <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', color: 'white' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: C.orClair, marginBottom: '1.25rem' }}>Comment ça marche ?</h3>
                  {[
                    { num: '1', titre: 'Choisissez votre destination', desc: 'Parmi nos excursions disponibles en formule Bokkalé' },
                    { num: '2', titre: 'Réservez votre place', desc: 'Contactez-nous sur WhatsApp pour vérifier les disponibilités' },
                    { num: '3', titre: 'Versez l\'acompte', desc: '25% du prix total pour confirmer votre réservation' },
                    { num: '4', titre: 'On s\'occupe du reste', desc: 'Nous complétons le groupe et vous confirmons les détails' },
                  ].map(({ num, titre, desc }) => (
                    <div key={num} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: C.or, color: C.noirChaud, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>{num}</div>
                      <div>
                        <p style={{ fontWeight: 600, color: 'white', margin: '0 0 2px', fontSize: '0.9rem' }}>{titre}</p>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', margin: 0 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="https://wa.me/+221788938254?text=Bonjour, je suis intéressé par la formule Bokkalé"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '15px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}>
                  <Phone size={18} /> Je réserve une place Bokkalé
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CTA DEVIS ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #1a3a1a)`, padding: '5rem 1.5rem', textAlign: 'center', borderTop: `3px solid ${C.or}` }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>Vous avez une idée de circuit ?</p>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1.5rem' }}>
          Demandez votre <span style={{ color: C.or }}>devis personnalisé</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Dites-nous vos destinations, le nombre de personnes et vos envies. Réponse sous 24h avec un devis détaillé.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <a href="https://wa.me/+221788938254?text=Bonjour, je souhaite un devis personnalisé pour mon circuit au Sénégal"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '15px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}>
            <Phone size={18} /> Demander un devis gratuit
          </a>
          <Link to="/tarifs"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: `2px solid ${C.or}`, color: C.or, fontWeight: 600, padding: '15px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.color = C.noirChaud }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.or }}>
            Voir les tarifs <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}