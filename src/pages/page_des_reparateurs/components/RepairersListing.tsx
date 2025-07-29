import { useState, useMemo } from "react";
import { SortingSection } from "./SortingSection";
import { RepairerCard } from "./RepairerCard";
import { RepairerProfileModal } from "./RepairerProfileModal";
import { Pagination } from "./ui/pagination";
import { Search, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

// Sample data for repairers
const sampleRepairers = [
  {
    id: "1",
    name: "Marc Dubois",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    rating: 4.2,
    reviewCount: 127,
    location: "Casablanca Centre",
    distance: "2.3 km",
    priceRange: "€€€",
    available: true,
    specialties: ["Smartphones", "Tablettes", "Ordinateurs"],
    description: "Réparateur expérimenté avec plus de 8 ans d'expérience dans la réparation de smartphones, tablettes et ordinateurs.",
    certifications: [
      { name: "Apple Certified", icon: "award", description: "Réparation iPhone" },
      { name: "Samsung Partner", icon: "shield", description: "Service agréé" },
      { name: "Fixify Verified", icon: "check", description: "Professionnel vérifié" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop"
    ],
    contact: {
      phone: "01 42 85 67 23",
      email: "marc.dubois@fixify.fr",
      address: "15 rue de la République, 20000 Casablanca"
    },
    hours: [
      { day: "Lun - Ven", hours: "9h00 - 19h00" },
      { day: "Samedi", hours: "9h00 - 17h00" },
      { day: "Dimanche", hours: "Fermé" }
    ],
    rates: [
      { service: "Écran iPhone", price: "890 - 1490 MAD" },
      { service: "Batterie smartphone", price: "450 - 790 MAD" },
      { service: "Réparation tablette", price: "690 - 1990 MAD" },
      { service: "Diagnostic", price: "Gratuit" }
    ],
    recentReviews: [
      { author: "Sarah A.", rating: 5, comment: "Excellent service !", date: "Il y a 2 jours" },
      { author: "Jean L.", rating: 4, comment: "Réparation rapide et efficace.", date: "Il y a 1 semaine" }
    ],
    priceLevel: 3
  },
  {
    id: "2",
    name: "Amina El Fassi",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b6c0b04c?w=300&h=300&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 89,
    location: "Rabat Agdal",
    distance: "1.8 km",
    priceRange: "€€",
    available: true,
    specialties: ["Smartphones", "Smartwatch", "Tablettes"],
    description: "Spécialiste en réparation de smartphones et objets connectés. Service rapide et garantie 12 mois.",
    certifications: [
      { name: "Apple Certified", icon: "award", description: "Réparation iPhone" },
      { name: "Fixify Verified", icon: "check", description: "Professionnel vérifié" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop"
    ],
    contact: {
      phone: "05 37 68 42 15",
      email: "amina.elfassi@fixify.fr",
      address: "25 Avenue Mohammed V, 10000 Rabat"
    },
    hours: [
      { day: "Lun - Ven", hours: "8h30 - 18h30" },
      { day: "Samedi", hours: "9h00 - 16h00" },
      { day: "Dimanche", hours: "Fermé" }
    ],
    rates: [
      { service: "Écran iPhone", price: "750 - 1290 MAD" },
      { service: "Batterie smartphone", price: "350 - 650 MAD" },
      { service: "Réparation smartwatch", price: "490 - 890 MAD" },
      { service: "Diagnostic", price: "Gratuit" }
    ],
    recentReviews: [
      { author: "Mohamed K.", rating: 5, comment: "Très professionnelle et rapide.", date: "Il y a 3 jours" },
      { author: "Laila M.", rating: 5, comment: "Parfait, je recommande vivement !", date: "Il y a 5 jours" }
    ],
    priceLevel: 2
  },
  {
    id: "3",
    name: "Youssef Bennani",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    rating: 3.9,
    reviewCount: 156,
    location: "Marrakech Gueliz",
    distance: "3.1 km",
    priceRange: "€",
    available: false,
    specialties: ["Ordinateurs", "Tablettes"],
    description: "Expert en réparation d'ordinateurs portables et fixes. Plus de 10 ans d'expérience dans le domaine.",
    certifications: [
      { name: "Fixify Verified", icon: "check", description: "Professionnel vérifié" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop"
    ],
    contact: {
      phone: "05 24 33 67 89",
      email: "youssef.bennani@fixify.fr",
      address: "12 Boulevard Mohammed VI, 40000 Marrakech"
    },
    hours: [
      { day: "Lun - Ven", hours: "9h00 - 18h00" },
      { day: "Samedi", hours: "10h00 - 15h00" },
      { day: "Dimanche", hours: "Fermé" }
    ],
    rates: [
      { service: "Réparation PC portable", price: "450 - 1200 MAD" },
      { service: "Installation système", price: "250 - 400 MAD" },
      { service: "Récupération données", price: "600 - 1500 MAD" },
      { service: "Diagnostic", price: "Gratuit" }
    ],
    recentReviews: [
      { author: "Ahmed S.", rating: 4, comment: "Bon travail, prix correct.", date: "Il y a 1 semaine" },
      { author: "Fatima Z.", rating: 3, comment: "Réparation ok mais délai un peu long.", date: "Il y a 2 semaines" }
    ],
    priceLevel: 1
  },
  {
    id: "4",
    name: "Karim Alami",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    rating: 4.5,
    reviewCount: 203,
    location: "Fès Ville Nouvelle",
    distance: "1.2 km",
    priceRange: "€€€€",
    available: true,
    specialties: ["Smartphones", "Tablettes", "Ordinateurs", "Smartwatch"],
    description: "Service premium de réparation. Atelier équipé des dernières technologies et pièces d'origine uniquement.",
    certifications: [
      { name: "Apple Certified", icon: "award", description: "Réparation iPhone" },
      { name: "Samsung Partner", icon: "shield", description: "Service agréé" },
      { name: "Fixify Verified", icon: "check", description: "Professionnel vérifié" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop"
    ],
    contact: {
      phone: "05 35 94 12 56",
      email: "karim.alami@fixify.fr",
      address: "8 Avenue Hassan II, 30000 Fès"
    },
    hours: [
      { day: "Lun - Ven", hours: "8h00 - 20h00" },
      { day: "Samedi", hours: "9h00 - 18h00" },
      { day: "Dimanche", hours: "10h00 - 16h00" }
    ],
    rates: [
      { service: "Écran iPhone", price: "1200 - 2000 MAD" },
      { service: "Batterie smartphone", price: "600 - 900 MAD" },
      { service: "Réparation premium", price: "1000 - 3000 MAD" },
      { service: "Diagnostic", price: "150 MAD" }
    ],
    recentReviews: [
      { author: "Nadia R.", rating: 5, comment: "Service exceptionnel, qualité irréprochable.", date: "Il y a 1 jour" },
      { author: "Hassan B.", rating: 4, comment: "Très professionnel, un peu cher mais ça vaut le coup.", date: "Il y a 4 jours" }
    ],
    priceLevel: 4
  },
  {
    id: "5",
    name: "Leila Moustapha",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    rating: 4.1,
    reviewCount: 78,
    location: "Tanger Centre",
    distance: "0.9 km",
    priceRange: "€€",
    available: true,
    specialties: ["Smartphones", "Tablettes"],
    description: "Réparatrice spécialisée dans les écrans et batteries. Service express disponible pour les urgences.",
    certifications: [
      { name: "Fixify Verified", icon: "check", description: "Professionnel vérifié" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop"
    ],
    contact: {
      phone: "05 39 48 75 32",
      email: "leila.moustapha@fixify.fr",
      address: "33 Rue de la Liberté, 90000 Tanger"
    },
    hours: [
      { day: "Lun - Ven", hours: "9h30 - 19h30" },
      { day: "Samedi", hours: "10h00 - 17h00" },
      { day: "Dimanche", hours: "Fermé" }
    ],
    rates: [
      { service: "Écran smartphone", price: "550 - 1100 MAD" },
      { service: "Batterie smartphone", price: "300 - 550 MAD" },
      { service: "Service express (+2h)", price: "+200 MAD" },
      { service: "Diagnostic", price: "Gratuit" }
    ],
    recentReviews: [
      { author: "Omar T.", rating: 4, comment: "Service rapide et soigné.", date: "Il y a 6 jours" },
      { author: "Aicha L.", rating: 4, comment: "Bon rapport qualité-prix.", date: "Il y a 1 semaine" }
    ],
    priceLevel: 2
  },
  {
    id: "6",
    name: "Rachid Benali",
    photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face",
    rating: 3.8,
    reviewCount: 134,
    location: "Agadir Marina",
    distance: "4.5 km",
    priceRange: "€€€",
    available: false,
    specialties: ["Ordinateurs", "Smartwatch"],
    description: "Technicien informatique expert en réparation PC et Mac. Spécialiste des cartes mères et composants.",
    certifications: [
      { name: "Samsung Partner", icon: "shield", description: "Service agréé" },
      { name: "Fixify Verified", icon: "check", description: "Professionnel vérifié" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop"
    ],
    contact: {
      phone: "05 28 22 91 67",
      email: "rachid.benali@fixify.fr",
      address: "67 Boulevard du 20 Août, 80000 Agadir"
    },
    hours: [
      { day: "Lun - Ven", hours: "8h00 - 17h00" },
      { day: "Samedi", hours: "9h00 - 14h00" },
      { day: "Dimanche", hours: "Fermé" }
    ],
    rates: [
      { service: "Réparation PC", price: "700 - 1800 MAD" },
      { service: "Réparation Mac", price: "900 - 2500 MAD" },
      { service: "Smartwatch", price: "400 - 1200 MAD" },
      { service: "Diagnostic", price: "100 MAD" }
    ],
    recentReviews: [
      { author: "Brahim K.", rating: 4, comment: "Connaît bien son métier.", date: "Il y a 3 jours" },
      { author: "Samira A.", rating: 3, comment: "Correct mais délai assez long.", date: "Il y a 1 semaine" }
    ],
    priceLevel: 3
  }
];

export function RepairersListing() {
  const [sortBy, setSortBy] = useState("rating");
  const [selectedRepairer, setSelectedRepairer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort repairers
  const sortedRepairers = useMemo(() => {
    const sorted = [...sampleRepairers];
    
    switch (sortBy) {
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "price-low":
        return sorted.sort((a, b) => a.priceLevel - b.priceLevel);
      case "price-high":
        return sorted.sort((a, b) => b.priceLevel - a.priceLevel);
      case "availability":
        return sorted.sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));
      case "reviews":
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      case "distance":
      default:
        return sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }
  }, [sortBy]);

  const handleRepairerClick = (repairer: any) => {
    setSelectedRepairer(repairer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRepairer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/6 w-64 h-64 bg-gradient-to-br from-emerald-400/6 to-teal-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <SortingSection 
            onSortChange={setSortBy}
            currentSort={sortBy}
          />
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-700" style={{fontFamily: 'Inter, sans-serif'}}>
              {sortedRepairers.length} réparateur{sortedRepairers.length !== 1 ? 's' : ''} trouvé{sortedRepairers.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* 3-Column Cards Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRepairers.map((repairer, index) => (
              <div
                key={repairer.id}
                className="transform transition-all duration-500"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`
                }}
              >
                <RepairerCard 
                  repairer={repairer}
                  onClick={() => handleRepairerClick(repairer)}
                />
              </div>
            ))}
          </div>
          
          {/* "Voir plus de profils" button */}
          <div className="text-center mt-8">
            <Button className="bg-[#001B48] hover:bg-[#001B48]/90 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#001B48]/25 hover:shadow-xl hover:shadow-[#001B48]/30" style={{fontFamily: 'Poppins, sans-serif'}}>
              Voir plus de profils
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Pagination */}
        {sortedRepairers.length > 9 && (
          <div className="flex justify-center mb-12">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6">
              <Pagination />
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedRepairer && (
        <RepairerProfileModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          repairer={selectedRepairer}
        />
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}