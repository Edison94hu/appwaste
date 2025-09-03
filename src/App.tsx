import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Removed ThemeProvider - using light mode only
import { TopBar, DeviceStatus } from "./components/TopBar";
import { WasteTypeList, SortMode } from "./components/WasteTypeList";
import { WasteType } from "./components/WasteTypeCard";
import { WeightOperationPanel, WeightUnit, LabelSize } from "./components/WeightOperationPanel";
import { ContextBar } from "./components/ContextBar";
import { BottomNavigation, NavigationTab } from "./components/BottomNavigation";
import { HistoryAnalyticsTabPage } from "./components/HistoryAnalyticsTabPage";
import { DeviceManagementPage } from "./components/DeviceManagementPage";
import { PersonalCenterPage } from "./components/PersonalCenterPage";

type EntryMode = "normal" | "backfill";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // 根据URL路径确定活跃的标签页
  const getActiveTabFromPath = (): NavigationTab => {
    const path = location.pathname;
    if (path.startsWith('/statistics')) return 'statistics';
    if (path.startsWith('/devices')) return 'devices';
    if (path.startsWith('/profile')) return 'profile';
    return 'collection';
  };

  // Device status
  const [printerStatus, setPrinterStatus] = useState<DeviceStatus>("connected");
  const [scaleStatus, setScaleStatus] = useState<DeviceStatus>("disconnected");

  // Company and operator info
  const [companyName] = useState<string>("杭州示例化工有限公司");
  const [operatorName] = useState<string>("张操作员");

  // Navigation - 根据URL初始化
  const [activeTab, setActiveTab] = useState<NavigationTab>(getActiveTabFromPath());

  // 监听路径变化并更新活跃标签页
  useEffect(() => {
    const newTab = getActiveTabFromPath();
    setActiveTab(newTab);
  }, [location.pathname]);

  // 修改标签页切换函数以支持路由
  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  // Entry mode for data collection
  const [entryMode, setEntryMode] = useState<EntryMode>("normal");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Waste type data - Extended with more types
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([
    {
      id: "1",
      name: "废矿物油与含矿物油废物",
      code: "900-041-49",
      frequency: 45
    },
    {
      id: "2",
      name: "废酸",
      code: "900-300-34",
      frequency: 32
    },
    {
      id: "3",
      name: "废碱",
      code: "900-352-35",
      frequency: 28
    },
    {
      id: "4",
      name: "废有机溶剂与含有机溶剂废物",
      code: "900-402-06",
      frequency: 21
    },
    {
      id: "5",
      name: "含铜废物",
      code: "397-004-22",
      frequency: 18
    },
    {
      id: "6",
      name: "含锌废物",
      code: "397-005-22",
      frequency: 15
    },
    {
      id: "7",
      name: "含铬废物",
      code: "397-002-22",
      frequency: 12
    },
    {
      id: "8",
      name: "废催化剂",
      code: "261-151-50",
      frequency: 8
    },
    {
      id: "9",
      name: "含汞废物",
      code: "900-023-29",
      frequency: 6
    },
    {
      id: "10",
      name: "废漆、染料、颜料废物",
      code: "900-299-12",
      frequency: 5
    },
    {
      id: "11",
      name: "含镍废物",
      code: "397-005-22",
      frequency: 4
    },
    {
      id: "12",
      name: "废胶片及废像纸",
      code: "900-019-16",
      frequency: 3
    },
    {
      id: "13",
      name: "废弃的药品",
      code: "900-002-02",
      frequency: 2
    },
    {
      id: "14",
      name: "含铅废物",
      code: "397-001-22",
      frequency: 2
    },
    {
      id: "15",
      name: "电路板废料",
      code: "900-045-49",
      frequency: 1
    }
  ]);

  // Selection and sorting
  const [selectedWasteId, setSelectedWasteId] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("frequency");

  // Weight operations
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("KG");
  const [labelSize, setLabelSize] = useState<LabelSize>("150*150");
  const [isWeightLocked, setIsWeightLocked] = useState<boolean>(false);

  // Get selected waste type name and data
  const selectedWasteData = wasteTypes.find(w => w.id === selectedWasteId) || null;
  const selectedWasteType = selectedWasteData?.name || null;

  // Simulate device status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change device status for demo
      if (Math.random() > 0.8) {
        setPrinterStatus(prev => prev === "connected" ? "disconnected" : "connected");
      }
      if (Math.random() > 0.8) {
        setScaleStatus(prev => prev === "connected" ? "disconnected" : "connected");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate automatic weight from scale when connected
  useEffect(() => {
    if (scaleStatus === "connected" && !isWeightLocked) {
      const interval = setInterval(() => {
        // Simulate weight fluctuation
        const baseWeight = parseFloat(weight) || 0;
        const fluctuation = (Math.random() - 0.5) * 0.02; // ±0.01 kg variation
        const newWeight = Math.max(0, baseWeight + fluctuation);
        
        // Convert weight based on current unit for display
        if (weightUnit === "KG") {
          setWeight(newWeight.toFixed(2));
        } else {
          // For T display, we store the actual KG value but show converted
          setWeight((newWeight * 1000).toFixed(0)); // Store as KG internally
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [scaleStatus, isWeightLocked, weight, weightUnit]);

  const handleWasteSelect = (id: string) => {
    setSelectedWasteId(id);
    // Increment frequency when selected
    setWasteTypes(prev => prev.map(waste => 
      waste.id === id 
        ? { ...waste, frequency: waste.frequency + 1 }
        : waste
    ));
  };

  const handleReorder = (newOrder: WasteType[]) => {
    setWasteTypes(newOrder);
  };

  const handleWeightChange = (newWeight: string) => {
    // Store weight in KG internally regardless of display unit
    if (weightUnit === "T") {
      // Convert from T to KG for internal storage
      const kgWeight = parseFloat(newWeight) * 1000;
      setWeight(kgWeight.toString());
    } else {
      setWeight(newWeight);
    }
  };

  const handleWeightUnitChange = (unit: WeightUnit) => {
    const currentWeightNum = parseFloat(weight) || 0;
    
    if (weightUnit === "KG" && unit === "T") {
      // Converting from KG to T display
      setWeight(currentWeightNum.toString()); // Keep KG value internally
    } else if (weightUnit === "T" && unit === "KG") {
      // Converting from T to KG display  
      setWeight(currentWeightNum.toString()); // Keep KG value internally
    }
    
    setWeightUnit(unit);
  };

  const handleWeightLockToggle = () => {
    setIsWeightLocked(prev => !prev);
  };

  const handlePrint = () => {
    if (selectedWasteType && weight) {
      const displayWeight = weightUnit === "T" ? 
        `${(parseFloat(weight) / 1000).toFixed(3)} T` : 
        `${weight} KG`;
      
      const dateInfo = entryMode === "backfill" ? `\n录入日期: ${selectedDate}` : "";
      
      console.log(`Printing label for: ${selectedWasteType}, Weight: ${displayWeight}, Size: ${labelSize}${dateInfo}`);
      
      // Reset after print
      setWeight("");
      setIsWeightLocked(false);
      setSelectedWasteId(null);
      
      // Show success feedback (in real app, this would be a toast)
      alert(`标签打印成功！\n废物类型: ${selectedWasteType}\n重量: ${displayWeight}\n尺寸: ${labelSize} mm${dateInfo}`);
    }
  };

  // Render different content based on active tab
  const renderMainContent = () => {
    switch (activeTab) {
      case "collection":
        return (
          <div className="flex flex-1 overflow-hidden">
            {/* 左列 - 模式选择 + 危废种类列表 (30%) */}
            <div className="w-[30%] flex flex-col overflow-hidden bg-card/30">
              {/* 模式选择区域 */}
              <div className="flex-shrink-0 px-5 py-4 border-b border-border">
                <div className="flex flex-col gap-3">
                  {/* Mode Toggle */}
                  <div className="flex bg-muted rounded-xl p-1">
                    <button
                      onClick={() => setEntryMode("normal")}
                      className={`
                        flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                        ${entryMode === "normal" 
                          ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30 transform scale-[1.02]' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }
                      `}
                    >
                      <span>正常录入</span>
                    </button>
                    <button
                      onClick={() => setEntryMode("backfill")}
                      className={`
                        flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                        ${entryMode === "backfill" 
                          ? 'bg-warning-red text-white shadow-lg shadow-warning-red/30 transform scale-[1.02]' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }
                      `}
                    >
                      <span>补录</span>
                    </button>
                  </div>

                  {/* Mode Description */}
                  <div className="text-xs text-muted-foreground px-1">
                    {entryMode === "normal" 
                      ? "实时录入危废标签数据" 
                      : "补录历史日期的危废标签数据"
                    }
                  </div>
                </div>
              </div>

              {/* 危废种类列表 */}
              <div className="flex-1 p-5 overflow-hidden">
                <WasteTypeList
                  wasteTypes={wasteTypes}
                  selectedId={selectedWasteId}
                  sortMode={sortMode}
                  onSelect={handleWasteSelect}
                  onSortModeChange={setSortMode}
                  onReorder={handleReorder}
                />
              </div>
            </div>
            
            {/* 右列 - 重量操作区域 (70%) */}
            <div className="w-[70%] flex flex-col border-l-2 border-border overflow-hidden bg-background">
              
              {/* 顶部上下文栏 */}
              <div className="flex-shrink-0 p-6 pb-3">
                <ContextBar
                  companyName={companyName}
                  operatorName={operatorName}
                  dark={false} // 使用浅色模式
                  onCompanyClick={() => console.log('Company clicked')}
                  onOperatorClick={() => console.log('Operator clicked')}
                />
              </div>
              
              {/* 主要操作区域 */}
              <div className="flex-1 px-6 pb-6 overflow-hidden">
                <WeightOperationPanel
                  weight={weight}
                  weightUnit={weightUnit}
                  labelSize={labelSize}
                  isWeightLocked={isWeightLocked}
                  selectedWasteType={selectedWasteType}
                  selectedWasteData={selectedWasteData}
                  printerStatus={printerStatus}
                  scaleStatus={scaleStatus}
                  onWeightChange={handleWeightChange}
                  onWeightUnitChange={handleWeightUnitChange}
                  onLabelSizeChange={setLabelSize}
                  onWeightLockToggle={handleWeightLockToggle}
                  onPrint={handlePrint}
                  entryMode={entryMode}
                  selectedDate={entryMode === "backfill" ? selectedDate : undefined}
                  onDateChange={setSelectedDate}
                />
              </div>
            </div>
          </div>
        );

      case "statistics":
        return (
          <div className="flex-1 overflow-hidden">
            <HistoryAnalyticsTabPage />
          </div>
        );

      case "devices":
        return (
          <div className="flex-1 overflow-hidden">
            <DeviceManagementPage />
          </div>
        );

      case "profile":
        return (
          <div className="flex-1 overflow-hidden">
            <PersonalCenterPage />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* 顶部栏 - 固定高度 */}
      <div className="flex-shrink-0">
        <TopBar />
      </div>
      
      {/* 主内容区域 - 填充剩余空间 */}
      {renderMainContent()}
      
      {/* 底部导航栏 - 固定高度 */}
      <div className="flex-shrink-0 border-t border-border relative z-50">
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}