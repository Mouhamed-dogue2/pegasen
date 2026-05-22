import { useEffect, useState } from 'react'

export default function IntroAnimation() {
  const [phase, setPhase] = useState(0)
  // 0=hidden 1=wings-opening 2=logo-appear 3=text-appear 4=fading 5=done

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 3800),
      setTimeout(() => setPhase(5), 4700),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (phase === 5) return null

  const visible = phase >= 1

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      background: 'radial-gradient(ellipse at 50% 60%, #3a1800 0%, #1C1208 45%, #060200 100%)',
      opacity: phase === 4 ? 0 : 1,
      transition: 'opacity 0.9s ease',
      pointerEvents: phase === 4 ? 'none' : 'all',
      overflow: 'hidden',
    }}>

      {/* ── AILE GAUCHE ── */}
      <div style={{
        position: 'absolute',
        top: '50%', right: '50%',
        width: 'min(55vw, 380px)',
        height: 'min(75vw, 520px)',
        transformOrigin: 'right center',
        transform: visible
          ? 'translateY(-50%) translateX(12%) rotate(-5deg) scaleX(1)'
          : 'translateY(-50%) translateX(50%) rotate(-40deg) scaleX(0.05)',
        transition: 'all 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        borderRadius: '50% 20% 20% 50%',
        background: 'linear-gradient(135deg, #1A6B3C 0%, #2d9e5a 25%, #D4A017 55%, #C0392B 85%, transparent 100%)',
        opacity: visible ? 0.35 : 0,
        filter: 'blur(1.5px)',
      }} />

      {/* ── AILE DROITE ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 'min(55vw, 380px)',
        height: 'min(75vw, 520px)',
        transformOrigin: 'left center',
        transform: visible
          ? 'translateY(-50%) translateX(-12%) rotate(5deg) scaleX(1)'
          : 'translateY(-50%) translateX(-50%) rotate(40deg) scaleX(0.05)',
        transition: 'all 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        borderRadius: '20% 50% 50% 20%',
        background: 'linear-gradient(225deg, #C0392B 0%, #D4A017 45%, #2d9e5a 75%, #1A6B3C 100%)',
        opacity: visible ? 0.35 : 0,
        filter: 'blur(1.5px)',
      }} />

      {/* ── AILE GAUCHE INTÉRIEURE (détail) ── */}
      <div style={{
        position: 'absolute',
        top: '50%', right: '50%',
        width: 'min(35vw, 240px)',
        height: 'min(55vw, 380px)',
        transformOrigin: 'right center',
        transform: visible
          ? 'translateY(-50%) translateX(8%) rotate(-3deg) scaleX(1)'
          : 'translateY(-50%) translateX(50%) rotate(-40deg) scaleX(0)',
        transition: 'all 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
        borderRadius: '40% 15% 15% 40%',
        background: 'linear-gradient(135deg, rgba(212,160,23,0.6) 0%, rgba(26,107,60,0.4) 60%, transparent 100%)',
        opacity: visible ? 0.5 : 0,
        filter: 'blur(0.5px)',
      }} />

      {/* ── AILE DROITE INTÉRIEURE ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 'min(35vw, 240px)',
        height: 'min(55vw, 380px)',
        transformOrigin: 'left center',
        transform: visible
          ? 'translateY(-50%) translateX(-8%) rotate(3deg) scaleX(1)'
          : 'translateY(-50%) translateX(-50%) rotate(40deg) scaleX(0)',
        transition: 'all 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
        borderRadius: '15% 40% 40% 15%',
        background: 'linear-gradient(225deg, rgba(212,160,23,0.6) 0%, rgba(192,57,43,0.4) 60%, transparent 100%)',
        opacity: visible ? 0.5 : 0,
        filter: 'blur(0.5px)',
      }} />

      {/* ── HALO CENTRAL ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 'min(60vw, 400px)',
        height: 'min(60vw, 400px)',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,160,23,0.2) 0%, rgba(212,160,23,0.05) 50%, transparent 75%)',
        opacity: phase >= 2 ? 1 : 0,
        transition: 'opacity 1s ease',
        animation: phase >= 2 ? 'haloPulse 3s ease-in-out infinite' : 'none',
      }} />

      {/* ── PARTICULES ── */}
      {[
        { x: '8%', y: '20%', c: '#D4A017', s: 6 },
        { x: '15%', y: '65%', c: '#1A6B3C', s: 4 },
        { x: '82%', y: '25%', c: '#C0392B', s: 5 },
        { x: '88%', y: '70%', c: '#D4A017', s: 4 },
        { x: '45%', y: '12%', c: '#F0C040', s: 5 },
        { x: '50%', y: '85%', c: '#1A6B3C', s: 4 },
        { x: '25%', y: '40%', c: '#C0392B', s: 3 },
        { x: '75%', y: '45%', c: '#D4A017', s: 3 },
      ].map(({ x, y, c, s }, i) => (
        <div key={i} style={{
          position: 'absolute', left: x, top: y,
          width: s, height: s, borderRadius: '50%',
          background: c,
          opacity: phase >= 2 ? 0.7 : 0,
          transform: phase >= 2 ? 'scale(1)' : 'scale(0)',
          transition: `opacity 0.6s ease ${0.1 + i * 0.07}s, transform 0.6s ease ${0.1 + i * 0.07}s`,
          animation: phase >= 2 ? `particleFloat ${3.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` : 'none',
        }} />
      ))}

      {/* ── BANDE TRICOLORE ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to right, #1A6B3C, #D4A017, #C0392B)',
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 1.2s ease 0.3s',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to right, #C0392B, #D4A017, #1A6B3C)',
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'right',
        transition: 'transform 1.2s ease 0.3s',
      }} />

      {/* ── LOGO ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        marginBottom: '1.5rem',
        transform: phase >= 2 ? 'scale(1) translateY(0)' : 'scale(0.4) translateY(40px)',
        opacity: phase >= 2 ? 1 : 0,
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Anneau décoratif */}
        <div style={{
          position: 'absolute', inset: '-14px', borderRadius: '50%',
          border: '1px solid rgba(212,160,23,0.4)',
          opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.8s ease',
          animation: phase >= 3 ? 'ringRotate 10s linear infinite' : 'none',
        }} />
        <div style={{
          position: 'absolute', inset: '-26px', borderRadius: '50%',
          border: '1px solid rgba(212,160,23,0.2)',
          opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.8s ease 0.2s',
          animation: phase >= 3 ? 'ringRotate 15s linear infinite reverse' : 'none',
        }} />
        <img
          src="/images/logo/pegasen-logo.png"
          alt="PEGASEN221"
          style={{
            width: 'min(58vw, 220px)', height: 'auto',
            filter: phase >= 3
              ? 'drop-shadow(0 0 24px rgba(212,160,23,0.9)) drop-shadow(0 0 48px rgba(212,160,23,0.4))'
              : 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))',
            transition: 'filter 0.8s ease',
            position: 'relative', zIndex: 1,
            animation: phase >= 3 ? 'logoFloat 4s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* ── TEXTE ── */}
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem',
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease',
      }}>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
          fontWeight: 700, color: 'white', margin: '0 0 0.2rem',
          textShadow: '0 4px 20px rgba(0,0,0,0.6)',
        }}>
          PÉGA<span style={{ color: '#D4A017' }}>SEN</span><span style={{ color: '#F0C040' }}>221</span>
        </p>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic', fontSize: 'clamp(0.95rem, 3vw, 1.2rem)',
          color: 'rgba(212,160,23,0.88)', margin: '0 0 1rem', letterSpacing: '0.12em',
        }}>Excursions</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '0.75rem' }}>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to right, transparent, #D4A017)' }} />
          <span style={{ color: '#D4A017' }}>✦</span>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to left, transparent, #D4A017)' }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.35em' }}>
          Sénégal • Découverte • Authenticité
        </p>
      </div>

      <style>{`
        @keyframes haloPulse { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1} 50%{transform:translate(-50%,-50%) scale(1.2);opacity:0.5} }
        @keyframes particleFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(1.15)} }
        @keyframes ringRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes logoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
    </div>
  )
}