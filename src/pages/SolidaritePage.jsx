import { Link } from 'react-router-dom'
import { Phone, Heart, Leaf, Shield, ArrowRight } from 'lucide-react'

const C = {
  or: '#D4A017',
  orClair: '#F0C040',
  vert: '#1A6B3C',
  rouge: '#C0392B',
  noirChaud: '#1C1208',
  sable: '#FDF3E3',
}

const VALEURS = [
  {
    emoji: '🚫',
    titre: 'Aucune exploitation',
    desc: 'Nous ne publions jamais l\'image des enfants sans accord préalable de la structure d\'accueil.',
    couleur: C.rouge,
  },
  {
    emoji: '✅',
    titre: 'Accord préalable',
    desc: 'Chaque visite est organisée en concertation avec la pouponnière. Rien n\'est improvisé.',
    couleur: C.vert,
  },
  {
    emoji: '💯',
    titre: 'Don reversé intégralement',
    desc: 'Le 100% de votre don libre est reversé directement à la structure. Aucun intermédiaire.',
    couleur: C.or,
  },
  {
    emoji: '❤️',
    titre: 'Tourisme humain',
    desc: 'Ces visites sont des moments de partage authentique, pas des attractions touristiques.',
    couleur: C.rouge,
  },
]

const ENGAGEMENTS_ENV = [
  {
    emoji: '🌳',
    titre: 'Un arbre par circuit',
    desc: 'Pour chaque circuit réalisé, un arbre peut être planté grâce aux dons de nos clients. Contribuez à reverdir le Sénégal.',
    couleur: C.vert,
  },
  {
    emoji: '📱',
    titre: 'Suivi de votre arbre',
    desc: 'Recevez des photos et vidéos de l\'évolution de votre arbre au fil du temps. Votre impact est visible et concret.',
    couleur: '#2E7D32',
  },
  {
    emoji: '🌡️',
    titre: 'Contre les îlots de chaleur',
    desc: 'Notre programme de plantation combat les îlots de chaleur excessifs qui menacent les communautés locales.',
    couleur: C.or,
  },
  {
    emoji: '🤝',
    titre: 'Communautés locales',
    desc: 'Les arbres sont plantés par et avec les communautés locales, créant des emplois et renforçant les liens sociaux.',
    couleur: C.vert,
  },
]

export default function SolidaritePage() {
  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #0d2a0d 100%)`, padding: '10rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />
        {/* Décor feuilles */}
        <div style={{ position: 'absolute', top: '15%', left: '3%', fontSize: '8rem', opacity: 0.05, transform: 'rotate(-20deg)' }}>🌿</div>
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', fontSize: '8rem', opacity: 0.05, transform: 'rotate(15deg)' }}>🌳</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.vert})` }} />
            <span style={{ color: C.vert, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>Tourisme responsable</span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${C.vert})` }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Solidarité &<br /><span style={{ color: C.orClair }}>Environnement</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', maxWidth: '600px', margin: '0 auto' }}>
            Voyager autrement, avec le cœur et le respect de la nature
          </p>
        </div>
      </div>

      {/* ── SECTION POUPONNIÈRE ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>

        {/* Titre section */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <div style={{ height: '2px', width: '30px', background: C.rouge }} />
            <span style={{ color: C.rouge, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>Excursions solidaires</span>
            <div style={{ height: '2px', width: '30px', background: C.rouge }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: C.noirChaud, margin: '0 0 0.5rem' }}>
            Circuit Pouponnière
          </h2>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontStyle: 'italic', color: C.or }}>
            Une demi-journée de partage et d'humanité
          </p>
        </div>

        {/* Contenu pouponnière */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>

          {/* Texte */}
          <div>
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: `4px solid ${C.rouge}`, marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <Heart size={22} color={C.rouge} fill={C.rouge} />
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: C.noirChaud, margin: 0 }}>Qu'est-ce que c'est ?</h3>
              </div>
              <p style={{ color: '#555', fontSize: '0.93rem', lineHeight: 1.8, margin: 0 }}>
                PEGASEN221 Excursions vous propose la possibilité de visiter une pouponnière locale et de passer une <strong>demi-journée avec les enfants</strong>. Un moment de partage authentique, loin du tourisme classique, qui touche profondément chaque visiteur.
              </p>
            </div>

            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderLeft: `4px solid ${C.or}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.3rem' }}>🎁</span>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: C.noirChaud, margin: 0 }}>Le don</h3>
              </div>
              <p style={{ color: '#555', fontSize: '0.93rem', lineHeight: 1.8, margin: 0 }}>
                À l'issue de la visite, vous pouvez faire un <strong>don libre ou conseillé</strong>. Ce don est reversé <strong>intégralement</strong> à la structure d'accueil, sans aucun prélèvement de notre part. Chaque centime compte pour ces enfants.
              </p>
            </div>
          </div>

          {/* Image + déco */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: `linear-gradient(135deg, ${C.rouge}20, ${C.or}20)`, borderRadius: '1.5rem', padding: '3rem', textAlign: 'center', border: `2px dashed ${C.rouge}40` }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>👶</div>
              <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: C.noirChaud, marginBottom: '0.5rem' }}>Un voyage qui compte</p>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: C.rouge, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
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
        </div>

        {/* Nos valeurs éthiques */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: C.noirChaud, marginBottom: '0.5rem' }}>
              Notre éthique — <span style={{ color: C.rouge }}>Non négociable</span>
            </h3>
            <p style={{ color: '#777', fontSize: '0.95rem' }}>Les principes qui guident chacune de nos visites solidaires</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {VALEURS.map(({ emoji, titre, desc, couleur }) => (
              <div key={titre} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', borderTop: `4px solid ${couleur}`, transition: 'all 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{emoji}</div>
                <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: C.noirChaud, marginBottom: '0.5rem' }}>{titre}</h4>
                <p style={{ color: '#777', fontSize: '0.83rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION ENVIRONNEMENT ── */}
        <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${C.or}60, transparent)`, marginBottom: '5rem' }} />

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <div style={{ height: '2px', width: '30px', background: C.vert }} />
            <span style={{ color: C.vert, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>Notre planète</span>
            <div style={{ height: '2px', width: '30px', background: C.vert }} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: C.noirChaud, margin: '0 0 0.5rem' }}>
            Notre Engagement Environnemental
          </h2>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontStyle: 'italic', color: C.vert }}>
            Chaque voyage peut laisser une trace positive
          </p>
        </div>

        {/* Programme plantation */}
        <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #0d2a0d)`, borderRadius: '1.5rem', padding: '3rem', marginBottom: '3rem', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '1rem', right: '2rem', fontSize: '8rem', opacity: 0.06 }}>🌳</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <Leaf size={28} color={C.orClair} />
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', color: 'white', margin: 0 }}>
                Programme <span style={{ color: C.orClair }}>Plantation d'Arbres</span>
              </h3>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '700px' }}>
              Un QR code "don pour la plantation" est disponible pour les clients souhaitant contribuer contre les îlots de chaleurs excessives. Grâce à ces dons, <strong style={{ color: C.orClair }}>un arbre peut être planté par circuit</strong>, avec la possibilité de suivre l'évolution de cet arbre grâce à des photos et vidéos qui vous seront transmises.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {ENGAGEMENTS_ENV.map(({ emoji, titre, desc, couleur }) => (
                <div key={titre} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.25rem', borderTop: `3px solid ${couleur}` }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{emoji}</div>
                  <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>{titre}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
            {/* QR code simulé */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center', minWidth: '130px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.4rem' }}>📲</div>
                <p style={{ color: C.noirChaud, fontSize: '0.75rem', fontWeight: 700, margin: 0 }}>QR Code</p>
                <p style={{ color: '#888', fontSize: '0.7rem', margin: 0 }}>Don plantation</p>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  Scannez le QR code lors de votre excursion pour faire un don et participer au programme de plantation d'arbres au Sénégal.
                  <br /><br />
                  <span style={{ color: C.orClair, fontWeight: 600 }}>Chaque arbre planté est suivi et documenté.</span> Vous recevez des nouvelles de votre arbre par messages ou email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagements liste */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
            <Shield size={24} color={C.vert} />
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: C.noirChaud, margin: 0 }}>
              Nos engagements concrets
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { emoji: '🚗', txt: 'Véhicules entretenus et contrôlés régulièrement' },
              { emoji: '🌱', txt: 'Programme actif de plantation d\'arbres par circuit' },
              { emoji: '🤝', txt: 'Partenariats avec les artisans et guides locaux' },
              { emoji: '💧', txt: 'Eau fraîche à bord pour éviter les plastiques à usage unique' },
              { emoji: '📸', txt: 'Respect des personnes photographiées, consentement obligatoire' },
              { emoji: '🏘️', txt: 'Tourisme qui bénéficie aux communautés locales' },
            ].map(({ emoji, txt }) => (
              <div key={txt} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.75rem', background: C.sable, borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{emoji}</span>
                <p style={{ color: '#555', fontSize: '0.87rem', lineHeight: 1.55, margin: 0 }}>{txt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ background: `linear-gradient(135deg, #0d2a0d, ${C.noirChaud})`, padding: '5rem 1.5rem', textAlign: 'center', borderTop: `3px solid ${C.vert}` }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: C.orClair, fontStyle: 'italic', marginBottom: '0.75rem' }}>
          Voyagez avec conscience
        </p>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1.5rem' }}>
          Rejoignez notre démarche <span style={{ color: C.vert }}>responsable</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Chaque excursion avec PEGASEN221 peut contribuer à un Sénégal plus vert et à des enfants mieux soutenus.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <a href="https://wa.me/+221788938254?text=Bonjour, je voudrais en savoir plus sur vos actions solidaires et environnementales"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: C.vert, color: 'white', fontWeight: 700, padding: '15px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <Phone size={18} /> Nous contacter
          </a>
          <Link to="/circuits"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: `2px solid ${C.or}`, color: C.or, fontWeight: 600, padding: '15px 32px', borderRadius: '9999px', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.color = C.noirChaud }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.or }}>
            Voir les circuits <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}