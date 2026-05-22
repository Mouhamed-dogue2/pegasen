import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ShoppingCart, Info, CheckCircle, ArrowRight, Zap, Shield, Users, MapPin } from 'lucide-react'
import useScrollReveal from '@/hooks/useScrollReveal'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

const TRANSPORT = [
  { destination: 'Saly / Mbodiène', distance: 30, min: 45000, max: 55000, emoji: '🏖️' },
  { destination: 'Joal / Pointe Sarène', distance: 50, min: 50000, max: 60000, emoji: '🐚' },
  { destination: 'Somone', distance: 60, min: 50000, max: 60000, emoji: '🦜' },
  { destination: 'Bandia', distance: 100, min: 60000, max: 75000, emoji: '🦁' },
  { destination: 'Aéroport DSS', distance: 60, min: 50000, max: 60000, emoji: '✈️' },
  { destination: 'Île Saloum (Ndangane)', distance: 200, min: 75000, max: 90000, emoji: '🦅' },
  { destination: 'Dakar centre', distance: 250, min: 80000, max: 95000, emoji: '🏙️' },
  { destination: 'Lac Rose', distance: 280, min: 85000, max: 100000, emoji: '🌸' },
  { destination: 'Saint-Louis', distance: 450, min: 110000, max: 130000, emoji: '🌉' },
  { destination: 'Kédougou', distance: 800, min: 140000, max: 170000, emoji: '🌊' },
]

const ACTIVITES_PRIX = [
  { destination: 'Bandia — Safari', activites: 'Entrée parc + guide local', min: 25000, max: 30000, emoji: '🦁', couleur: C.rouge },
  { destination: 'Joal-Fadiouth', activites: 'Guide local + pirogue retour', min: 5000, max: 7000, emoji: '🐚', couleur: C.vert },
  { destination: 'Saloum (journée)', activites: 'Pirogue + guide (sans déjeuner)', min: 10000, max: 15000, emoji: '🦅', couleur: '#2E7D32' },
  { destination: 'Saloum (avec déjeuner)', activites: 'Pirogue + guide + déjeuner pieds dans l\'eau', min: 20000, max: 25000, emoji: '🍽️', couleur: '#2E7D32' },
  { destination: 'Gorée', activites: 'Bateau A/R + guide local', min: 8000, max: 12000, emoji: '⚓', couleur: C.rouge },
  { destination: 'Lac Rose', activites: 'Quad + dromadaire + pirogue + déjeuner', min: 45000, max: 65000, emoji: '🌸', couleur: '#9B4D9B' },
]

function fmt(n) { return n.toLocaleString('fr-FR') + ' CFA' }

// ── Barre de progression distance ──────────────────────────
function DistanceBar({ distance, max = 800 }) {
  const pct = Math.round((distance / max) * 100)
  return (
    <div style={{ flex: 1, height: '6px', background: '#f0e8d8', borderRadius: '9999px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(to right, ${C.vert}, ${C.or})`, borderRadius: '9999px', transition: 'width 0.8s ease' }} />
    </div>
  )
}

export default function TarifsPage() {
  useScrollReveal()
  const [onglet, setOnglet] = useState('transport')

  const ONGLETS = [
    { id: 'transport', label: 'Transport seul', icon: '🚐', desc: 'Prix par véhicule' },
    { id: 'activites', label: 'Tout inclus', icon: '🎯', desc: 'Activités par personne' },
    { id: 'conditions', label: 'Conditions', icon: '📋', desc: 'Paiement & annulation' },
  ]

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #2a1500 100%)`, padding: '10rem 2rem 6rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />
        {/* Décors */}
        <div style={{ position: 'absolute', top: '15%', right: '5%', width: '350px', height: '350px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '3%', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.05)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
            <span style={{ color: C.or, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 600 }}>Transparence & clarté</span>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.8rem, 7vw, 5rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.05 }}>
            Nos <span style={{ color: C.or }}>Tarifs</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.35rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.72)', marginBottom: '2rem', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Des prix clairs, justes et transparents — exprimés en francs CFA
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '9999px', padding: '9px 20px' }}>
            <Info size={14} color={C.orClair} />
            <span style={{ color: C.orClair, fontSize: '0.82rem', fontWeight: 500 }}>Tarifs calculés au départ de Nianing · Variables selon votre lieu de départ</span>
          </div>
        </div>

        {/* ── 2 FORMULES ── */}
        <div style={{ maxWidth: '800px', margin: '3.5rem auto 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {[
            { emoji: '🚐', titre: 'Transport seul', desc: 'Vous gérez vos entrées, guides et repas. Nous vous emmenons confortablement.', note: 'Prix par véhicule · 1 à 11 passagers', couleur: C.vert, border: 'rgba(26,107,60,0.4)' },
            { emoji: '✨', titre: 'Tout inclus', desc: 'Transport, entrées, guides, pirogues, eau fraîche et repas. Vous ne payez rien sur place.', note: 'Transport ÷ personnes + activités', couleur: C.or, border: `rgba(212,160,23,0.5)`, star: true },
          ].map(({ emoji, titre, desc, note, couleur, border, star }) => (
            <div key={titre} style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: `1px solid ${border}`, borderRadius: '1.25rem', padding: '1.75rem', position: 'relative', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}>
              {star && (
                <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontSize: '0.68rem', fontWeight: 800, padding: '4px 14px', borderRadius: '9999px', whiteSpace: 'nowrap' }}>⭐ Recommandé</div>
              )}
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{emoji}</div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>{titre}</h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{desc}</p>
              <p style={{ color: couleur, fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ONGLETS STYLÉS ── */}
      <div style={{ background: 'white', position: 'sticky', top: '72px', zIndex: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', display: 'flex' }}>
          {ONGLETS.map(({ id, label, icon, desc }) => (
            <button key={id} onClick={() => setOnglet(id)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '1rem 0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: onglet === id ? `3px solid ${C.or}` : '3px solid transparent', transition: 'all 0.25s' }}>
              <span style={{ fontSize: '1.3rem' }}>{icon}</span>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: onglet === id ? C.or : '#555', transition: 'color 0.25s' }}>{label}</span>
              <span style={{ fontSize: '0.7rem', color: onglet === id ? C.or : '#aaa', display: 'none' }} className="tab-desc">{desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* ══ TRANSPORT SEUL ══ */}
        {onglet === 'transport' && (
          <div style={{ animation: 'fadeUp 0.45s ease both' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: C.noirChaud, marginBottom: '0.5rem' }}>
                Transport Seul
              </h2>
              <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Kia Carnival 11 places climatisée · Prix par véhicule aller-retour · Quel que soit le nombre de passagers</p>
              {/* Légende */}
              <div style={{ display: 'inline-flex', gap: '1.5rem', background: 'white', padding: '0.75rem 1.5rem', borderRadius: '9999px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '0.78rem', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '20px', height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or})`, borderRadius: '9999px' }} /> Distance
                </span>
                <span style={{ fontSize: '0.78rem', color: '#888' }}>Prix valable de 1 à 11 passagers</span>
              </div>
            </div>

            {/* Grille destinations */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
              {TRANSPORT.map((t, i) => (
                <div key={t.destination} style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid #f0e8d8', transition: 'all 0.3s', animation: `fadeUp 0.4s ease ${i * 0.04}s both` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = C.or }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)'; e.currentTarget.style.borderColor = '#f0e8d8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.85rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${C.or}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{t.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.95rem', margin: 0 }}>{t.destination}</p>
                      <p style={{ color: '#aaa', fontSize: '0.75rem', margin: 0 }}>{t.distance} km aller-retour</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: C.vert, fontWeight: 800, fontSize: '0.95rem', margin: 0, fontFamily: '"Playfair Display", serif' }}>{fmt(t.min)}</p>
                      <p style={{ color: '#bbb', fontSize: '0.72rem', margin: 0 }}>à {fmt(t.max)}</p>
                    </div>
                  </div>
                  <DistanceBar distance={t.distance} />
                </div>
              ))}
            </div>

            {/* Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '2.5rem' }}>
              {[
                { emoji: '👥', titre: 'Seul ou à deux ?', desc: 'Le tarif reste identique. 1 à 11 personnes = même prix par véhicule.', couleur: C.vert },
                { emoji: '🎟️', titre: 'Formule Bokkalé', desc: 'Réservez une seule place et partagez les frais avec d\'autres voyageurs.', couleur: C.or },
                { emoji: '📍', titre: 'Départ variable', desc: 'Ces tarifs partent de Nianing. Contactez-nous pour un devis depuis votre lieu.', couleur: C.rouge },
              ].map(({ emoji, titre, desc, couleur }) => (
                <div key={titre} style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', border: `1px solid ${couleur}20`, borderLeft: `4px solid ${couleur}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{emoji}</span>
                    <div>
                      <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.88rem', margin: '0 0 4px' }}>{titre}</p>
                      <p style={{ color: '#777', fontSize: '0.8rem', margin: 0, lineHeight: 1.55 }}>{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ TOUT INCLUS ══ */}
        {onglet === 'activites' && (
          <div style={{ animation: 'fadeUp 0.45s ease both' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Tout Inclus — Prix des Activités</h2>
              <p style={{ color: '#888', fontSize: '0.95rem' }}>Prix par personne · S'ajoute au coût du transport ÷ nombre de passagers</p>
            </div>

            {/* Exemple calcul visuel */}
            <div style={{ background: `linear-gradient(135deg, ${C.noirChaud} 0%, #2a1500 100%)`, borderRadius: '1.5rem', padding: '2.5rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />
              <div style={{ position: 'absolute', bottom: '-30px', right: '-20px', fontSize: '8rem', opacity: 0.04 }}>🧮</div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', color: C.orClair, marginBottom: '0.5rem', fontSize: '1.25rem' }}>💡 Comment ça marche ?</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Exemple concret : Safari Bandia pour <strong style={{ color: 'white' }}>6 personnes</strong>
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {[
                  { step: '①', label: 'Transport Kia', valeur: '60 000 CFA', detail: 'Prix du véhicule A/R', couleur: 'rgba(255,255,255,0.06)' },
                  { step: '②', label: '÷ 6 personnes', valeur: '10 000 CFA', detail: 'Part transport/pers', couleur: 'rgba(255,255,255,0.06)' },
                  { step: '③', label: '+ Activités Bandia', valeur: '25 000 CFA', detail: 'Entrée + guide', couleur: 'rgba(255,255,255,0.06)' },
                  { step: '④', label: 'Total / personne', valeur: '35 000 CFA', detail: 'Prix final par pers', couleur: 'rgba(212,160,23,0.2)', highlight: true },
                ].map(({ step, label, valeur, detail, couleur, highlight }) => (
                  <div key={label} style={{ background: couleur, borderRadius: '1rem', padding: '1.1rem', border: highlight ? `1.5px solid ${C.or}` : '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.7rem', color: highlight ? C.or : 'rgba(255,255,255,0.3)', fontWeight: 700 }}>{step}</div>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.68rem', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
                    <p style={{ color: highlight ? C.orClair : 'white', fontWeight: 800, fontSize: '1.15rem', margin: '0 0 2px', fontFamily: '"Playfair Display", serif' }}>{valeur}</p>
                    <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.68rem', margin: 0 }}>{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cartes activités */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {ACTIVITES_PRIX.map((t, i) => (
                <div key={t.destination} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid #f0e8d8', transition: 'all 0.3s', animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${t.couleur}20` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)' }}>
                  <div style={{ height: '4px', background: `linear-gradient(to right, ${t.couleur}, ${t.couleur}44)` }} />
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '0.85rem' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${t.couleur}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{t.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: C.noirChaud, fontSize: '0.98rem', margin: '0 0 3px' }}>{t.destination}</p>
                        <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>{t.activites}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `${t.couleur}0a`, borderRadius: '0.65rem', padding: '0.65rem 0.9rem' }}>
                      <span style={{ color: '#aaa', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Coût / personne</span>
                      <span style={{ color: t.couleur, fontWeight: 800, fontSize: '0.95rem', fontFamily: '"Playfair Display", serif' }}>{fmt(t.min)} – {fmt(t.max)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: '#bbb', fontSize: '0.78rem', fontStyle: 'italic' }}>
              * Prix indicatifs sous réserve de modification · Devis personnalisé gratuit sous 24h
            </p>
          </div>
        )}

        {/* ══ CONDITIONS ══ */}
        {onglet === 'conditions' && (
          <div style={{ animation: 'fadeUp 0.45s ease both' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Conditions Générales</h2>
              <p style={{ color: '#888', fontSize: '0.95rem' }}>Paiement, annulation et responsabilités — tout en toute transparence</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

              {/* PAIEMENT */}
              <div style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,0.08)', animation: 'fadeUp 0.4s ease both' }}>
                <div style={{ background: `linear-gradient(135deg, ${C.vert}, #2E7D32)`, padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>💳</div>
                    <div>
                      <h3 style={{ fontFamily: '"Playfair Display", serif', color: 'white', fontSize: '1.2rem', margin: 0 }}>Modalités de paiement</h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', margin: 0 }}>Plusieurs options disponibles</p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                    {[
                      { emoji: '📱', label: 'Wave', desc: 'Transfert mobile instantané — recommandé' },
                      { emoji: '🟠', label: 'Orange Money', desc: 'Paiement mobile Orange' },
                      { emoji: '🏦', label: 'Virement bancaire', desc: 'Sur demande préalable' },
                      { emoji: '💵', label: 'Espèces CFA', desc: 'Francs CFA uniquement' },
                    ].map(({ emoji, label, desc }) => (
                      <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '0.85rem 1rem', background: C.sable, borderRadius: '0.85rem' }}>
                        <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{emoji}</span>
                        <div>
                          <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.88rem', margin: 0 }}>{label}</p>
                          <p style={{ color: '#888', fontSize: '0.76rem', margin: 0 }}>{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '0.85rem', padding: '1rem 1.25rem' }}>
                    <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.88rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '6px' }}>🔐 Acompte à la réservation</p>
                    <p style={{ color: '#555', fontSize: '0.82rem', margin: 0, lineHeight: 1.6 }}>
                      <strong>25%</strong> du prix total pour confirmer votre réservation. Le solde est réglé le jour du départ.
                    </p>
                  </div>
                </div>
              </div>

              {/* ANNULATION */}
              <div style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,0.08)', animation: 'fadeUp 0.4s ease 0.08s both' }}>
                <div style={{ background: `linear-gradient(135deg, ${C.rouge}, #a93226)`, padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🔄</div>
                    <div>
                      <h3 style={{ fontFamily: '"Playfair Display", serif', color: 'white', fontSize: '1.2rem', margin: 0 }}>Politique d'annulation</h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', margin: 0 }}>Conditions selon le délai</p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    {[
                      { icon: '✅', delai: 'Plus de 72h avant le départ', cond: 'Acompte remboursé à 50%', couleur: C.vert, bg: 'rgba(26,107,60,0.06)', border: 'rgba(26,107,60,0.2)' },
                      { icon: '⏰', delai: 'Moins de 72h avant le départ', cond: 'Acompte non remboursable', couleur: C.rouge, bg: 'rgba(192,57,43,0.06)', border: 'rgba(192,57,43,0.2)' },
                      { icon: '🔁', delai: 'Annulation par PEGASEN221', cond: 'Remboursement intégral garanti', couleur: C.vert, bg: 'rgba(26,107,60,0.06)', border: 'rgba(26,107,60,0.2)' },
                    ].map(({ icon, delai, cond, couleur, bg, border }) => (
                      <div key={delai} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '0.85rem', padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{icon}</span>
                          <div>
                            <p style={{ fontWeight: 600, color: C.noirChaud, fontSize: '0.85rem', margin: '0 0 2px' }}>{delai}</p>
                            <p style={{ color: couleur, fontWeight: 700, fontSize: '0.82rem', margin: 0 }}>{cond}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RESPONSABILITÉS */}
              <div style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,0.08)', animation: 'fadeUp 0.4s ease 0.16s both' }}>
                <div style={{ background: `linear-gradient(135deg, ${C.or}, #b8870f)`, padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🛡️</div>
                    <div>
                      <h3 style={{ fontFamily: '"Playfair Display", serif', color: 'white', fontSize: '1.2rem', margin: 0 }}>Responsabilités & Assurances</h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', margin: 0 }}>Votre sécurité est notre priorité</p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '1.5rem 2rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {[
                      { icon: '🚗', txt: 'Véhicules assurés et régulièrement entretenus' },
                      { icon: '👨‍✈️', txt: 'Conducteurs professionnels expérimentés' },
                      { icon: '🔒', txt: 'Assurance voyage personnelle recommandée' },
                      { icon: '✅', txt: 'Respect des normes de sécurité en vigueur' },
                      { icon: '🧭', txt: 'Guides locaux certifiés et agréés' },
                      { icon: '💧', txt: 'Eau fraîche à bord de chaque véhicule' },
                    ].map(({ icon, txt }) => (
                      <li key={txt} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '0.75rem', background: C.sable, borderRadius: '0.75rem', fontSize: '0.85rem', color: '#555' }}>
                        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span> {txt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #1a3a1a)`, padding: '5rem 2rem', textAlign: 'center', borderTop: `3px solid ${C.or}` }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>Un devis sur mesure ?</p>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: '1.5rem' }}>
          Réponse garantie <span style={{ color: C.or }}>sous 24 heures</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Dites-nous vos destinations, le nombre de personnes et votre lieu de départ. Devis détaillé sans engagement.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <a href="https://wa.me/+221788938254?text=Bonjour, je souhaite un devis pour mon séjour au Sénégal" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '14px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(34,197,94,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <Phone size={18} /> Demander un devis gratuit
          </a>
          <Link to="/mon-circuit"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '14px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <ShoppingCart size={18} /> Composer mon circuit
          </Link>
        </div>
      </div>
    </div>
  )
}