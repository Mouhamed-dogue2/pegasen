import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Plus, Minus, Trash2, Phone, ChevronDown, CheckCircle, X, ArrowLeft, MapPin } from 'lucide-react'
import { usePanier } from '@/context/PanierContext'
import { ZONES_PANIER } from '@/lib/activites'

const C = {
  or: '#D4A017', orClair: '#F0C040',
  vert: '#1A6B3C', rouge: '#C0392B',
  noirChaud: '#1C1208', sable: '#FDF3E3',
}

// ── Carte Activité ─────────────────────────────────────────
function CarteActivite({ activite, couleurZone }) {
  const { items, ajouterItem, supprimerItem } = usePanier()
  const dansLePanier = items.find(i => i.id === activite.id)

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.85rem',
      padding: '1rem',
      border: dansLePanier ? `2px solid ${C.vert}` : '2px solid #f0e8d8',
      boxShadow: dansLePanier ? `0 4px 20px rgba(26,107,60,0.15)` : '0 2px 10px rgba(0,0,0,0.05)',
      transition: 'all 0.3s',
      display: 'flex', alignItems: 'center', gap: '0.85rem',
    }}>
      {/* Emoji */}
      <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: dansLePanier ? `${C.vert}15` : `${couleurZone}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
        {activite.emoji}
      </div>

      {/* Infos */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, fontSize: '0.88rem', color: C.noirChaud, margin: '0 0 2px', lineHeight: 1.3 }}>{activite.nom}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '4px' }}>
          {activite.inclus.map(inc => (
            <span key={inc} style={{ fontSize: '0.62rem', background: '#f0faf4', color: C.vert, padding: '1px 6px', borderRadius: '9999px', fontWeight: 600 }}>✓ {inc}</span>
          ))}
        </div>
        <p style={{ color: activite.surDevis ? C.or : C.vert, fontWeight: 700, fontSize: '0.88rem', margin: 0 }}>
          {activite.surDevis ? '📋 Sur devis' : `${activite.prix.toLocaleString('fr-FR')} CFA / ${activite.unite}`}
        </p>
      </div>

      {/* Bouton */}
      <button onClick={() => dansLePanier ? supprimerItem(activite.id) : ajouterItem({ ...activite, zoneId: activite.id.split('-')[0] })}
        style={{
          width: '36px', height: '36px', borderRadius: '50%', border: 'none',
          background: dansLePanier ? '#fee2e2' : couleurZone,
          color: dansLePanier ? C.rouge : 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        {dansLePanier ? <X size={14} /> : <Plus size={14} />}
      </button>
    </div>
  )
}

// ── Lieu accordéon ─────────────────────────────────────────
function LieuAccordeon({ lieu, couleurZone }) {
  const [ouvert, setOuvert] = useState(false)
  const { items } = usePanier()
  const nbDansLieu = items.filter(i => lieu.activites.some(a => a.id === i.id)).length

  return (
    <div style={{ borderRadius: '1rem', overflow: 'hidden', border: `1.5px solid ${ouvert ? couleurZone : '#e8d8b8'}`, transition: 'all 0.3s', marginBottom: '0.75rem' }}>
      <button onClick={() => setOuvert(!ouvert)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem',
        background: ouvert ? `${couleurZone}08` : 'white',
        border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s',
      }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
          <img src={lieu.image} alt={lieu.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>{lieu.emoji}</span>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: 700, color: C.noirChaud, margin: 0 }}>{lieu.nom}</p>
            {nbDansLieu > 0 && (
              <span style={{ background: C.vert, color: 'white', borderRadius: '9999px', padding: '2px 8px', fontSize: '0.65rem', fontWeight: 700 }}>
                {nbDansLieu} chois{nbDansLieu > 1 ? 'ies' : 'ie'}
              </span>
            )}
          </div>
          <p style={{ color: '#888', fontSize: '0.78rem', margin: '2px 0 0' }}>{lieu.description}</p>
        </div>
        <div style={{ color: couleurZone, transition: 'transform 0.3s', transform: ouvert ? 'rotate(180deg)' : 'rotate(0)' }}>
          <ChevronDown size={20} />
        </div>
      </button>

      <div style={{ maxHeight: ouvert ? '1500px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
        <div style={{ padding: '0.75rem 1.25rem 1.25rem', background: '#fafaf8', borderTop: `1px solid ${couleurZone}15`, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {lieu.activites.map(act => <CarteActivite key={act.id} activite={act} couleurZone={couleurZone} />)}
        </div>
      </div>
    </div>
  )
}

// ── Zone accordéon ─────────────────────────────────────────
function ZoneAccordeon({ zone }) {
  const [ouvert, setOuvert] = useState(false)
  const { items } = usePanier()
  const nbDansZone = items.filter(i => zone.lieux.some(l => l.activites.some(a => a.id === i.id))).length

  return (
    <div style={{ borderRadius: '1.25rem', overflow: 'hidden', border: `2px solid ${ouvert ? zone.couleur : '#e8d8b8'}`, transition: 'all 0.35s', boxShadow: ouvert ? `0 8px 30px ${zone.couleur}20` : 'none', marginBottom: '1rem' }}>
      <button onClick={() => setOuvert(!ouvert)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1.25rem 1.5rem',
        background: ouvert ? `linear-gradient(135deg, ${zone.couleur}12, white)` : 'white',
        border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s',
      }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: `3px solid ${zone.couleur}40` }}>
          <img src={zone.image} alt={zone.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.4rem' }}>{zone.emoji}</span>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 700, color: C.noirChaud, margin: 0 }}>{zone.nom}</p>
            {nbDansZone > 0 && (
              <span style={{ background: C.vert, color: 'white', borderRadius: '9999px', padding: '3px 10px', fontSize: '0.7rem', fontWeight: 700 }}>
                {nbDansZone} activité{nbDansZone > 1 ? 's' : ''} choisie{nbDansZone > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p style={{ color: '#888', fontSize: '0.82rem', margin: '3px 0 0' }}>{zone.description}</p>
          <p style={{ color: zone.couleur, fontSize: '0.75rem', margin: '3px 0 0', fontWeight: 600 }}>
            {zone.lieux.length} lieu{zone.lieux.length > 1 ? 'x' : ''} disponible{zone.lieux.length > 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ color: zone.couleur, transition: 'transform 0.3s', transform: ouvert ? 'rotate(180deg)' : 'rotate(0)' }}>
          <ChevronDown size={24} />
        </div>
      </button>

      <div style={{ maxHeight: ouvert ? '5000px' : '0', overflow: 'hidden', transition: 'max-height 0.6s ease' }}>
        <div style={{ padding: '1rem 1.5rem 1.5rem', background: '#fafaf8', borderTop: `1px solid ${zone.couleur}20` }}>
          {zone.lieux.map(lieu => <LieuAccordeon key={lieu.id} lieu={lieu} couleurZone={zone.couleur} />)}
        </div>
      </div>
    </div>
  )
}

// ── Panier latéral ─────────────────────────────────────────
function PanierLateral() {
  const { items, supprimerItem, modifierQuantite, total, viderPanier, genererMessageWhatsApp } = usePanier()

  return (
    <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #f0e8d8', position: 'sticky', top: '100px', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShoppingCart size={20} color={C.or} />
          <p style={{ fontFamily: '"Playfair Display", serif', color: 'white', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Mon Circuit</p>
        </div>
        {items.length > 0 && (
          <span style={{ background: C.or, color: C.noirChaud, borderRadius: '9999px', minWidth: '24px', height: '24px', padding: '0 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>
            {items.length}
          </span>
        )}
      </div>

      {/* Items */}
      <div style={{ padding: '1rem 1.25rem', maxHeight: '400px', overflowY: 'auto' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🗺️</div>
            <p style={{ color: '#bbb', fontSize: '0.85rem', lineHeight: 1.65 }}>
              Votre circuit est vide.<br />
              Ouvrez une zone et choisissez<br />des activités !
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: C.sable, borderRadius: '0.85rem', padding: '0.85rem', border: '1px solid #f0e8d8' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.8rem', color: C.noirChaud, margin: '0 0 1px', lineHeight: 1.3 }}>{item.nom}</p>
                    {item.zone && <p style={{ color: '#aaa', fontSize: '0.7rem', margin: 0 }}>📍 {item.zone}</p>}
                  </div>
                  <button onClick={() => supprimerItem(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ddd', cursor: 'pointer', padding: '2px', flexShrink: 0, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = C.rouge}
                    onMouseLeave={e => e.currentTarget.style.color = '#ddd'}>
                    <X size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => modifierQuantite(item.id, item.quantite - 1)}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.rouge; e.currentTarget.style.borderColor = C.rouge; e.currentTarget.style.color = 'white' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '' }}>
                      <Minus size={10} />
                    </button>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: C.noirChaud, minWidth: '20px', textAlign: 'center' }}>{item.quantite}</span>
                    <button onClick={() => modifierQuantite(item.id, item.quantite + 1)}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.vert; e.currentTarget.style.borderColor = C.vert; e.currentTarget.style.color = 'white' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '' }}>
                      <Plus size={10} />
                    </button>
                    <span style={{ color: '#bbb', fontSize: '0.68rem' }}>pers.</span>
                  </div>
                  <span style={{ color: item.surDevis ? C.or : C.vert, fontWeight: 700, fontSize: '0.85rem' }}>
                    {item.surDevis ? '📋 Devis' : `${(item.prix * item.quantite).toLocaleString('fr-FR')} CFA`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div style={{ padding: '1rem 1.25rem 1.25rem', borderTop: '1px solid #f0e8d8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: C.sable, borderRadius: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <p style={{ color: '#888', fontSize: '0.72rem', margin: '0 0 1px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Estimation</p>
              <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: C.vert, fontSize: '1.15rem', margin: 0 }}>
                {total > 0 ? `${total.toLocaleString('fr-FR')} CFA` : 'Sur devis'}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#aaa', fontSize: '0.7rem', margin: 0, fontStyle: 'italic' }}>
                {items.length} activité{items.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <p style={{ color: '#ccc', fontSize: '0.65rem', textAlign: 'center', marginBottom: '0.75rem', fontStyle: 'italic', lineHeight: 1.4 }}>
            Prix indicatifs par personne. Devis définitif envoyé sous 24h.
          </p>

          <button onClick={() => {
            const msg = genererMessageWhatsApp()
            if (msg) window.open(`https://wa.me/+221788938254?text=${encodeURIComponent(msg)}`, '_blank')
          }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '13px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: '0.92rem', transition: 'all 0.3s', boxShadow: '0 4px 16px rgba(34,197,94,0.35)', marginBottom: '0.6rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <Phone size={16} /> Envoyer ma demande
          </button>

          <button onClick={viderPanier}
            style={{ width: '100%', background: 'transparent', border: '1px solid #eee', color: '#ccc', padding: '8px', borderRadius: '9999px', cursor: 'pointer', fontSize: '0.78rem', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.rouge; e.currentTarget.style.color = C.rouge }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = '#ccc' }}>
            Tout effacer
          </button>
        </div>
      )}
    </div>
  )
}

// ── PAGE PRINCIPALE ────────────────────────────────────────
export default function PanierPage() {
  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #1a3a1a 100%)`, padding: '10rem 1.5rem 4rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
            <span style={{ color: C.or, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>
              👍 Je connais le Sénégal
            </span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${C.or})` }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.15 }}>
            Composez votre<br /><span style={{ color: C.or }}>circuit sur mesure</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Choisissez vos zones, vos lieux et vos activités. Nous vous envoyons un devis sous 24h.
          </p>

          {/* 3 étapes */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {[
              { num: '1', txt: 'Ouvrez une zone touristique', emoji: '🗺️' },
              { num: '2', txt: 'Choisissez un lieu et ses activités', emoji: '📍' },
              { num: '3', txt: 'Soumettez votre demande sur WhatsApp', emoji: '💬' },
            ].map(({ num, txt, emoji }) => (
              <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '9999px', padding: '8px 16px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: C.or, color: C.noirChaud, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, flexShrink: 0 }}>{num}</div>
                <span style={{ fontSize: '0.88rem' }}>{emoji}</span>
                <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.82rem' }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grille principale */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '2rem', alignItems: 'start' }}>

          {/* Zones */}
          <div>
            <p style={{ color: '#999', fontSize: '0.88rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color={C.or} />
              Cliquez sur une zone pour explorer ses lieux et activités
            </p>
            {ZONES_PANIER.map(zone => <ZoneAccordeon key={zone.id} zone={zone} />)}
          </div>

          {/* Panier */}
          <PanierLateral />
        </div>
      </div>
    </div>
  )
}