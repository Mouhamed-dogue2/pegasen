import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowRight, MapPin, Star, Phone } from 'lucide-react'

const C = {
  or: '#D4A017',
  orClair: '#F0C040',
  vert: '#1A6B3C',
  rouge: '#C0392B',
  noir: '#0D0D0D',
  noirChaud: '#1C1208',
  sable: '#FDF3E3',
}

const ZONES = [
  {
    id: 'petite-cote',
    nom: 'Petite Côte',
    pays: 'Région de Thiès & Fatick',
    accroche: 'Plages dorées, villages de pêcheurs & réserves animalières',
    image: '/images/destinations/petite-cote.jpg',
    couleur: C.vert,
    emoji: '🏖️',
    description: `La Petite Côte s'étend sur près de 70 km au sud de Dakar, entre Rufisque et Joal-Fadiouth. Ses plages de sable fin, ses villages de pêcheurs authentiques et ses sites naturels exceptionnels en font la destination balnéaire la plus prisée du Sénégal. Une mer toujours calme, un soleil généreux et une hospitalité légendaire vous y attendent.`,
    incontournables: [
      { nom: 'Joal-Fadiouth', desc: 'Île aux coquillages, ville natale de Senghor, pont de 632 m' },
      { nom: 'Pointe Sarène', desc: 'Village de pêcheurs devenu station balnéaire, Riu Baobab' },
      { nom: 'Nianing', desc: 'Baobab sacré, église en forme de coquillage, marché au poisson' },
      { nom: 'Mbour', desc: 'Port de pêche, retour des pirogues, grand marché artisanal' },
      { nom: 'Saly', desc: 'Plage Palm Beach, équitation, jet-ski, lutte, volleyball' },
      { nom: 'Somone', desc: 'Mangroves en pirogue, observation des oiseaux migrateurs' },
      { nom: 'Bandia', desc: 'Réserve animalière : girafes, rhinocéros, buffles, safari' },
    ],
    excursions: ['Safari Bandia', 'Joal-Fadiouth', 'Nianing & Mbour'],
    prix_depuis: '8 000 CFA',
  },
  {
    id: 'dakar',
    nom: 'Dakar',
    pays: 'Capitale du Sénégal',
    accroche: 'La capitale vibrante au bout de la presqu\'île du Cap-Vert',
    image: '/images/destinations/dakar.jpg',
    couleur: C.rouge,
    emoji: '🏙️',
    description: `Dakar est une métropole fascinante qui mêle modernité africaine, histoire coloniale et culture sénégalaise intense. Perchée à l'extrémité ouest du continent africain, la capitale offre une énergie unique : marchés colorés, musique omniprésente, architecture diverse et couchers de soleil sur l'Atlantique inoubliables.`,
    incontournables: [
      { nom: 'Île de Gorée', desc: 'Site UNESCO, Maison des Esclaves, histoire de la traite atlantique' },
      { nom: 'Lac Rose (Lac Retba)', desc: 'Eaux roses uniques, extraction de sel, quad & dromadaire' },
      { nom: 'Monument de la Renaissance', desc: 'Statue africaine la plus haute du monde (49 m)' },
      { nom: 'Marché Sandaga', desc: 'Grand marché populaire, artisanat, tissus, épices' },
      { nom: 'Mosquée de la Divinité', desc: 'Mosquée construite sur les rochers face à l\'Atlantique' },
      { nom: 'Village des Arts', desc: 'Galeries, ateliers d\'artistes, culture contemporaine' },
    ],
    excursions: ['Île de Gorée', 'Lac Rose & Quad'],
    prix_depuis: '20 000 CFA',
  },
  {
    id: 'saloum',
    nom: 'Sine Saloum',
    pays: 'Région de Fatick',
    accroche: 'Delta enchanteur, bolongs, mangroves et îles paisibles',
    image: '/images/destinations/saloum.jpg',
    couleur: C.vert,
    emoji: '🦅',
    description: `Le delta du Saloum est un écrin de nature préservée classé au patrimoine mondial de l'UNESCO. Formé par la confluence du Sine et du Saloum, ce labyrinthe de bras de mer, d'îles et de mangroves abrite une faune exceptionnelle. Villages sérères authentiques, pirogues colorées et couchers de soleil sur les bolongs vous plongeront dans une Afrique éternelle.`,
    incontournables: [
      { nom: 'Ndangane', desc: 'Point de départ des excursions en pirogue dans le delta' },
      { nom: 'Mar Lodj', desc: 'Village sérère, cohabitation de 3 religions, arbre sacré' },
      { nom: 'Île aux Oiseaux', desc: 'Sanctuaire naturel : pélicans, hérons goliath, cormorans' },
      { nom: 'Palmarin', desc: 'Lacs roses, baobabs centenaires, village traditionnel' },
      { nom: 'Djifer', desc: 'Village de pêcheurs à la pointe du delta, ambiance authentique' },
    ],
    excursions: ['Delta du Saloum en pirogue', 'Saloum + Joal-Fadiouth (–10%)'],
    prix_depuis: '25 000 CFA',
  },
  {
    id: 'saint-louis',
    nom: 'Saint-Louis',
    pays: 'Région de Saint-Louis',
    accroche: 'Ancienne capitale coloniale classée au patrimoine UNESCO',
    image: '/images/destinations/saint-louis.jpg',
    couleur: C.or,
    emoji: '🌉',
    description: `Saint-Louis, première capitale de l'Afrique occidentale française, est une île entre fleuve et mer d'une beauté saisissante. Ses ruelles colorées, son architecture coloniale préservée, ses calèches et son atmosphère hors du temps en font l'une des villes les plus séduisantes d'Afrique. Le jazz y résonne encore dans les cours intérieures.`,
    incontournables: [
      { nom: 'Île Saint-Louis', desc: 'Centre historique colonial classé UNESCO, architecture unique' },
      { nom: 'Langue de Barbarie', desc: 'Bande de sable entre fleuve et océan, pêcheurs guet-ndariens' },
      { nom: 'Parc des Oiseaux du Djoudj', desc: '3ème réserve ornithologique mondiale, pélicans, flamants' },
      { nom: 'Guet Ndar', desc: 'Quartier des pêcheurs, pirogues peintes, atmosphère unique' },
      { nom: 'Pont Faidherbe', desc: 'Pont métallique emblématique de 1897, symbole de la ville' },
    ],
    excursions: ['Saint-Louis & Djoudj', 'Langue de Barbarie'],
    prix_depuis: '110 000 CFA',
  },
  {
    id: 'casamance',
    nom: 'Casamance',
    pays: 'Région de Ziguinchor',
    accroche: 'Le Sénégal profond, vert et mystérieux',
    image: '/images/destinations/casamance.jpg',
    couleur: '#2E7D32',
    emoji: '🌿',
    description: `La Casamance est une région à part, séparée du reste du Sénégal par la Gambie. Luxuriante et verdoyante, habitée par le peuple Diola, elle offre une nature généreuse : forêts de fromagers, rizières en terrasses, mangroves et villages traditionnels aux cases rondes à toits de chaume. Un dépaysement total.`,
    incontournables: [
      { nom: 'Cap Skirring', desc: 'L\'une des plus belles plages d\'Afrique de l\'Ouest' },
      { nom: 'Ziguinchor', desc: 'Capitale de la Casamance, marché animé, architecture coloniale' },
      { nom: 'Forêt de Cabrousse', desc: 'Forêt primaire classée, arbres centenaires, oiseaux rares' },
      { nom: 'Île Carabane', desc: 'Île aux vestiges coloniaux, plages désertes, calme absolu' },
      { nom: 'Villages Diola', desc: 'Cases à impluvium, rites traditionnels, hospitalité légendaire' },
    ],
    excursions: ['Casamance Nature', 'Cap Skirring'],
    prix_depuis: 'Sur devis',
  },
  {
    id: 'oriental',
    nom: 'Sénégal Oriental',
    pays: 'Région de Kédougou & Tambacounda',
    accroche: 'Savane sauvage, chutes et mines d\'or de Kédougou',
    image: '/images/destinations/senegal-oriental.jpg',
    couleur: '#8B4513',
    emoji: '🦁',
    description: `Aux confins orientaux du Sénégal, une nature sauvage et préservée vous attend. Le pays Bassari, classé UNESCO, les chutes de Dindefelo, le parc national de Niokolo-Koba et les paysages de collines de Kédougou forment un territoire d'aventure pour les voyageurs en quête d'authenticité absolue.`,
    incontournables: [
      { nom: 'Kédougou', desc: 'Ville des orpailleurs, portes du pays Bassari, marché coloré' },
      { nom: 'Chutes de Dindefelo', desc: 'Cascade de 100 m au cœur de la forêt, baignade possible' },
      { nom: 'Parc Niokolo-Koba', desc: 'Réserve UNESCO : lions, éléphants, hippos, Derby élands' },
      { nom: 'Pays Bassari', desc: 'Villages traditionnels classés UNESCO, rites et danses ancestraux' },
      { nom: 'Mont Assirik', desc: 'Point culminant du Sénégal, panoramas exceptionnels' },
    ],
    excursions: ['Kédougou & Bassari', 'Chutes de Dindefelo'],
    prix_depuis: '140 000 CFA',
  },
]

// ── Composant carte zone ───────────────────────────────────
function ZoneCard({ zone, index }) {
  const isEven = index % 2 === 0

  return (
    <div id={zone.id} style={{ marginBottom: '5rem', scrollMarginTop: '80px' }}>
      {/* Layout alterné gauche/droite */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'start',
        direction: isEven ? 'ltr' : 'rtl',
      }}>

        {/* Image */}
        <div style={{ direction: 'ltr', position: 'relative' }}>
          <div style={{ borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <img
              src={zone.image}
              alt={zone.nom}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
              loading="lazy"
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />
            {/* Badge prix */}
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', border: `1px solid ${zone.couleur}`, borderRadius: '0.75rem', padding: '0.6rem 1rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.7rem', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>À partir de</p>
              <p style={{ color: C.orClair, fontWeight: 700, fontSize: '1rem', margin: 0, fontFamily: '"Playfair Display", serif' }}>{zone.prix_depuis}</p>
            </div>
          </div>
          {/* Décor */}
          <div style={{ position: 'absolute', top: '-12px', [isEven ? 'left' : 'right']: '-12px', width: '80px', height: '80px', borderRadius: '1rem', border: `3px solid ${zone.couleur}`, opacity: 0.3, zIndex: -1 }} />
        </div>

        {/* Contenu */}
        <div style={{ direction: 'ltr' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{zone.emoji}</span>
            <div>
              <p style={{ color: zone.couleur, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, margin: '0 0 2px' }}>{zone.pays}</p>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: C.noirChaud, margin: 0, lineHeight: 1.1 }}>{zone.nom}</h2>
            </div>
          </div>

          {/* Accroche */}
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontStyle: 'italic', color: C.or, marginBottom: '1rem', lineHeight: 1.5 }}>
            {zone.accroche}
          </p>

          {/* Description */}
          <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            {zone.description}
          </p>

          {/* Séparateur */}
          <div style={{ height: '1px', background: `linear-gradient(to right, ${zone.couleur}40, transparent)`, marginBottom: '1.5rem' }} />

          {/* Incontournables */}
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: C.noirChaud, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={16} color={zone.couleur} fill={zone.couleur} />
            Incontournables
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {zone.incontournables.map(({ nom, desc }) => (
              <li key={nom} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: zone.couleur, fontWeight: 700, fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>✦</span>
                <div>
                  <span style={{ fontWeight: 600, color: C.noirChaud, fontSize: '0.9rem' }}>{nom}</span>
                  <span style={{ color: '#777', fontSize: '0.85rem' }}> — {desc}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: zone.couleur, color: 'white', fontWeight: 600, padding: '11px 22px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
              <Phone size={15} /> Réserver cette destination
            </a>
            <Link to="/circuits"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `1.5px solid ${zone.couleur}`, color: zone.couleur, fontWeight: 600, padding: '11px 22px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = zone.couleur; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = zone.couleur }}>
              Voir les circuits <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Séparateur entre zones */}
      {index < ZONES.length - 1 && (
        <div style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #e5d5b5, transparent)' }} />
          <span style={{ color: C.or, fontSize: '1.2rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #e5d5b5, transparent)' }} />
        </div>
      )}
    </div>
  )
}

// ── Page principale ────────────────────────────────────────
export default function DestinationsPage() {
  const { hash } = useLocation()

  // Scroll vers l'ancre si présente dans l'URL
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [hash])

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(160deg, ${C.noirChaud} 0%, #2a1500 60%, ${C.vert}33 100%)`,
        padding: '10rem 1.5rem 5rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Barre tricolore */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />

        {/* Décor cercles */}
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', border: `1px solid rgba(212,160,23,0.1)` }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: '200px', height: '200px', borderRadius: '50%', border: `1px solid rgba(212,160,23,0.08)` }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
            <span style={{ color: C.or, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>Découvrez le Sénégal</span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${C.or})` }} />
          </div>

          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Nos <span style={{ color: C.or }}>Destinations</span>
          </h1>

          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            6 zones d'exception pour vivre le Sénégal authentique
          </p>

          {/* Navigation rapide vers les zones */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {ZONES.map(zone => (
              <a key={zone.id} href={`#${zone.id}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = zone.couleur; e.currentTarget.style.borderColor = zone.couleur }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}>
                <span>{zone.emoji}</span>
                {zone.nom}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENU ZONES ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        {ZONES.map((zone, i) => (
          <ZoneCard key={zone.id} zone={zone} index={i} />
        ))}
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #1a3a1a)`, padding: '5rem 1.5rem', textAlign: 'center', borderTop: `3px solid ${C.or}` }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>
          Vous ne savez pas par où commencer ?
        </p>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: '1.5rem' }}>
          Laissez-nous composer<br /><span style={{ color: C.or }}>votre circuit sur mesure</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Contactez-nous sur WhatsApp, dites-nous vos envies et nous créons votre voyage idéal. Réponse sous 24h.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '14px 30px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}>
            <Phone size={18} /> Réserver sur WhatsApp
          </a>
          <Link to="/circuits"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: `2px solid ${C.or}`, color: C.or, fontWeight: 600, padding: '14px 30px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.color = C.noirChaud }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.or }}>
            Voir les circuits <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}