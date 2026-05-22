import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import DestinationsPage from '@/pages/DestinationsPage'
import CircuitsPage from '@/pages/CircuitsPage'
import TarifsPage from '@/pages/TarifsPage'
import BrochuresPage from '@/pages/BrochuresPage'
import SolidaritePage from '@/pages/SolidaritePage'
import VlogPage from '@/pages/VlogPage'
import ContactPage from '@/pages/ContactPage'
import PanierPage from '@/pages/PanierPage'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import PanierWidget from '@/components/ui/PanierWidget'
import IntroAnimation from '@/components/ui/IntroAnimation'
import { PanierProvider } from '@/context/PanierContext'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 3700)
    return () => clearTimeout(t)
  }, [])

  return (
    <BrowserRouter>
      <PanierProvider>
        {showIntro && <IntroAnimation />}
        <Toaster position="top-right" toastOptions={{
          style: { background: '#FDF3E3', color: '#1C1208', border: '1px solid rgba(212,160,23,0.3)', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem' }
        }} />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/circuits" element={<CircuitsPage />} />
            <Route path="/tarifs" element={<TarifsPage />} />
            <Route path="/brochures" element={<BrochuresPage />} />
            <Route path="/solidarite" element={<SolidaritePage />} />
            <Route path="/vlog" element={<VlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/mon-circuit" element={<PanierPage />} />
          </Route>
        </Routes>
        {/* Boutons flottants */}
        <WhatsAppButton />
        <PanierWidget />
      </PanierProvider>
    </BrowserRouter>
  )
}