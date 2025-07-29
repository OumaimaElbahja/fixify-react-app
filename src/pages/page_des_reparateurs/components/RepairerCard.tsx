import { Star, MapPin, Euro, Clock, Smartphone, Laptop, Tablet, Watch, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface RepairerCardProps {
  repairer: {
    id: string;
    name: string;
    photo: string;
    rating: number;
    reviewCount: number;
    location: string;
    distance: string;
    priceRange: string;
    available: boolean;
    specialties: string[];
  };
  onClick: () => void;
}

const specialtyColors = {
  "Smartphones": "bg-blue-50 text-blue-600 border-blue-200",
  "Tablettes": "bg-purple-50 text-purple-600 border-purple-200",
  "Ordinateurs": "bg-orange-50 text-orange-600 border-orange-200",
  "Smartwatch": "bg-green-50 text-green-600 border-green-200",
  "Accessoires": "bg-pink-50 text-pink-600 border-pink-200",
};

const specialtyIcons = {
  "Smartphones": Smartphone,
  "Tablettes": Tablet,
  "Ordinateurs": Laptop,
  "Smartwatch": Watch,
};

export function RepairerCard({ repairer, onClick }: RepairerCardProps) {
  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star 
        key={star} 
        className={`w-3.5 h-3.5 ${
          star <= Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : star <= rating 
            ? 'text-yellow-400 fill-yellow-400/50' 
            : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <Card 
      className="group w-full h-80 bg-white rounded-xl shadow-sm cursor-pointer border border-gray-100 overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 transform-gpu flex flex-col"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3 transition-transform duration-300 ease-out flex-1 flex flex-col justify-between">
        {/* Header with Name and Location */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
              {repairer.name}
            </h3>
            <p className="text-sm text-gray-600" style={{fontFamily: 'Inter, sans-serif'}}>
              {repairer.location}
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          {/* Top Section */}
          <div className="space-y-3">
            {/* Rating and Status Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {renderStars(repairer.rating)}
                </div>
                <span className="text-sm font-medium text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                  {repairer.rating}
                </span>
                <span className="text-sm text-gray-500" style={{fontFamily: 'Inter, sans-serif'}}>
                  ({repairer.reviewCount} avis)
                </span>
              </div>
              
              {repairer.available && (
                <Badge className="bg-green-50 text-green-700 text-xs px-2 py-1 border-green-200" style={{fontFamily: 'Inter, sans-serif'}}>
                  Disponible
                </Badge>
              )}
            </div>

            {/* Service Description */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2 text-base" style={{fontFamily: 'Poppins, sans-serif'}}>
                {repairer.specialties.join(", ").replace("Ordinateurs", "Réparation PC").replace("Smartphones", "Réparation mobile")}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
                Professionnel de la réparation électronique avec plus de 5 ans d'expérience. Service rapide et garantie incluse.
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-3">
            {/* Price Section */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                  {repairer.priceRange === "€" ? "350" : 
                   repairer.priceRange === "€€" ? "550" :
                   repairer.priceRange === "€€€" ? "750" : "950"} MAD
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {repairer.specialties.slice(0, 2).map((specialty, index) => (
                <Badge 
                  key={index} 
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full border-0 font-normal"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  {specialty}
                </Badge>
              ))}
              {repairer.available && (
                <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full border-0 font-normal" style={{fontFamily: 'Inter, sans-serif'}}>
                  Recommandé
                </Badge>
              )}
            </div>

            {/* Call-to-action that appears on hover */}
            <div className="opacity-0 transform translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center justify-center text-sm text-blue-600 font-medium" style={{fontFamily: 'Inter, sans-serif'}}>
                Voir le profil
                <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Demo component to show the card in action
export default function RepairerCardDemo() {
  const sampleRepairer = {
    id: "1",
    name: "Marc Dubois",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
    rating: 5.0,
    reviewCount: 3,
    location: "Casablanca Centre",
    distance: "2.3 km",
    priceRange: "€€€",
    available: true,
    specialties: ["Smartphones", "Tablettes", "Ordinateurs"]
  };

  const sampleRepairer2 = {
    id: "2",
    name: "Catherine Bennani",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b6c0b04c?w=400&h=300&fit=crop&crop=face",
    rating: 5.0,
    reviewCount: 1,
    location: "Rabat Agdal",
    distance: "1.8 km",
    priceRange: "€€",
    available: true,
    specialties: ["Smartphones", "Smartwatch"]
  };

  const sampleRepairer3 = {
    id: "3",
    name: "Youssef Martinez",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face",
    rating: 5.0,
    reviewCount: 2,
    location: "Marrakech Gueliz",
    distance: "3.1 km",
    priceRange: "€",
    available: true,
    specialties: ["Ordinateurs", "Tablettes"]
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Professional device repair | Trusted experts at affordable prices
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RepairerCard 
            repairer={sampleRepairer}
            onClick={() => console.log('Clicked Marc')}
          />
          <RepairerCard 
            repairer={sampleRepairer2}
            onClick={() => console.log('Clicked Catherine')}
          />
          <RepairerCard 
            repairer={sampleRepairer3}
            onClick={() => console.log('Clicked Youssef')}
          />
        </div>
      </div>
    </div>
  );
}