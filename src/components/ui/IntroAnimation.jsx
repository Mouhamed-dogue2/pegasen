import { useEffect, useState, useRef } from 'react'

export default function IntroAnimation() {
  const [phase, setPhase] = useState('enter')
  const [wingsOpen, setWingsOpen] = useState(false)
  const [eyesGlow, setEyesGlow] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    // Tenter de jouer la vidéo sur mobile aussi
    if (videoRef.current) {
      const vid = videoRef.current
      // Attributs essentiels pour mobile
      vid.muted = true
      vid.playsInline = true
      vid.autoplay = true
      // Forcer le play (nécessaire sur iOS/Android)
      const playPromise = vid.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => setVideoFailed(true))
      }
    }

    const t1 = setTimeout(() => setWingsOpen(true), 400)
    const t2 = setTimeout(() => setEyesGlow(true), 1000)
    const t3 = setTimeout(() => setPhase('fade'), 4200)
    const t4 = setTimeout(() => setPhase('done'), 5100)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      background: 'radial-gradient(ellipse at center, #2a1500 0%, #1C1208 50%, #0a0600 100%)',
      opacity: phase === 'fade' ? 0 : 1,
      transition: 'opacity 0.9s ease',
      pointerEvents: phase === 'fade' ? 'none' : 'all',
      overflow: 'hidden',
    }}>

      {/* ── VIDÉO EN BACKGROUND ── */}
      {!videoFailed && (
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          loop={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: 0.65,
            // Cache le bouton play natif sur tous les navigateurs
            pointerEvents: 'none',
          }}
          // Empêche l'affichage des contrôles natifs
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onError={() => setVideoFailed(true)}
        >
          <source src="/videos/deploreailes.mp4" type="video/mp4" />
        </video>
      )}

      {/* Style global pour cacher le bouton play webkit sur iOS/Safari */}
      <style>{`
        video::-webkit-media-controls { display: none !important; }
        video::-webkit-media-controls-enclosure { display: none !important; }
        video::-webkit-media-controls-panel { display: none !important; }
        video::-webkit-media-controls-play-button { display: none !important; }
        video::-webkit-media-controls-start-playback-button { display: none !important; }
        video::--webkit-media-controls-overlay-play-button { display: none !important; }
        video::-moz-media-controls { display: none !important; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes wingPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.12);opacity:0.7} }
      `}</style>

      {/* Overlay dégradé sur la vidéo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,6,0,0.88) 0%, rgba(10,6,0,0.35) 50%, rgba(10,6,0,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Bande tricolore */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)',
        opacity: wingsOpen ? 1 : 0, transition: 'opacity 0.5s ease 0.3s',
      }} />

      {/* Particules */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${4 + (i % 3) * 3}px`, height: `${4 + (i % 3) * 3}px`,
          borderRadius: '50%',
          background: i % 3 === 0 ? '#D4A017' : i % 3 === 1 ? '#1A6B3C' : '#C0392B',
          left: `${8 + i * 12}%`, top: `${12 + (i % 4) * 18}%`,
          opacity: wingsOpen ? 0.5 : 0,
          transform: wingsOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0)',
          transition: `all 0.8s ease ${i * 0.1}s`,
          animation: wingsOpen ? `float ${4 + i % 3}s ease-in-out ${i * 0.3}s infinite` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Contenu centré */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem' }}>

        {/* Logo */}
        <div style={{
          marginBottom: '1.75rem',
          transform: wingsOpen ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(30px)',
          opacity: wingsOpen ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.15s',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: '-25px', borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(212,160,23,0.25) 0%, transparent 70%)',
            animation: wingsOpen ? 'wingPulse 3s ease-in-out 1s infinite' : 'none',
          }} />
          <img src="/images/logo/pegasen-logo.png" alt="PEGASEN221"
            style={{
              width: 'min(65vw, 260px)', height: 'auto',
              filter: eyesGlow
                ? 'drop-shadow(0 0 25px rgba(212,160,23,0.9)) drop-shadow(0 0 50px rgba(212,160,23,0.4))'
                : 'drop-shadow(0 4px 20px rgba(0,0,0,0.7))',
              transition: 'filter 0.8s ease',
              position: 'relative', zIndex: 1,
            }} />
        </div>

        {/* Texte */}
        <div style={{
          opacity: wingsOpen ? 1 : 0,
          transform: wingsOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.9s ease 0.5s',
        }}>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700, color: 'white', margin: '0 0 0.3rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            PÉGA<span style={{ color: '#D4A017' }}>SEN</span><span style={{ color: '#F0C040' }}>221</span>
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.15rem', color: 'rgba(212,160,23,0.85)', margin: '0 0 1.25rem', letterSpacing: '0.12em' }}>
            Excursions
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #D4A017)', width: wingsOpen ? '60px' : '0px', transition: 'width 1s ease 1s' }} />
            <span style={{ color: '#D4A017', opacity: wingsOpen ? 1 : 0, transition: 'opacity 0.5s ease 1.2s' }}>✦</span>
            <div style={{ height: '1px', background: 'linear-gradient(to left, transparent, #D4A017)', width: wingsOpen ? '60px' : '0px', transition: 'width 1s ease 1s' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: '0.85rem', opacity: wingsOpen ? 1 : 0, transition: 'opacity 0.5s ease 1.4s' }}>
            Sénégal • Découverte • Authenticité
          </p>
        </div>
      </div>
    </div>
  )
}