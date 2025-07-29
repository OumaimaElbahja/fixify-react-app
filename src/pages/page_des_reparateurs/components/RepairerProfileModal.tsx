import { X, Star, MapPin, Clock, Phone, Mail, Home, CheckCircle, Award, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface RepairerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
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
    description: string;
    certifications: Array<{
      name: string;
      icon: string;
      description: string;
    }>;
    gallery: string[];
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    hours: Array<{
      day: string;
      hours: string;
    }>;
    rates: Array<{
      service: string;
      price: string;
    }>;
    recentReviews: Array<{
      author: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
}

export function RepairerProfileModal({ isOpen, onClose, repairer }: RepairerProfileModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % repairer.gallery.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + repairer.gallery.length) % repairer.gallery.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') setIsImageModalOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="!w-[800px] !max-w-[800px] max-h-[90vh] overflow-y-auto p-0">
          {/* Modal Header */}
          <DialogHeader className="p-6 pb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="w-20 h-20 border-2 border-[#2D5A87]/10">
                <AvatarImage src={repairer.photo} alt={repairer.name} />
                <AvatarFallback className="bg-[#2D5A87] text-white">
                  {repairer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <DialogTitle className="text-2xl text-gray-900 mb-2">{repairer.name}</DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mb-2">
                  Profil détaillé du réparateur {repairer.name} situé à {repairer.location}. 
                  Consultez ses spécialités, tarifs, disponibilités et avis clients.
                </DialogDescription>
                
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= repairer.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({repairer.rating} • {repairer.reviewCount} avis)</span>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{repairer.location} • {repairer.distance}</span>
                  </div>
                </div>
                
                <div className="flex justify-center sm:justify-start">
                  <Badge className={`${repairer.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {repairer.available ? 'Disponible aujourd\'hui' : 'Indisponible'}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Modal Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 pt-0">
            {/* Left Column */}
            <div className="space-y-6">
              {/* À propos */}
              <div>
                <h3 className="text-lg font-medium text-[#001B48] mb-3">À propos</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{repairer.description}</p>
              </div>

              {/* Spécialités */}
              <div>
                <h3 className="text-lg font-medium text-[#001B48] mb-3">Spécialités</h3>
                <div className="flex flex-wrap gap-2">
                  {repairer.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-[#2D5A87] border-[#2D5A87]">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-lg font-medium text-[#001B48] mb-3">Certifications</h3>
                <div className="grid grid-cols-1 gap-3">
                  {repairer.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-[#0A2A5C] rounded-full flex items-center justify-center">
                        {cert.icon === 'award' && <Award className="w-4 h-4 text-white" />}
                        {cert.icon === 'shield' && <Shield className="w-4 h-4 text-white" />}
                        {cert.icon === 'check' && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{cert.name}</div>
                        <div className="text-xs text-gray-600">{cert.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Galerie - Grid Layout Only */}
              <div>
                <h3 className="text-lg font-medium text-[#001B48] mb-3">Galerie</h3>
                <div className="grid grid-cols-3 gap-3">
                  {repairer.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openImageModal(index)}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105"
                      type="button"
                    >
                      <ImageWithFallback 
                        src={image} 
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Informations de contact */}
              <div>
                <h3 className="text-lg font-medium text-[#001B48] mb-3">Informations de contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#2D5A87]" />
                    <span className="text-sm">{repairer.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#2D5A87]" />
                    <span className="text-sm">{repairer.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-[#2D5A87]" />
                    <span className="text-sm">{repairer.contact.address}</span>
                  </div>
                </div>
              </div>

              {/* Disponibilités */}
              <div>
                <h3 className="text-lg font-medium text-[#001B48] mb-3">Disponibilités</h3>
                <div className="space-y-2">
                  {repairer.hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="text-gray-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarifs approximatifs */}
              <div>
                <h3 className="text-lg font-medium text-[#001B48] mb-3">Tarifs approximatifs</h3>
                <div className="space-y-2">
                  {repairer.rates.map((rate, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{rate.service}</span>
                      <span className="text-gray-900 font-medium">{rate.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avis récents */}
              <div>
                <h3 className="text-lg font-medium text-[#001B48] mb-3">Avis récents</h3>
                <div className="space-y-3">
                  {repairer.recentReviews.slice(0, 2).map((review, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{review.author}</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{review.date}</p>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 pt-0 border-t flex justify-center">
            <Button 
              className="bg-[#E67E22] hover:bg-[#d35400] text-white px-8 py-2 rounded-lg transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg"
              onClick={onClose}
            >
              Sélectionner ce réparateur
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent 
          className="!w-screen !max-w-screen !h-screen !max-h-screen p-0 bg-transparent border-none shadow-none"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>
              Galerie d'images - {repairer.name}
            </DialogTitle>
            <DialogDescription>
              Visualiseur d'images pour la galerie du réparateur {repairer.name}. 
              Image {selectedImageIndex + 1} sur {repairer.gallery.length}. 
              Utilisez les flèches pour naviguer ou appuyez sur Échap pour fermer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button - Smaller */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-50 p-1.5 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
              aria-label="Fermer la galerie d'images"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Previous Button - Far Left, Smaller */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
              disabled={repairer.gallery.length <= 1}
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image - Much Smaller Size */}
            <ImageWithFallback
              src={repairer.gallery[selectedImageIndex]}
              alt={`Image ${selectedImageIndex + 1} de la galerie de ${repairer.name}`}
              className="max-w-[40vw] max-h-[40vh] object-contain"
            />

            {/* Next Button - Far Right, Smaller */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
              disabled={repairer.gallery.length <= 1}
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/70 text-white rounded-full text-sm"
              aria-live="polite"
              aria-label={`Image ${selectedImageIndex + 1} sur ${repairer.gallery.length}`}
            >
              {selectedImageIndex + 1} / {repairer.gallery.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}