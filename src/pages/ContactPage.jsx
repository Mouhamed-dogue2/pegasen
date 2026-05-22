import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, CheckCircle, Clock, MessageCircle, ShoppingCart, ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import useScrollReveal from '@/hooks/useScrollReveal'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

export default function ContactPage() {
  useScrollReveal()
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: '', personnes: '', duree: '', message: '' })
  const [envoye, setEnvoye] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const msg = `Bonjour PEGASEN221 Excursions ! 🌍\n\n👤 Nom : ${form.nom}\n📧 Email : ${form.email}\n📱 Téléphone : ${form.telephone}\n📋 Sujet : ${form.sujet}\n👥 Personnes : ${form.personnes}\n📅 Durée : ${form.duree}\n\n💬 Message :\n${form.message}\n\nMerci !`
    setTimeout(() => {
      setLoading(false)
      setEnvoye(true)
      window.open(`https://wa.me/+221788938254?text=${encodeURIComponent(msg)}`, '_blank')
    }, 800)
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1.5px solid #e8d8b8', background: C.sable,
    color: C.noirChaud, fontSize: '0.9rem', outline: 'none',
    transition: 'all 0.25s', boxSizing: 'border-box',
    fontFamily: '"DM Sans", sans-serif',
  })

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>
      <PageHero tag="Nous sommes là pour vous" titre="Contactez" orMot="PEGASEN221" description="Nous répondons à toutes vos demandes sous 24 heures — 7j/7." />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Colonne gauche */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* WhatsApp */}
            <div className="reveal" style={{ background: 'linear-gradient(135deg, #1a5c2a, rgba(34,197,94,0.15))', border: '1px solid rgba(34,197,94,0.35)', borderRadius: '1.25rem', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                <div style={{ width: '46px', height: '46px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={22} color="white" fill="white" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: 'white', fontSize: '1rem', margin: 0 }}>WhatsApp — Réponse rapide</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0 }}>Meilleur moyen de nous joindre</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem' }}>+221 78 893 82 54</p>
              <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '12px', borderRadius: '0.75rem', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
                onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}>
                <MessageCircle size={16} /> Ouvrir WhatsApp
              </a>
            </div>

            {/* Coordonnées */}
            <div className="reveal" style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: C.noirChaud, marginBottom: '1.25rem' }}>Nos coordonnées</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: <Phone size={16} color={C.or} />, label: 'WhatsApp', val: '+221 78 893 82 54', href: 'tel:+221788938254' },
                  { icon: <Phone size={16} color={C.or} />, label: 'Téléphone', val: '+221 76 489 49 37', href: 'tel:+221764894937' },
                  { icon: <Mail size={16} color={C.or} />, label: 'Email', val: 'pegasenexcursions@gmail.com', href: 'mailto:pegasenexcursions@gmail.com' },
                  { icon: <MapPin size={16} color={C.or} />, label: 'Localisation', val: 'Nianing, Petite Côte, Sénégal', href: null },
                  { icon: <Clock size={16} color={C.or} />, label: 'Disponibilité', val: '7j/7 — Réponse sous 24h', href: null },
                ].map(({ icon, label, val, href }) => (
                  <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '34px', height: '34px', background: 'rgba(212,160,23,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ color: '#aaa', fontSize: '0.7rem', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                      {href
                        ? <a href={href} style={{ color: C.noirChaud, fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = C.or} onMouseLeave={e => e.currentTarget.style.color = C.noirChaud}>{val}</a>
                        : <p style={{ color: C.noirChaud, fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>{val}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Réseaux */}
            <div className="reveal" style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: C.noirChaud, marginBottom: '1.25rem' }}>Suivez-nous</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Instagram', handle: '@pegasen221_excursions', href: 'https://www.instagram.com/pegasen221_excursions', couleur: '#E1306C', icon: <Instagram size={18} /> },
                  { label: 'Facebook', handle: 'PEGASEN221 Excursions', href: 'https://www.facebook.com/profile.php?id=61588694557877', couleur: '#1877F2', icon: <Facebook size={18} /> },
                  { label: 'TikTok', handle: '@pegasen221_excursions', href: 'https://www.tiktok.com/@pegasen221_excursions', couleur: '#010101', icon: <span style={{ fontWeight: 900, fontSize: '0.9rem', color: 'white' }}>TK</span> },
                ].map(({ label, handle, href, couleur, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem', borderRadius: '0.75rem', background: C.sable, textDecoration: 'none', transition: 'all 0.2s', border: '1px solid transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = couleur + '40'; e.currentTarget.style.transform = 'translateX(4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.sable; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)' }}>
                    <div style={{ width: '36px', height: '36px', background: couleur, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontWeight: 600, color: C.noirChaud, fontSize: '0.85rem', margin: 0 }}>{label}</p>
                      <p style={{ color: '#888', fontSize: '0.78rem', margin: 0 }}>{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Liens rapides */}
            <div className="reveal" style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, borderRadius: '1.25rem', padding: '1.75rem' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: 'white', marginBottom: '1rem' }}>Accès rapide</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: '🗺️ Composer mon circuit', to: '/mon-circuit' },
                  { label: '🎯 Voir les excursions', to: '/circuits' },
                  { label: '💰 Consulter les tarifs', to: '/tarifs' },
                  { label: '📖 Lire les brochures', to: '/brochures' },
                  { label: '🌿 Solidarité & Environnement', to: '/solidarite' },
                ].map(({ label, to }) => (
                  <Link key={to} to={to}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.06)', borderRadius: '0.65rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s', border: '1px solid transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(212,160,23,0.3)'; e.currentTarget.style.color = C.orClair }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}>
                    {label}
                    <ArrowRight size={13} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="reveal">
            {!envoye ? (
              <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', borderTop: `4px solid ${C.or}` }}>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Envoyez-nous un message</h2>
                <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                  Votre message sera envoyé directement sur notre WhatsApp. Réponse garantie sous 24h.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                      { name: 'nom', label: 'Votre nom *', placeholder: 'Jean Dupont', type: 'text', required: true },
                      { name: 'email', label: 'Email *', placeholder: 'jean@email.com', type: 'email', required: true },
                    ].map(({ name, label, placeholder, type, required }) => (
                      <div key={name}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                        <input name={name} type={type} value={form[name]} onChange={handleChange} required={required} placeholder={placeholder}
                          style={inputStyle(name)}
                          onFocus={e => { e.target.style.borderColor = C.or; e.target.style.boxShadow = `0 0 0 3px rgba(212,160,23,0.12)` }}
                          onBlur={e => { e.target.style.borderColor = '#e8d8b8'; e.target.style.boxShadow = 'none' }} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Téléphone</label>
                      <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="+33 6 00 00 00 00"
                        style={inputStyle('telephone')}
                        onFocus={e => { e.target.style.borderColor = C.or; e.target.style.boxShadow = `0 0 0 3px rgba(212,160,23,0.12)` }}
                        onBlur={e => { e.target.style.borderColor = '#e8d8b8'; e.target.style.boxShadow = 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sujet *</label>
                      <select name="sujet" value={form.sujet} onChange={handleChange} required
                        style={{ ...inputStyle('sujet'), color: form.sujet ? C.noirChaud : '#aaa' }}
                        onFocus={e => { e.target.style.borderColor = C.or }}
                        onBlur={e => { e.target.style.borderColor = '#e8d8b8' }}>
                        <option value="" disabled>Choisir...</option>
                        <option>Devis excursion journée</option>
                        <option>Devis forfait multi-jours</option>
                        <option>Formule Bokkalé</option>
                        <option>Transport seul</option>
                        <option>Circuit personnalisé</option>
                        <option>Renseignement général</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Nbre de personnes</label>
                      <select name="personnes" value={form.personnes} onChange={handleChange}
                        style={{ ...inputStyle('personnes'), color: form.personnes ? C.noirChaud : '#aaa' }}>
                        <option value="">Choisir...</option>
                        {['1','2','3','4','5','6','7','8','9','10','11','12+'].map(n => <option key={n}>{n} personne{n !== '1' ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Durée souhaitée</label>
                      <select name="duree" value={form.duree} onChange={handleChange}
                        style={{ ...inputStyle('duree'), color: form.duree ? C.noirChaud : '#aaa' }}>
                        <option value="">Choisir...</option>
                        <option>Demi-journée</option>
                        <option>Journée complète</option>
                        <option>2–3 jours</option>
                        <option>5 jours</option>
                        <option>7 jours</option>
                        <option>10 jours</option>
                        <option>Plus de 10 jours</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Décrivez vos envies, destinations, dates..."
                      style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => { e.target.style.borderColor = C.or; e.target.style.boxShadow = `0 0 0 3px rgba(212,160,23,0.12)` }}
                      onBlur={e => { e.target.style.borderColor = '#e8d8b8'; e.target.style.boxShadow = 'none' }} />
                  </div>

                  <button type="submit" disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: loading ? '#ccc' : `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '15px', borderRadius: '9999px', border: 'none', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', boxShadow: loading ? 'none' : `0 4px 20px rgba(212,160,23,0.4)` }}>
                    {loading ? '⏳ Envoi...' : '💬 Envoyer via WhatsApp'}
                  </button>
                  <p style={{ textAlign: 'center', color: '#bbb', fontSize: '0.75rem' }}>Message envoyé directement sur notre WhatsApp • Réponse sous 24h</p>
                </form>
              </div>
            ) : (
              <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', textAlign: 'center', borderTop: `4px solid ${C.vert}` }}>
                <div style={{ width: '70px', height: '70px', background: 'rgba(26,107,60,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle size={36} color={C.vert} />
                </div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', color: C.noirChaud, marginBottom: '0.75rem' }}>Message envoyé !</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Votre message a été transmis sur notre WhatsApp. L'équipe PEGASEN221 vous répondra sous 24h.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link to="/mon-circuit"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem' }}>
                    <ShoppingCart size={16} /> Composer mon circuit
                  </Link>
                  <button onClick={() => { setEnvoye(false); setForm({ nom: '', email: '', telephone: '', sujet: '', personnes: '', duree: '', message: '' }) }}
                    style={{ background: 'transparent', border: `2px solid ${C.or}`, color: C.or, fontWeight: 600, padding: '11px 24px', borderRadius: '9999px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.color = C.noirChaud }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.or }}>
                    Envoyer un autre message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}