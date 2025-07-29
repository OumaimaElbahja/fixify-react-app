import React from 'react';
import { Button } from './ui/button';

export function Navigation() {
  return (
    <div className="w-full relative">
      {/* Cloudy blue background similar to login page */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-blue-50 to-slate-300">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-blue-200/40"></div>
      </div>
      
      {/* Navigation container */}
      <div className="relative z-10 p-6">
        <nav className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo section */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-900 font-semibold text-lg">Fixify</span>
              </div>

              {/* Navigation items */}
              <div className="hidden md:flex items-center space-x-8">
                <a 
                  href="#" 
                  className="text-amber-600 hover:text-amber-700 transition-colors duration-200 font-medium"
                >
                  Accueil
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-amber-600 transition-colors duration-200 font-medium"
                >
                  Nos services
                </a>
                <a 
                  href="#" 
                  className="text-amber-600 hover:text-amber-700 transition-colors duration-200 font-medium"
                >
                  Comment ça marche ?
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-amber-600 transition-colors duration-200 font-medium"
                >
                  À propos
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-amber-600 transition-colors duration-200 font-medium"
                >
                  Contact
                </a>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <span>FR</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-400">Français</span>
                </div>
                
                <Button 
                  variant="outline" 
                  className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-colors duration-200"
                >
                  Se connecter
                </Button>
              </div>

              {/* Mobile menu button */}
              <button className="md:hidden p-2 text-gray-600 hover:text-blue-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}