import { useEffect, useState } from 'react'

export default function IntroAnimation() {
  const [phase, setPhase] = useState('playing') // playing → fade → done
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    // Texte apparaît après 1.5s
    const t1 = setTimeout(() => setTextVisible(true), 1500)
    // Début du fondu après 4.2s (vidéo dure 5s)
    const t2 = setTimeout(() => setPhase('fade'), 4200)
    // Disparition complète après 5s
    const t3 = setTimeout(() => setPhase('done'), 5200)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0600',
      opacity: phase === 'fade' ? 0 : 1,
      transition: 'opacity 1s ease',
      pointerEvents: phase === 'fade' ? 'none' : 'all',
      overflow: 'hidden',
    }}>

      {/* Vidéo du cheval qui déploie ses ailes */}
      <video
        autoPlay muted playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
        }}>
        <source src="/videos/deploreailes.mp4" type="video/mp4" />
      </video>

      {/* Overlay sombre pour lisibilité du texte */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,6,0,0.85) 0%, rgba(10,6,0,0.3) 50%, rgba(10,6,0,0.5) 100%)',
      }} />

      {/* Bande tricolore haut */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)',
        opacity: textVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }} />

      {/* Texte centré par-dessus la vidéo */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        opacity: textVisible ? 1 : 0,
        transform: textVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1s ease',
      }}>
        {/* Logo image par-dessus la vidéo */}
        <div style={{ marginBottom: '1.5rem' }}>
          <img src="/images/logo/pegasen-logo.png" alt="PEGASEN221"
            style={{
              width: 'min(50vw, 200px)',
              height: 'auto',
              filter: 'drop-shadow(0 0 30px rgba(212,160,23,0.9))',
              animation: 'logoPulse 2s ease-in-out infinite',
            }} />
        </div>

        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 700, color: 'white', margin: '0 0 0.4rem',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)',
        }}>
          PÉGA<span style={{ color: '#D4A017' }}>SEN</span><span style={{ color: '#F0C040' }}>221</span>
        </p>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic', fontSize: '1.2rem',
          color: 'rgba(212,160,23,0.9)', margin: '0 0 1.25rem',
          letterSpacing: '0.12em',
        }}>
          Excursions
        </p>

        {/* Ligne déco */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
          <span style={{ color: '#D4A017', fontSize: '1rem' }}>✦</span>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
        </div>

        <p style={{
          color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem',
          textTransform: 'uppercase', letterSpacing: '0.3em',
          marginTop: '0.75rem',
        }}>
          Sénégal • Découverte • Authenticité
        </p>
      </div>

      <style>{`
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(212,160,23,0.7)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 40px rgba(212,160,23,1)); transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}