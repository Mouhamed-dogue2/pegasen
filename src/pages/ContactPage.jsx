import { useState } from 'react'
import { Phone, Mail, MapPin, Instagram, Facebook, Send, CheckCircle, Clock, MessageCircle } from 'lucide-react'

const C = {
  or: '#D4A017',
  orClair: '#F0C040',
  vert: '#1A6B3C',
  rouge: '#C0392B',
  noirChaud: '#1C1208',
  sable: '#FDF3E3',
}

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: '', personnes: '', duree: '', message: '' })
  const [envoye, setEnvoye] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // Construction du message WhatsApp
    const msg = `Bonjour PEGASEN221 Excursions !

👤 Nom : ${form.nom}
📧 Email : ${form.email}
📱 Téléphone : ${form.telephone}
📋 Sujet : ${form.sujet}
👥 Nombre de personnes : ${form.personnes}
📅 Durée souhaitée : ${form.duree}

💬 Message :
${form.message}

Merci !`

    setTimeout(() => {
      setLoading(false)
      setEnvoye(true)
      window.open(`https://wa.me/+221788938254?text=${encodeURIComponent(msg)}`, '_blank')
    }, 800)
  }

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #2a1500 100%)`, padding: '10rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
            <span style={{ color: C.or, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>Nous sommes là pour vous</span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${C.or})` }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Contactez <span style={{ color: C.or }}>PEGASEN221</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', maxWidth: '500px', margin: '0 auto' }}>
            Nous répondons à toutes vos demandes sous 24 heures
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* ── COLONNE GAUCHE : Infos contact ── */}
          <div>

            {/* Réponse rapide WhatsApp */}
            <div style={{ background: `linear-gradient(135deg, #1a5c2a, #22c55e22)`, border: '1px solid #22c55e40', borderRadius: '1.25rem', padding: '1.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                <div style={{ width: '44px', height: '44px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={22} color="white" fill="white" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: 'white', fontSize: '1rem', margin: 0 }}>WhatsApp — Réponse rapide</p>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', margin: 0 }}>Meilleur moyen de nous joindre</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                +221 78 893 82 54
              </p>
              <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '12px', borderRadius: '0.75rem', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
                onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}>
                <MessageCircle size={16} /> Ouvrir WhatsApp
              </a>
            </div>

            {/* Autres contacts */}
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: C.noirChaud, marginBottom: '1.25rem' }}>Nos coordonnées</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: <Phone size={18} color={C.or} />, label: 'Téléphone', valeur: '+221 78 893 82 54', href: 'tel:+221788938254' },
                  { icon: <Phone size={18} color={C.or} />, label: 'Téléphone 2', valeur: '+221 76 489 49 37', href: 'tel:+221764894937' },
                  { icon: <Mail size={18} color={C.or} />, label: 'Email', valeur: 'pegasenexcursions@gmail.com', href: 'mailto:pegasenexcursions@gmail.com' },
                  { icon: <MapPin size={18} color={C.or} />, label: 'Localisation', valeur: 'Nianing, Petite Côte, Sénégal', href: null },
                  { icon: <Clock size={18} color={C.or} />, label: 'Disponibilité', valeur: '7j/7 — Réponse sous 24h', href: null },
                ].map(({ icon, label, valeur, href }) => (
                  <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', background: `rgba(212,160,23,0.1)`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{ color: '#999', fontSize: '0.75rem', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                      {href ? (
                        <a href={href} style={{ color: C.noirChaud, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = C.or}
                          onMouseLeave={e => e.currentTarget.style.color = C.noirChaud}>
                          {valeur}
                        </a>
                      ) : (
                        <p style={{ color: C.noirChaud, fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>{valeur}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: C.noirChaud, marginBottom: '1.25rem' }}>Suivez-nous</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Instagram', handle: '@pegasen221_excursions', href: 'https://www.instagram.com/pegasen221_excursions', couleur: '#E1306C', icon: <Instagram size={20} /> },
                  { label: 'Facebook', handle: 'PEGASEN221 Excursions', href: 'https://www.facebook.com/profile.php?id=61588694557877', couleur: '#1877F2', icon: <Facebook size={20} /> },
                  { label: 'TikTok', handle: '@pegasen221_excursions', href: 'https://www.tiktok.com/@pegasen221_excursions', couleur: '#010101', icon: <span style={{ fontWeight: 900, fontSize: '1rem' }}>TK</span> },
                ].map(({ label, handle, href, couleur, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem', borderRadius: '0.75rem', background: C.sable, textDecoration: 'none', transition: 'all 0.2s', border: '1px solid transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = couleur + '40'; e.currentTarget.style.transform = 'translateX(4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.sable; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)' }}>
                    <div style={{ width: '38px', height: '38px', background: couleur, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: C.noirChaud, fontSize: '0.88rem', margin: 0 }}>{label}</p>
                      <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── COLONNE DROITE : Formulaire ── */}
          <div>
            {!envoye ? (
              <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', borderTop: `4px solid ${C.or}` }}>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', color: C.noirChaud, marginBottom: '0.5rem' }}>
                  Envoyez-nous un message
                </h2>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Remplissez le formulaire — votre message sera envoyé directement sur notre WhatsApp.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  {/* Nom + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Votre nom *
                      </label>
                      <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Jean Dupont"
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e8d8b8', background: C.sable, color: C.noirChaud, fontSize: '0.9rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = C.or}
                        onBlur={e => e.target.style.borderColor = '#e8d8b8'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Email *
                      </label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jean@email.com"
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e8d8b8', background: C.sable, color: C.noirChaud, fontSize: '0.9rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = C.or}
                        onBlur={e => e.target.style.borderColor = '#e8d8b8'} />
                    </div>
                  </div>

                  {/* Téléphone + Sujet */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Téléphone / WhatsApp
                      </label>
                      <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="+33 6 00 00 00 00"
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e8d8b8', background: C.sable, color: C.noirChaud, fontSize: '0.9rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = C.or}
                        onBlur={e => e.target.style.borderColor = '#e8d8b8'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Sujet *
                      </label>
                      <select name="sujet" value={form.sujet} onChange={handleChange} required
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e8d8b8', background: C.sable, color: form.sujet ? C.noirChaud : '#aaa', fontSize: '0.9rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = C.or}
                        onBlur={e => e.target.style.borderColor = '#e8d8b8'}>
                        <option value="" disabled>Choisir...</option>
                        <option value="Devis excursion journée">Devis excursion à la journée</option>
                        <option value="Devis forfait multi-jours">Devis forfait multi-jours</option>
                        <option value="Formule Bokkalé">Formule Bokkalé</option>
                        <option value="Transport seul">Transport seul</option>
                        <option value="Circuit personnalisé">Circuit personnalisé</option>
                        <option value="Renseignement général">Renseignement général</option>
                      </select>
                    </div>
                  </div>

                  {/* Nombre de personnes + Durée */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Nombre de personnes
                      </label>
                      <select name="personnes" value={form.personnes} onChange={handleChange}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e8d8b8', background: C.sable, color: form.personnes ? C.noirChaud : '#aaa', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}>
                        <option value="">Choisir...</option>
                        {['1','2','3','4','5','6','7','8','9','10','11','12+'].map(n => <option key={n} value={n}>{n} personne{n !== '1' ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Durée souhaitée
                      </label>
                      <select name="duree" value={form.duree} onChange={handleChange}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e8d8b8', background: C.sable, color: form.duree ? C.noirChaud : '#aaa', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}>
                        <option value="">Choisir...</option>
                        <option value="Demi-journée">Demi-journée</option>
                        <option value="Journée complète">Journée complète</option>
                        <option value="2-3 jours">2 à 3 jours</option>
                        <option value="5 jours">5 jours</option>
                        <option value="7 jours">7 jours</option>
                        <option value="10 jours">10 jours</option>
                        <option value="Plus de 10 jours">Plus de 10 jours</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: C.noirChaud, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Votre message *
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Décrivez vos envies, les destinations qui vous intéressent, vos dates de voyage..."
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e8d8b8', background: C.sable, color: C.noirChaud, fontSize: '0.9rem', outline: 'none', transition: 'border 0.2s', resize: 'vertical', fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6, boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = C.or}
                      onBlur={e => e.target.style.borderColor = '#e8d8b8'} />
                  </div>

                  {/* Bouton envoyer */}
                  <button type="submit" disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: loading ? '#ccc' : `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '15px', borderRadius: '9999px', border: 'none', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', boxShadow: loading ? 'none' : `0 4px 20px rgba(212,160,23,0.4)` }}>
                    {loading ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <><Send size={18} /> Envoyer via WhatsApp</>
                    )}
                  </button>

                  <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.78rem' }}>
                    Votre message sera envoyé directement sur notre WhatsApp. Réponse garantie sous 24h.
                  </p>
                </form>
              </div>
            ) : (
              /* Message de confirmation */
              <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', textAlign: 'center', borderTop: `4px solid ${C.vert}` }}>
                <div style={{ width: '70px', height: '70px', background: `rgba(26,107,60,0.1)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle size={36} color={C.vert} />
                </div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', color: C.noirChaud, marginBottom: '0.75rem' }}>
                  Message envoyé !
                </h3>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Votre message a été transmis sur notre WhatsApp. L'équipe PEGASEN221 vous répondra sous 24 heures.
                </p>
                <button onClick={() => { setEnvoye(false); setForm({ nom: '', email: '', telephone: '', sujet: '', personnes: '', duree: '', message: '' }) }}
                  style={{ background: 'transparent', border: `2px solid ${C.or}`, color: C.or, fontWeight: 600, padding: '11px 24px', borderRadius: '9999px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.color = C.noirChaud }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.or }}>
                  Envoyer un autre message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}