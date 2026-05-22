import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    function initObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      )
      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      elements.forEach(el => observer.observe(el))
      return observer
    }

    // Initialisation immédiate
    let observer = initObserver()

    // Re-observer après 300ms (pour les onglets qui changent le DOM)
    const t = setTimeout(() => {
      observer.disconnect()
      observer = initObserver()
    }, 300)

    return () => {
      clearTimeout(t)
      observer.disconnect()
    }
  })
}