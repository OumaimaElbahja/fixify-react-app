import { MapPin, Star, Bell, ShoppingCart, User } from "lucide-react";

export function FixifyRepairersInterface() {
  const repairers = [
    // Rangée 1 - Opacité 100%
    [
      {
        badge: { text: "Agréé", color: "bg-fixify-dark-accent" },
        name: "Jean Dupont",
        specialty: "Électricien",
        location: "Paris 11e",
        rating: 4.8,
        reviews: 127,
        price: 45,
        online: true
      },
      {
        badge: { text: "Top Rated", color: "bg-green-500" },
        name: "Marie Martin",
        specialty: "Plombier",
        location: "Paris 12e", 
        rating: 4.9,
        reviews: 89,
        price: 50,
        online: true
      },
      {
        badge: { text: "Disponible aujourd'hui", color: "bg-gray-100 text-gray-700" },
        name: "Pierre Leroy",
        specialty: "Chauffagiste",
        location: "Paris 13e",
        rating: 4.7,
        reviews: 156,
        price: 55,
        online: false
      },
      {
        badge: { text: "Vérifié", color: "bg-fixify-dark-accent" },
        name: "Sophie Blanc",
        specialty: "Serrurier",
        location: "Paris 14e",
        rating: 4.6,
        reviews: 98,
        price: 40,
        online: true
      }
    ],
    // Rangée 2 - Opacité 70%
    [
      {
        badge: { text: "Expert", color: "bg-green-500" },
        name: "Marc Dubois",
        specialty: "Rénovation",
        location: "Paris 15e",
        rating: 4.8,
        reviews: 134,
        price: 60,
        online: true
      },
      {
        badge: { text: "Agréé", color: "bg-fixify-dark-accent" },
        name: "Lucie Moreau",
        specialty: "Peintre",
        location: "Paris 16e",
        rating: 4.5,
        reviews: 67,
        price: 35,
        online: false
      },
      {
        badge: { text: "Top Rated", color: "bg-green-500" },
        name: "Antoine Roux",
        specialty: "Menuisier", 
        location: "Paris 17e",
        rating: 4.9,
        reviews: 203,
        price: 65,
        online: true
      },
      {
        badge: { text: "Disponible aujourd'hui", color: "bg-gray-100 text-gray-700" },
        name: "Emma Girard",
        specialty: "Carreleur",
        location: "Paris 18e",
        rating: 4.4,
        reviews: 45,
        price: 38,
        online: true
      }
    ],
    // Rangée 3 - Opacité 50%
    [
      {
        badge: { text: "Vérifié", color: "bg-fixify-dark-accent" },
        name: "Thomas Petit",
        specialty: "Électricien",
        location: "Paris 19e",
        rating: 4.7,
        reviews: 112,
        price: 48,
        online: false
      },
      {
        badge: { text: "Expert", color: "bg-green-500" },
        name: "Camille Faure",
        specialty: "Plombier",
        location: "Paris 20e",
        rating: 4.6,
        reviews: 78,
        price: 52,
        online: true
      },
      {
        badge: { text: "Agréé", color: "bg-fixify-dark-accent" },
        name: "Nicolas Bernard",
        specialty: "Chauffagiste",
        location: "Boulogne",
        rating: 4.8,
        reviews: 189,
        price: 58,
        online: true
      },
      {
        badge: { text: "Top Rated", color: "bg-green-500" },
        name: "Océane Lecomte",
        specialty: "Serrurier",
        location: "Vincennes",
        rating: 4.9,
        reviews: 156,
        price: 42,
        online: false
      }
    ]
  ];

  const opacities = ["opacity-100", "opacity-70", "opacity-50"];

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Header Fixify */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-fixify-dark-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-fixify-dark-primary">Fixify</h1>
              <p className="text-sm text-fixify-dark-secondary">Réparations pros</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-fixify-dark-secondary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <ShoppingCart className="h-6 w-6 text-fixify-dark-secondary" />
            <User className="h-6 w-6 text-fixify-dark-secondary" />
          </div>
        </div>
      </div>

      {/* Grid de cartes de réparateurs */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {repairers.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid grid-cols-4 gap-4 ${opacities[rowIndex]}`}>
            {row.map((repairer, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                {/* Badge */}
                <div className="flex justify-start">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${repairer.badge.color} ${repairer.badge.color.includes('gray') ? '' : 'text-white'}`}>
                    {repairer.badge.text}
                  </span>
                </div>

                {/* Profil */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    {repairer.online && (
                      <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                        <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-fixify-dark-primary truncate">{repairer.name}</h3>
                    <p className="text-xs text-fixify-dark-secondary">{repairer.specialty}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-3 w-3 text-[#97CADB]" />
                      <span className="text-xs text-[#97CADB]">{repairer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.floor(repairer.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-fixify-dark-primary ml-1">
                      {repairer.rating}
                    </span>
                  </div>
                  <span className="text-xs text-[#97CADB]">({repairer.reviews})</span>
                </div>

                {/* Prix */}
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xs text-[#97CADB]">À partir de</span>
                    <span className="text-lg font-bold text-fixify-dark-primary">{repairer.price}</span>
                    <span className="text-xs text-[#97CADB]">€</span>
                  </div>
                  
                  {/* Bouton */}
                  <button className="w-full bg-fixify-dark-accent hover:bg-fixify-dark-primary text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                    Voir plus →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}