import { GripVertical, Zap } from "lucide-react";

export interface WasteType {
  id: string;
  name: string;
  code: string;
  frequency: number;
}

interface WasteTypeCardProps {
  wasteType: WasteType;
  isSelected: boolean;
  onClick: () => void;
  isDragging?: boolean;
  isDraggable?: boolean;
}

export function WasteTypeCard({ 
  wasteType, 
  isSelected, 
  onClick, 
  isDragging = false,
  isDraggable = false
}: WasteTypeCardProps) {
  
  // Get frequency level for visual indication
  const getFrequencyLevel = (frequency: number) => {
    if (frequency >= 40) return { level: 'high', color: 'text-safety-green', bg: 'bg-safety-green/20', border: 'border-safety-green/30' };
    if (frequency >= 20) return { level: 'medium', color: 'text-orange-400', bg: 'bg-orange-400/20', border: 'border-orange-400/30' };
    return { level: 'low', color: 'text-muted-foreground', bg: 'bg-muted/50', border: 'border-muted-foreground/30' };
  };

  const frequencyLevel = getFrequencyLevel(wasteType.frequency);

  return (
    <div
      onClick={onClick}
      className={`
        relative group rounded-lg transition-all duration-300 cursor-pointer
        backdrop-blur-sm flex items-center
        ${isSelected 
          ? 'bg-industrial-blue/10 border-2 border-industrial-blue text-foreground shadow-md mx-0.5 my-0.5 p-[14px]' 
          : 'bg-card border border-border text-card-foreground hover:border-industrial-blue/30 hover:bg-accent shadow-sm hover:shadow-md m-0.5 p-[15px]'
        }
        ${isDragging ? 'opacity-60 rotate-1 scale-105 shadow-xl' : ''}
        ${isDraggable ? 'hover:scale-[1.005] active:scale-[0.995]' : 'hover:scale-[1.002] active:scale-[0.998]'}
        min-h-[72px] touch-manipulation
      `}
    >
      {/* Drag Handle */}
      {isDraggable && (
        <div className="absolute top-2 right-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-3 left-3">
          <div className="w-2 h-2 bg-industrial-blue rounded-full shadow-sm"></div>
        </div>
      )}

      {/* Main Content - Flex Layout */}
      <div className="flex-1 flex items-center justify-between gap-4 pr-6">
        
        {/* Left Side - Waste Info */}
        <div className="flex-1 min-w-0">
          {/* Waste Name */}
          <h3 className={`text-base font-semibold leading-tight mb-1 transition-colors duration-200 truncate ${
            isSelected ? 'text-foreground' : 'text-foreground group-hover:text-foreground'
          }`}>
            {wasteType.name}
          </h3>

          {/* Waste Code */}
          <div className={`text-xs font-mono transition-colors duration-200 ${
            isSelected ? 'text-industrial-blue' : 'text-muted-foreground group-hover:text-foreground'
          }`}>
            {wasteType.code}
          </div>
        </div>

        {/* Right Side - Frequency Display */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {/* Frequency Number */}
          <div className={`
            px-3 py-1 rounded-md text-sm font-bold transition-all duration-200 min-w-[60px] text-center
            ${isSelected 
              ? 'bg-industrial-blue text-white border border-industrial-blue' 
              : `${frequencyLevel.bg} ${frequencyLevel.color} border ${frequencyLevel.border}`
            }
          `}>
            {wasteType.frequency}
          </div>

          {/* Usage Label */}
          <div className={`
            text-xs transition-colors duration-200 
            ${isSelected ? 'text-muted-foreground' : 'text-muted-foreground group-hover:text-foreground'}
          `}>
            使用次数
          </div>
        </div>

        {/* Frequency Level Indicator Bar */}
        <div className={`
          w-1 h-12 rounded-full transition-all duration-200 flex-shrink-0
          ${isSelected 
            ? 'bg-industrial-blue/60' 
            : frequencyLevel.level === 'high' 
              ? 'bg-safety-green/60' 
              : frequencyLevel.level === 'medium'
              ? 'bg-orange-400/60'
              : 'bg-muted/60'
          }
        `} />
      </div>

      {/* Hover Overlay */}
      {!isSelected && (
        <div className="absolute inset-0 rounded-lg transition-all duration-300 pointer-events-none bg-transparent group-hover:bg-accent/20" />
      )}
    </div>
  );
}