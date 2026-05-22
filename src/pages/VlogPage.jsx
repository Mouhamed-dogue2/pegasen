import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Calendar, Tag, Play, Star, Camera, X } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import CtaSection from '@/components/ui/CtaSection'
import useScrollReveal from '@/hooks/useScrollReveal'

const C = { or: '#D4A017', orClair: '#F0C040', vert: '#1A6B3C', rouge: '#C0392B', noirChaud: '#1C1208', sable: '#FDF3E3' }

const CATEGORIES = ['Tous', 'Événements', 'Témoignages', 'Coulisses', 'Actualités']

const ARTICLES = [
  { id: 1, titre: 'Le Kankourang de Mbour — Fête traditionnelle sérère', categorie: 'Événements', date: '15 Mai 2025', image: '/images/destinations/petite-cote.jpg', extrait: 'Le Kankourang est une cérémonie d\'initiation traditionnelle des peuples mandingues et sérères. Chaque année à Mbour, cette fête hauts en couleurs transforme les rues en spectacle unique — patrimoine culturel immatériel de l\'humanité.', tags: ['Culture', 'Mbour', 'Tradition'], couleur: C.rouge, emoji: '🥁', lien: '/destinations#petite-cote' },
  { id: 2, titre: 'Témoignage — La famille Martin découvre le Saloum', categorie: 'Témoignages', date: '8 Mai 2025', image: '/images/excursions/saloum-excursion.jpg', extrait: '"Nous n\'avions jamais imaginé que le Sénégal pouvait être aussi beau. La pirogue dans les bolongs du Saloum, le village de Mar Lodj, l\'Île aux Oiseaux... Ce voyage a changé notre vision de l\'Afrique." — Famille Martin, France.', tags: ['Avis client', 'Saloum', 'Famille'], couleur: C.vert, emoji: '⭐', avis: 5, lien: '/destinations#saloum' },
  { id: 3, titre: 'Coulisses — Notre flotte s\'agrandit !', categorie: 'Coulisses', date: '2 Mai 2025', image: '/images/destinations/dakar.jpg', extrait: 'Grande nouvelle chez PEGASEN221 ! Notre flotte s\'agrandit pour offrir encore plus de confort à nos voyageurs. Plus de capacité pour vous emmener découvrir les merveilles du Sénégal.', tags: ['Équipe', 'Véhicule', 'Nouveauté'], couleur: C.or, emoji: '🚐', lien: '/circuits' },
  { id: 4, titre: 'Plantation d\'arbres — Notre programme grandit', categorie: 'Actualités', date: '28 Avril 2025', image: '/images/destinations/casamance.jpg', extrait: 'Cette semaine, nous avons planté 12 nouveaux arbres grâce aux dons de nos clients. Le programme pousse bien ! Chaque arbre est suivi et documenté. Merci à tous nos voyageurs engagés.', tags: ['Environnement', 'Plantation', 'Solidarité'], couleur: C.vert, emoji: '🌱', lien: '/solidarite' },
  { id: 5, titre: 'Safari Bandia — Les girafons sont nés !', categorie: 'Actualités', date: '20 Avril 2025', image: '/images/excursions/bandia.jpg', extrait: 'Les girafes de la réserve de Bandia ont donné naissance à de nouveaux girafons ce mois-ci ! Une excellente nouvelle pour la biodiversité. Venez les observer lors de nos safaris.', tags: ['Bandia', 'Safari', 'Nature'], couleur: '#8B4513', emoji: '🦒', lien: '/circuits' },
  { id: 6, titre: 'Témoignage — Sophie découvre Joal-Fadiouth', categorie: 'Témoignages', date: '14 Avril 2025', image: '/images/excursions/joal-fadiouth.jpg', extrait: '"L\'île aux coquillages m\'a complètement transportée. Le cimetière mixte, le baobab centenaire, le retour en pirogue... Et notre guide était extraordinaire, passionné et drôle. Je recommande à 1000% !" — Sophie D., Belgique.', tags: ['Avis client', 'Joal-Fadiouth', 'Culture'], couleur: C.or, emoji: '🐚', avis: 5, lien: '/destinations#petite-cote' },
  { id: 7, titre: 'Visite pouponnière — Un moment inoubliable', categorie: 'Coulisses', date: '5 Avril 2025', image: '/images/destinations/saloum.jpg', extrait: 'Un groupe de voyageurs a participé à notre circuit solidaire pouponnière. Les sourires des enfants ont illuminé la journée. Un grand merci pour leur générosité et leur humanité.', tags: ['Solidarité', 'Pouponnière', 'Partage'], couleur: C.rouge, emoji: '❤️', lien: '/solidarite' },
  { id: 8, titre: 'Lac Rose — Les eaux les plus roses de l\'année', categorie: 'Actualités', date: '1 Avril 2025', image: '/images/excursions/lac-rose.jpg', extrait: 'En cette saison sèche, le Lac Rose affiche ses couleurs les plus intenses. La concentration en sel est maximale, donnant une teinte rose fuchsia spectaculaire. C\'est le moment idéal !', tags: ['Lac Rose', 'Saison', 'Photo'], couleur: '#9B4D9B', emoji: '🌸', lien: '/destinations#dakar' },
]

function ArticleModal({ article, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100, overflowY: 'auto', padding: '2rem 1rem' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ maxWidth: '720px', margin: '0 auto', background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ position: 'relative', height: '280px' }}>
          <img src={article.image} alt={article.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent 60%)' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
            <span style={{ background: article.couleur, color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', display: 'inline-block', marginBottom: '8px' }}>
              {article.emoji} {article.categorie}
            </span>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'white', margin: 0, lineHeight: 1.2 }}>{article.titre}</h2>
          </div>
        </div>
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', fontSize: '0.82rem' }}>
              <Calendar size={13} />{article.date}
            </div>
            {article.avis && (
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(article.avis)].map((_, i) => <Star key={i} size={13} color={C.or} fill={C.or} />)}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {article.tags.map(t => <span key={t} style={{ fontSize: '0.68rem', background: `${article.couleur}15`, color: article.couleur, padding: '2px 8px', borderRadius: '9999px', fontWeight: 600 }}>#{t}</span>)}
            </div>
          </div>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>{article.extrait}</p>
          <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.85, fontStyle: 'italic', borderLeft: `3px solid ${article.couleur}`, paddingLeft: '1rem', marginBottom: '2rem' }}>
            Rejoignez-nous pour vivre ces moments uniques au Sénégal. Chaque excursion avec PEGASEN221 est une histoire à raconter.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid #f0e8d8' }}>
            <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '12px 20px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem' }}>
              <Phone size={15} /> Réserver
            </a>
            {article.lien && (
              <Link to={article.lien} onClick={onClose}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `2px solid ${article.couleur}`, color: article.couleur, fontWeight: 600, padding: '12px 20px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem', background: 'transparent' }}>
                En savoir plus <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VlogPage() {
  useScrollReveal()
  const [articleOuvert, setArticleOuvert] = useState(null)
  const [categorie, setCategorie] = useState('Tous')
  const filtres = categorie === 'Tous' ? ARTICLES : ARTICLES.filter(a => a.categorie === categorie)
  const vedette = ARTICLES[0]

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>
      <PageHero tag="Actualités & témoignages" titre="Notre" orMot="Vlog" description="Événements, témoignages clients et coulisses de PEGASEN221 Excursions." />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {/* Article vedette */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <Star size={16} color={C.or} fill={C.or} />
            <span style={{ color: C.or, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Article à la une</span>
          </div>
          <div onClick={() => setArticleOuvert(vedette)}
            style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: '420px', cursor: 'pointer', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
            onMouseEnter={e => { e.currentTarget.querySelector('.vimg').style.transform = 'scale(1.05)'; e.currentTarget.querySelector('.vbtn').style.background = C.or }}
            onMouseLeave={e => { e.currentTarget.querySelector('.vimg').style.transform = 'scale(1)'; e.currentTarget.querySelector('.vbtn').style.background = 'rgba(255,255,255,0.15)' }}>
            <img className="vimg" src={vedette.image} alt={vedette.titre}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem' }}>
              <span style={{ background: vedette.couleur, color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '5px 14px', borderRadius: '9999px', display: 'inline-block', marginBottom: '1rem' }}>
                {vedette.emoji} {vedette.categorie}
              </span>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'white', margin: '0 0 0.75rem', lineHeight: 1.2 }}>{vedette.titre}</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: '600px', lineHeight: 1.6 }}>{vedette.extrait.substring(0, 150)}...</p>
              <button className="vbtn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, padding: '10px 22px', borderRadius: '9999px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s' }}>
                <Play size={14} fill="white" /> Lire l'article
              </button>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.85rem', marginRight: '0.5rem' }}>
            <Camera size={14} /> Filtrer :
          </div>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategorie(cat)}
              style={{ padding: '7px 18px', borderRadius: '9999px', border: `2px solid ${categorie === cat ? C.or : '#e8d8b8'}`, background: categorie === cat ? C.or : 'white', color: categorie === cat ? C.noirChaud : '#666', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {filtres.map((article, idx) => (
            <div key={article.id} onClick={() => setArticleOuvert(article)}
              style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.35s', border: '1px solid #f0e8d8', animation: `fadeUp 0.4s ease ${idx * 0.06}s both forwards` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img src={article.image} alt={article.titre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 55%)' }} />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: article.couleur, color: 'white', fontSize: '0.68rem', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px' }}>{article.emoji} {article.categorie}</span>
                <div style={{ position: 'absolute', bottom: '10px', left: '12px', display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
                  <Calendar size={11} />{article.date}
                </div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                {article.avis && (
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
                    {[...Array(article.avis)].map((_, i) => <Star key={i} size={13} color={C.or} fill={C.or} />)}
                  </div>
                )}
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: 700, color: C.noirChaud, marginBottom: '0.5rem', lineHeight: 1.35 }}>{article.titre}</h3>
                <p style={{ color: '#777', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.85rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.extrait}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '0.75rem' }}>
                  {article.tags.map(t => <span key={t} style={{ fontSize: '0.65rem', background: `${article.couleur}12`, color: article.couleur, padding: '2px 7px', borderRadius: '9999px', fontWeight: 600 }}><Tag size={8} style={{ display: 'inline', marginRight: '2px' }} />{t}</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: article.couleur, fontSize: '0.82rem', fontWeight: 600 }}>
                  Lire la suite <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appel témoignages */}
        <div className="reveal" style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', marginBottom: '0.75rem' }}>
            Vous êtes venu avec <span style={{ color: C.or }}>PEGASEN221</span> ?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Partagez votre expérience et vos photos ! Votre témoignage inspire d'autres voyageurs.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://wa.me/+221788938254?text=Bonjour, je souhaite partager mon témoignage sur mon excursion avec PEGASEN221"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '13px 28px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem' }}>
              <Phone size={16} /> Partager mon témoignage
            </a>
            <Link to="/circuits"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `2px solid ${C.or}`, color: C.or, fontWeight: 600, padding: '13px 28px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.color = C.noirChaud }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.or }}>
              Voir les circuits <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {articleOuvert && <ArticleModal article={articleOuvert} onClose={() => setArticleOuvert(null)} />}
      <CtaSection titre="Prêt pour votre" orMot="prochain voyage ?" whatsappText="Bonjour, je souhaite réserver une excursion avec PEGASEN221" />
    </div>
  )
}