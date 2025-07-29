import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";

export function DashboardHeader() {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100/50 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="lg:hidden hover:bg-gray-50/80 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[--navy-blue] to-blue-800 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-sm">F</span>
            </div>
            <span className="font-semibold text-gray-900 tracking-tight">Fixify</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="hover:bg-gray-50/80 rounded-xl transition-all duration-200 p-2 hover:scale-105 active:scale-95">
            <Search className="h-4 w-4 text-gray-500" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-50/80 rounded-xl transition-all duration-200 p-2 hover:scale-105 active:scale-95">
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-50/80 rounded-xl transition-all duration-200 p-2 hover:scale-105 active:scale-95">
            <User className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
    </header>
  );
}