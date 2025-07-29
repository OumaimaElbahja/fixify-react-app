import { Zap } from "lucide-react";

export function FixifyLogo({ size = 48 }: { size?: number }) {
  return (
    <div 
      className="flex items-center justify-center rounded-full bg-[#1e3a8a]"
      style={{ width: size, height: size }}
    >
      <Zap 
        className="text-white" 
        size={size * 0.6} 
        fill="currentColor" 
      />
    </div>
  );
}