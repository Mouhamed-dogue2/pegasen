import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-sand-900 text-sand-200">
      <div className="bg-sand-600 px-4 py-10 text-center">
        <p className="font-display text-2xl md:text-3xl text-white mb-2">Prêt à vivre l'aventure sénégalaise ?</p>
        <p className="font-accent italic text-sand-200 mb-6">Contactez-nous, nous répondons sous 24h</p>
        <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-sand-700 hover:bg-sand-50 font-medium px-8 py-3 rounded-full transition-all">
          <Phone size={16} /> Réserver sur WhatsApp
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display font-bold text-white text-lg mb-2">PEGASEN<span className="text-sand-400">221</span></p>
          <p className="text-sm text-sand-400 leading-relaxed mb-4">Votre partenaire de confiance pour découvrir les merveilles du Sénégal. Confort, authenticité et expertise depuis Nianing.</p>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/pegasen221_excursions" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-sand-800 hover:bg-sand-500 flex items-center justify-center transition-colors">
              <Instagram size={16} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61588694557877" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-sand-800 hover:bg-sand-500 flex items-center justify-center transition-colors">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Destinations</h4>
          <ul className="space-y-2">
            {['Petite Côte','Dakar','Sine Saloum','Saint-Louis','Casamance','Sénégal Oriental'].map(d => (
              <li key={d}><Link to="/destinations" className="text-sm text-sand-400 hover:text-sand-200 transition-colors">{d}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2">
            {[['Circuits & Forfaits','/circuits'],['Tarifs','/tarifs'],['Brochures','/brochures'],['Solidarité','/solidarite'],['Vlog','/vlog'],['Contact','/contact']].map(([l,to]) => (
              <li key={to}><Link to={to} className="text-sm text-sand-400 hover:text-sand-200 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3">
            <li><a href="mailto:pegasenexcursions@gmail.com" className="flex items-start gap-3 text-sm text-sand-400 hover:text-sand-200"><Mail size={16} className="mt-0.5 shrink-0" /><span>pegasenexcursions@gmail.com</span></a></li>
            <li><a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-sand-400 hover:text-sand-200"><Phone size={16} className="mt-0.5 shrink-0" /><span>+221 78 893 82 54</span></a></li>
            <li><div className="flex items-start gap-3 text-sm text-sand-400"><MapPin size={16} className="mt-0.5 shrink-0" /><span>Nianing, Petite Côte, Sénégal</span></div></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-800 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-sand-500">
          <p>© {new Date().getFullYear()} PEGASEN221 Excursions – Tous droits réservés</p>
          <p>Conçu avec ❤ pour le Sénégal</p>
        </div>
      </div>
    </footer>
  )
}