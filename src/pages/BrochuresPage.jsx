import { useState } from 'react'
import { Phone, BookOpen, ArrowRight, Star, X } from 'lucide-react'
import { usePanier } from '@/context/PanierContext'
import { ZONES_PANIER } from '@/lib/activites'
import PageHero from '@/components/ui/PageHero'
import CtaSection from '@/components/ui/CtaSection'
import useScrollReveal from '@/hooks/useScrollReveal'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

const BROCHURES = [
  {
    id: 'joal', titre: 'Joal-Fadiouth', sousTitre: 'L\'île aux coquillages', zone: 'Petite Côte', zoneId: 'petite-cote', lieuId: 'joal',
    couleur: C.vert, emoji: '🐚', image: '/images/excursions/joal-fadiouth.jpg',
    incontournables: ['Pont de bois 632 m', 'Église & mosquée côte à côte', 'Cimetière mixte', 'Baobab multi-centenaire', 'Retour en pirogue'],
    chapitres: [
      { titre: 'Histoire & Culture', contenu: `Joal est la ville natale de Léopold Sédar Senghor, né le 9 octobre 1906. Fadiouth est l'île aux coquillages, divisée en six quartiers sous la protection de saints. On y visite son église et sa mosquée, côte à côte, symboles de la cohabitation religieuse. L'île compte 10 000 habitants dont 90% sont chrétiens.` },
      { titre: 'L\'Île de Fadiouth', contenu: `La vie est rythmée par la pêche aux coquillages ramassées à marée basse. Vous emprunterez le pont en bois de 632 m. Le cimetière mixte chrétien-musulman est relié à l'île par un second pont. Les tombes, ensevelies de coquillages, sont plantées d'une croix blanche. Vue à 360° sur la lagune et la mangrove.` },
      { titre: 'Détail de l\'excursion', contenu: `Prise en charge au lieu de rendez-vous. Direction Joal, visite avec guide local. Retour depuis le cimetière en pirogue. Possibilité de jumelage avec l'Île du Saloum (–10%). Restaurant local à prix abordable disponible.` },
    ],
  },
  {
    id: 'saloum', titre: 'Île du Saloum', sousTitre: 'Delta & bolongs', zone: 'Sine Saloum', zoneId: 'saloum', lieuId: 'ndangane',
    couleur: '#2E7D32', emoji: '🦅', image: '/images/excursions/saloum-excursion.jpg',
    incontournables: ['Bolongs en pirogue', 'Village Mar Lodj', 'Île aux Oiseaux', 'Artiste peintre Pierre', 'Mangroves & palétuviers'],
    chapitres: [
      { titre: 'Le Delta du Saloum', contenu: `Delta formé par la confluence du Sine et du Saloum. L'excursion commence à Ndangane avec navigation dans les bolongs — labyrinthe de bras de mer bordés de mangroves, refuge du héron goliath et des crabes violonistes.` },
      { titre: 'Mar Lodj & l\'Île aux Oiseaux', contenu: `Halte à Mar Lodj, village sérère authentique à la cohabitation de trois religions. Pierre, artiste peintre, crée des tableaux en sable aux couleurs naturelles. Puis l'Île aux Oiseaux : des centaines de pélicans, mouettes, aigrettes dans leur sanctuaire.` },
    ],
  },
  {
    id: 'nianing', titre: 'Nianing & Mbour', sousTitre: 'Baobab sacré & Port', zone: 'Petite Côte', zoneId: 'petite-cote', lieuId: 'nianing',
    couleur: C.or, emoji: '🌳', image: '/images/excursions/nianing-mbour.jpg',
    incontournables: ['Baobab sacré des griots', 'Église en coquillage', 'Port de Mbour', 'Marché artisanal', 'Retour des pêcheurs'],
    chapitres: [
      { titre: 'Le Baobab Sacré', contenu: `Le baobab de Nianing est l'ancien cimetière des griots sérères. Hors norme par son volume, l'âme de plusieurs générations de griots plane ici, comme des archives invisibles de l'oralité.` },
      { titre: 'L\'Église en Coquillage & Mbour', contenu: `L'église de Nianing, l'une des plus belles d'Afrique, a une architecture en forme de coquillage avec 5 voûtes en ogive et un clocher de 45 m. À Mbour, chaque fin d'après-midi, des dizaines de pirogues accostent avec les prises du jour — spectacle fascinant.` },
    ],
  },
  {
    id: 'bandia', titre: 'Réserve de Bandia', sousTitre: 'Safari africain', zone: 'Petite Côte', zoneId: 'petite-cote', lieuId: 'bandia',
    couleur: C.rouge, emoji: '🦁', image: '/images/excursions/bandia.jpg',
    incontournables: ['Lions', 'Girafes & Zèbres', 'Rhinocéros', 'Buffles', 'Oiseaux rares'],
    chapitres: [
      { titre: 'La Réserve', contenu: `Située à Sindia, la Réserve de Bandia est l'un des sites les plus visités du Sénégal. Lions, girafes, zèbres, buffles, rhinocéros et antilopes y vivent en liberté dans un cadre naturel préservé.` },
      { titre: 'Le Safari', contenu: `Visite en véhicule avec guide local certifié. Nous nous chargeons des billets d'entrée. La réserve se découvre à bord de notre Kia Carnival, idéale pour l'observation depuis les fenêtres.` },
    ],
  },
  {
    id: 'lacrose', titre: 'Lac Rose', sousTitre: 'Lac Retba — Eaux roses', zone: 'Dakar', zoneId: 'dakar', lieuId: 'lac-rose',
    couleur: '#9B4D9B', emoji: '🌸', image: '/images/excursions/lac-rose.jpg',
    incontournables: ['Eaux roses uniques', 'Extraction du sel', 'Quad sur les dunes', 'Pirogue traditionnelle', 'Balade dromadaire'],
    chapitres: [
      { titre: 'Le Lac Retba', contenu: `Le Lac Rose doit ses eaux à des algues et à une forte concentration de sel. Il s'étend sur 3 km², profondeur 3 m. Autrefois connu grâce au rallye Paris-Dakar, il attire aujourd'hui des visiteurs du monde entier.` },
      { titre: 'Programme de la journée', contenu: `Quad sur les dunes, pirogue traditionnelle, découverte de la récolte du sel, balade à cheval ou dromadaire, déjeuner au bord du lac avec accès piscine. Départ 9h, retour 18h.` },
    ],
  },
]

function BrochureModal({ brochure, onClose }) {
  const { items, ajouterItem, supprimerItem } = usePanier()
  const zone = ZONES_PANIER.find(z => z.id === brochure.zoneId)
  const lieu = zone?.lieux.find(l => l.id === brochure.lieuId)
  const activites = lieu?.activites || []

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100, overflowY: 'auto', padding: '2rem 1rem' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ maxWidth: '820px', margin: '0 auto', background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        {/* Header image */}
        <div style={{ position: 'relative', height: '280px' }}>
          <img src={brochure.image} alt={brochure.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.15) 60%, transparent)' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
            <X size={18} />
          </button>
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
            <span style={{ background: brochure.couleur, color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', display: 'inline-block', marginBottom: '8px' }}>{brochure.zone}</span>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: 'white', margin: '4px 0 0', lineHeight: 1.1 }}>{brochure.titre}</h2>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', margin: 0 }}>{brochure.sousTitre}</p>
          </div>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Incontournables */}
          <div style={{ background: C.sable, borderRadius: '1rem', padding: '1.25rem', marginBottom: '2rem' }}>
            <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.82rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={13} color={brochure.couleur} fill={brochure.couleur} /> À ne pas manquer
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {brochure.incontournables.map(i => (
                <span key={i} style={{ fontSize: '0.78rem', background: `${brochure.couleur}18`, color: brochure.couleur, padding: '4px 12px', borderRadius: '9999px', fontWeight: 600 }}>✦ {i}</span>
              ))}
            </div>
          </div>

          {/* Chapitres */}
          {brochure.chapitres.map(({ titre, contenu }, i) => (
            <div key={i} style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: i < brochure.chapitres.length - 1 ? '1px solid #f0e8d8' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <div style={{ width: '4px', height: '22px', background: brochure.couleur, borderRadius: '9999px', flexShrink: 0 }} />
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: C.noirChaud, margin: 0 }}>{titre}</h3>
              </div>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.85, margin: 0 }}>{contenu}</p>
            </div>
          ))}

          {/* Activités disponibles */}
          {activites.length > 0 && (
            <div style={{ background: '#fafaf8', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem', border: `1px solid ${brochure.couleur}20` }}>
              <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.82rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                🎯 Activités disponibles — Ajoutez à votre circuit
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activites.map(act => {
                  const dans = items.find(i => i.id === act.id)
                  return (
                    <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.65rem 0.9rem', background: dans ? `${C.vert}10` : 'white', borderRadius: '0.65rem', border: `1px solid ${dans ? C.vert : '#f0e8d8'}`, transition: 'all 0.2s' }}>
                      <span style={{ fontSize: '1rem' }}>{act.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: '0.82rem', color: C.noirChaud, margin: 0 }}>{act.nom}</p>
                        <p style={{ color: act.surDevis ? C.or : C.vert, fontSize: '0.74rem', fontWeight: 700, margin: 0 }}>
                          {act.surDevis ? 'Sur devis' : `${act.prix.toLocaleString('fr-FR')} CFA/pers`}
                        </p>
                      </div>
                      <button onClick={() => dans ? supprimerItem(act.id) : ajouterItem({ ...act, zone: brochure.titre })}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', background: dans ? '#fee2e2' : brochure.couleur, color: dans ? C.rouge : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                        {dans ? <X size={12} /> : '+'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #f0e8d8' }}>
            <a href={`https://wa.me/+221788938254?text=Bonjour, je suis intéressé par l'excursion : ${brochure.titre}`}
              target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '12px 20px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem' }}>
              <Phone size={15} /> Réserver cette excursion
            </a>
            <button onClick={onClose}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `2px solid ${brochure.couleur}`, color: brochure.couleur, fontWeight: 600, padding: '12px 20px', borderRadius: '9999px', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem' }}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BrochuresPage() {
  useScrollReveal()
  const [ouverte, setOuverte] = useState(null)
  const [filtre, setFiltre] = useState('Toutes')
  const zones = ['Toutes', ...new Set(BROCHURES.map(b => b.zone))]
  const filtrees = filtre === 'Toutes' ? BROCHURES : BROCHURES.filter(b => b.zone === filtre)

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>
      <PageHero tag="Guides & informations" titre="Nos" orMot="Brochures" description="Guides culturels et historiques pour préparer votre voyage. Choisissez vos activités directement depuis chaque brochure." />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {/* Filtres */}
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem' }}>
          {zones.map(z => (
            <button key={z} onClick={() => setFiltre(z)}
              style={{ padding: '8px 20px', borderRadius: '9999px', border: `2px solid ${filtre === z ? C.or : '#e8d8b8'}`, background: filtre === z ? C.or : 'white', color: filtre === z ? C.noirChaud : '#666', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              {z}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {filtrees.map((b, idx) => (
            <div key={b.id} onClick={() => setOuverte(b)}
              style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.35s', border: '1px solid #f0e8d8', animation: `fadeUp 0.4s ease ${idx * 0.06}s both forwards` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img src={b.image} alt={b.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 55%)' }} />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: b.couleur, color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px' }}>{b.zone}</span>
                <span style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '1.8rem' }}>{b.emoji}</span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', fontWeight: 700, color: C.noirChaud, marginBottom: '2px' }}>{b.titre}</h3>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: b.couleur, fontSize: '0.92rem', marginBottom: '0.85rem' }}>{b.sousTitre}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '0.85rem' }}>
                  {b.incontournables.slice(0, 3).map(i => (
                    <span key={i} style={{ fontSize: '0.68rem', background: `${b.couleur}12`, color: b.couleur, padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>{i}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: b.couleur, fontSize: '0.82rem', fontWeight: 600 }}>
                  <BookOpen size={13} /> Lire + choisir mes activités <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Incontournables par zone */}
        <div className="reveal" style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, borderRadius: '1.5rem', padding: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>
              Les <span style={{ color: C.or }}>Incontournables</span> par zone
            </h2>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>Ce qu'il ne faut pas manquer</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { zone: 'Petite Côte', couleur: C.vert, emoji: '🏖️', items: ['Joal-Fadiouth', 'Baobab de Nianing', 'Port de Mbour', 'Safari Bandia', 'Mangroves Somone'] },
              { zone: 'Dakar', couleur: C.rouge, emoji: '🏙️', items: ['Île de Gorée', 'Lac Rose', 'Monument Renaissance', 'Mosquée de la Divinité', 'Marché Sandaga'] },
              { zone: 'Sine Saloum', couleur: '#2E7D32', emoji: '🦅', items: ['Bolongs en pirogue', 'Mar Lodj', 'Île aux Oiseaux', 'Palmarin', 'UNESCO Delta'] },
              { zone: 'Saint-Louis', couleur: C.or, emoji: '🌉', items: ['Île coloniale UNESCO', 'Pont Faidherbe', 'Langue de Barbarie', 'Parc du Djoudj', 'Jazz'] },
            ].map(({ zone, couleur, emoji, items }) => (
              <div key={zone} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.5rem', borderTop: `3px solid ${couleur}` }}>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: 'white', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{emoji}</span> {zone}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {items.map(i => (
                    <li key={i} style={{ display: 'flex', gap: '8px', color: 'rgba(255,255,255,0.72)', fontSize: '0.83rem' }}>
                      <span style={{ color: couleur, fontSize: '0.65rem', marginTop: '3px' }}>✦</span>{i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {ouverte && <BrochureModal brochure={ouverte} onClose={() => setOuverte(null)} />}
      <CtaSection titre="Une question sur" orMot="nos excursions ?" whatsappText="Bonjour, j'ai une question sur vos brochures et excursions" />
    </div>
  )
}