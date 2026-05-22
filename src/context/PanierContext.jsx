import { createContext, useContext, useState } from 'react'

const PanierContext = createContext(null)

export function PanierProvider({ children }) {
  const [items, setItems] = useState([])

  function ajouterItem(item) {
    setItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev
      return [...prev, { ...item, quantite: 1 }]
    })
  }

  function supprimerItem(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function modifierQuantite(id, quantite) {
    if (quantite < 1) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantite } : i))
  }

  function viderPanier() { setItems([]) }

  const total = items.reduce((sum, item) => {
    if (item.surDevis || !item.prix) return sum
    return sum + item.prix * item.quantite
  }, 0)

  const nombreItems = items.length

  function genererMessageWhatsApp() {
    if (items.length === 0) return ''

    const lignes = items.map(item => {
      const prixStr = item.surDevis
        ? 'Prix sur devis'
        : `${(item.prix * item.quantite).toLocaleString('fr-FR')} CFA`
      return `✦ ${item.nom}\n   👥 ${item.quantite} personne${item.quantite > 1 ? 's' : ''} — ${prixStr}\n   ✓ Inclus : ${item.inclus?.join(', ') || 'voir détails'}`
    }).join('\n\n')

    const totalStr = total > 0
      ? `À partir de ${total.toLocaleString('fr-FR')} CFA`
      : 'Certaines activités sont sur devis'

    return `Bonjour PEGASEN221 Excursions ! 🌍

Je souhaite composer mon circuit personnalisé au Sénégal.

📋 *Mes activités sélectionnées :*

${lignes}

💰 *Estimation :* ${totalStr}

Pouvez-vous me confirmer les disponibilités et m'envoyer un devis détaillé avec les dates ?

Merci ! 🙏`
  }

  return (
    <PanierContext.Provider value={{
      items, ajouterItem, supprimerItem,
      modifierQuantite, viderPanier,
      total, nombreItems,
      genererMessageWhatsApp,
    }}>
      {children}
    </PanierContext.Provider>
  )
}

export function usePanier() {
  const ctx = useContext(PanierContext)
  if (!ctx) throw new Error('usePanier doit être dans PanierProvider')
  return ctx
}