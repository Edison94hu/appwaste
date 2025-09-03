import { useState } from "react";
import { 
  QrCode,
  ScanLine,
  Package,
  TruckIcon,
  Trash,
  FileText,
  Calendar,
  Weight,
  Scan,
  AlertTriangle,
  Clock,
  Building,
  Trash2,
  X,
  CheckCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// 扫描到的危废物品数据接口
interface ScannedWasteItem {
  id: string;
  qrCode: string;
  wasteName: string;
  wasteCategory: string;
  weight: string;
  unit: string;
  scanTime: string;
  facilityCode: string;
}

export function DeviceManagementPage() {
  // 已扫描的危废物品列表
  const [scannedItems, setScannedItems] = useState<ScannedWasteItem[]>([
    {
      id: "1",
      qrCode: "DW001-20241203-001",
      wasteName: "废矿物油与含矿物油废物",
      wasteCategory: "HW08",
      weight: "25.60",
      unit: "KG",
      scanTime: "14:23:15",
      facilityCode: "HZ001"
    },
    {
      id: "2", 
      qrCode: "DW002-20241203-002",
      wasteName: "废酸",
      wasteCategory: "HW34",
      weight: "12.30",
      unit: "KG",
      scanTime: "14:21:42",
      facilityCode: "HZ001"
    }
  ]);

  // 界面状态
  const [isScanning, setIsScanning] = useState(false);
  const [manualInputMode, setManualInputMode] = useState(false);
  const [manualQrCode, setManualQrCode] = useState("");
  const [scanningEnabled, setScanningEnabled] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // 模拟二维码扫描
  const handleQrScan = (qrCode: string) => {
    // 检查重复扫描
    const isDuplicate = scannedItems.some(item => item.qrCode === qrCode);
    if (isDuplicate) {
      alert("⚠️ 警告：该二维码已经扫描过了！");
      return;
    }

    // 模拟从二维码获取危废信息
    const wasteCategories = ["HW08", "HW34", "HW35", "HW06", "HW22"];
    const wasteNames = [
      "废矿物油与含矿物油废物",
      "废酸",
      "废碱", 
      "废有机溶剂与含有机溶剂废物",
      "含重金属废物"
    ];
    
    const randomCategory = wasteCategories[Math.floor(Math.random() * wasteCategories.length)];
    const randomName = wasteNames[Math.floor(Math.random() * wasteNames.length)];

    const mockWasteData = {
      qrCode,
      wasteName: randomName,
      wasteCategory: randomCategory, 
      weight: (Math.random() * 50 + 5).toFixed(2),
      unit: "KG",
      scanTime: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
      facilityCode: "HZ001"
    };

    const newItem: ScannedWasteItem = {
      id: Date.now().toString(),
      ...mockWasteData
    };

    setScannedItems(prev => [newItem, ...prev]);
    
    // 模拟震动反馈（在真实设备上有效）
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    
    console.log("✅ 扫描成功:", qrCode);
    
    // 显示扫描成功反馈
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1000);
  };

  // 手动输入二维码
  const handleManualInput = () => {
    if (manualQrCode.trim()) {
      handleQrScan(manualQrCode.trim());
      setManualQrCode("");
      setManualInputMode(false);
    }
  };

  // 删除单个物品
  const handleDeleteItem = (id: string) => {
    setScannedItems(prev => prev.filter(item => item.id !== id));
  };

  // 清空所有物品
  const handleClearAll = () => {
    if (confirm("⚠️ 确定要清空所有已扫描的物品吗？")) {
      setScannedItems([]);
    }
  };

  // 批量出库操作
  const handleBatchOutbound = () => {
    if (scannedItems.length === 0) {
      alert("❌ 请先扫描需要出库的危废物品");
      return;
    }
    setShowConfirmDialog(true);
  };

  // 确认出库
  const confirmOutbound = () => {
    console.log("🚚 批量出库操作:", scannedItems);
    
    // 模拟出库成功
    alert(`✅ 转移出库操作成功！\n\n📦 共处理 ${scannedItems.length} 项物品\n⚖️ 总重量：${getTotalWeight()} KG\n🏭 操作人员：张操作员\n⏰ 操作时间：${new Date().toLocaleString('zh-CN')}`);
    
    setScannedItems([]);
    setShowConfirmDialog(false);
  };

  // 计算总重量
  const getTotalWeight = () => {
    return scannedItems.reduce((total, item) => total + parseFloat(item.weight), 0).toFixed(2);
  };

  // 获取危废类别颜色
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "HW08": "text-warning-red bg-warning-red/10 border-warning-red/20",
      "HW34": "text-orange-600 bg-orange-100 border-orange-200", 
      "HW35": "text-purple-600 bg-purple-100 border-purple-200",
      "HW06": "text-blue-600 bg-blue-100 border-blue-200",
      "HW22": "text-green-600 bg-green-100 border-green-200"
    };
    return colors[category] || "text-neutral-gray bg-muted border-border";
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Page Header */}
      <div className="flex-shrink-0 bg-muted/20 border-b border-border/30 px-8 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-industrial-blue/10 to-safety-green/10 flex items-center justify-center">
              <TruckIcon className="w-6 h-6 text-industrial-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-foreground">危废转移出库</h1>
              <p className="text-muted-foreground text-sm">扫描二维码识别危废物品并批量出库</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 左右分割布局 */}
      <div className="flex-1 overflow-hidden p-8">
        <div className="h-full flex gap-8">
          
          {/* 左侧扫描区域 (40%) */}
          <div className="w-[40%] bg-secondary/40 rounded-3xl p-8 flex flex-col">
            {/* 扫描区域标题 */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-industrial-blue/10 to-safety-green/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <QrCode className="w-10 h-10 text-industrial-blue" />
              </div>
              <h2 className="text-2xl font-medium text-foreground mb-2">扫描二维码</h2>
              <p className="text-muted-foreground">将危废物品二维码对准扫描框</p>
            </div>

            {/* 相机预览区域 */}
            <div className="flex-1 bg-card/60 rounded-2xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center relative mb-6">
              {/* 扫描框指示 */}
              <div className="relative w-48 h-48 mb-6">
                <div className="w-full h-full border-4 border-industrial-blue rounded-2xl relative overflow-hidden bg-slate-50">
                  {/* 十字准线 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <ScanLine className="w-16 h-16 text-industrial-blue animate-pulse" />
                      {/* 扫描动画线 */}
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-safety-green to-transparent ${
                        scanningEnabled ? 'animate-pulse' : ''
                      }`}></div>
                    </div>
                  </div>
                  
                  {/* 四个角的指示框 */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-industrial-blue"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-industrial-blue"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-industrial-blue"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-industrial-blue"></div>
                </div>
                
                {/* 扫描状态指示 */}
                {scanningEnabled && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-safety-green/10 text-safety-green rounded-full">
                      <div className="w-2 h-2 bg-safety-green rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">
                        {isScanning ? "识别中..." : "扫描中..."}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-center text-muted-foreground">
                <p className="text-sm mb-2">将二维码对准扫描框进行识别</p>
                <p className="text-xs">确保二维码清晰可见且光线充足</p>
              </div>
            </div>

            {/* 手动输入区域 */}
            <div className="space-y-4">
              {!manualInputMode ? (
                <Button
                  onClick={() => setManualInputMode(true)}
                  variant="outline"
                  className="w-full h-12 border-industrial-blue/30 text-industrial-blue hover:bg-industrial-blue/10"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  手动输入二维码
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={manualQrCode}
                      onChange={(e) => setManualQrCode(e.target.value)}
                      placeholder="输入二维码内容"
                      className="flex-1 h-12"
                      onKeyPress={(e) => e.key === 'Enter' && handleManualInput()}
                    />
                    <Button
                      onClick={handleManualInput}
                      disabled={!manualQrCode.trim()}
                      className="h-12 px-6 bg-industrial-blue hover:bg-industrial-blue-dark text-white"
                    >
                      确认
                    </Button>
                  </div>
                  <Button
                    onClick={() => {
                      setManualInputMode(false);
                      setManualQrCode("");
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    取消
                  </Button>
                </div>
              )}
              
              {/* 模拟扫描按钮 */}
              <Button
                onClick={() => handleQrScan(`DW${Date.now().toString().slice(-6)}-${new Date().toISOString().split('T')[0]}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`)}
                className="w-full h-12 bg-safety-green hover:bg-safety-green/90 text-white"
              >
                <Scan className="w-5 h-5 mr-2" />
                模拟扫描（测试用）
              </Button>
            </div>
          </div>

          {/* 右侧数据展示区域 (60%) */}
          <div className="w-[60%] bg-secondary/40 rounded-3xl p-8 flex flex-col">

            {/* 标题区域 */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-foreground">危废物品清单</h3>
              <div className="flex items-center gap-3">
                {scannedItems.length > 0 && (
                  <Button
                    onClick={handleClearAll}
                    variant="outline"
                    size="sm"
                    className="border-warning-red/30 text-warning-red hover:bg-warning-red/10"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    清空列表
                  </Button>
                )}
                <div className="flex items-center gap-2 px-3 py-1 bg-muted/60 text-muted-foreground rounded-full text-sm">
                  <Clock className="w-4 h-4" />
                  <span>实时更新</span>
                </div>
              </div>
            </div>

            {/* 危废物品列表 */}
            <div className="flex-1 overflow-auto space-y-3 mb-8">
              {scannedItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center text-muted-foreground h-full min-h-[300px]">
                  <div>
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg mb-2">暂无扫描物品</p>
                    <p className="text-sm">请使用左侧扫描区域扫描危废物品二维码</p>
                  </div>
                </div>
              ) : (
                scannedItems.map((item) => (
                  <div key={item.id} className="bg-card rounded-xl p-4 border border-border/30 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-3">
                          <h4 className="font-medium text-foreground mb-1">{item.wasteName}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.wasteCategory)}`}>
                              {item.wasteCategory}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">{item.qrCode}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Weight className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{item.weight} {item.unit}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{item.scanTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span>{item.facilityCode}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleDeleteItem(item.id)}
                        variant="outline"
                        size="sm"
                        className="ml-4 border-warning-red/30 text-warning-red hover:bg-warning-red/10 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 重要统计信息卡片 - 移到列表下方 */}
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-r from-industrial-blue/10 via-safety-green/10 to-warning-red/10 
                            rounded-2xl p-6 border-2 border-industrial-blue/20 shadow-lg relative overflow-hidden">
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-industrial-blue/5 to-transparent 
                              rounded-full -mr-16 -mt-16"></div>
                
                {/* 顶部标题和重要性提示 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-industrial-blue to-safety-green 
                                  flex items-center justify-center shadow-lg">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">出库统计信息</h3>
                      <p className="text-sm text-warning-red font-medium">⚠️ 请仔细核对以下数据</p>
                    </div>
                  </div>
                </div>
                
                {/* 主要统计数据 - 大字体高亮显示 */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* 物品数量 */}
                  <div className="bg-card/80 rounded-xl p-5 border border-border/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-industrial-blue/10 flex items-center justify-center">
                        <Package className="w-4 h-4 text-industrial-blue" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">危废物品数量</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-industrial-blue">{scannedItems.length}</span>
                      <span className="text-lg font-medium text-muted-foreground">项</span>
                    </div>
                    {scannedItems.length > 0 && (
                      <div className="mt-2 text-xs text-safety-green font-medium">
                        ✓ 已扫描确认
                      </div>
                    )}
                  </div>
                  
                  {/* 总重量 */}
                  <div className="bg-card/80 rounded-xl p-5 border border-border/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-safety-green/10 flex items-center justify-center">
                        <Weight className="w-4 h-4 text-safety-green" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">危废总重量</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-safety-green">{getTotalWeight()}</span>
                      <span className="text-lg font-medium text-muted-foreground">KG</span>
                    </div>
                    {parseFloat(getTotalWeight()) > 0 && (
                      <div className="mt-2 text-xs text-warning-red font-medium">
                        ⚠️ 请确认重量准确
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 额外提醒信息 */}
                {scannedItems.length > 0 && (
                  <div className="mb-6 p-4 bg-warning-red/5 border border-warning-red/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-warning-red mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-warning-red text-sm mb-1">
                          出库前最后确认
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          上述统计信息将作为危废转移出库的正式记录，请务必确认所有扫描的危废物品信息准确无误。
                          一旦确认出库，该记录将无法修改。
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 合并出库按钮 - 集成到统计信息组件底部 */}
                <div className="flex items-center justify-between p-4 bg-card/60 rounded-xl border border-border/30">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>已选择 {scannedItems.length} 项</span>
                    {scannedItems.length > 0 && (
                      <>
                        <span>•</span>
                        <span>总重量 {getTotalWeight()} KG</span>
                      </>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleBatchOutbound}
                    disabled={scannedItems.length === 0}
                    className="h-12 px-8 bg-safety-green hover:bg-safety-green/90 text-white shadow-md 
                             hover:shadow-safety-green/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <TruckIcon className="w-5 h-5 mr-2" />
                    合并出库
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 确认出库对话框 */}
      {showConfirmDialog && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-border">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-warning-red/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-warning-red" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">确认转移出库</h3>
              <p className="text-sm text-muted-foreground">请确认以下信息无误后继续操作</p>
            </div>
            
            <div className="space-y-3 mb-6 bg-muted/20 rounded-xl p-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">物品数量：</span>
                <span className="text-sm font-medium">{scannedItems.length} 项</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">总重量：</span>
                <span className="text-sm font-medium">{getTotalWeight()} KG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">操作时间：</span>
                <span className="text-sm font-medium">{new Date().toLocaleString('zh-CN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">操作人员：</span>
                <span className="text-sm font-medium">张操作员</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => setShowConfirmDialog(false)}
                variant="outline"
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                取消
              </Button>
              <Button
                onClick={confirmOutbound}
                className="flex-1 bg-safety-green hover:bg-safety-green/90 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                确认出库
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}