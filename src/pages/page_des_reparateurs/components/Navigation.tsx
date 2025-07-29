import { useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import imgLogoFixify1 from "figma:asset/84806cc0b2ecae0421d150d38ecdda140f8f13fd.png";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Glass effect container */}
      <div className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]">
        <div className="w-full">
          <div className="flex flex-row items-center justify-center w-full">
            <div className="box-border flex flex-row gap-[37px] items-center justify-between px-4 md:px-5 py-4 w-full max-w-7xl">
              {/* Logo Section */}
              <div className="flex items-center shrink-0">
                <div className="h-10 relative w-auto flex items-center">
                  <div
                    className="w-[28px] h-[28px] bg-center bg-cover bg-no-repeat shrink-0"
                    style={{
                      backgroundImage: `url('${imgLogoFixify1}')`,
                    }}
                  />
                  <div className="ml-2 font-['Racing_Sans_One'] text-[#0b3e74] text-[28px] leading-[36px] whitespace-nowrap drop-shadow-sm">
                    Fixify
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <a
                href="#"
                className="text-gray-700 hover:text-[#e67a17] transition-all duration-200 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white/40"
              >
                Accueil
              </a>
              <a
                href="#services"
                className="text-[#e67a17] hover:text-[#d66a0e] transition-all duration-200 whitespace-nowrap font-medium px-3 py-1 rounded-full hover:bg-white/40"
              >
                Nos services
              </a>
              <a
                href="#marketplace"
                className="text-gray-700 hover:text-[#e67a17] transition-all duration-200 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white/40"
              >
                Marketplace
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-[#e67a17] transition-all duration-200 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white/40"
              >
                Contact
              </a>
              <a
                href="#help"
                className="text-gray-700 hover:text-[#e67a17] transition-all duration-200 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white/40"
              >
                Aide
              </a>

              {/* Desktop User Menu */}
              <div className="hidden lg:flex items-center gap-[15px] shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative backdrop-blur-sm bg-white/60 h-10 w-10 rounded-full border border-white/30 hover:bg-white/80 transition-all duration-200 shadow-[0_4px_16px_0_rgba(31,38,135,0.08)] hover:shadow-[0_8px_24px_0_rgba(31,38,135,0.12)] flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-700" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white/90 backdrop-blur-md border border-white/30 shadow-lg">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-100/80">
                      <Settings className="w-4 h-4" />
                      <span className="font-['Poppins'] text-[14px]">Paramètres</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-gray-100/80">
                      <LogOut className="w-4 h-4" />
                      <span className="font-['Poppins'] text-[14px]">Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-gray-700 hover:text-[#e67a17] transition-all duration-200 rounded-full hover:bg-white/40 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden backdrop-blur-md bg-white/85 border-t border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]">
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-2 font-['Poppins'] text-[16px]">
                  <a
                    href="#"
                    className="text-gray-700 hover:text-[#e67a17] transition-all duration-200 py-3 px-4 rounded-xl hover:bg-white/50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </a>
                  <a
                    href="#services"
                    className="text-[#e67a17] hover:text-[#d66a0e] transition-all duration-200 py-3 px-4 rounded-xl hover:bg-white/50 backdrop-blur-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Nos services
                  </a>
                  <a
                    href="#marketplace"
                    className="text-gray-700 hover:text-[#e67a17] transition-all duration-200 py-3 px-4 rounded-xl hover:bg-white/50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Marketplace
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-700 hover:text-[#e67a17] transition-all duration-200 py-3 px-4 rounded-xl hover:bg-white/50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </a>
                  <a
                    href="#help"
                    className="text-gray-700 hover:text-[#e67a17] transition-all duration-200 py-3 px-4 rounded-xl hover:bg-white/50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Aide
                  </a>
                </nav>

                {/* Mobile User Menu */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                  <button className="w-full backdrop-blur-sm bg-white/60 h-10 rounded-full border border-white/30 hover:bg-white/80 transition-all duration-200 shadow-[0_4px_16px_0_rgba(31,38,135,0.08)] flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="font-['Poppins'] text-[16px] text-gray-700 leading-normal font-medium">
                      Paramètres
                    </span>
                  </button>

                  <button className="w-full backdrop-blur-sm bg-white/60 h-10 rounded-full border border-white/30 hover:bg-white/80 transition-all duration-200 shadow-[0_4px_16px_0_rgba(31,38,135,0.08)] flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" />
                    <span className="font-['Poppins'] text-[16px] text-gray-700 leading-normal font-medium">
                      Déconnexion
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}