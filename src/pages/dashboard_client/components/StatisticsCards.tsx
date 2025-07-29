import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function StatisticsCards() {
  const stats = [
    { label: "Demandes totales", value: 12, color: "text-[--navy-blue]" },
    { label: "En cours", value: 3, color: "text-orange-600" },
    { label: "Terminées", value: 8, color: "text-green-600" },
    { label: "En attente", value: 1, color: "text-gray-600" }
  ];

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-gray-100/50 rounded-xl overflow-hidden">
      <CardHeader className="pb-1 pt-3 px-3 bg-gradient-to-r from-gray-50/30 to-transparent">
        <CardTitle className="text-sm font-semibold text-gray-900">Statistiques</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5 p-3 pt-1">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 hover:bg-gray-50/80 transition-all duration-200 group">
            <span className="text-xs font-medium text-gray-700 group-hover:text-gray-800">{stat.label}</span>
            <div className="flex items-center gap-1.5">
              <span className={`font-bold text-sm ${stat.color} transition-all duration-200`}>
                {stat.value}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${stat.color.replace('text-', 'bg-')} opacity-60`}></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}