import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, BookOpen, Download, MapPin, Star } from 'lucide-react'

const C = {
  or: '#D4A017',
  orClair: '#F0C040',
  vert: '#1A6B3C',
  rouge: '#C0392B',
  noirChaud: '#1C1208',
  sable: '#FDF3E3',
}

const BROCHURES = [
  {
    id: 'joal-fadiouth',
    titre: 'Joal-Fadiouth',
    sousTitre: 'L\'île aux coquillages',
    zone: 'Petite Côte',
    couleur: C.vert,
    emoji: '🐚',
    image: '/images/excursions/joal-fadiouth.jpg',
    chapitres: [
      {
        titre: 'Histoire & Culture',
        contenu: `Joal-Fadiouth est une commune composée de deux villages intimement liés. Joal, située sur le continent, est la ville natale de Léopold Sédar Senghor, né le 9 octobre 1906, homme d'État, poète, écrivain et premier président de la République du Sénégal.

Fadiouth est l'île aux coquillages, divisée en six quartiers, chacun sous la protection d'un saint ou d'une sainte. On y visite son église et sa mosquée, proches l'une de l'autre, symboles de la bonne entente entre les deux communautés religieuses.`
      },
      {
        titre: 'L\'île de Fadiouth',
        contenu: `L'île compte 10 000 habitants dont 90% sont chrétiens. La vie est ici rythmée par l'agriculture et la pêche aux poissons et aux coquillages, notamment celle des coques ramassées chaque jour par les femmes à marée basse.

Vous emprunterez un pont en bois, construit en 2006 et long de 632 mètres. On fait également une halte devant le baobab multi-centenaire et devant les maisons à palabres.`
      },
      {
        titre: 'Le Cimetière Mixte',
        contenu: `L'autre particularité de Fadiouth est son cimetière mixte chrétien et musulman, relié à l'île par un second pont en bois. Les tombes, ensevelies de coquillages, sont plantées d'une croix blanche.

De cet îlot vallonné et émaillé de nombreux baobabs, on jouit d'une belle vue à 360° sur la lagune, les petites îles environnantes et la mangrove, en direction du Siné Saloum. Il s'en dégage une atmosphère paisible et sereine.`
      },
      {
        titre: 'Détail de l\'excursion',
        contenu: `Prise en charge au lieu de rendez-vous fixé. Direction Joal. La visite du lieu est assurée par un guide local.

Après cette immersion culturelle et historique, nous reprenons la route pour un retour à votre hébergement. Le retour de la visite à partir du cimetière se fait en pirogue.

Possibilité de se restaurer dans un petit restaurant local à prix abordable. Vous pouvez jumeler cette excursion avec l'excursion de l'Île du Saloum avec une réduction de 10% sur les deux.`
      },
    ],
    incontournables: ['Pont de bois de 632 m', 'Église et mosquée côte à côte', 'Baobab multi-centenaire', 'Cimetière mixte', 'Retour en pirogue'],
  },
  {
    id: 'saloum',
    titre: 'Île du Saloum',
    sousTitre: 'Delta & bolongs',
    zone: 'Sine Saloum',
    couleur: '#2E7D32',
    emoji: '🦅',
    image: '/images/excursions/saloum-excursion.jpg',
    chapitres: [
      {
        titre: 'Le Delta du Saloum',
        contenu: `Le Saloum est un delta formé par la confluence de deux fleuves, le Sine et le Saloum. C'est également un bras de mer laissant entrer l'eau salée de plus en plus profondément dans les terres car le débit des deux fleuves est assez lent.

Votre excursion commence à l'embarcadère de Ndangane, où vous naviguerez à travers les bolongs qui forment un labyrinthe de bras de mer, se mêlant aux cours d'eau estuaires et s'enfonçant dans les terres. Ils sont bordés de mangroves et de palétuviers, servant de refuge et de zone de reproduction pour de nombreuses espèces, notamment le héron goliath et les crabes violonistes.`
      },
      {
        titre: 'Mar Lodj — Village sérère',
        contenu: `Halte à Mar Lodj, un village sérère authentique connu pour la cohabitation harmonieuse de trois religions : islam, christianisme et religion traditionnelle. Ses paysages paisibles et son arbre sacré sont remarquables.

La promenade vous permet de découvrir son église et sa mosquée. Bienvenue chez Pierre, un artiste peintre, qui vous fera un tableau en sable aux couleurs naturelles collé à la sève de baobab. Pierre est un artiste incroyable, ses tableaux sont pure merveille.`
      },
      {
        titre: 'L\'Île aux Oiseaux',
        contenu: `Nous poursuivons vers l'Île aux Oiseaux, véritable sanctuaire naturel où des centaines de mouettes, pélicans, cormorans, aigrettes et autres espèces migratrices se rassemblent dans leur habitat préservé.

Un spectacle unique à admirer depuis la pirogue, dans un silence absolu troublé seulement par les cris des oiseaux et le clapotis de l'eau.`
      },
    ],
    incontournables: ['Bolongs en pirogue', 'Village de Mar Lodj', 'Île aux Oiseaux', 'Mangroves & palétuviers', 'Artiste peintre sur sable'],
  },
  {
    id: 'nianing',
    titre: 'Nianing — Baobab Sacré',
    sousTitre: 'Épiphanie & Port de Mbour',
    zone: 'Petite Côte',
    couleur: C.or,
    emoji: '🌳',
    image: '/images/excursions/nianing-mbour.jpg',
    chapitres: [
      {
        titre: 'Le Baobab Sacré de Nianing',
        contenu: `Le baobab du village de Nianing est aussi impressionnant que mythique. Fascinant par son volume hors norme, l'arbre se singularise davantage par son statut d'ancien cimetière des griots sérères. L'âme de plusieurs générations de griots plane ici, comme des archives invisibles de l'oralité.`
      },
      {
        titre: 'L\'Église en Coquillage',
        contenu: `L'église de Nianing est considérée comme l'une des plus belles d'Afrique. Elle se caractérise par une architecture originale en forme de coquillage. Cinq voûtes en forme d'ogive se succèdent, l'église possède un clocher culminant à 45 mètres, accessible par un escalier hélicoïdal.

Cependant, cet escalier est conçu pour l'entretien et n'est pas ouvert au public ou aux touristes.`
      },
      {
        titre: 'Le Port de Mbour',
        contenu: `L'attraction principale de Mbour est sans conteste son port et son marché aux poissons. Chaque fin d'après-midi, la plage devient le théâtre d'un spectacle fascinant : le retour des pêcheurs.

Des dizaines de pirogues aux couleurs vives accostent sur le sable après avoir bravé les vagues, leurs cales chargées de poissons. S'ensuit une animation intense où les hommes déchargent les prises du jour, tandis que les femmes s'affairent à trier, écailler et préparer le poisson pour la vente.`
      },
    ],
    incontournables: ['Baobab sacré des griots', 'Église en forme de coquillage', 'Port de Mbour', 'Marché aux poissons', 'Marché artisanal'],
  },
  {
    id: 'bandia',
    titre: 'Réserve de Bandia',
    sousTitre: 'Safari africain',
    zone: 'Petite Côte',
    couleur: C.rouge,
    emoji: '🦁',
    image: '/images/excursions/bandia.jpg',
    chapitres: [
      {
        titre: 'La Réserve de Bandia',
        contenu: `La Réserve de Bandia, située à Sindia, est l'un des sites les plus visités du Sénégal. On y observe lions, girafes, zèbres, buffles, rhinocéros, antilopes et de nombreux oiseaux.

Une expérience de safari unique pour observer la faune africaine dans un cadre naturel préservé.`
      },
      {
        titre: 'Déroulement du Safari',
        contenu: `Prise en charge au lieu de rendez-vous fixé. Direction la réserve de Bandia. La visite du lieu est assurée par un guide local. Nous faisons la visite du parc avec notre propre véhicule et nous nous chargeons des billets d'entrée à la réserve.

Après cette immersion dans la faune africaine, nous reprenons la route pour un retour à votre hébergement.`
      },
    ],
    incontournables: ['Lions', 'Girafes & Zèbres', 'Rhinocéros', 'Buffles & Antilopes', 'Guide local certifié'],
  },
  {
    id: 'lac-rose',
    titre: 'Lac Rose',
    sousTitre: 'Lac Retba — Eaux roses',
    zone: 'Dakar',
    couleur: '#9B4D9B',
    emoji: '🌸',
    image: '/images/excursions/lac-rose.jpg',
    chapitres: [
      {
        titre: 'Le Lac Retba',
        contenu: `Le célèbre lac Rose, appelé lac Retba, est connu pour ses eaux roses. Celles-ci doivent leur teinte aux algues ainsi qu'à une forte concentration de sel.

Il s'étend sur environ 3 km², avec une profondeur faible (environ 3 mètres). Sa surface a tendance à diminuer, passant depuis les années 1970 de 15 km² à environ 4,2 km², en raison principalement d'une baisse de la pluviométrie.`
      },
      {
        titre: 'Histoire & Activités',
        contenu: `L'extraction du sel est pratiquée dans le lac lui-même, de façon manuelle. Autrefois essentiel pour l'industrie saline, ce lac fascine et attire aujourd'hui des voyageurs venus des quatre coins du monde.

C'est l'un des plus visités du Sénégal. Il doit sa renommée à la teinte originale et changeante de son eau, mais aussi grâce au rallye Paris-Dakar.`
      },
      {
        titre: 'Programme de la Journée',
        contenu: `Balade en quad à travers dunes, plage et paysages variés. Traversée du Lac Rose en pirogue traditionnelle. Découverte du processus de récolte du sel. Balade à cheval ou dromadaire. Déjeuner au bord du Lac Rose avec accès à la piscine du restaurant inclus.

Note : les boissons au restaurant ne sont pas comprises dans le prix.`
      },
    ],
    incontournables: ['Eaux roses uniques', 'Extraction du sel', 'Quad sur les dunes', 'Pirogue traditionnelle', 'Balade cheval/dromadaire'],
  },
]

// ── Composant brochure card ────────────────────────────────
function BrochureCard({ brochure, onClick }) {
  return (
    <div onClick={() => onClick(brochure)}
      style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.35s', border: '1px solid #f0e8d8' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={brochure.image} alt={brochure.titre}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 55%)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: brochure.couleur, color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px' }}>
          {brochure.zone}
        </div>
        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
          <span style={{ fontSize: '1.8rem' }}>{brochure.emoji}</span>
        </div>
      </div>
      {/* Contenu */}
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', fontWeight: 700, color: C.noirChaud, marginBottom: '2px' }}>{brochure.titre}</h3>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: brochure.couleur, fontSize: '0.95rem', marginBottom: '1rem' }}>{brochure.sousTitre}</p>
        {/* Incontournables */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1rem' }}>
          {brochure.incontournables.slice(0, 3).map(item => (
            <span key={item} style={{ fontSize: '0.72rem', background: `${brochure.couleur}15`, color: brochure.couleur, padding: '3px 8px', borderRadius: '9999px', fontWeight: 600 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: brochure.couleur, fontSize: '0.85rem', fontWeight: 600 }}>
          <BookOpen size={15} /> Lire la brochure <ArrowRight size={13} />
        </div>
      </div>
    </div>
  )
}

// ── Composant brochure détaillée ──────────────────────────
function BrochureDetail({ brochure, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, overflowY: 'auto', padding: '2rem 1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        {/* Header image */}
        <div style={{ position: 'relative', height: '280px' }}>
          <img src={brochure.image} alt={brochure.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          {/* Bouton fermer */}
          <button onClick={onClose}
            style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', color: 'white', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
            <span style={{ background: brochure.couleur, color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', marginBottom: '8px', display: 'inline-block' }}>{brochure.zone}</span>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: 'white', margin: '4px 0 0', lineHeight: 1.1 }}>{brochure.titre}</h2>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', margin: 0 }}>{brochure.sousTitre}</p>
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: '2rem' }}>
          {/* Incontournables */}
          <div style={{ background: C.sable, borderRadius: '1rem', padding: '1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={14} color={brochure.couleur} fill={brochure.couleur} /> À ne pas manquer
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {brochure.incontournables.map(item => (
                <span key={item} style={{ fontSize: '0.82rem', background: `${brochure.couleur}18`, color: brochure.couleur, padding: '5px 12px', borderRadius: '9999px', fontWeight: 600 }}>✦ {item}</span>
              ))}
            </div>
          </div>

          {/* Chapitres */}
          {brochure.chapitres.map(({ titre, contenu }, i) => (
            <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < brochure.chapitres.length - 1 ? '1px solid #f0e8d8' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <div style={{ width: '4px', height: '24px', background: brochure.couleur, borderRadius: '9999px', flexShrink: 0 }} />
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', color: C.noirChaud, margin: 0 }}>{titre}</h3>
              </div>
              <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.85, margin: 0, whiteSpace: 'pre-line' }}>{contenu}</p>
            </div>
          ))}

          {/* CTA */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0e8d8' }}>
            <a href={`https://wa.me/+221788938254?text=Bonjour, je suis intéressé par l'excursion : ${brochure.titre}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem', flex: 1, justifyContent: 'center' }}>
              <Phone size={16} /> Réserver cette excursion
            </a>
            <button onClick={onClose}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `2px solid ${brochure.couleur}`, color: brochure.couleur, fontWeight: 600, padding: '12px 24px', borderRadius: '9999px', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', flex: 1, justifyContent: 'center' }}>
              Fermer la brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PAGE PRINCIPALE ────────────────────────────────────────
export default function BrochuresPage() {
  const [brochureOuverte, setBrochureOuverte] = useState(null)
  const [filtreZone, setFiltreZone] = useState('Toutes')

  const zones = ['Toutes', ...new Set(BROCHURES.map(b => b.zone))]
  const brochuresFiltrees = filtreZone === 'Toutes' ? BROCHURES : BROCHURES.filter(b => b.zone === filtreZone)

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #2a1500 100%)`, padding: '10rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
            <span style={{ color: C.or, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>Guides & informations</span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${C.or})` }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Nos <span style={{ color: C.or }}>Brochures</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', maxWidth: '550px', margin: '0 auto' }}>
            Guides culturels et historiques pour préparer votre voyage au Sénégal
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* Filtres par zone */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem' }}>
          {zones.map(zone => (
            <button key={zone} onClick={() => setFiltreZone(zone)}
              style={{ padding: '8px 20px', borderRadius: '9999px', border: `2px solid ${filtreZone === zone ? C.or : '#e8d8b8'}`, background: filtreZone === zone ? C.or : 'white', color: filtreZone === zone ? C.noirChaud : '#666', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              {zone}
            </button>
          ))}
        </div>

        {/* Grille brochures */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {brochuresFiltrees.map(brochure => (
            <BrochureCard key={brochure.id} brochure={brochure} onClick={setBrochureOuverte} />
          ))}
        </div>

        {/* Section incontournables par zone */}
        <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, borderRadius: '1.5rem', padding: '3rem', marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>
              Les <span style={{ color: C.or }}>Incontournables</span> par zone
            </h2>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem' }}>
              Ce qu'il ne faut surtout pas manquer
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { zone: 'Petite Côte', couleur: C.vert, emoji: '🏖️', items: ['Joal-Fadiouth', 'Baobab de Nianing', 'Port de Mbour', 'Safari Bandia', 'Somone mangrove'] },
              { zone: 'Dakar', couleur: C.rouge, emoji: '🏙️', items: ['Île de Gorée', 'Lac Rose', 'Monument Renaissance', 'Mosquée de la Divinité', 'Marché Sandaga'] },
              { zone: 'Sine Saloum', couleur: '#2E7D32', emoji: '🦅', items: ['Bolongs en pirogue', 'Mar Lodj', 'Île aux Oiseaux', 'Palmarin', 'Mangroves UNESCO'] },
              { zone: 'Saint-Louis', couleur: C.or, emoji: '🌉', items: ['Île coloniale UNESCO', 'Pont Faidherbe', 'Langue de Barbarie', 'Parc du Djoudj', 'Jazz de Saint-Louis'] },
            ].map(({ zone, couleur, emoji, items }) => (
              <div key={zone} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.5rem', borderTop: `3px solid ${couleur}` }}>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: 'white', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{emoji}</span> {zone}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>
                      <span style={{ color: couleur, fontSize: '0.7rem' }}>✦</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brochure ouverte en modal */}
      {brochureOuverte && (
        <BrochureDetail brochure={brochureOuverte} onClose={() => setBrochureOuverte(null)} />
      )}
    </div>
  )
}