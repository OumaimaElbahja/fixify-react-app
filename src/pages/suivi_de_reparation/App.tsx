import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Textarea } from "./components/ui/textarea";
import { Badge } from "./components/ui/badge";
import { Star, Package, Truck, CheckCircle, Clock, ArrowLeft, Send, ShoppingCart, Plane, MapPin, Home } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [selectedReturnOption, setSelectedReturnOption] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const trackingSteps = [
    { 
      label: "Commande validée", 
      status: "completed", 
      time: "14h",
      icon: ShoppingCart,
      description: "Votre commande a été confirmée"
    },
    { 
      label: "Article expédié", 
      status: "completed", 
      time: "15h30",
      icon: Package,
      description: "L'article a quitté notre entrepôt"
    },
    { 
      label: "En cours de livraison", 
      status: "current", 
      time: "16h",
      icon: Truck,
      description: "En route vers votre adresse"
    },
    { 
      label: "Livraison terminée", 
      status: "pending", 
      time: "",
      icon: MapPin,
      description: "Article livré à destination"
    },
    { 
      label: "Récupération colis", 
      status: "pending", 
      time: "",
      icon: Home,
      description: "Colis récupéré par le client"
    },
    { 
      label: "Commande terminée", 
      status: "pending", 
      time: "",
      icon: CheckCircle,
      description: "Processus complété"
    }
  ];

  const getStepStyles = (status: string, index: number) => {
    switch (status) {
      case "completed":
        return {
          iconBg: "bg-green-500",
          iconColor: "text-white",
          lineColor: index < trackingSteps.length - 1 ? "bg-green-500" : "bg-muted",
          textColor: "text-foreground",
          timeColor: "text-green-500"
        };
      case "current":
        return {
          iconBg: "bg-[#0A2A5C]",
          iconColor: "text-white",
          lineColor: index < trackingSteps.length - 1 ? "bg-muted" : "bg-muted",
          textColor: "text-[#0A2A5C]",
          timeColor: "text-[#0A2A5C]"
        };
      default:
        return {
          iconBg: "bg-muted",
          iconColor: "text-muted-foreground",
          lineColor: "bg-muted",
          textColor: "text-muted-foreground",
          timeColor: "text-muted-foreground"
        };
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" className="text-[#0A2A5C] hover:bg-[#0A2A5C]/10">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-[#0A2A5C]">Suivi de commande</h1>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground">
          <span>En cours</span>
          <div className="flex items-center gap-4">
            <span>Réservation</span>
            <span>Tarif</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Order Summary Card */}
        <Card className="bg-white border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground">N° commande</p>
                <p className="text-foreground">#12345</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Date de départ</p>
                <p className="text-foreground">05/07/2025</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Mise en retour mode : Livraison</span>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">TaxEVA Pro : +4.3</p>
                <p className="text-foreground">75 €</p>
              </div>
            </div>
            <Badge variant="secondary" className="mt-4 bg-[#0A2A5C]/10 text-[#0A2A5C] border-[#0A2A5C]/20">
              Statut actuel : Expédition confirmée
            </Badge>
          </CardContent>
        </Card>

        {/* Real-time Tracking Card */}
        <Card className="bg-white border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#0A2A5C]">Suivi en temps réel</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {/* Timeline */}
            <div className="relative">
              {/* Mobile layout */}
              <div className="block md:hidden space-y-6">
                {trackingSteps.map((step, index) => {
                  const styles = getStepStyles(step.status, index);
                  const IconComponent = step.icon;
                  
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.iconBg}`}>
                          <IconComponent className={`w-5 h-5 ${styles.iconColor}`} />
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div className={`w-0.5 h-12 mt-2 ${styles.lineColor}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`${styles.textColor}`}>{step.label}</p>
                          {step.time && (
                            <span className={`text-sm ${styles.timeColor}`}>{step.time}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop layout */}
              <div className="hidden md:block">
                {/* Timeline line */}
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted" />
                
                {/* Timeline items */}
                <div className="grid grid-cols-6 gap-4">
                  {trackingSteps.map((step, index) => {
                    const styles = getStepStyles(step.status, index);
                    const IconComponent = step.icon;
                    
                    return (
                      <div key={index} className="flex flex-col items-center text-center">
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.iconBg} relative z-10`}>
                          <IconComponent className={`w-5 h-5 ${styles.iconColor}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="mt-4 space-y-1">
                          <p className={`text-sm ${styles.textColor}`}>{step.label}</p>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                          {step.time && (
                            <p className={`text-xs ${styles.timeColor}`}>{step.time}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Status message */}
            <div className="mt-8 p-4 bg-[#0A2A5C]/5 rounded-lg border border-[#0A2A5C]/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0A2A5C]" />
                <span className="text-sm text-[#0A2A5C]">Statut actuel : En cours de livraison</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Options Card */}
        <Card className="bg-white border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#0A2A5C]">Mode de retour</CardTitle>
            <p className="text-muted-foreground">Comment souhaitez-vous récupérer votre appareil ?</p>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="space-y-3">
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedReturnOption === 'domicile' ? 'border-[#0A2A5C] bg-[#0A2A5C]/5' : 'border-border hover:border-[#0A2A5C]/30'}`}
                onClick={() => setSelectedReturnOption('domicile')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedReturnOption === 'domicile' ? 'border-[#0A2A5C] bg-[#0A2A5C]' : 'border-muted'}`}>
                    {selectedReturnOption === 'domicile' && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                  </div>
                  <div>
                    <p className="text-foreground">Livraison à domicile</p>
                    <p className="text-muted-foreground">Votre appareil sera livré à votre domicile</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedReturnOption === 'magasin' ? 'border-[#0A2A5C] bg-[#0A2A5C]/5' : 'border-border hover:border-[#0A2A5C]/30'}`}
                onClick={() => setSelectedReturnOption('magasin')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${selectedReturnOption === 'magasin' ? 'border-[#0A2A5C] bg-[#0A2A5C]' : 'border-muted'}`}>
                    {selectedReturnOption === 'magasin' && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                  </div>
                  <div>
                    <p className="text-foreground">Je préfère le récupérer moi-même</p>
                    <p className="text-muted-foreground">Récupération disponible dans les magasins partenaires</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#0A2A5C] hover:bg-[#0A2A5C]/90 text-white">
              Valider le choix
            </Button>
          </CardContent>
        </Card>

        {/* Review Card */}
        <Card className="bg-white border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#0A2A5C]">Laisser un avis</CardTitle>
            <p className="text-muted-foreground">Votre note</p>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer transition-colors ${star <= rating ? 'text-[#0A2A5C] fill-[#0A2A5C]' : 'text-muted hover:text-[#0A2A5C]/50'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <div>
              <p className="text-muted-foreground mb-2">Partagez votre expérience</p>
              <Textarea
                placeholder="Décrivez votre expérience avec ce réparateur..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                className="bg-input-background border-border text-foreground placeholder:text-muted-foreground focus:border-[#0A2A5C] focus:ring-[#0A2A5C]"
              />
            </div>

            <Button className="w-full bg-[#0A2A5C] hover:bg-[#0A2A5C]/90 text-white">
              <Send className="w-4 h-4 mr-2" />
              Envoyer mon avis
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-muted-foreground py-4">
          <p>© 2025 Fixify Inc. Tous droits réservés.</p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="hover:text-[#0A2A5C] cursor-pointer transition-colors">Support</span>
            <span className="hover:text-[#0A2A5C] cursor-pointer transition-colors">Conditions</span>
            <span className="hover:text-[#0A2A5C] cursor-pointer transition-colors">Confidentialité</span>
          </div>
        </div>
      </div>
    </div>
  );
}