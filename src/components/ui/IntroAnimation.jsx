import { useEffect, useState, useRef } from 'react'

export default function IntroAnimation() {
  const [phase, setPhase] = useState('start')
  const videoRef = useRef(null)
  const [videoOk, setVideoOk] = useState(false)

  useEffect(() => {
    const vid = videoRef.current
    if (vid) {
      // Attributs obligatoires iOS Safari
      vid.muted = true
      vid.defaultMuted = true
      vid.setAttribute('muted', '')
      vid.setAttribute('playsinline', '')
      vid.setAttribute('webkit-playsinline', '')
      vid.setAttribute('x5-playsinline', '')        // Navigateurs Android Tencent
      vid.setAttribute('x5-video-player-type', 'h5') // WeChat
      vid.load()
      const p = vid.play()
      if (p !== undefined) {
        p.then(() => setVideoOk(true)).catch(() => setVideoOk(false))
      }
    }

    const t1 = setTimeout(() => setPhase('wings'), 200)
    const t2 = setTimeout(() => setPhase('glow'), 900)
    const t3 = setTimeout(() => setPhase('text'), 1300)
    const t4 = setTimeout(() => setPhase('fade'), 4200)
    const t5 = setTimeout(() => setPhase('done'), 5100)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  const show = (p) => ['wings','glow','text','fade'].includes(phase) && ['wings','glow','text','fade'].includes(p) ? true : phase === p

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      background: 'radial-gradient(ellipse at center, #2a1500 0%, #1C1208 55%, #060300 100%)',
      opacity: phase === 'fade' ? 0 : 1,
      transition: 'opacity 0.9s ease',
      pointerEvents: phase === 'fade' ? 'none' : 'all',
      overflow: 'hidden',
    }}>

      {/* ── Vidéo (desktop si disponible) ── */}
      <video ref={videoRef} muted playsInline loop={false} controls={false}
        webkit-playsinline="true"
        x5-playsinline="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: videoOk ? 0.55 : 0,
          transition: 'opacity 0.5s', pointerEvents: 'none',
        }}>
        <source src="/videos/deploreailes.mp4" type="video/mp4" />
      </video>

      {/* Overlay sur la vidéo */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,3,0,0.92) 0%, rgba(6,3,0,0.5) 50%, rgba(6,3,0,0.65) 100%)', pointerEvents: 'none' }} />

      {/* ── Animation CSS des ailes (fallback mobile + toujours visible) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', overflow: 'hidden',
      }}>
        {/* Aile gauche */}
        <div style={{
          position: 'absolute',
          width: '55vw', maxWidth: '420px',
          height: '70vw', maxHeight: '520px',
          right: '50%', top: '50%',
          transform: phase === 'start'
            ? 'translateY(-50%) translateX(60%) scaleX(0.05) rotate(-30deg)'
            : 'translateY(-50%) translateX(10%) scaleX(1) rotate(0deg)',
          transformOrigin: 'right center',
          transition: 'all 1.4s cubic-bezier(0.16,1,0.3,1)',
          opacity: phase === 'start' ? 0 : 0.18,
          background: 'radial-gradient(ellipse at right, #1A6B3C 0%, #D4A017 40%, #C0392B 70%, transparent 100%)',
          borderRadius: '50% 10% 10% 50%',
          filter: 'blur(2px)',
        }} />
        {/* Aile droite */}
        <div style={{
          position: 'absolute',
          width: '55vw', maxWidth: '420px',
          height: '70vw', maxHeight: '520px',
          left: '50%', top: '50%',
          transform: phase === 'start'
            ? 'translateY(-50%) translateX(-60%) scaleX(0.05) rotate(30deg)'
            : 'translateY(-50%) translateX(-10%) scaleX(1) rotate(0deg)',
          transformOrigin: 'left center',
          transition: 'all 1.4s cubic-bezier(0.16,1,0.3,1)',
          opacity: phase === 'start' ? 0 : 0.18,
          background: 'radial-gradient(ellipse at left, #C0392B 0%, #D4A017 40%, #1A6B3C 70%, transparent 100%)',
          borderRadius: '10% 50% 50% 10%',
          filter: 'blur(2px)',
        }} />

        {/* Halo central pulsant */}
        <div style={{
          position: 'absolute',
          width: '60vw', maxWidth: '460px', height: '60vw', maxHeight: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(212,160,23,0.18) 0%, transparent 65%)',
          opacity: phase === 'glow' || phase === 'text' ? 1 : 0,
          transform: phase === 'glow' || phase === 'text' ? 'scale(1)' : 'scale(0.4)',
          transition: 'all 1s ease',
          animation: phase === 'glow' || phase === 'text' ? 'haloPulse 3s ease-in-out infinite' : 'none',
        }} />
      </div>

      {/* Bande tricolore haut */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)',
        transform: phase === 'start' ? 'scaleX(0)' : 'scaleX(1)',
        transformOrigin: 'left',
        transition: 'transform 1s ease 0.3s',
      }} />

      {/* ── Particules ── */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${3 + (i % 4) * 3}px`, height: `${3 + (i % 4) * 3}px`,
          borderRadius: '50%',
          background: ['#D4A017','#1A6B3C','#C0392B','#F0C040'][i % 4],
          left: `${6 + i * 9}%`, top: `${10 + (i % 5) * 16}%`,
          opacity: phase !== 'start' ? 0.55 : 0,
          transform: phase !== 'start' ? 'scale(1)' : 'scale(0)',
          transition: `all 0.6s ease ${0.2 + i * 0.08}s`,
          animation: phase !== 'start' ? `particleFloat ${4 + i % 3}s ease-in-out ${i * 0.25}s infinite` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Logo & Texte ── */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem' }}>

        {/* Logo */}
        <div style={{
          marginBottom: '1.5rem',
          transform: phase === 'start' ? 'scale(0.3) translateY(50px)' : 'scale(1) translateY(0)',
          opacity: phase === 'start' ? 0 : 1,
          transition: 'all 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s',
          position: 'relative', display: 'inline-block',
        }}>
          {/* Anneaux décoratifs autour du logo */}
          <div style={{
            position: 'absolute', inset: '-16px', borderRadius: '50%',
            border: '1px solid rgba(212,160,23,0.3)',
            opacity: phase === 'glow' || phase === 'text' ? 1 : 0,
            transition: 'opacity 0.8s ease',
            animation: phase === 'glow' || phase === 'text' ? 'ringRotate 8s linear infinite' : 'none',
          }} />
          <div style={{
            position: 'absolute', inset: '-28px', borderRadius: '50%',
            border: '1px solid rgba(212,160,23,0.15)',
            opacity: phase === 'glow' || phase === 'text' ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
            animation: phase === 'glow' || phase === 'text' ? 'ringRotate 12s linear infinite reverse' : 'none',
          }} />
          <img src="/images/logo/pegasen-logo.png" alt="PEGASEN221"
            style={{
              width: 'min(62vw, 240px)', height: 'auto',
              filter: phase === 'glow' || phase === 'text'
                ? 'drop-shadow(0 0 28px rgba(212,160,23,0.9)) drop-shadow(0 0 55px rgba(212,160,23,0.4))'
                : 'drop-shadow(0 6px 20px rgba(0,0,0,0.8))',
              transition: 'filter 0.9s ease',
              position: 'relative', zIndex: 1,
              animation: phase === 'text' ? 'logoHover 4s ease-in-out infinite' : 'none',
            }} />
        </div>

        {/* Texte */}
        <div style={{
          opacity: phase === 'text' || phase === 'fade' ? 1 : 0,
          transform: phase === 'text' || phase === 'fade' ? 'translateY(0)' : 'translateY(18px)',
          transition: 'all 0.8s ease',
        }}>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 7vw, 3.2rem)',
            fontWeight: 700, color: 'white', margin: '0 0 0.25rem',
            textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            letterSpacing: '0.03em',
          }}>
            PÉGA<span style={{ color: '#D4A017' }}>SEN</span><span style={{ color: '#F0C040' }}>221</span>
          </p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
            color: 'rgba(212,160,23,0.88)', margin: '0 0 1.25rem',
            letterSpacing: '0.14em',
          }}>
            Excursions
          </p>
          {/* Ligne déco */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '0.85rem' }}>
            <div style={{ height: '1px', width: '55px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
            <span style={{ color: '#D4A017', fontSize: '0.9rem' }}>✦</span>
            <div style={{ height: '1px', width: '55px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.38)', fontSize: '0.68rem',
            textTransform: 'uppercase', letterSpacing: '0.35em',
          }}>
            Sénégal • Découverte • Authenticité
          </p>
        </div>
      </div>

      <style>{`
        /* Cache tous les contrôles natifs vidéo */
        video::-webkit-media-controls,
        video::-webkit-media-controls-enclosure,
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-start-playback-button,
        video::-webkit-media-controls-overlay-play-button { display:none!important; }

        @keyframes haloPulse {
          0%,100% { transform:scale(1); opacity:1; }
          50%      { transform:scale(1.18); opacity:0.6; }
        }
        @keyframes particleFloat {
          0%,100% { transform:translateY(0) scale(1); }
          50%      { transform:translateY(-12px) scale(1.1); }
        }
        @keyframes ringRotate {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes logoHover {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-8px); }
        }
      `}</style>
    </div>
  )
}