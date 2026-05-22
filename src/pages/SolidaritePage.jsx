import { Link } from 'react-router-dom'
import { Phone, Heart, Leaf, Shield, ArrowRight, ShoppingCart } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import CtaSection from '@/components/ui/CtaSection'
import useScrollReveal from '@/hooks/useScrollReveal'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

const VALEURS = [
  { emoji: '🚫', titre: 'Aucune exploitation', desc: 'Jamais d\'image d\'enfants sans accord préalable de la structure.', couleur: C.rouge },
  { emoji: '✅', titre: 'Accord préalable', desc: 'Chaque visite organisée en concertation avec la pouponnière.', couleur: C.vert },
  { emoji: '💯', titre: 'Don intégral', desc: '100% du don reversé à la structure. Aucun intermédiaire.', couleur: C.or },
  { emoji: '❤️', titre: 'Tourisme humain', desc: 'Moments de partage authentique, pas d\'attraction touristique.', couleur: C.rouge },
]

const ENGAGEMENTS = [
  { emoji: '🌳', titre: 'Un arbre par circuit', desc: 'Pour chaque circuit, un arbre peut être planté grâce aux dons clients.', couleur: C.vert },
  { emoji: '📱', titre: 'Suivi de votre arbre', desc: 'Photos et vidéos de l\'évolution de votre arbre au fil du temps.', couleur: '#2E7D32' },
  { emoji: '🌡️', titre: 'Contre les îlots de chaleur', desc: 'Notre programme lutte contre les températures excessives locales.', couleur: C.or },
  { emoji: '🤝', titre: 'Communautés locales', desc: 'Les arbres sont plantés avec les communautés, créant des emplois.', couleur: C.vert },
]

export default function SolidaritePage() {
  useScrollReveal()
  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>
      <PageHero
        tag="Tourisme responsable"
        titre="Solidarité &"
        orMot="Environnement"
        description="Voyager avec le cœur — partager, protéger, respecter."
        bgColor="linear-gradient(160deg, #1C1208 0%, #0d2a0d 100%)"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>

        {/* POUPONNIÈRE */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <div style={{ height: '2px', width: '28px', background: C.rouge, borderRadius: '9999px' }} />
            <span style={{ color: C.rouge, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>Excursions solidaires</span>
            <div style={{ height: '2px', width: '28px', background: C.rouge, borderRadius: '9999px' }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: C.noirChaud, margin: '0 0 0.5rem' }}>Circuit Pouponnière</h2>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontStyle: 'italic', color: C.or }}>Une demi-journée de partage et d'humanité</p>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { icon: <Heart size={20} color={C.rouge} fill={C.rouge} />, titre: 'Qu\'est-ce que c\'est ?', border: C.rouge, content: 'PEGASEN221 vous propose de visiter une pouponnière locale et de passer une demi-journée avec les enfants. Un moment de partage authentique, loin du tourisme classique.' },
              { icon: '🎁', titre: 'Le don', border: C.or, content: 'À l\'issue de la visite, faites un don libre ou conseillé. Ce don est reversé 100% à la structure. Chaque centime compte pour ces enfants.' },
            ].map(({ icon, titre, border, content }) => (
              <div key={titre} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', borderLeft: `4px solid ${border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: typeof icon === 'string' ? '1.3rem' : undefined }}>{icon}</span>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', color: C.noirChaud, margin: 0 }}>{titre}</h3>
                </div>
                <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{content}</p>
              </div>
            ))}
          </div>

          <div style={{ background: `linear-gradient(135deg, rgba(192,57,43,0.1), rgba(212,160,23,0.1))`, borderRadius: '1.5rem', padding: '3rem', textAlign: 'center', border: `2px dashed rgba(192,57,43,0.3)` }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>👶</div>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Un voyage qui compte</p>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: C.rouge, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              "Voyager, c'est aussi donner"
            </p>
            <a href="https://wa.me/+221788938254?text=Bonjour, je suis intéressé par le circuit pouponnière"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: C.rouge, color: 'white', fontWeight: 700, padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <Phone size={16} /> Organiser une visite
            </a>
          </div>
        </div>

        {/* Valeurs éthiques */}
        <div className="reveal" style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: C.noirChaud, marginBottom: '0.5rem' }}>
              Notre éthique — <span style={{ color: C.rouge }}>Non négociable</span>
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {VALEURS.map(({ emoji, titre, desc, couleur }) => (
              <div key={titre} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', borderTop: `4px solid ${couleur}`, transition: 'all 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{emoji}</div>
                <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: C.noirChaud, marginBottom: '0.5rem' }}>{titre}</h4>
                <p style={{ color: '#777', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SÉPARATEUR */}
        <div style={{ height: '1px', background: `linear-gradient(to right, transparent, rgba(212,160,23,0.5), transparent)`, marginBottom: '5rem' }} />

        {/* ENVIRONNEMENT */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <div style={{ height: '2px', width: '28px', background: C.vert, borderRadius: '9999px' }} />
            <span style={{ color: C.vert, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>Notre planète</span>
            <div style={{ height: '2px', width: '28px', background: C.vert, borderRadius: '9999px' }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: C.noirChaud, margin: '0 0 0.5rem' }}>Engagement Environnemental</h2>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontStyle: 'italic', color: C.vert }}>Chaque voyage peut laisser une trace positive</p>
        </div>

        <div className="reveal" style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #0d2a0d)`, borderRadius: '1.5rem', padding: '3rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '1rem', right: '2rem', fontSize: '8rem', opacity: 0.05, pointerEvents: 'none' }}>🌳</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Leaf size={26} color={C.orClair} />
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: 'white', margin: 0 }}>
              Programme <span style={{ color: C.orClair }}>Plantation d'Arbres</span>
            </h3>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '680px' }}>
            Un QR code "don pour la plantation" est disponible lors de vos excursions. Grâce à ces dons, <strong style={{ color: C.orClair }}>un arbre peut être planté par circuit</strong>. Vous recevez des photos et vidéos pour suivre l'évolution de votre arbre.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {ENGAGEMENTS.map(({ emoji, titre, desc, couleur }) => (
              <div key={titre} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.25rem', borderTop: `3px solid ${couleur}` }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{emoji}</div>
                <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>{titre}</h4>
                <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.4rem' }}>📲</div>
              <p style={{ color: C.noirChaud, fontSize: '0.72rem', fontWeight: 700, margin: 0 }}>QR Code</p>
              <p style={{ color: '#888', fontSize: '0.68rem', margin: 0 }}>Don plantation</p>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Scannez lors de votre excursion pour participer.<br />
              <span style={{ color: C.orClair, fontWeight: 600 }}>Chaque arbre est suivi et documenté.</span>
            </p>
          </div>
        </div>

        {/* Engagements concrets */}
        <div className="reveal" style={{ background: 'white', borderRadius: '1.25rem', padding: '2.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Shield size={22} color={C.vert} />
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.35rem', color: C.noirChaud, margin: 0 }}>Nos engagements concrets</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { emoji: '🚗', txt: 'Véhicules entretenus et contrôlés régulièrement' },
              { emoji: '🌱', txt: 'Programme de plantation d\'arbres par circuit' },
              { emoji: '🤝', txt: 'Partenariats avec artisans et guides locaux' },
              { emoji: '💧', txt: 'Eau fraîche à bord — moins de plastiques' },
              { emoji: '📸', txt: 'Consentement obligatoire avant toute photo' },
              { emoji: '🏘️', txt: 'Tourisme qui bénéficie aux communautés' },
            ].map(({ emoji, txt }) => (
              <div key={txt} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.85rem', background: C.sable, borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{emoji}</span>
                <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.55, margin: 0 }}>{txt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaSection titre="Voyagez avec" orMot="conscience" texte="Chaque excursion avec PEGASEN221 contribue à un Sénégal plus vert et à des enfants mieux soutenus." whatsappText="Bonjour, je voudrais en savoir plus sur vos actions solidaires" />
    </div>
  )
}