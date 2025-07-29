import { Header } from "./components/Header";
import { StatisticsCards } from "./components/StatisticsCards";
import { RequestsTable } from "./components/RequestsTable";
import { MarketplaceSidebar } from "./components/MarketplaceSidebar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content - Increased top padding for better separation from header */}
      <div className="pt-20 px-3 pb-3">
        <div className="mb-3">
          <div className="relative">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[--navy-blue] via-blue-700 to-blue-800 bg-clip-text text-transparent mb-1 tracking-tight">
              Tableau de bord
            </h1>
            <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-[--navy-blue] to-blue-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-xs leading-tight mt-2">
            Gérez vos demandes de réparation et accédez au marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Left Column - Statistics */}
          <div className="lg:col-span-1">
            <StatisticsCards />
          </div>
          
          {/* Main Content - Requests Table */}
          <div className="lg:col-span-2">
            <RequestsTable />
          </div>
          
          {/* Right Column - Marketplace & Activity */}
          <div className="lg:col-span-1">
            <MarketplaceSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}