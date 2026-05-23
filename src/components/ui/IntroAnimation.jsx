import { useEffect, useState, useRef } from 'react'

export default function IntroAnimation({ onDone }) {
  const [phase, setPhase] = useState(0)
  // phase 0 = tout caché
  // phase 1 = ailes s'ouvrent
  // phase 2 = logo apparaît
  // phase 3 = texte apparaît + vidéo visible
  // phase 4 = fondu sortie
  // phase 5 = retiré du DOM

  const videoRef = useRef(null)
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    // Jouer la vidéo immédiatement
    const vid = videoRef.current
    if (vid) {
      vid.play()
        .then(() => setVideoPlaying(true))
        .catch(() => setVideoPlaying(false))
    }

    const t1 = setTimeout(() => setPhase(1), 100)   // ailes s'ouvrent
    const t2 = setTimeout(() => setPhase(2), 600)   // logo monte
    const t3 = setTimeout(() => setPhase(3), 1100)  // texte + pleine opacité vidéo
    const t4 = setTimeout(() => setPhase(4), 4500)  // début fondu sortie
    const t5 = setTimeout(() => {
      setPhase(5)
      onDone?.()                                     // prévenir App.jsx
    }, 5400)

    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout)
  }, [])

  if (phase === 5) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', overflow: 'hidden',
      opacity: phase === 4 ? 0 : 1,
      transition: 'opacity 0.9s ease',
      pointerEvents: phase >= 4 ? 'none' : 'all',
    }}>

      {/* ── 1. FOND SOMBRE (toujours là) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 55%, #3a1800 0%, #1C1208 50%, #050200 100%)',
      }} />

      {/* ── 2. VIDÉO EN BACKGROUND (PC + Android) ── */}
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        loop={false}
        controls={false}
        poster="/videos/deploreailes-poster.jpg"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          // Visible seulement si elle joue vraiment
          opacity: videoPlaying ? 0.7 : 0,
          transition: 'opacity 0.8s ease',
        }}>
        <source src="/videos/deploreailes.mp4" type="video/mp4" />
      </video>

      {/* Overlay par-dessus la vidéo pour lisibilité du texte */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,2,0,0.9) 0%, rgba(5,2,0,0.45) 50%, rgba(5,2,0,0.6) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── 3. AILES CSS (visibles sur iOS + renforcent la vidéo ailleurs) ── */}
      {/* Aile gauche */}
      <div style={{
        position: 'absolute', top: '50%', right: '50%',
        width: 'min(58vw, 400px)', height: 'min(80vw, 560px)',
        transformOrigin: 'right center',
        transform: phase >= 1
          ? 'translateY(-52%) translateX(14%) rotate(-6deg)'
          : 'translateY(-52%) translateX(55%) rotate(-45deg) scaleX(0.02)',
        transition: 'transform 1.5s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
        borderRadius: '50% 18% 18% 50%',
        background: 'linear-gradient(140deg, #1A6B3C 0%, #25a058 20%, #D4A017 55%, #C0392B 90%, transparent 100%)',
        opacity: phase >= 1 ? (videoPlaying ? 0.12 : 0.38) : 0,
        filter: 'blur(1.5px)',
      }} />
      {/* Aile droite */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 'min(58vw, 400px)', height: 'min(80vw, 560px)',
        transformOrigin: 'left center',
        transform: phase >= 1
          ? 'translateY(-52%) translateX(-14%) rotate(6deg)'
          : 'translateY(-52%) translateX(-55%) rotate(45deg) scaleX(0.02)',
        transition: 'transform 1.5s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
        borderRadius: '18% 50% 50% 18%',
        background: 'linear-gradient(220deg, #C0392B 0%, #D4A017 45%, #25a058 80%, #1A6B3C 100%)',
        opacity: phase >= 1 ? (videoPlaying ? 0.12 : 0.38) : 0,
        filter: 'blur(1.5px)',
      }} />

      {/* ── 4. HALO CENTRAL ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 'min(55vw, 380px)', height: 'min(55vw, 380px)',
        transform: 'translate(-50%,-50%)', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,160,23,0.22) 0%, transparent 68%)',
        opacity: phase >= 2 ? 1 : 0,
        transition: 'opacity 1s ease',
        animation: phase >= 2 ? 'haloPulse 3.5s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
      }} />

      {/* ── 5. BANDES TRICOLORES ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)', transform: phase >= 1 ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 1.2s ease 0.2s' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, #C0392B, #D4A017, #1A6B3C)', transform: phase >= 1 ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'right', transition: 'transform 1.2s ease 0.2s' }} />

      {/* ── 6. PARTICULES ── */}
      {[
        {x:'7%', y:'18%', c:'#D4A017', s:6},
        {x:'86%',y:'22%', c:'#C0392B', s:5},
        {x:'44%',y:'8%',  c:'#F0C040', s:5},
        {x:'14%',y:'70%', c:'#1A6B3C', s:4},
        {x:'84%',y:'74%', c:'#D4A017', s:4},
        {x:'52%',y:'90%', c:'#C0392B', s:5},
        {x:'28%',y:'38%', c:'#F0C040', s:3},
        {x:'74%',y:'42%', c:'#1A6B3C', s:3},
      ].map(({x,y,c,s},i) => (
        <div key={i} style={{
          position: 'absolute', left: x, top: y,
          width: s, height: s, borderRadius: '50%', background: c,
          opacity: phase >= 2 ? 0.75 : 0,
          transform: phase >= 2 ? 'scale(1)' : 'scale(0)',
          transition: `opacity 0.5s ease ${i*0.07}s, transform 0.5s ease ${i*0.07}s`,
          animation: phase >= 2 ? `particleFloat ${3.5+i*0.35}s ease-in-out ${i*0.28}s infinite` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── 7. LOGO ── */}
      <div style={{
        position: 'relative', zIndex: 10, marginBottom: '1.5rem',
        transform: phase >= 2 ? 'scale(1) translateY(0)' : 'scale(0.35) translateY(50px)',
        opacity: phase >= 2 ? 1 : 0,
        transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s',
      }}>
        {/* Anneaux décoratifs */}
        <div style={{ position: 'absolute', inset: '-14px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.45)', opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.8s', animation: phase >= 3 ? 'ringRotate 10s linear infinite' : 'none' }} />
        <div style={{ position: 'absolute', inset: '-27px', borderRadius: '50%', border: '1px solid rgba(212,160,23,0.2)', opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.8s 0.2s', animation: phase >= 3 ? 'ringRotate 16s linear infinite reverse' : 'none' }} />
        <img
          src="/images/logo/pegasen-logo.png"
          alt="PEGASEN221"
          style={{
            width: 'min(60vw, 230px)', height: 'auto',
            position: 'relative', zIndex: 1,
            filter: phase >= 3
              ? 'drop-shadow(0 0 28px rgba(212,160,23,1)) drop-shadow(0 0 55px rgba(212,160,23,0.5))'
              : 'drop-shadow(0 6px 24px rgba(0,0,0,0.9))',
            transition: 'filter 0.9s ease',
            animation: phase >= 3 ? 'logoFloat 4.5s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* ── 8. TEXTE ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', padding: '0 1.5rem',
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? 'translateY(0)' : 'translateY(22px)',
        transition: 'all 0.85s ease',
      }}>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.9rem, 6.5vw, 3rem)',
          fontWeight: 700, color: 'white',
          margin: '0 0 0.2rem',
          textShadow: '0 4px 24px rgba(0,0,0,0.8)',
          letterSpacing: '0.03em',
        }}>
          PÉGA<span style={{color:'#D4A017'}}>SEN</span><span style={{color:'#F0C040'}}>221</span>
        </p>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 3.2vw, 1.25rem)',
          color: 'rgba(212,160,23,0.9)',
          margin: '0 0 1.1rem',
          letterSpacing: '0.14em',
        }}>Excursions</p>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', marginBottom:'0.7rem'}}>
          <div style={{height:'1px', width:'55px', background:'linear-gradient(to right, transparent, #D4A017)'}} />
          <span style={{color:'#D4A017', fontSize:'0.95rem'}}>✦</span>
          <div style={{height:'1px', width:'55px', background:'linear-gradient(to left, transparent, #D4A017)'}} />
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.32)',
          fontSize: '0.63rem',
          textTransform: 'uppercase',
          letterSpacing: '0.38em',
        }}>Sénégal • Découverte • Authenticité</p>
      </div>

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        video::-webkit-media-controls,
        video::-webkit-media-controls-enclosure,
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-start-playback-button,
        video::-webkit-media-controls-overlay-play-button { display:none!important; }
        @keyframes haloPulse {
          0%,100% { transform:translate(-50%,-50%) scale(1); opacity:1; }
          50%      { transform:translate(-50%,-50%) scale(1.22); opacity:0.45; }
        }
        @keyframes particleFloat {
          0%,100% { transform:translateY(0) scale(1); }
          50%      { transform:translateY(-15px) scale(1.2); }
        }
        @keyframes ringRotate {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes logoFloat {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-9px); }
        }
      `}</style>
    </div>
  )
}