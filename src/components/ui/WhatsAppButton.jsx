import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="flex items-center gap-2 bg-white shadow-card rounded-2xl px-4 py-3 text-sm text-sand-800 font-medium animate-fade-in">
          <span>Réservez sur WhatsApp !</span>
          <button onClick={() => setShowTooltip(false)} className="text-sand-400 hover:text-sand-600 ml-1">
            <X size={14} />
          </button>
        </div>
      )}
      <a href="https://wa.me/+221788938254" target="_blank" rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-float">
        <MessageCircle size={26} fill="white" />
      </a>
    </div>
  )
}