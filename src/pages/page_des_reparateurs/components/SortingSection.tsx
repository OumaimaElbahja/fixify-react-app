import { ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface SortingSectionProps {
  onSortChange: (sortBy: string) => void;
  currentSort: string;
}

export function SortingSection({ onSortChange, currentSort }: SortingSectionProps) {
  const sortOptions = [
    { value: "rating", label: "Note" },
    { value: "price-low", label: "Prix croissant" },
    { value: "price-high", label: "Prix décroissant" },
    { value: "availability", label: "Disponibilité" }
  ];

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Trier par:</span>
      </div>
      
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Choisir l'ordre" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}