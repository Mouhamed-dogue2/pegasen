import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { usePanier } from '@/context/PanierContext'

export default function PanierWidget() {
  const { nombreItems } = usePanier()
  if (nombreItems === 0) return null

  return (
    <Link to="/mon-circuit"
      style={{
        position: 'fixed', bottom: '6rem', right: '1.5rem', zIndex: 50,
        display: 'flex', alignItems: 'center', gap: '8px',
        background: '#1C1208', color: 'white',
        padding: '10px 16px', borderRadius: '9999px',
        textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        border: '1px solid rgba(212,160,23,0.3)',
        transition: 'all 0.3s',
        animation: 'fadeUp 0.4s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)' }}>
      <ShoppingCart size={16} color="#D4A017" />
      <span>Mon circuit</span>
      <span style={{ background: '#D4A017', color: '#1C1208', borderRadius: '9999px', minWidth: '20px', height: '20px', padding: '0 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
        {nombreItems}
      </span>
    </Link>
  )
}