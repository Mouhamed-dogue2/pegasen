import { useEffect, useState } from 'react'

// Animation d'intro au premier chargement — cheval qui déploie ses ailes
export default function IntroAnimation() {
  const [phase, setPhase] = useState('enter') // enter → deploy → fade → done
  const [wingsOpen, setWingsOpen] = useState(false)
  const [eyesGlow, setEyesGlow] = useState(false)

  useEffect(() => {
    // Phase 1 : le logo entre (0.5s)
    const t1 = setTimeout(() => setWingsOpen(true), 600)
    // Phase 2 : yeux brillent (1.2s)
    const t2 = setTimeout(() => setEyesGlow(true), 1200)
    // Phase 3 : fondu vers la page (2.8s)
    const t3 = setTimeout(() => setPhase('fade'), 2800)
    // Phase 4 : disparition complète (3.5s)
    const t4 = setTimeout(() => setPhase('done'), 3600)

    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: `radial-gradient(ellipse at center, #2a1500 0%, #1C1208 50%, #0a0600 100%)`,
      opacity: phase === 'fade' ? 0 : 1,
      transition: 'opacity 0.85s ease',
      pointerEvents: phase === 'fade' ? 'none' : 'all',
    }}>
      {/* Particules */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${4 + (i % 4) * 3}px`,
          height: `${4 + (i % 4) * 3}px`,
          borderRadius: '50%',
          background: i % 3 === 0 ? '#D4A017' : i % 3 === 1 ? '#1A6B3C' : '#C0392B',
          left: `${5 + i * 8}%`,
          top: `${15 + (i % 5) * 15}%`,
          opacity: wingsOpen ? 0.6 : 0,
          transform: wingsOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0)',
          transition: `all 0.8s ease ${0.1 + i * 0.08}s`,
          animation: wingsOpen ? `float ${4 + i % 3}s ease-in-out ${i * 0.3}s infinite` : 'none',
        }} />
      ))}

      {/* Bande tricolore haut */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)',
        opacity: wingsOpen ? 1 : 0,
        transition: 'opacity 0.5s ease 0.3s',
      }} />

      {/* Logo principal */}
      <div style={{
        position: 'relative',
        transform: wingsOpen ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(40px)',
        opacity: wingsOpen ? 1 : 0,
        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
        marginBottom: '2rem',
      }}>
        {/* Halo lumineux derrière le logo */}
        <div style={{
          position: 'absolute',
          inset: '-30px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(212,160,23,0.3) 0%, transparent 70%)',
          opacity: wingsOpen ? 1 : 0,
          transition: 'opacity 1s ease 0.8s',
          animation: wingsOpen ? 'wingPulseIntro 3s ease-in-out 1s infinite' : 'none',
        }} />
        <img
          src="/images/logo/pegasen-logo.png"
          alt="PEGASEN221"
          style={{
            width: 'min(70vw, 320px)',
            height: 'auto',
            filter: eyesGlow
              ? 'drop-shadow(0 0 20px rgba(212,160,23,0.8)) drop-shadow(0 0 40px rgba(212,160,23,0.4))'
              : 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))',
            transition: 'filter 0.8s ease',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>

      {/* Texte */}
      <div style={{
        textAlign: 'center',
        opacity: wingsOpen ? 1 : 0,
        transform: wingsOpen ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.9s ease 0.6s',
      }}>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 700,
          color: 'white',
          margin: '0 0 0.4rem',
          letterSpacing: '0.05em',
        }}>
          PÉGA<span style={{ color: '#D4A017' }}>SEN</span><span style={{ color: '#F0C040' }}>221</span>
        </p>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: '1.1rem',
          color: 'rgba(212,160,23,0.8)',
          margin: '0 0 0.5rem',
          letterSpacing: '0.1em',
        }}>
          Excursions
        </p>
        {/* Ligne décorative animée */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '1rem',
        }}>
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #D4A017)', width: wingsOpen ? '60px' : '0px', transition: 'width 1s ease 1s' }} />
          <span style={{ color: '#D4A017', fontSize: '0.9rem', opacity: wingsOpen ? 1 : 0, transition: 'opacity 0.5s ease 1.2s' }}>✦</span>
          <div style={{ height: '1px', background: 'linear-gradient(to left, transparent, #D4A017)', width: wingsOpen ? '60px' : '0px', transition: 'width 1s ease 1s' }} />
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          marginTop: '0.75rem',
          opacity: wingsOpen ? 1 : 0,
          transition: 'opacity 0.5s ease 1.4s',
        }}>
          Sénégal • Découverte • Authenticité
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wingPulseIntro {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}