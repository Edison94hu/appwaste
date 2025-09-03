import { useState, useRef, useEffect } from "react";
import { Lock, Unlock, Printer, Scale, Check, X, Calendar } from "lucide-react";
import { LabelPreview } from "./LabelPreview";

export type WeightUnit = "KG" | "T";
export type LabelSize = "100*100" | "100*80" | "100*70" | "100*60" | "150*150" | "200*200";
export type DeviceStatus = "connected" | "disconnected";

interface WasteTypeData {
  id: string;
  name: string;
  code: string;
  frequency: number;
}

interface WeightOperationPanelProps {
  weight: string;
  weightUnit: WeightUnit;
  labelSize: LabelSize;
  isWeightLocked: boolean;
  selectedWasteType: string | null;
  selectedWasteData: WasteTypeData | null;
  printerStatus: DeviceStatus;
  scaleStatus: DeviceStatus;
  onWeightChange: (weight: string) => void;
  onWeightUnitChange: (unit: WeightUnit) => void;
  onLabelSizeChange: (size: LabelSize) => void;
  onWeightLockToggle: () => void;
  onPrint: () => void;
  entryMode?: "normal" | "backfill";
  selectedDate?: string;
  onDateChange?: (date: string) => void;
}

export function WeightOperationPanel({
  weight,
  weightUnit,
  labelSize,
  isWeightLocked,
  selectedWasteType,
  selectedWasteData,
  printerStatus,
  scaleStatus,
  onWeightChange,
  onWeightUnitChange,
  onLabelSizeChange,
  onWeightLockToggle,
  onPrint,
  entryMode = "normal",
  selectedDate,
  onDateChange
}: WeightOperationPanelProps) {
  const [localWeight, setLocalWeight] = useState(weight);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalWeight(weight);
  }, [weight]);

  const handleWeightInputChange = (value: string) => {
    // Only allow numbers and one decimal point
    const sanitized = value.replace(/[^0-9.]/g, '');
    const parts = sanitized.split('.');
    const finalValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : sanitized;
    
    setLocalWeight(finalValue);
    onWeightChange(finalValue);
  };

  const getDisplayWeight = () => {
    if (!weight) return "";
    const weightNum = parseFloat(weight);
    return weightUnit === "T" ? 
      (weightNum / 1000).toFixed(3) : 
      weightNum.toFixed(2);
  };

  const getDisplayUnit = () => {
    return weightUnit;
  };

  const canPrint = selectedWasteType && weight && parseFloat(weight) > 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    });
  };

  const getStatusColor = (status: DeviceStatus) => {
    return status === "connected" ? "text-safety-green" : "text-neutral-gray";
  };

  const getStatusText = (status: DeviceStatus) => {
    return status === "connected" ? "已连接" : "未连接";
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden">
      
      {/* Top Status Bar */}
      {entryMode === "backfill" && (
        <div className="flex-shrink-0 bg-warning-red/10 border border-warning-red/30 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-warning-red" />
              <span className="text-foreground font-medium text-sm">补录模式</span>
            </div>
            <input
              type="date"
              value={selectedDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => onDateChange?.(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="bg-input-background border border-border text-foreground rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-warning-red/50"
            />
          </div>
        </div>
      )}


      
      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 overflow-hidden min-h-0">
        
        {/* Center: Square Label Preview */}
        <div className="flex-1 bg-muted/40 rounded-xl border border-border/50 p-4 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-none">
            <LabelPreview
              wasteType={selectedWasteData ? {
                id: selectedWasteData.id,
                name: selectedWasteData.name,
                code: selectedWasteData.code,
                frequency: selectedWasteData.frequency
              } : null}
              weight={weight}
              weightUnit={weightUnit}
              labelSize={labelSize}
            />
          </div>
        </div>

        {/* Right Side Panel (280px) - Top Info + Bottom Settings/Weight */}
        <div className="w-[280px] flex flex-col gap-4">
          
          {/* Top: Selected Waste Type Info */}
          <div className="flex-shrink-0 bg-muted/30 rounded-xl p-5 border border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-muted-foreground font-semibold text-sm flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-industrial-blue"></div>
                危废选择
              </h4>
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selectedWasteType ? 'bg-safety-green animate-pulse shadow-sm shadow-safety-green/50' : 'bg-muted'}`}></div>
            </div>
            
            {/* Selected Waste Type Content */}
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">已选择危废类型</div>
              
              {selectedWasteType ? (
                <div className="space-y-3">
                  {/* Main waste type name - enhanced styling */}
                  <div className="text-lg font-bold text-orange-500 truncate bg-gradient-to-r from-industrial-blue/10 to-safety-green/10 px-4 py-3 rounded-xl border border-industrial-blue/20 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md hover:border-industrial-blue/30">
                    {selectedWasteType}
                  </div>
                  
                  {/* Waste code - improved styling */}
                  {selectedWasteData && (
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium text-muted-foreground">危废代码:</div>
                      <div className="text-sm font-mono font-semibold text-industrial-blue bg-industrial-blue/10 px-3 py-1.5 rounded-lg border border-industrial-blue/20">
                        {selectedWasteData.code}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground italic py-4 px-4 bg-muted/40 rounded-xl border border-dashed border-border text-center">
                  请从左侧选择危废类型
                </div>
              )}
            </div>
          </div>

          {/* Bottom: Settings + Weight Input (Bottom Aligned) */}
          <div className="flex-1 flex flex-col justify-end gap-3">
            {/* Label Settings */}
            <div className="bg-muted/30 rounded-xl p-3 border border-border/50">
              <h4 className="text-muted-foreground text-sm font-semibold mb-2">标签设置</h4>
              <select
                value={labelSize}
                onChange={(e) => onLabelSizeChange(e.target.value as LabelSize)}
                className="w-full bg-input border border-border text-foreground py-2 px-3 rounded-lg focus:border-industrial-blue focus:outline-none"
              >
                <option value="100*100">100×100 mm</option>
                <option value="100*80">100×80 mm</option>
                <option value="100*70">100×70 mm</option>
                <option value="100*60">100×60 mm</option>
                <option value="150*150">150×150 mm</option>
                <option value="200*200">200×200 mm</option>
              </select>
            </div>

            {/* Status Info with Device Status */}
            <div className="bg-muted/30 rounded-xl p-3 border border-border/50">
              <h4 className="text-muted-foreground text-sm font-semibold mb-3">操作状态</h4>
              
              {/* Main operation status */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${canPrint ? 'bg-safety-green animate-pulse' : 'bg-muted'}`}></div>
                <span className="text-foreground text-sm">
                  {canPrint ? '准备就绪' : '待完善信息'}
                </span>
                <div className="text-xs text-muted-foreground ml-auto">
                  {entryMode === "normal" ? "正常" : "补录"}
                </div>
              </div>

              {/* Device Status */}
              <div className="space-y-2">
                {/* Printer Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Printer className={`w-4 h-4 ${getStatusColor(printerStatus)}`} />
                    <span className="text-sm text-foreground">打印机</span>
                  </div>
                  <span className={`text-sm ${getStatusColor(printerStatus)} font-medium`}>
                    {getStatusText(printerStatus)}
                  </span>
                </div>

                {/* Scale Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className={`w-4 h-4 ${getStatusColor(scaleStatus)}`} />
                    <span className="text-sm text-foreground">称重机</span>
                  </div>
                  <span className={`text-sm ${getStatusColor(scaleStatus)} font-medium`}>
                    {getStatusText(scaleStatus)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Weight Input Section - Bottom Aligned - Compact Industrial Scale */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <h3 className="text-muted-foreground font-semibold mb-3">重量录入</h3>

            {/* Large Weight Display - Reduced size */}
            <div className="relative mb-4">
              <input
                ref={inputRef}
                type="text"
                value={isWeightLocked ? getDisplayWeight() : localWeight}
                onChange={(e) => !isWeightLocked && handleWeightInputChange(e.target.value)}
                className={`w-full text-foreground text-4xl font-mono text-center py-4 px-4 rounded-xl transition-all duration-200 ${
                  isWeightLocked 
                    ? 'bg-orange-50 border-2 border-orange-300 cursor-not-allowed shadow-inner' 
                    : 'bg-input border-2 border-border focus:border-industrial-blue focus:outline-none hover:border-industrial-blue/50'
                }`}
                placeholder="0.00"
                disabled={isWeightLocked}
              />
              <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-xl font-medium transition-colors duration-200 ${
                isWeightLocked ? 'text-orange-600' : 'text-muted-foreground'
              }`}>
                {getDisplayUnit()}
              </div>
              
              {/* Locked indicator overlay */}
              {isWeightLocked && (
                <div className="absolute inset-0 bg-orange-100/30 rounded-xl pointer-events-none flex items-center justify-center">
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-orange-200/80 px-2 py-0.5 rounded-md">
                    <Lock className="w-3 h-3 text-orange-700" />
                    <span className="text-xs font-medium text-orange-700">已锁定</span>
                  </div>
                </div>
              )}
            </div>

            {/* Weight Unit Toggle - Compact Size */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => onWeightUnitChange("KG")}
                className={`flex-1 py-3 px-3 rounded-lg font-medium transition-all duration-200 ${
                  weightUnit === "KG"
                    ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                KG
              </button>
              <button
                onClick={() => onWeightUnitChange("T")}
                className={`flex-1 py-3 px-3 rounded-lg font-medium transition-all duration-200 ${
                  weightUnit === "T"
                    ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                T
              </button>
            </div>

            {/* Weight Lock Toggle - Compact Industrial Button */}
            <button
              onClick={onWeightLockToggle}
              className={`w-full py-4 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 min-h-[48px] relative overflow-hidden ${
                isWeightLocked 
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-orange-500/20 border-2 border-orange-400' 
                  : 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 hover:from-slate-300 hover:to-slate-400 border-2 border-slate-300 shadow-md'
              }`}
              title={isWeightLocked ? "解锁重量" : "锁定重量"}
            >
              {/* Subtle pattern overlay for texture */}
              <div className={`absolute inset-0 opacity-20 ${
                isWeightLocked 
                  ? 'bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:12px_12px]'
                  : 'bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:12px_12px]'
              }`} />
              
              {isWeightLocked ? <Lock className="w-4 h-4 relative z-10" /> : <Unlock className="w-4 h-4 relative z-10" />}
              <span className="relative z-10">{isWeightLocked ? "解锁重量" : "锁定重量"}</span>
              
              {/* Status indicator */}
              <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                isWeightLocked 
                  ? 'bg-white/80 shadow-sm' 
                  : 'bg-slate-500/60'
              }`} />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Print Button - Spans full width - Compact */}
      <div className="flex-shrink-0 pb-2">
        <button
          onClick={onPrint}
          disabled={!canPrint}
          className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 relative ${
            canPrint
              ? 'bg-industrial-blue text-white hover:bg-industrial-blue-dark shadow-lg shadow-industrial-blue/20 hover:shadow-industrial-blue/30 active:scale-[0.98]'
              : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
          }`}
        >
          <Printer className={`w-5 h-5 transition-all duration-200 ${
            canPrint 
              ? 'text-white' 
              : 'text-muted-foreground'
          }`} />
          
          <span className="font-medium">
            {entryMode === "backfill" ? "补录并打印标签" : "打印标签"}
          </span>
          
          {/* Simple status indicator */}
          {canPrint && (
            <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-white/80" />
          )}
        </button>

        {!canPrint && (
          <p className="text-center text-muted-foreground text-xs mt-1">
            请选择危废类型并输入重量后再打印
          </p>
        )}
      </div>

    </div>
  );
}