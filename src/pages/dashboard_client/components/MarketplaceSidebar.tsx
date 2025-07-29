import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Package, Wrench } from "lucide-react";

export function MarketplaceSidebar() {
  const recentActivities = [
    {
      title: "Réparation terminée",
      subtitle: "iPhone 12 Pro",
      time: "Il y a 2 heures",
      icon: Wrench,
      color: "text-green-600"
    },
    {
      title: "Nouvelle demande",
      subtitle: "MacBook Pro M1",
      time: "Il y a 1 jour",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Nouvelle demande créée",
      subtitle: "iPad Air",
      time: "Il y a 3 jours",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-3">
      {/* Marketplace Card */}
      <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-gray-100/50 rounded-xl overflow-hidden">
        <CardHeader className="pb-1 pt-3 px-3 bg-gradient-to-r from-gray-50/50 to-transparent">
          <CardTitle className="text-sm font-semibold text-gray-900">Marketplace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-3 pt-1">
          <p className="text-xs text-gray-600 leading-tight">
            Explorez notre marketplace pour acheter des appareils et accessoires technologiques
          </p>
          <Button className="w-full bg-gradient-to-r from-[--navy-blue] to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-xl py-2 text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95">
            Accéder au marketplace
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-gray-100/50 rounded-xl overflow-hidden">
        <CardHeader className="pb-1 pt-3 px-3 bg-gradient-to-r from-gray-50/50 to-transparent">
          <CardTitle className="text-sm font-semibold text-gray-900">Activité récente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 p-3 pt-1">
          {recentActivities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50/70 transition-all duration-200 cursor-pointer group hover:scale-102 active:scale-98">
                <div className={`mt-0.5 p-1 rounded-lg bg-gray-50 group-hover:bg-white transition-all duration-200 ${activity.color}`}>
                  <IconComponent className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 group-hover:text-gray-800 leading-tight">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-600 leading-tight">{activity.subtitle}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}