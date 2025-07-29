"use client"

import { useState, useEffect } from "react"
import { Toaster } from "./components/ui/sonner"
import { LoginCard } from "./components/LoginCard"
import { FixifyRepairersInterface } from "./components/FixifyRepairersInterface"
import { showSuccessToast, showErrorToast, showLoadingToast } from "./components/ToastNotifications"

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    
    const loadingToastId = showLoadingToast("Authentification en cours...")
    
    try {
      console.log("Tentative de connexion:", { email, password })
      
      // Simuler un délai de réseau réaliste
      await new Promise(resolve => setTimeout(resolve, 2800))
      
      // Simuler une réussite (90% de chances)
      if (Math.random() > 0.1) {
        showSuccessToast("Connexion réussie ! Redirection...")
        setTimeout(() => {
          alert("🎉 Bienvenue dans votre espace Fixify ! Vous allez être redirigé vers l'interface principale.")
        }, 1800)
      } else {
        throw new Error("Échec de la connexion")
      }
      
    } catch (error) {
      console.error("Erreur de connexion:", error)
      showErrorToast("Identifiants incorrects. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          className: "shadow-lg border-0",
        }}
      />
      
      {/* Background - Interface des réparateurs Fixify */}
      <div className="absolute inset-0 z-0">
        <FixifyRepairersInterface />
      </div>
      
      {/* Overlay avec flou pour effet glassmorphisme */}
      <div className="absolute inset-0 z-10 backdrop-blur-xl bg-gradient-to-br from-white/30 via-gray-100/50 to-gray-200/40"></div>
      
      {/* Contenu principal - Formulaire de connexion */}
      <div className={`relative z-20 min-h-screen flex items-center justify-center p-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="w-full max-w-sm">
          {/* Section de connexion */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-6 bg-[rgba(255,255,255,0.89)]">
            {/* Header de connexion */}
            <div className="text-center mb-6 space-y-2">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-fixify-dark-primary to-fixify-dark-accent rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3L4 14h5l-2 7 9-11h-5l2-7z" />
                </svg>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-xl text-fixify-dark-primary">
                  Connexion à <span className="text-fixify-dark-accent">Fixify</span>
                </h1>
                <p className="text-fixify-dark-secondary text-sm">
                  Accédez à votre espace personnel
                </p>
              </div>
            </div>

            {/* Formulaire de connexion */}
            <LoginCard onLogin={handleLogin} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Sélecteur de langue */}
      <div className="absolute top-6 right-6 z-30">
        <div className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🇫🇷</span>
            <span className="text-fixify-dark-primary text-sm">Français</span>
          </div>
        </div>
      </div>
    </div>
  )
}