import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, CheckCircle, Info } from 'lucide-react'

const C = {
  or: '#D4A017',
  orClair: '#F0C040',
  vert: '#1A6B3C',
  rouge: '#C0392B',
  noirChaud: '#1C1208',
  sable: '#FDF3E3',
}

// ── TARIFS TRANSPORT SEUL ─────────────────────────────────
const TARIFS_TRANSPORT = [
  { destination: 'Saly / Mbodiène',         distance: 30,  min: 45000,  max: 55000  },
  { destination: 'Joal / Pointe Sarène',    distance: 50,  min: 50000,  max: 60000  },
  { destination: 'Somone',                   distance: 60,  min: 50000,  max: 60000  },
  { destination: 'Bandia',                   distance: 100, min: 60000,  max: 75000  },
  { destination: 'Aéroport DSS',             distance: 60,  min: 50000,  max: 60000  },
  { destination: 'Île Saloum (Ndangane)',    distance: 200, min: 75000,  max: 90000  },
  { destination: 'Dakar centre',             distance: 250, min: 80000,  max: 95000  },
  { destination: 'Lac Rose',                 distance: 280, min: 85000,  max: 100000 },
  { destination: 'Saint-Louis',              distance: 450, min: 110000, max: 130000 },
  { destination: 'Kédougou',                 distance: 800, min: 140000, max: 170000 },
]

// ── TARIFS ACTIVITÉS (tout inclus, par personne) ──────────
const TARIFS_ACTIVITES = [
  { destination: 'Bandia',         activites: 'Entrée parc + guide local',                      min: 25000, max: 30000 },
  { destination: 'Joal-Fadiouth',  activites: 'Guide local + pirogue retour',                   min: 5000,  max: 7000  },
  { destination: 'Saloum (journée)', activites: 'Pirogue + guide local (sans déjeuner)',         min: 10000, max: 15000 },
  { destination: 'Saloum (avec déjeuner)', activites: 'Pirogue + guide + déjeuner pieds dans l\'eau', min: 20000, max: 25000 },
  { destination: 'Gorée',          activites: 'Bateau A/R + guide local',                       min: 8000,  max: 12000 },
  { destination: 'Lac Rose',       activites: 'Quad + char à bœufs (2 activités)',               min: 20000, max: 25000 },
]

// ── MODALITÉS PAIEMENT ────────────────────────────────────
const PAIEMENTS = [
  { label: 'Wave', emoji: '📱', desc: 'Transfert mobile instantané' },
  { label: 'Orange Money', emoji: '🟠', desc: 'Paiement mobile Orange' },
  { label: 'Virement bancaire', emoji: '🏦', desc: 'Sur demande' },
  { label: 'Espèces CFA', emoji: '💵', desc: 'Francs CFA acceptés' },
]

// ── POLITIQUE ANNULATION ──────────────────────────────────
const ANNULATION = [
  { delai: 'Plus de 72h avant le départ', condition: 'Acompte remboursé à 50%', couleur: C.vert },
  { delai: 'Moins de 72h avant le départ', condition: 'Acompte non remboursable', couleur: C.rouge },
  { delai: 'Annulation par PEGASEN221', condition: 'Remboursement intégral', couleur: C.vert },
]

function formatCFA(montant) {
  return montant.toLocaleString('fr-FR') + ' CFA'
}

export default function TarifsPage() {
  const [onglet, setOnglet] = useState('transport')

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #2a1500 100%)`, padding: '10rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
            <span style={{ color: C.or, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>Transparence & clarté</span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${C.or})` }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Nos <span style={{ color: C.or }}>Tarifs</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', maxWidth: '550px', margin: '0 auto 1.5rem' }}>
            Des prix clairs, justes et transparents — en francs CFA
          </p>
          {/* Note départ */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,160,23,0.15)', border: `1px solid rgba(212,160,23,0.3)`, borderRadius: '9999px', padding: '8px 18px' }}>
            <Info size={14} color={C.orClair} />
            <span style={{ color: C.orClair, fontSize: '0.82rem' }}>Tarifs calculés au départ de Nianing — Peuvent varier selon votre lieu de départ</span>
          </div>
        </div>
      </div>

      {/* ── 2 FORMULES EN CARDS ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>

          {/* Transport seul */}
          <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: `4px solid ${C.vert}`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚐</div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: C.noirChaud, marginBottom: '0.75rem' }}>Transport seul</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              Vous gérez vos entrées, vos guides locaux et vos repas. Nous vous emmenons et ramenons confortablement.
            </p>
            <p style={{ color: C.vert, fontWeight: 700, fontSize: '0.85rem' }}>Prix par véhicule (1 à 11 personnes)</p>
          </div>

          {/* Tout inclus */}
          <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', boxShadow: `0 8px 30px rgba(212,160,23,0.2)`, borderTop: `4px solid ${C.or}`, textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontSize: '0.72rem', fontWeight: 700, padding: '4px 14px', borderRadius: '9999px', whiteSpace: 'nowrap' }}>
              ⭐ Recommandé
            </div>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✨</div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: C.noirChaud, marginBottom: '0.75rem' }}>Tout inclus</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              Nous nous occupons de tout : transport, entrées, guides locaux, pirogues, eau fraîche et repas si besoin. Vous ne payez rien sur place.
            </p>
            <p style={{ color: C.or, fontWeight: 700, fontSize: '0.85rem' }}>Transport ÷ nbre de personnes + activités</p>
          </div>
        </div>
      </div>

      {/* ── ONGLETS ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #f0e8d8', position: 'sticky', top: '70px', zIndex: 40, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', overflowX: 'auto' }}>
          {[
            { id: 'transport', label: '🚐 Transport seul' },
            { id: 'activites', label: '🎯 Activités (tout inclus)' },
            { id: 'conditions', label: '📋 Conditions générales' },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setOnglet(id)}
              style={{ padding: '1.1rem 1.5rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: onglet === id ? C.or : '#777', borderBottom: onglet === id ? `3px solid ${C.or}` : '3px solid transparent', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* ── TRANSPORT SEUL ── */}
        {onglet === 'transport' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Tarifs Transport Seul</h2>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>Kia Carnival 11 places climatisée · Prix par véhicule aller-retour · Départ de Nianing</p>
            </div>

            {/* Tableau */}
            <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
              {/* En-tête */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: C.noirChaud, padding: '1rem 1.5rem' }}>
                <span style={{ color: C.orClair, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Destination</span>
                <span style={{ color: C.orClair, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>Distance A/R</span>
                <span style={{ color: C.orClair, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'right' }}>Prix (CFA)</span>
              </div>
              {/* Lignes */}
              {TARIFS_TRANSPORT.map((t, i) => (
                <div key={t.destination} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '1rem 1.5rem', background: i % 2 === 0 ? 'white' : C.sable, borderBottom: '1px solid #f0e8d8', alignItems: 'center', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fef3d8'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : C.sable}>
                  <span style={{ fontWeight: 600, color: C.noirChaud, fontSize: '0.95rem' }}>{t.destination}</span>
                  <span style={{ color: '#888', fontSize: '0.88rem', textAlign: 'center' }}>{t.distance} km</span>
                  <span style={{ textAlign: 'right', fontWeight: 700, color: C.vert, fontSize: '0.95rem' }}>
                    {formatCFA(t.min)} – {formatCFA(t.max)}
                  </span>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                { emoji: '👥', titre: 'Seul ou à deux ?', desc: 'Le tarif reste le même. 1 à 11 personnes, même prix par véhicule.' },
                { emoji: '🚐', titre: 'Formule Bokkalé', desc: 'Réservez à la place et partagez les frais avec d\'autres voyageurs.' },
                { emoji: '📍', titre: 'Départ variable', desc: 'Ces tarifs sont calculés depuis Nianing. Contactez-nous pour un devis depuis votre lieu.' },
              ].map(({ emoji, titre, desc }) => (
                <div key={titre} style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', border: `1px solid #f0e8d8`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{emoji}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.9rem', margin: '0 0 4px' }}>{titre}</p>
                    <p style={{ color: '#666', fontSize: '0.83rem', margin: 0, lineHeight: 1.55 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACTIVITÉS ── */}
        {onglet === 'activites' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Tarifs Activités — Tout Inclus</h2>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>Prix par personne · S'ajoute au coût du transport divisé par le nombre de passagers</p>
            </div>

            {/* Exemple calcul */}
            <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, borderRadius: '1.25rem', padding: '2rem', marginBottom: '2.5rem', color: 'white' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: C.orClair, marginBottom: '1rem' }}>
                💡 Exemple de calcul — Bandia pour 6 personnes
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Transport (Kia)', valeur: '60 000 CFA', detail: 'Prix du véhicule' },
                  { label: 'Transport / personne', valeur: '10 000 CFA', detail: '60 000 ÷ 6 personnes' },
                  { label: 'Activités Bandia', valeur: '25 000 CFA', detail: 'Entrée + guide par personne' },
                  { label: 'Total par personne', valeur: '35 000 CFA', detail: 'Transport + activités', highlight: true },
                ].map(({ label, valeur, detail, highlight }) => (
                  <div key={label} style={{ background: highlight ? `rgba(212,160,23,0.2)` : 'rgba(255,255,255,0.07)', borderRadius: '0.75rem', padding: '1rem', border: highlight ? `1px solid ${C.or}` : '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', margin: '0 0 4px' }}>{label}</p>
                    <p style={{ color: highlight ? C.orClair : 'white', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 2px', fontFamily: '"Playfair Display", serif' }}>{valeur}</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', margin: 0 }}>{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tableau activités */}
            <div style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', background: C.noirChaud, padding: '1rem 1.5rem' }}>
                <span style={{ color: C.orClair, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Destination</span>
                <span style={{ color: C.orClair, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Activités incluses</span>
                <span style={{ color: C.orClair, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'right' }}>Coût / personne</span>
              </div>
              {TARIFS_ACTIVITES.map((t, i) => (
                <div key={t.destination} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', padding: '1rem 1.5rem', background: i % 2 === 0 ? 'white' : C.sable, borderBottom: '1px solid #f0e8d8', alignItems: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fef3d8'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : C.sable}>
                  <span style={{ fontWeight: 600, color: C.noirChaud, fontSize: '0.9rem' }}>{t.destination}</span>
                  <span style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.4 }}>{t.activites}</span>
                  <span style={{ textAlign: 'right', fontWeight: 700, color: C.vert, fontSize: '0.9rem' }}>
                    {formatCFA(t.min)} – {formatCFA(t.max)}
                  </span>
                </div>
              ))}
            </div>

            <p style={{ textAlign: 'center', color: '#999', fontSize: '0.82rem', fontStyle: 'italic' }}>
              * Prix indicatifs sous réserve de modification. Un devis personnalisé vous sera fourni sur demande.
            </p>
          </div>
        )}

        {/* ── CONDITIONS GÉNÉRALES ── */}
        {onglet === 'conditions' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

            {/* Modalités paiement */}
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: `4px solid ${C.vert}` }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: C.noirChaud, marginBottom: '1.25rem' }}>💳 Modalités de paiement</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {PAIEMENTS.map(({ label, emoji, desc }) => (
                  <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '0.75rem', background: C.sable, borderRadius: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{emoji}</span>
                    <div>
                      <p style={{ fontWeight: 600, color: C.noirChaud, fontSize: '0.9rem', margin: 0 }}>{label}</p>
                      <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Acompte */}
              <div style={{ background: `rgba(212,160,23,0.1)`, border: `1px solid ${C.or}40`, borderRadius: '0.75rem', padding: '1rem' }}>
                <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.9rem', marginBottom: '0.4rem' }}>🔐 Acompte à la réservation</p>
                <p style={{ color: '#555', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>
                  <strong>25%</strong> du prix total pour confirmer votre réservation. Le solde est réglé le jour du départ.
                </p>
              </div>
            </div>

            {/* Politique annulation */}
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: `4px solid ${C.rouge}` }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: C.noirChaud, marginBottom: '1.25rem' }}>🔄 Politique d'annulation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {ANNULATION.map(({ delai, condition, couleur }) => (
                  <div key={delai} style={{ borderLeft: `4px solid ${couleur}`, paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                    <p style={{ fontWeight: 600, color: C.noirChaud, fontSize: '0.88rem', margin: '0 0 2px' }}>{delai}</p>
                    <p style={{ color: couleur, fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>{condition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsabilités */}
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: `4px solid ${C.or}` }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: C.noirChaud, marginBottom: '1.25rem' }}>🛡️ Responsabilités & assurances</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Véhicules assurés et régulièrement entretenus',
                  'Conducteurs professionnels expérimentés',
                  'Recommandation d\'une assurance voyage personnelle',
                  'Respect des normes de sécurité en vigueur',
                  'Guides locaux certifiés et agréés',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: '#555' }}>
                    <CheckCircle size={15} color={C.or} style={{ flexShrink: 0, marginTop: '2px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ── CTA DEVIS ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #1a3a1a)`, padding: '5rem 1.5rem', textAlign: 'center', borderTop: `3px solid ${C.or}` }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>Un devis sur mesure ?</p>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1.5rem' }}>
          Réponse garantie <span style={{ color: C.or }}>sous 24 heures</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Dites-nous vos destinations, le nombre de personnes et votre lieu de départ. Nous vous envoyons un devis détaillé rapidement.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <a href="https://wa.me/+221788938254?text=Bonjour, je souhaite un devis pour mon séjour au Sénégal"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '15px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}>
            <Phone size={18} /> Demander un devis gratuit
          </a>
          <Link to="/circuits"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: `2px solid ${C.or}`, color: C.or, fontWeight: 600, padding: '15px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.color = C.noirChaud }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.or }}>
            Voir les circuits <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}