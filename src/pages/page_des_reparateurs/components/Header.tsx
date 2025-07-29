import React from 'react';
import { Button } from "./ui/button";
import { Search, MapPin, ArrowRight, Star, Shield, Zap, TrendingUp } from "lucide-react";

export function Header() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/40 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-indigo-100/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-cyan-100/40 rounded-full blur-xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero section with modern layout */}
            <div className="text-center space-y-8 mb-16">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700" style={{fontFamily: 'Inter, sans-serif'}}>
                    Plateforme de réparation #1 au Maroc
                  </span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  <span style={{fontFamily: 'Poppins, sans-serif'}}>Réparez vos appareils</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" style={{fontFamily: 'Inter, sans-serif'}}>
                    avec des experts locaux
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto" style={{fontFamily: 'Inter, sans-serif'}}>
                  Trouvez rapidement un réparateur qualifié près de chez vous
                  <span className="block mt-2 text-lg text-gray-500">
                    Service professionnel • Garantie incluse • Prix transparents
                  </span>
                </p>
              </div>
            </div>

            {/* Modern search section */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                    Commencez votre recherche
                  </h2>
                  <p className="text-gray-600" style={{fontFamily: 'Inter, sans-serif'}}>
                    Entrez votre localisation pour trouver les meilleurs réparateurs
                  </p>
                </div>
                
                <div className="space-y-6">
                  {/* Main search input */}
                  <div className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="relative flex-1">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <MapPin className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Ville, région ou code postal (ex: Casablanca, 20000)"
                          className="w-full h-14 pl-12 pr-6 rounded-2xl border-2 border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 text-gray-700 placeholder-gray-400"
                          style={{fontFamily: 'Inter, sans-serif'}}
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 h-12 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex items-center justify-center" style={{fontFamily: 'Poppins, sans-serif'}}>
                        <Search className="w-4 h-4 mr-2" />
                        Rechercher
                      </Button>
                    </div>
                  </div>
                  
                  {/* Popular cities */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500" style={{fontFamily: 'Inter, sans-serif'}}>
                      Villes populaires :
                    </span>
                    {['Casablanca', 'Rabat', 'Marrakech', 'Fès'].map((city) => (
                      <button
                        key={city}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors duration-200"
                        style={{fontFamily: 'Inter, sans-serif'}}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                  
                  
                  
                </div>
              </div>
            </div>

            {/* Trust indicators with modern cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>
                      +1000 réparations
                    </h3>
                    <p className="text-sm text-gray-600" style={{fontFamily: 'Inter, sans-serif'}}>
                      Experts vérifiés
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>
                      Garantie 6 mois
                    </h3>
                    <p className="text-sm text-gray-600" style={{fontFamily: 'Inter, sans-serif'}}>
                      Sur toutes les réparations
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800" style={{fontFamily: 'Poppins, sans-serif'}}>
                      Devis gratuit
                    </h3>
                    <p className="text-sm text-gray-600" style={{fontFamily: 'Inter, sans-serif'}}>
                      Diagnostic sans engagement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}