import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MoreHorizontal, Smartphone, Laptop, Tablet } from "lucide-react";

export function RequestsTable() {
  const requests = [
    {
      id: "REQ-2023-001",
      device: "iPhone 14 Pro",
      model: "Technology Pro",
      date: "10/01/2024",
      priority: "Urgent",
      status: "En cours",
      icon: Smartphone
    },
    {
      id: "REQ-2023-002", 
      device: "MacBook Air M2",
      model: "Mac Signature",
      date: "12/01/2024",
      priority: "En cours",
      status: "En attente",
      icon: Laptop
    },
    {
      id: "REQ-2023-003",
      device: "iPad Pro 12.9",
      model: "Qualité Solutions",
      date: "08/01/2024",
      priority: "En attente",
      status: "Terminé",
      icon: Tablet
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "bg-red-100 text-red-800";
      case "En cours": return "bg-orange-100 text-orange-800";
      case "En attente": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-gray-100/50 rounded-xl overflow-hidden">
      <CardHeader className="pb-1 pt-3 px-3 bg-gradient-to-r from-gray-50/30 to-transparent border-b border-gray-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-semibold text-gray-900">Mes demandes</CardTitle>
          <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-all duration-200 hover:scale-105 active:scale-95">
            Créer une nouvelle demande
          </span>
        </div>
        <p className="text-xs text-gray-600 leading-tight mt-0.5">
          Gérez vos demandes de réparation et accédez au marketplace
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Appareil</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom modèle</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Priorité</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => {
                const IconComponent = request.icon;
                return (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all duration-200 group">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-50 group-hover:bg-white rounded-lg transition-all duration-200 shadow-sm">
                          <IconComponent className="h-3.5 w-3.5 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 group-hover:text-gray-800">{request.device}</div>
                          <div className="text-xs text-gray-500">{request.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-800 font-medium">{request.model}</td>
                    <td className="py-2 px-3 text-sm text-gray-600">{request.date}</td>
                    <td className="py-2 px-3">
                      <Badge variant="secondary" className={`${getPriorityColor(request.priority)} rounded-full px-2 py-0.5 text-xs font-medium`}>
                        {request.priority}
                      </Badge>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                          Voir détails
                        </span>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-lg transition-all duration-200 p-1 hover:scale-105 active:scale-95">
                          <MoreHorizontal className="h-3.5 w-3.5 text-gray-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}