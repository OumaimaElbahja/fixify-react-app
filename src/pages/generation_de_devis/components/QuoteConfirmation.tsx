import React from 'react';
import { Button } from './ui/button';
import { CheckCircle, Download, Mail } from 'lucide-react';
import { Header } from './Header';

export function QuoteConfirmation() {
  return (
    <div className="min-h-screen relative">
      {/* Cloudy blue-gray background matching login page exactly */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-slate-100 to-blue-200">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-slate-200/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-slate-100/30"></div>
      </div>

      {/* Header Component */}
      <Header />

      {/* Main content - adjusted for fixed header */}
      <div className="relative z-10 pt-24 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Success message */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl text-gray-900 mb-2">
              Votre devis est prêt
            </h1>
            <p className="text-gray-600">
              Voir les détails du votre demande de réparation
            </p>
          </div>

          {/* Quote details card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Device details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span className="text-gray-900">iPhone 14 Pro</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span className="text-gray-900">Autre</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span className="text-gray-900">Écran fissuré</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span className="text-gray-900">Batterie défaillante</span>
                </div>
              </div>

              {/* Price and delivery */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span className="text-gray-900">199,90 MAD</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span className="text-gray-900">Réparation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span className="text-gray-900">2-3 jours ouvrés</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            {/* Download and email buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center justify-center space-x-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-colors bg-white/80 backdrop-blur-sm"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le devis (PDF)</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center space-x-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-colors bg-white/80 backdrop-blur-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Envoyer par email</span>
              </Button>
            </div>

            {/* Accept button */}
            <Button 
              className="w-full bg-blue-900 text-white hover:bg-blue-800 py-3 transition-colors"
            >
              Accepter à mon espace
            </Button>
          </div>

          {/* Email notice */}
          <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-sm text-gray-700">
                Une copie de ce devis à été envoyée à votre adresse e-mail
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-16">
        <div className="bg-white/80 backdrop-blur-sm border-t border-white/40 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span>© 2024 Fixify. Tous droits réservés.</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-blue-900 transition-colors">Support</a>
              <a href="#" className="hover:text-blue-900 transition-colors">Conditions</a>
              <a href="#" className="hover:text-blue-900 transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}