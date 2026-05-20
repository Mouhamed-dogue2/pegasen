import { useEffect, useState } from 'react'

export default function LogoBackground({ opacity = 0.08 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 2,
      overflow: 'hidden',
    }}>
      <img
        src="/images/logo/pegasen-logo.png"
        alt=""
        aria-hidden="true"
        style={{
          width: 'min(90vw, 820px)',
          height: 'auto',
          // mix-blend-mode screen ignore le fond blanc du PNG
          mixBlendMode: 'screen',
          filter: `brightness(2) saturate(0.3) opacity(${visible ? opacity : 0})`,
          transform: visible
            ? 'scale(1) translateY(0)'
            : 'scale(0.4) translateY(60px)',
          transition: 'all 2.8s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'center bottom',
          userSelect: 'none',
          WebkitUserDrag: 'none',
          animation: visible
            ? 'wingPulse 7s ease-in-out 3s infinite'
            : 'none',
        }}
      />

      <style>{`
        @keyframes wingPulse {
          0%, 100% { 
            filter: brightness(2) saturate(0.3) opacity(${opacity});
            transform: scale(1) translateY(0);
          }
          50% { 
            filter: brightness(2.2) saturate(0.4) opacity(${opacity + 0.04});
            transform: scale(1.03) translateY(-6px);
          }
        }
      `}</style>
    </div>
  )
}