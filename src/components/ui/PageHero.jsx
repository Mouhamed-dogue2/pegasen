// Composant Hero réutilisable pour toutes les pages intérieures
export default function PageHero({ tag, titre, orMot, description, children, bgColor = 'linear-gradient(160deg, #1C1208 0%, #2a1500 100%)' }) {
  return (
    <div style={{ position: 'relative', background: bgColor, padding: '10rem 1.5rem 5rem', overflow: 'hidden' }}>
      {/* Bande tricolore */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)' }} />
      {/* Décor cercles */}
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: '280px', height: '280px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '3%', width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.06)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {tag && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
            <span style={{ color: '#D4A017', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>{tag}</span>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
          </div>
        )}
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
          {titre} {orMot && <span style={{ color: '#D4A017' }}>{orMot}</span>}
        </h1>
        {description && (
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.72)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}