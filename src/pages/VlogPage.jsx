import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Calendar, Tag, Play, Star, Camera } from 'lucide-react'

const C = {
  or: '#D4A017',
  orClair: '#F0C040',
  vert: '#1A6B3C',
  rouge: '#C0392B',
  noirChaud: '#1C1208',
  sable: '#FDF3E3',
}

const CATEGORIES = ['Tous', 'Événements', 'Témoignages', 'Coulisses', 'Actualités']

const ARTICLES = [
  {
    id: 1,
    titre: 'Le Kankourang de Mbour — Fête traditionnelle sérère',
    categorie: 'Événements',
    date: '15 Mai 2025',
    image: '/images/destinations/petite-cote.jpg',
    extrait: 'Le Kankourang est une cérémonie d\'initiation traditionnelle des peuples mandingues et sérères. Chaque année, cette fête hauts en couleurs transforme les rues de Mbour en un spectacle unique. Découvrez ce patrimoine culturel immatériel de l\'humanité.',
    tags: ['Culture', 'Mbour', 'Tradition'],
    couleur: C.rouge,
    emoji: '🥁',
  },
  {
    id: 2,
    titre: 'Témoignage — La famille Martin découvre le Saloum',
    categorie: 'Témoignages',
    date: '8 Mai 2025',
    image: '/images/excursions/saloum-excursion.jpg',
    extrait: '"Nous n\'avions jamais imaginé que le Sénégal pouvait être aussi beau. La pirogue dans les bolongs du Saloum, le village de Mar Lodj, l\'Île aux Oiseaux... Ce voyage a changé notre vision de l\'Afrique." — Famille Martin, France.',
    tags: ['Avis client', 'Saloum', 'Famille'],
    couleur: C.vert,
    emoji: '⭐',
    avis: 5,
  },
  {
    id: 3,
    titre: 'Coulisses — Arrivée de notre nouveau véhicule',
    categorie: 'Coulisses',
    date: '2 Mai 2025',
    image: '/images/destinations/dakar.jpg',
    extrait: 'Grande nouvelle chez PEGASEN221 ! Notre flotte s\'agrandit avec l\'arrivée d\'un nouveau véhicule climatisé. Plus de confort, plus de capacité pour vous emmener découvrir les merveilles du Sénégal. Venez découvrir les coulisses de notre préparation.',
    tags: ['Équipe', 'Véhicule', 'Nouveauté'],
    couleur: C.or,
    emoji: '🚐',
  },
  {
    id: 4,
    titre: 'Plantation d\'arbres — Notre programme grandit',
    categorie: 'Actualités',
    date: '28 Avril 2025',
    image: '/images/destinations/casamance.jpg',
    extrait: 'Cette semaine, nous avons planté 12 nouveaux arbres grâce aux dons de nos clients lors de leurs excursions. Le programme pousse bien ! Chaque arbre est suivi et documenté. Merci à tous nos voyageurs engagés pour la planète.',
    tags: ['Environnement', 'Plantation', 'Solidarité'],
    couleur: C.vert,
    emoji: '🌱',
  },
  {
    id: 5,
    titre: 'Safari Bandia — Les girafes sont de retour !',
    categorie: 'Actualités',
    date: '20 Avril 2025',
    image: '/images/excursions/bandia.jpg',
    extrait: 'Les girafes de la réserve de Bandia ont donné naissance à un nouveau girafon ce mois-ci ! C\'est une excellente nouvelle pour la biodiversité de la réserve. Venez les observer lors de nos safaris — un spectacle inoubliable pour petits et grands.',
    tags: ['Bandia', 'Safari', 'Nature'],
    couleur: '#8B4513',
    emoji: '🦒',
  },
  {
    id: 6,
    titre: 'Témoignage — Sophie découvre Joal-Fadiouth',
    categorie: 'Témoignages',
    date: '14 Avril 2025',
    image: '/images/excursions/joal-fadiouth.jpg',
    extrait: '"L\'île aux coquillages m\'a complètement transportée. Le cimetière mixte, le baobab centenaire, le retour en pirogue... Et notre guide était extraordinaire, passionné et drôle. Je recommande à 1000% !" — Sophie D., Belgique.',
    tags: ['Avis client', 'Joal-Fadiouth', 'Culture'],
    couleur: C.or,
    emoji: '🐚',
    avis: 5,
  },
  {
    id: 7,
    titre: 'Visite de la pouponnière — Un moment inoubliable',
    categorie: 'Coulisses',
    date: '5 Avril 2025',
    image: '/images/destinations/saloum.jpg',
    extrait: 'Cette semaine, un groupe de voyageurs a participé à notre circuit solidaire pouponnière. Les sourires des enfants ont illuminé toute la journée. Un grand merci aux participants pour leur générosité et leur humanité.',
    tags: ['Solidarité', 'Pouponnière', 'Partage'],
    couleur: C.rouge,
    emoji: '❤️',
  },
  {
    id: 8,
    titre: 'Lac Rose — Les eaux les plus roses de l\'année',
    categorie: 'Actualités',
    date: '1 Avril 2025',
    image: '/images/excursions/lac-rose.jpg',
    extrait: 'En cette saison sèche, le Lac Rose (Lac Retba) affiche ses couleurs les plus intenses de l\'année. La concentration en sel est maximale, donnant aux eaux une teinte rose fuchsia spectaculaire. C\'est le moment idéal pour une excursion !',
    tags: ['Lac Rose', 'Saison', 'Photo'],
    couleur: '#9B4D9B',
    emoji: '🌸',
  },
]

// ── Composant article card ─────────────────────────────────
function ArticleCard({ article, onClick }) {
  return (
    <div onClick={() => onClick(article)}
      style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.35s', border: '1px solid #f0e8d8' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
        <img src={article.image} alt={article.titre}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 55%)' }} />
        {/* Catégorie */}
        <span style={{ position: 'absolute', top: '12px', left: '12px', background: article.couleur, color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px' }}>
          {article.emoji} {article.categorie}
        </span>
        {/* Date */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.85)', fontSize: '0.78rem' }}>
          <Calendar size={12} />{article.date}
        </div>
      </div>

      {/* Contenu */}
      <div style={{ padding: '1.25rem' }}>
        {/* Étoiles si témoignage */}
        {article.avis && (
          <div style={{ display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
            {[...Array(article.avis)].map((_, i) => (
              <Star key={i} size={14} color={C.or} fill={C.or} />
            ))}
          </div>
        )}
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', fontWeight: 700, color: C.noirChaud, marginBottom: '0.6rem', lineHeight: 1.35 }}>{article.titre}</h3>
        <p style={{ color: '#777', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {article.extrait}
        </p>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '0.75rem' }}>
          {article.tags.map(tag => (
            <span key={tag} style={{ fontSize: '0.7rem', background: `${article.couleur}15`, color: article.couleur, padding: '3px 8px', borderRadius: '9999px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Tag size={9} />{tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: article.couleur, fontSize: '0.83rem', fontWeight: 600 }}>
          Lire la suite <ArrowRight size={13} />
        </div>
      </div>
    </div>
  )
}

// ── Composant article détaillé ────────────────────────────
function ArticleDetail({ article, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100, overflowY: 'auto', padding: '2rem 1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        {/* Image */}
        <div style={{ position: 'relative', height: '280px' }}>
          <img src={article.image} alt={article.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
          <button onClick={onClose}
            style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', color: 'white', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
            <span style={{ background: article.couleur, color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px', marginBottom: '8px', display: 'inline-block' }}>
              {article.emoji} {article.categorie}
            </span>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'white', margin: '6px 0 0', lineHeight: 1.2 }}>{article.titre}</h2>
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: '2rem' }}>
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', fontSize: '0.82rem' }}>
              <Calendar size={14} />{article.date}
            </div>
            {article.avis && (
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(article.avis)].map((_, i) => <Star key={i} size={14} color={C.or} fill={C.or} />)}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {article.tags.map(tag => (
                <span key={tag} style={{ fontSize: '0.7rem', background: `${article.couleur}15`, color: article.couleur, padding: '3px 8px', borderRadius: '9999px', fontWeight: 600 }}>#{tag}</span>
              ))}
            </div>
          </div>

          {/* Texte complet */}
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '2rem', fontFamily: '"DM Sans", sans-serif' }}>
            {article.extrait}
          </p>
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: '2rem', fontStyle: 'italic', borderLeft: `3px solid ${article.couleur}`, paddingLeft: '1rem' }}>
            Rejoignez-nous pour vivre ces moments uniques au Sénégal. Chaque excursion avec PEGASEN221 est une histoire à raconter.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid #f0e8d8' }}>
            <a
              href={`https://wa.me/+221788938254?text=${encodeURIComponent(`Bonjour, j'ai lu votre article sur : ${article.titre} et je voudrais plus d'infos`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '12px 20px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem' }}>
              <Phone size={15} /> Réserver une excursion
            </a>
            <button onClick={onClose}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `2px solid ${article.couleur}`, color: article.couleur, fontWeight: 600, padding: '12px 20px', borderRadius: '9999px', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem' }}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PAGE PRINCIPALE ────────────────────────────────────────
export default function VlogPage() {
  const [articleOuvert, setArticleOuvert] = useState(null)
  const [categorie, setCategorie] = useState('Tous')

  const articlesFiltres = categorie === 'Tous' ? ARTICLES : ARTICLES.filter(a => a.categorie === categorie)
  const articleVedette = ARTICLES[0]

  return (
    <div style={{ background: C.sable, minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: `linear-gradient(160deg, ${C.noirChaud} 0%, #2a1500 100%)`, padding: '10rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(to right, ${C.vert}, ${C.or}, ${C.rouge})` }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to right, transparent, ${C.or})` }} />
            <span style={{ color: C.or, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>Actualités & témoignages</span>
            <div style={{ height: '1px', width: '40px', background: `linear-gradient(to left, transparent, ${C.or})` }} />
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
            Notre <span style={{ color: C.or }}>Vlog</span>
          </h1>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', maxWidth: '550px', margin: '0 auto' }}>
            Événements, témoignages clients et coulisses de PEGASEN221
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* ── ARTICLE VEDETTE ── */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <Star size={16} color={C.or} fill={C.or} />
            <span style={{ color: C.or, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Article à la une</span>
          </div>
          <div onClick={() => setArticleOuvert(articleVedette)}
            style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: '420px', cursor: 'pointer', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
            onMouseEnter={e => { e.currentTarget.querySelector('.vedette-img').style.transform = 'scale(1.05)'; e.currentTarget.querySelector('.vedette-btn').style.background = C.or }}
            onMouseLeave={e => { e.currentTarget.querySelector('.vedette-img').style.transform = 'scale(1)'; e.currentTarget.querySelector('.vedette-btn').style.background = 'rgba(255,255,255,0.15)' }}>
            <img className="vedette-img" src={articleVedette.image} alt={articleVedette.titre}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem' }}>
              <span style={{ background: articleVedette.couleur, color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '5px 14px', borderRadius: '9999px', marginBottom: '1rem', display: 'inline-block' }}>
                {articleVedette.emoji} {articleVedette.categorie}
              </span>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'white', margin: '8px 0', lineHeight: 1.2 }}>{articleVedette.titre}</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: '600px', lineHeight: 1.6 }}>
                {articleVedette.extrait.substring(0, 150)}...
              </p>
              <button className="vedette-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, padding: '10px 22px', borderRadius: '9999px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s' }}>
                <Play size={14} fill="white" /> Lire l'article
              </button>
            </div>
          </div>
        </div>

        {/* ── FILTRES ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.85rem', marginRight: '0.5rem' }}>
            <Camera size={15} /> Filtrer :
          </div>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategorie(cat)}
              style={{ padding: '7px 18px', borderRadius: '9999px', border: `2px solid ${categorie === cat ? C.or : '#e8d8b8'}`, background: categorie === cat ? C.or : 'white', color: categorie === cat ? C.noirChaud : '#666', fontWeight: 600, fontSize: '0.83rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* ── GRILLE ARTICLES ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {articlesFiltres.map(article => (
            <ArticleCard key={article.id} article={article} onClick={setArticleOuvert} />
          ))}
        </div>

        {/* ── APPEL À TÉMOIGNAGES ── */}
        <div style={{ background: `linear-gradient(135deg, ${C.noirChaud}, #2a1500)`, borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', marginBottom: '0.75rem' }}>
            Vous êtes venu avec <span style={{ color: C.or }}>PEGASEN221</span> ?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Partagez votre expérience, vos photos et vos vidéos avec nous ! Votre témoignage inspire d'autres voyageurs à découvrir le Sénégal authentique.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://wa.me/+221788938254?text=Bonjour, je souhaite partager mon témoignage sur mon excursion avec PEGASEN221"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: 'white', fontWeight: 700, padding: '13px 28px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
              onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}>
              <Phone size={16} /> Partager mon témoignage
            </a>
            <Link to="/circuits"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `2px solid ${C.or}`, color: C.or, fontWeight: 600, padding: '13px 28px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.color = C.noirChaud }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.or }}>
              Voir les circuits <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Article ouvert en modal */}
      {articleOuvert && (
        <ArticleDetail article={articleOuvert} onClose={() => setArticleOuvert(null)} />
      )}
    </div>
  )
}