import { useState } from 'react'
import { Phone, CheckCircle, RotateCcw, ArrowRight } from 'lucide-react'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

const inputStyle = {
  width: '100%', minHeight: '48px', padding: '0.75rem 1rem',
  border: '1.5px solid #d4d1ca', borderRadius: '0.6rem',
  background: '#f9f8f5', fontSize: '0.9rem',
  fontFamily: '"DM Sans", sans-serif', color: '#28251d',
  outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block', fontSize: '0.82rem', fontWeight: 700,
  color: '#28251d', marginBottom: '5px', letterSpacing: '0.02em',
}

const hintStyle = { color: '#7a7974', fontSize: '0.75rem', marginTop: '3px' }

export default function RemetsAVousPage() {
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '', pays: '',
    dateArrivee: '', dateDepart: '', nbJours: '',
    adultes: '2', enfantsMoins12: '0', enfantsPlus12: '0',
    typeVoyage: '', ambiances: [],
    services: [],
    budget: '', contactPrefere: 'WhatsApp',
    destinations: '', besoinsSpeciaux: '',
  })
  const [envoye, setEnvoye] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(field, value) { setForm(f => ({ ...f, [field]: value })) }

  function toggleArray(field, value) {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter(v => v !== value)
        : [...f[field], value],
    }))
  }

  // Calcul automatique du nombre de jours
  function handleDateChange(field, value) {
    const updated = { ...form, [field]: value }
    if (updated.dateArrivee && updated.dateDepart) {
      const diff = Math.round(
        (new Date(updated.dateDepart) - new Date(updated.dateArrivee)) / 86400000
      )
      if (diff > 0) updated.nbJours = String(diff)
    }
    setForm(updated)
  }

  // Résumé dynamique
  const resume = form.dateArrivee && form.dateDepart && form.adultes
    ? `Séjour de ${form.nbJours || '—'} jour(s), du ${form.dateArrivee} au ${form.dateDepart}, pour ${form.adultes} adulte(s) et ${form.enfantsMoins12} enfant(s) de moins de 12 ans.${form.destinations ? ` Envies : ${form.destinations}` : ''}`
    : 'Renseignez les dates, le nombre de voyageurs et vos envies.'

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const services = form.services.length > 0 ? form.services.join(', ') : 'Aucun service spécifié'
    const ambiances = form.ambiances.length > 0 ? form.ambiances.join(', ') : 'Non précisé'

    const msg = `Bonjour PEGASEN221 Excursions ! 🌍

Je vous soumets ma demande de voyage personnalisé au Sénégal.

👤 *INFORMATIONS PERSONNELLES*
• Nom : ${form.prenom} ${form.nom}
• Email : ${form.email || 'Non renseigné'}
• Téléphone : ${form.telephone || 'Non renseigné'}
• Pays de résidence : ${form.pays || 'Non renseigné'}

📅 *DATES & VOYAGEURS*
• Arrivée : ${form.dateArrivee || 'Non précisée'}
• Départ : ${form.dateDepart || 'Non précisé'}
• Durée : ${form.nbJours || '—'} jour(s)
• Adultes : ${form.adultes}
• Enfants (- de 12 ans) : ${form.enfantsMoins12}
• Enfants (+ de 12 ans) : ${form.enfantsPlus12}

🌍 *TYPE DE VOYAGE*
• Type : ${form.typeVoyage || 'Non précisé'}
• Ambiances souhaitées : ${ambiances}

🛎️ *SERVICES SOUHAITÉS*
${services}

💰 *BUDGET & CONTACT*
• Budget estimatif : ${form.budget || 'Non précisé'}
• Canal de contact préféré : ${form.contactPrefere}

📍 *DESTINATIONS & ENVIES*
${form.destinations || 'Aucune préférence précisée'}

💬 *BESOINS PARTICULIERS*
${form.besoinsSpeciaux || 'Aucun besoin particulier'}

---
Merci de me revenir avec un devis personnalisé. 🙏`

    setTimeout(() => {
      setLoading(false)
      setEnvoye(true)
      window.open(`https://wa.me/+221788938254?text=${encodeURIComponent(msg)}`, '_blank')
    }, 700)
  }

  function reset() {
    setForm({
      prenom: '', nom: '', email: '', telephone: '', pays: '',
      dateArrivee: '', dateDepart: '', nbJours: '',
      adultes: '2', enfantsMoins12: '0', enfantsPlus12: '0',
      typeVoyage: '', ambiances: [], services: [],
      budget: '', contactPrefere: 'WhatsApp',
      destinations: '', besoinsSpeciaux: '',
    })
    setEnvoye(false)
  }

  const focusStyle = (e) => {
    e.target.style.borderColor = C.or
    e.target.style.boxShadow = `0 0 0 4px rgba(212,160,23,0.14)`
  }
  const blurStyle = (e) => {
    e.target.style.borderColor = '#d4d1ca'
    e.target.style.boxShadow = 'none'
  }

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #0d2a1a 100%)`, padding: 'clamp(6rem,15vw,10rem) 1.5rem 4rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '260px', height: '260px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.08)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '35px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
            <span style={{ color: C.or, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.28em', fontWeight: 600 }}>Je m'en remets à vous</span>
            <div style={{ height: '1px', width: '35px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem,6vw,4rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Votre voyage <span style={{ color: C.or }}>sur mesure</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1rem,3vw,1.3rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.72)', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Dites-nous vos envies — nous composons votre séjour idéal et vous envoyons un devis sous 24h.
          </p>
          {/* Points clés */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center' }}>
            {['✓ Devis gratuit sous 24h', '✓ Programme personnalisé', '✓ Paiement Wave / Orange Money', '✓ Guide francophone inclus'].map(p => (
              <span key={p} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 500 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── FORMULAIRE ── */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.25rem 4rem' }}>

        {!envoye ? (
          <div style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #f0e8d8' }}>

            {/* Header formulaire */}
            <div style={{ background: `linear-gradient(135deg, rgba(26,107,60,0.12), rgba(212,160,23,0.08))`, padding: '1.75rem 2rem', borderBottom: '1px solid #f0e8d8' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: C.noirChaud, marginBottom: '0.4rem' }}>
                📋 Formulaire de demande
              </h2>
              <p style={{ color: '#7a7974', fontSize: '0.88rem' }}>
                Remplissez ce formulaire — votre demande sera envoyée directement sur notre WhatsApp
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: 'clamp(1.25rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

              {/* ── SECTION 1 : Infos personnelles ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: `2px solid ${C.vert}20` }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: C.vert, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>1</div>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: C.noirChaud }}>Vos informations</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {[
                    { id: 'prenom', label: 'Prénom *', placeholder: 'Votre prénom', required: true },
                    { id: 'nom', label: 'Nom *', placeholder: 'Votre nom', required: true },
                    { id: 'email', label: 'Email', placeholder: 'votre@email.com', type: 'email' },
                    { id: 'telephone', label: 'Téléphone', placeholder: '+33 6 ...' },
                    { id: 'pays', label: 'Pays de résidence', placeholder: 'France, Belgique...' },
                  ].map(({ id, label, placeholder, type = 'text', required }) => (
                    <div key={id}>
                      <label style={labelStyle}>{label}</label>
                      <input
                        type={type} value={form[id]} required={required}
                        placeholder={placeholder}
                        onChange={e => set(id, e.target.value)}
                        onFocus={focusStyle} onBlur={blurStyle}
                        style={inputStyle} />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 2 : Dates ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: `2px solid ${C.or}20` }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: C.or, color: C.noirChaud, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>2</div>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: C.noirChaud }}>Dates & voyageurs</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Date d'arrivée *</label>
                    <input type="date" value={form.dateArrivee} required
                      onChange={e => handleDateChange('dateArrivee', e.target.value)}
                      onFocus={focusStyle} onBlur={blurStyle}
                      style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Date de départ *</label>
                    <input type="date" value={form.dateDepart} required
                      onChange={e => handleDateChange('dateDepart', e.target.value)}
                      onFocus={focusStyle} onBlur={blurStyle}
                      style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Durée (jours)</label>
                    <input type="number" min="1" value={form.nbJours} readOnly
                      placeholder="Auto calculé"
                      style={{ ...inputStyle, background: '#f0f0ec', cursor: 'default' }} />
                    <p style={hintStyle}>Calculé automatiquement</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  {[
                    { id: 'adultes', label: 'Adultes *', min: 1 },
                    { id: 'enfantsMoins12', label: 'Enfants (- de 12 ans)' },
                    { id: 'enfantsPlus12', label: 'Enfants (+ de 12 ans)' },
                  ].map(({ id, label, min = 0 }) => (
                    <div key={id}>
                      <label style={labelStyle}>{label}</label>
                      <input type="number" min={min} value={form[id]}
                        onChange={e => set(id, e.target.value)}
                        onFocus={focusStyle} onBlur={blurStyle}
                        style={inputStyle} />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 3 : Type de voyage ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: `2px solid ${C.rouge}20` }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: C.rouge, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>3</div>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: C.noirChaud }}>Type de voyage</h3>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Type de séjour *</label>
                  <select value={form.typeVoyage} required
                    onChange={e => set('typeVoyage', e.target.value)}
                    onFocus={focusStyle} onBlur={blurStyle}
                    style={inputStyle}>
                    <option value="">Choisir...</option>
                    <option>Découverte générale</option>
                    <option>Voyage en famille</option>
                    <option>Voyage de noces / lune de miel</option>
                    <option>Voyage entre amis</option>
                    <option>Voyage solo</option>
                    <option>Circuit culturel</option>
                    <option>Safari & nature</option>
                    <option>Plage & détente</option>
                    <option>Aventure & sport</option>
                  </select>
                </div>
                {/* Ambiances */}
                <label style={labelStyle}>Ambiances souhaitées</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.4rem' }}>
                  {['🌊 Plage', '🦁 Safari', '🏛️ Culturel', '🍽️ Gastronomie', '🚣 Pirogue', '🌿 Nature', '🎵 Musique & fêtes', '🛍️ Shopping'].map(amb => {
                    const active = form.ambiances.includes(amb)
                    return (
                      <button key={amb} type="button"
                        onClick={() => toggleArray('ambiances', amb)}
                        style={{ padding: '7px 14px', borderRadius: '9999px', border: `1.5px solid ${active ? C.vert : '#d4d1ca'}`, background: active ? `${C.vert}12` : '#f9f8f5', color: active ? C.vert : '#555', fontWeight: active ? 700 : 400, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {amb}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* ── SECTION 4 : Services ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: `2px solid #888820` }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#888820', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>4</div>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: C.noirChaud }}>Services souhaités</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {['✈️ Transfert aéroport', '🏨 Hébergement', '🧭 Guide francophone', '🚐 Transport privé', '👶 Activités enfants', '🍽️ Repas inclus', '📸 Photographe', '🎂 Animation anniversaire'].map(srv => {
                    const active = form.services.includes(srv)
                    return (
                      <button key={srv} type="button"
                        onClick={() => toggleArray('services', srv)}
                        style={{ padding: '7px 14px', borderRadius: '9999px', border: `1.5px solid ${active ? C.or : '#d4d1ca'}`, background: active ? `${C.or}15` : '#f9f8f5', color: active ? '#8B6000' : '#555', fontWeight: active ? 700 : 400, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {srv}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* ── SECTION 5 : Budget & contact ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: `2px solid #9B4D9B20` }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#9B4D9B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>5</div>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: C.noirChaud }}>Budget & contact</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Budget estimatif</label>
                    <select value={form.budget} onChange={e => set('budget', e.target.value)}
                      onFocus={focusStyle} onBlur={blurStyle} style={inputStyle}>
                      <option value="">Sélectionner</option>
                      <option>Moins de 500 €</option>
                      <option>500 € à 1 000 €</option>
                      <option>1 000 € à 2 000 €</option>
                      <option>Plus de 2 000 €</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Canal de contact préféré</label>
                    <select value={form.contactPrefere} onChange={e => set('contactPrefere', e.target.value)}
                      onFocus={focusStyle} onBlur={blurStyle} style={inputStyle}>
                      <option>WhatsApp</option>
                      <option>E-mail</option>
                      <option>Appel téléphonique</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ── SECTION 6 : Destinations & besoins ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.1rem', paddingBottom: '0.6rem', borderBottom: `2px solid ${C.noirChaud}15` }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: C.noirChaud, color: C.or, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>6</div>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: C.noirChaud }}>Destinations & besoins</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Destinations ou envies</label>
                    <textarea value={form.destinations} rows={3}
                      placeholder="Ex. Saly, Dakar, Gorée, désert de Lompoul, delta du Saloum, safari, plage, culture, gastronomie..."
                      onChange={e => set('destinations', e.target.value)}
                      onFocus={focusStyle} onBlur={blurStyle}
                      style={{ ...inputStyle, minHeight: '90px', resize: 'vertical', lineHeight: 1.6 }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Besoins particuliers</label>
                    <textarea value={form.besoinsSpeciaux} rows={3}
                      placeholder="Ex. repas spécifiques, siège bébé, accessibilité PMR, anniversaire, lune de miel..."
                      onChange={e => set('besoinsSpeciaux', e.target.value)}
                      onFocus={focusStyle} onBlur={blurStyle}
                      style={{ ...inputStyle, minHeight: '90px', resize: 'vertical', lineHeight: 1.6 }} />
                  </div>
                </div>
              </div>

              {/* ── RÉSUMÉ ── */}
              <div style={{ background: `${C.or}0a`, border: `1px dashed ${C.or}50`, borderRadius: '0.85rem', padding: '1.1rem 1.25rem' }}>
                <p style={{ fontWeight: 700, color: C.noirChaud, fontSize: '0.82rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>📋 Résumé de votre demande</p>
                <p style={{ color: '#7a7974', fontSize: '0.85rem', lineHeight: 1.65 }}>{resume}</p>
              </div>

              {/* ── BOUTONS ── */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
                <button type="submit" disabled={loading}
                  style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: loading ? '#ccc' : '#22c55e', color: 'white', fontWeight: 700, padding: '14px 20px', borderRadius: '9999px', fontSize: '0.95rem', transition: 'all 0.3s', boxShadow: loading ? 'none' : '0 4px 20px rgba(34,197,94,0.35)', cursor: loading ? 'not-allowed' : 'pointer' }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)' } }}
                  onMouseLeave={e => { e.currentTarget.style.background = loading ? '#ccc' : '#22c55e'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <Phone size={17} />
                  {loading ? 'Envoi en cours...' : 'Envoyer ma demande sur WhatsApp'}
                </button>
                <button type="button" onClick={reset}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1.5px solid #d4d1ca', color: '#7a7974', padding: '14px 20px', borderRadius: '9999px', fontSize: '0.88rem', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.rouge; e.currentTarget.style.color = C.rouge }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4d1ca'; e.currentTarget.style.color = '#7a7974' }}>
                  <RotateCcw size={14} /> Réinitialiser
                </button>
              </div>
              <p style={{ color: '#bbb', fontSize: '0.75rem', textAlign: 'center', fontStyle: 'italic' }}>
                Votre demande sera envoyée sur notre WhatsApp · Réponse sous 24h · Devis gratuit
              </p>
            </form>
          </div>
        ) : (
          /* ── CONFIRMATION ── */
          <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3.5rem 2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', textAlign: 'center', borderTop: `4px solid ${C.vert}` }}>
            <div style={{ width: '72px', height: '72px', background: `${C.vert}12`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={36} color={C.vert} />
            </div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: C.noirChaud, marginBottom: '0.75rem' }}>
              Demande envoyée ! 🎉
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
              Votre demande a été transmise sur notre WhatsApp. L'équipe PEGASEN221 vous répondra sous 24h avec un programme personnalisé.
            </p>
            <div style={{ background: `${C.or}0a`, border: `1px solid ${C.or}30`, borderRadius: '0.85rem', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'inline-block' }}>
              <p style={{ color: C.noirChaud, fontSize: '0.88rem', fontWeight: 600 }}>
                📱 +221 78 893 82 54 · pegasenexcursions@gmail.com
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
              <button onClick={reset}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: `linear-gradient(135deg, ${C.or}, ${C.orClair})`, color: C.noirChaud, fontWeight: 700, padding: '12px 24px', borderRadius: '9999px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
                <RotateCcw size={15} /> Faire une nouvelle demande
              </button>
              <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '12px 24px', borderRadius: '9999px', fontSize: '0.9rem', textDecoration: 'none' }}>
                <Phone size={15} /> Contacter sur WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}