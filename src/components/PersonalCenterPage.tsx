import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  User,
  Edit,
  UserPlus,
  Shield,
  HelpCircle,
  ChevronRight,
  Save,
  Eye,
  EyeOff,
  Globe,
  MessageCircle,
  Phone,
  Settings,
  Lock,
  Smartphone,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Upload,
  Clock,
  IdCard,
  Building,
  Camera,
  CloudUpload,
  Timer,
  RefreshCw,
  X,
  AlertTriangle,
  Tablet,
  Wifi,
  Radio,
  Scale,
  Bluetooth,
  Printer,
  Battery,
  HardDrive,
  Power,
  Signal
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type PersonalCenterTab = "basicInfo" | "wasteInfo" | "subAccounts" | "deviceManagement" | "settings";

interface SubAccount {
  id: string;
  username: string;
  role: "管理员" | "操作员" | "查看者";
  status: "启用" | "停用";
  lastLogin: string;
  email?: string;
  permissions?: string[];
}

interface WasteInfoRecord {
  id: string;
  wasteId: string;
  facilityCode: string;
  wasteName: string;
  wasteCategory: string;
  wasteCode: string;
  wasteForm: string;
  mainComponents: string;
  harmfulComponents: string;
  precautions: string;
  hazardousProperties: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive";
}

interface WasteInfoForm {
  wasteId: string;
  facilityCode: string;
  wasteName: string;
  wasteCategory: string;
  wasteCode: string;
  wasteForm: string;
  mainComponents: string;
  harmfulComponents: string;
  precautions: string;
  hazardousProperties: string;
}

export function PersonalCenterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 根据URL路径确定活跃的标签页
  const getActiveTabFromPath = (): PersonalCenterTab => {
    const path = location.pathname;
    if (path.includes('/profile/waste')) return 'wasteInfo';
    if (path.includes('/profile/accounts')) return 'subAccounts';
    if (path.includes('/profile/devices')) return 'deviceManagement';
    if (path.includes('/profile/settings')) return 'settings';
    return 'basicInfo';
  };

  const [activeTab, setActiveTab] = useState<PersonalCenterTab>(getActiveTabFromPath());

  // 监听路径变化并更新活跃标签页
  useEffect(() => {
    const newTab = getActiveTabFromPath();
    setActiveTab(newTab);
  }, [location.pathname]);

  // 修改标签页切换函数以支持路由
  const handleTabChange = (tab: PersonalCenterTab) => {
    setActiveTab(tab);
    // 根据标签页导航到对应的URL
    const routeMap = {
      basicInfo: '/profile/basic',
      wasteInfo: '/profile/waste',
      subAccounts: '/profile/accounts',
      deviceManagement: '/profile/devices',
      settings: '/profile/settings'
    };
    navigate(routeMap[tab]);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Waste info management state
  const [wasteInfoRecords, setWasteInfoRecords] = useState<WasteInfoRecord[]>([
    {
      id: "1",
      wasteId: "DW001",
      facilityCode: "HZ001",
      wasteName: "废矿物油与含矿物油废物",
      wasteCategory: "HW08",
      wasteCode: "900-041-49",
      wasteForm: "液态",
      mainComponents: "矿物油、润滑油",
      harmfulComponents: "多环芳烃、重金属",
      precautions: "远离火源、密闭储存",
      hazardousProperties: "易燃、有毒",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      status: "active"
    },
    {
      id: "2",
      wasteId: "DW002",
      facilityCode: "HZ001",
      wasteName: "废酸",
      wasteCategory: "HW34",
      wasteCode: "900-300-34",
      wasteForm: "液态",
      mainComponents: "硫酸、盐酸",
      harmfulComponents: "强酸性物质",
      precautions: "防止泄漏、穿戴防护用品",
      hazardousProperties: "腐蚀性、刺激性",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      status: "active"
    },
    {
      id: "3",
      wasteId: "DW003",
      facilityCode: "HZ001",
      wasteName: "废碱",
      wasteCategory: "HW35",
      wasteCode: "900-352-35",
      wasteForm: "液态",
      mainComponents: "氢氧化钠、氢氧化钾",
      harmfulComponents: "强碱性物质",
      precautions: "避免接触皮肤、密闭储存",
      hazardousProperties: "腐蚀性、刺激性",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-19",
      status: "active"
    }
  ]);

  const [selectedWasteRecord, setSelectedWasteRecord] = useState<WasteInfoRecord | null>(null);
  const [showWasteForm, setShowWasteForm] = useState(false);
  const [wasteFormData, setWasteFormData] = useState<WasteInfoForm>({
    wasteId: "",
    facilityCode: "",
    wasteName: "",
    wasteCategory: "",
    wasteCode: "",
    wasteForm: "",
    mainComponents: "",
    harmfulComponents: "",
    precautions: "",
    hazardousProperties: ""
  });

  // Device management state
  const [deviceInfo] = useState({
    model: "iPad Pro 12.9-inch (6th generation)",
    systemVersion: "iPadOS 17.4.1",
    storage: "512 GB",
    batteryLevel: 85,
    serialNumber: "DMQK2LL/A"
  });

  const [networkInfo] = useState({
    isConnected: true,
    ssid: "Factory-WiFi-5G",
    ipAddress: "192.168.1.156",
    signalStrength: 4, // 0-4 scale
    speed: "867 Mbps"
  });

  const [cellularInfo] = useState({
    carrier: "中国移动",
    networkType: "5G",
    signalStrength: 3, // 0-4 scale
    simStatus: "已激活",
    dataUsage: "2.3 GB"
  });

  const [connectedDevices] = useState([
    {
      id: "scale",
      name: "蓝牙称重机",
      model: "XK3190-A12+E",
      status: "connected" as const,
      batteryLevel: 78,
      lastConnect: "2分钟前"
    },
    {
      id: "printer",
      name: "标签打印机",
      model: "TSC TTP-244 Pro",
      status: "disconnected" as const,
      batteryLevel: null,
      lastConnect: "1小时前"
    }
  ]);

  const [deviceIsRefreshing, setDeviceIsRefreshing] = useState(false);

  // Sub accounts management state
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([
    {
      id: "1",
      username: "zhang_operator",
      role: "操作员",
      status: "启用",
      lastLogin: "2024-01-20 14:30",
      email: "zhang.operator@company.com",
      permissions: ["数据采集", "标签打印", "查看历史"]
    },
    {
      id: "2",
      username: "li_admin",
      role: "管理员",
      status: "启用",
      lastLogin: "2024-01-20 09:15",
      email: "li.admin@company.com",
      permissions: ["数据采集", "标签打印", "查看历史", "用户管理", "系统设置"]
    },
    {
      id: "3",
      username: "wang_viewer",
      role: "查看者",
      status: "停用",
      lastLogin: "2024-01-18 16:22",
      email: "wang.viewer@company.com",
      permissions: ["查看历史"]
    }
  ]);

  const [selectedSubAccount, setSelectedSubAccount] = useState<SubAccount | null>(null);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountFormData, setAccountFormData] = useState({
    username: "",
    role: "操作员" as SubAccount["role"],
    email: "",
    password: "",
    confirmPassword: "",
    permissions: [] as string[]
  });

  // User info state
  const [userInfo, setUserInfo] = useState({
    name: "张工程师",
    role: "系统管理员",
    phone: "138****8888",
    email: "zhang.engineer@company.com",
    company: "华东化工集团有限公司",
    avatar: "/api/placeholder/128/128"
  });

  // Company info state
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "华东化工集团有限公司",
    socialCreditCode: "91310000123456789X",
    pollutionPermitNumber: "91310000123456789X001P",
    address: "上海市浦东新区张江高科技园区",
    contactPerson: "李总经理",
    contactPhone: "021-58888888",
    apiToken: "sk-proj-1234567890abcdef...",
    companyLogo: "/api/placeholder/200/200"
  });

  // Basic info editing state
  const [basicInfoForm, setBasicInfoForm] = useState({
    name: userInfo.name,
    phone: userInfo.phone,
    email: userInfo.email,
    companyName: companyInfo.companyName,
    socialCreditCode: companyInfo.socialCreditCode,
    pollutionPermitNumber: companyInfo.pollutionPermitNumber,
    address: companyInfo.address,
    contactPerson: companyInfo.contactPerson,
    contactPhone: companyInfo.contactPhone,
    apiToken: companyInfo.apiToken,
    companyLogo: companyInfo.companyLogo
  });

  // Edit mode states for each card
  const [editModes, setEditModes] = useState({
    personalInfo: false,
    companyInfo: false,
    apiConfig: false,
    security: false
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });



  // Data upload settings state
  const [dataUploadSettings, setDataUploadSettings] = useState({
    uploadMode: "realtime", // "realtime", "scheduled", "manual"
    uploadInterval: "1", // hours for scheduled mode
    lastUpload: "2024-03-15 14:30:25",
    autoBackup: true,
    province: "zhejiang" // Added province selection
  });

  // Province API configurations
  const provinceConfigs = {
    zhejiang: {
      name: "浙江省",
      apiEndpoint: "https://api.zj.gov.cn/waste",
      uploadMethod: "POST",
      dataFormat: "JSON",
      description: "浙江省生态环��厅数据上报接口"
    },
    jiangsu: {
      name: "江苏省", 
      apiEndpoint: "https://api.js.gov.cn/waste",
      uploadMethod: "POST",
      dataFormat: "XML",
      description: "江苏省生态环境厅数据上报接口"
    },
    shanghai: {
      name: "上海市",
      apiEndpoint: "https://api.sh.gov.cn/waste",
      uploadMethod: "PUT",
      dataFormat: "JSON",
      description: "上海市生态环境局数据上报接口"
    },
    guangdong: {
      name: "广东省",
      apiEndpoint: "https://api.gd.gov.cn/waste", 
      uploadMethod: "POST",
      dataFormat: "Form-Data",
      description: "广东省生态环境厅数据上报接口"
    },
    beijing: {
      name: "北京市",
      apiEndpoint: "https://api.bj.gov.cn/waste",
      uploadMethod: "POST", 
      dataFormat: "JSON",
      description: "北京市生态环境局数据上报接口"
    }
  };

  const tabs = [
    { id: "basicInfo", label: "基础信息", icon: IdCard },
    { id: "wasteInfo", label: "危废信息录入", icon: AlertTriangle },
    { id: "subAccounts", label: "管理子账户", icon: User },
    { id: "deviceManagement", label: "设备管理", icon: Settings },
    { id: "settings", label: "系统设置", icon: Shield }
  ];



  // Basic info functions
  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfoForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveBasicInfo = () => {
    // Update user info
    setUserInfo(prev => ({
      ...prev,
      name: basicInfoForm.name,
      phone: basicInfoForm.phone,
      email: basicInfoForm.email
    }));

    // Update company info
    setCompanyInfo(prev => ({
      ...prev,
      companyName: basicInfoForm.companyName,
      socialCreditCode: basicInfoForm.socialCreditCode,
      pollutionPermitNumber: basicInfoForm.pollutionPermitNumber,
      address: basicInfoForm.address,
      contactPerson: basicInfoForm.contactPerson,
      contactPhone: basicInfoForm.contactPhone,
      apiToken: basicInfoForm.apiToken,
      companyLogo: basicInfoForm.companyLogo
    }));

    alert("基础信息已成功更新");
  };

  const handleAvatarChange = () => {
    // In real implementation, this would open a file picker
    alert("头像更换功能：请选择新的头像图片");
  };

  const handleCompanyLogoChange = () => {
    // In real implementation, this would open a file picker
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In real implementation, upload file and get URL
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          handleBasicInfoChange("companyLogo", imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Data upload functions  
  const handleDataUploadChange = (field: string, value: string) => {
    setDataUploadSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleProvinceChange = (province: string) => {
    setDataUploadSettings(prev => ({ ...prev, province }));
  };

  // Edit mode toggle functions
  const toggleEditMode = (cardType: keyof typeof editModes) => {
    setEditModes(prev => ({ ...prev, [cardType]: !prev[cardType] }));
  };

  const [showApiToken, setShowApiToken] = useState(false);

  const handleManualUpload = () => {
    // Simulate manual upload
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const formattedTime = timeString.replace(/\//g, '-');
    
    setDataUploadSettings(prev => ({ 
      ...prev, 
      lastUpload: formattedTime
    }));
    alert("数据上报成功！");
  };

  // Security settings functions
  const handleSaveSecurity = () => {
    // Validate passwords
    if (!securitySettings.currentPassword || !securitySettings.newPassword || !securitySettings.confirmPassword) {
      alert("请填写所有密码字段");
      return;
    }
    
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert("新密码确认不匹配");
      return;
    }
    
    // Reset form and exit edit mode
    setSecuritySettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setEditModes(prev => ({ ...prev, security: false }));
    alert("密码更新成功！");
  };

  // Waste info management functions
  const handleWasteFormChange = (field: keyof WasteInfoForm, value: string) => {
    setWasteFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveWasteInfo = () => {
    if (selectedWasteRecord) {
      // Edit existing record
      setWasteInfoRecords(prev => prev.map(record => 
        record.id === selectedWasteRecord.id 
          ? { ...record, ...wasteFormData, updatedAt: new Date().toISOString().split('T')[0] }
          : record
      ));
      alert("危废信息更新成功！");
    } else {
      // Add new record
      const newRecord: WasteInfoRecord = {
        id: Date.now().toString(),
        ...wasteFormData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        status: "active"
      };
      setWasteInfoRecords(prev => [...prev, newRecord]);
      alert("危废信息添加成功！");
    }
    
    setShowWasteForm(false);
    setSelectedWasteRecord(null);
    setWasteFormData({
      wasteId: "",
      facilityCode: "",
      wasteName: "",
      wasteCategory: "",
      wasteCode: "",
      wasteForm: "",
      mainComponents: "",
      harmfulComponents: "",
      precautions: "",
      hazardousProperties: ""
    });
  };

  const handleEditWasteInfo = (record: WasteInfoRecord) => {
    setSelectedWasteRecord(record);
    setWasteFormData({
      wasteId: record.wasteId,
      facilityCode: record.facilityCode,
      wasteName: record.wasteName,
      wasteCategory: record.wasteCategory,
      wasteCode: record.wasteCode,
      wasteForm: record.wasteForm,
      mainComponents: record.mainComponents,
      harmfulComponents: record.harmfulComponents,
      precautions: record.precautions,
      hazardousProperties: record.hazardousProperties
    });
    setShowWasteForm(true);
  };

  const handleDeleteWasteInfo = (id: string) => {
    if (confirm("确定要删除这条危废信息吗？")) {
      setWasteInfoRecords(prev => prev.filter(record => record.id !== id));
      alert("危废信息删除成功！");
    }
  };

  const handleCancelWasteForm = () => {
    setShowWasteForm(false);
    setSelectedWasteRecord(null);
    setWasteFormData({
      wasteId: "",
      facilityCode: "",
      wasteName: "",
      wasteCategory: "",
      wasteCode: "",
      wasteForm: "",
      mainComponents: "",
      harmfulComponents: "",
      precautions: "",
      hazardousProperties: ""
    });
  };

  // Device management functions
  const handleDeviceRefresh = async () => {
    setDeviceIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setDeviceIsRefreshing(false);
    }, 2000);
  };

  const getBatteryColor = (level: number) => {
    if (level >= 80) return "text-safety-green";
    if (level >= 50) return "text-orange-500";
    if (level >= 20) return "text-orange-400";
    return "text-orange-300";
  };

  // Sub accounts management functions
  const handleAccountFormChange = (field: string, value: string | string[]) => {
    setAccountFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAccount = () => {
    if (selectedSubAccount) {
      // Edit existing account
      setSubAccounts(prev => prev.map(account => 
        account.id === selectedSubAccount.id 
          ? { ...account, username: accountFormData.username, role: accountFormData.role, email: accountFormData.email, permissions: accountFormData.permissions }
          : account
      ));
      alert("账户信息更新成功！");
    } else {
      // Add new account
      const newAccount: SubAccount = {
        id: Date.now().toString(),
        username: accountFormData.username,
        role: accountFormData.role,
        status: "启用",
        lastLogin: "未登录",
        email: accountFormData.email,
        permissions: accountFormData.permissions
      };
      setSubAccounts(prev => [...prev, newAccount]);
      alert("账户创建成功！");
    }
    
    setShowAccountForm(false);
    setSelectedSubAccount(null);
    setAccountFormData({
      username: "",
      role: "操作员",
      email: "",
      password: "",
      confirmPassword: "",
      permissions: []
    });
  };

  const handleEditAccount = (account: SubAccount) => {
    setSelectedSubAccount(account);
    setAccountFormData({
      username: account.username,
      role: account.role,
      email: account.email || "",
      password: "",
      confirmPassword: "",
      permissions: account.permissions || []
    });
    setShowAccountForm(true);
  };

  const handleToggleAccountStatus = (id: string) => {
    setSubAccounts(prev => prev.map(account => 
      account.id === id 
        ? { ...account, status: account.status === "启用" ? "停用" : "启用" }
        : account
    ));
  };

  const handleDeleteAccount = (id: string) => {
    if (confirm("确定要删除这个账户吗？")) {
      setSubAccounts(prev => prev.filter(account => account.id !== id));
      alert("账户删除成功！");
    }
  };

  // Device Management Tab
  const renderDeviceManagementTab = () => (
    <div className="h-full overflow-hidden p-8">
      <div className="h-full flex gap-8">
        
        {/* 左列：iPad 设备信息 */}
        <div className="w-[350px] bg-secondary/40 rounded-3xl p-8 flex flex-col">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Tablet className="w-10 h-10 text-slate-600" />
            </div>
            <h2 className="text-2xl font-medium text-foreground mb-2">iPad Pro 12.9"</h2>
            <p className="text-muted-foreground">{deviceInfo.systemVersion}</p>
          </div>

          {/* 设备状态网格 */}
          <div className="space-y-6 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card/60 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-industrial-blue/10 flex items-center justify-center mx-auto mb-3">
                  <HardDrive className="w-6 h-6 text-industrial-blue" />
                </div>
                <div className="font-medium text-foreground mb-1">{deviceInfo.storage}</div>
                <div className="text-sm text-muted-foreground">存储容量</div>
              </div>
              
              <div className="text-center p-4 bg-card/60 rounded-xl">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                  deviceInfo.batteryLevel >= 80 ? 'bg-safety-green/10' : 
                  deviceInfo.batteryLevel >= 50 ? 'bg-orange-100' : 'bg-warning-red/10'
                }`}>
                  <Battery className={`w-6 h-6 ${getBatteryColor(deviceInfo.batteryLevel)}`} />
                </div>
                <div className={`font-medium mb-1 ${getBatteryColor(deviceInfo.batteryLevel)}`}>
                  {deviceInfo.batteryLevel}%
                </div>
                <div className="text-sm text-muted-foreground">电池电量</div>
              </div>
            </div>

            {/* 详细信息 */}
            <div className="space-y-4 p-4 bg-card/30 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">设备型号</span>
                <span className="text-sm font-medium">iPad Pro 12.9"</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">系统版本</span>
                <span className="text-sm font-medium">{deviceInfo.systemVersion}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">序列号</span>
                <span className="text-xs font-mono text-foreground">{deviceInfo.serialNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">运行状态</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-safety-green rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-safety-green">正常</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中列：网络连接状态 */}
        <div className="w-[350px] flex flex-col gap-6">
          
          {/* Wi-Fi 网络 */}
          <div className="bg-secondary/40 rounded-3xl p-8 flex-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-safety-green via-safety-green to-transparent rounded-t-3xl"></div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-safety-green/10 flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-safety-green" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Wi-Fi 网络</h3>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-safety-green rounded-full animate-pulse"></div>
                <span className="text-sm text-safety-green font-medium">已连接</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">网络名称</span>
                <span className="text-sm font-medium">{networkInfo.ssid}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">连接速度</span>
                <span className="text-sm font-medium">{networkInfo.speed}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">IP 地址</span>
                <span className="text-xs font-mono text-foreground">{networkInfo.ipAddress}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">信号强度</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map((level) => (
                      <div
                        key={level}
                        className={`w-1 h-4 rounded-full ${
                          level <= networkInfo.signalStrength ? 'bg-safety-green' : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{networkInfo.signalStrength}/4</span>
                </div>
              </div>
            </div>
          </div>

          {/* 蜂窝网络 */}
          <div className="bg-secondary/40 rounded-3xl p-8 flex-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-industrial-blue via-industrial-blue to-transparent"></div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-industrial-blue/10 flex items-center justify-center mx-auto mb-4">
                <Radio className="w-8 h-8 text-industrial-blue" />
              </div>
              <h3 className="font-medium text-foreground mb-2">蜂窝网络</h3>
              <div className="inline-flex items-center px-3 py-1 bg-industrial-blue/10 text-industrial-blue rounded-full text-sm font-medium">
                {cellularInfo.networkType}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">运营商</span>
                <span className="text-sm font-medium">{cellularInfo.carrier}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">SIM 状态</span>
                <span className="text-sm font-medium">{cellularInfo.simStatus}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">数据使用</span>
                <span className="text-sm font-medium">{cellularInfo.dataUsage}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">信号强度</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map((level) => (
                      <div
                        key={level}
                        className={`w-1 h-4 rounded-full ${
                          level <= cellularInfo.signalStrength ? 'bg-industrial-blue' : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{cellularInfo.signalStrength}/4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右列：蓝牙设备管理 */}
        <div className="flex-1 bg-secondary/40 rounded-3xl p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-industrial-blue/10 flex items-center justify-center">
                <Bluetooth className="w-8 h-8 text-industrial-blue" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-foreground">蓝牙设备</h3>
                <p className="text-sm text-muted-foreground">外设连接管理</p>
              </div>
            </div>
            <Button
              onClick={handleDeviceRefresh}
              disabled={deviceIsRefreshing}
              className="bg-industrial-blue hover:bg-industrial-blue-dark text-white shadow-md 
                       hover:shadow-industrial-blue/20 transition-all duration-200"
            >
              <Search className={`w-4 h-4 mr-2 ${deviceIsRefreshing ? 'animate-spin' : ''}`} />
              扫描设备
            </Button>
          </div>
          
          <div className="flex-1 space-y-4 overflow-auto">
            {connectedDevices.map((device, index) => (
              <div key={device.id} className={`bg-card/60 rounded-2xl p-6 border border-border/20 ${
                index === 0 ? 'ring-2 ring-safety-green/20' : ''
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                      {device.id === "scale" ? (
                        <Scale className="w-7 h-7 text-slate-600" />
                      ) : (
                        <Printer className="w-7 h-7 text-slate-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-foreground">{device.name}</h4>
                        {device.status === "connected" ? (
                          <div className="flex items-center gap-1 px-2 py-1 bg-safety-green/10 text-safety-green rounded-full">
                            <div className="w-2 h-2 bg-safety-green rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium">已连接</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-1 bg-warning-red/10 text-warning-red rounded-full">
                            <div className="w-2 h-2 bg-warning-red rounded-full"></div>
                            <span className="text-xs font-medium">未连接</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">型号: {device.model}</div>
                        <div className="text-sm text-muted-foreground">最后连接: {device.lastConnect}</div>
                        {device.batteryLevel && (
                          <div className="flex items-center gap-2 text-sm">
                            <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
                            <span className={`font-medium ${getBatteryColor(device.batteryLevel)}`}>
                              电量 {device.batteryLevel}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {device.status === "connected" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-warning-red/30 text-warning-red hover:bg-warning-red/10 hover:text-warning-red 
                                 hover:border-warning-red/50 h-10 px-4"
                      >
                        <Power className="w-4 h-4 mr-2" />
                        断开
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-industrial-blue hover:bg-industrial-blue-dark text-white shadow-md 
                                 hover:shadow-industrial-blue/20 transition-all duration-200 h-10 px-4"
                      >
                        <Bluetooth className="w-4 h-4 mr-2" />
                        连接
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );

  // Basic Info Tab
  const renderBasicInfoTab = () => (
    <div className="h-full overflow-auto p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-foreground mb-2">基础信息</h1>
          <p className="text-muted-foreground">管理个人账户与企业基础信息</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8">
          
          {/* Left Column - Personal Info */}
          <div className="bg-muted/20 rounded-xl p-6 border border-border/30 shadow-sm relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-industrial-blue/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-industrial-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">个人信息</h3>
                  <p className="text-xs text-muted-foreground">管理个人账户基础信息</p>
                </div>
              </div>
              <Button
                onClick={() => toggleEditMode('personalInfo')}
                variant="outline"
                size="sm"
                className="border-industrial-blue/30 text-industrial-blue hover:bg-industrial-blue/10"
              >
                <Edit className="w-4 h-4 mr-1" />
                {editModes.personalInfo ? '完成' : '编辑'}
              </Button>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="bg-industrial-blue text-white text-xl">
                    {userInfo.name.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-industrial-blue hover:bg-industrial-blue/80 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">点击相机图标更换头像</p>
            </div>

            {/* Personal Info Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">姓名</label>
                <Input
                  value={basicInfoForm.name}
                  onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                  placeholder="输入姓名"
                  disabled={!editModes.personalInfo}
                  className={`h-10 ${!editModes.personalInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">手机号码</label>
                <Input
                  value={basicInfoForm.phone}
                  onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
                  placeholder="输入手机号码"
                  disabled={!editModes.personalInfo}
                  className={`h-10 ${!editModes.personalInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">邮箱地址</label>
                <Input
                  type="email"
                  value={basicInfoForm.email}
                  onChange={(e) => handleBasicInfoChange("email", e.target.value)}
                  placeholder="输入邮箱地址"
                  disabled={!editModes.personalInfo}
                  className={`h-10 ${!editModes.personalInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">职位角色</label>
                <Input
                  value={userInfo.role}
                  disabled
                  className="bg-muted/50 border-border/50 text-muted-foreground h-10"
                />
                <p className="text-xs text-muted-foreground">角色权限由管理员分配</p>
              </div>
            </div>
          </div>

          {/* Right Column - Company Info */}
          <div className="bg-muted/20 rounded-xl p-6 border border-border/30 shadow-sm relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Building className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">企业信息</h3>
                  <p className="text-xs text-muted-foreground">管理所属企业相关证照信息</p>
                </div>
              </div>
              <Button
                onClick={() => toggleEditMode('companyInfo')}
                variant="outline"
                size="sm"
                className="border-orange-600/30 text-orange-600 hover:bg-orange-600/10"
              >
                <Edit className="w-4 h-4 mr-1" />
                {editModes.companyInfo ? '完成' : '编辑'}
              </Button>
            </div>

            <div className="space-y-4">
              {/* Company Logo Upload Section */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">企业Logo</label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border/50 overflow-hidden bg-muted/30 flex items-center justify-center">
                      {basicInfoForm.companyLogo ? (
                        <img 
                          src={basicInfoForm.companyLogo} 
                          alt="企业Logo" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <button
                      onClick={handleCompanyLogoChange}
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                    >
                      <Upload className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2">支持 JPG、PNG、SVG 格式，建议尺寸 200x200 像素</p>
                    <Button
                      onClick={handleCompanyLogoChange}
                      variant="outline"
                      size="sm"
                      disabled={!editModes.companyInfo}
                      className={`${!editModes.companyInfo ? 'border-border/30 text-muted-foreground' : 'border-orange-600/30 text-orange-600 hover:bg-orange-600/10'}`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {basicInfoForm.companyLogo ? "更换Logo" : "上传Logo"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">企业名称</label>
                <Input
                  value={basicInfoForm.companyName}
                  onChange={(e) => handleBasicInfoChange("companyName", e.target.value)}
                  placeholder="输入企业名称"
                  disabled={!editModes.companyInfo}
                  className={`h-10 ${!editModes.companyInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">统一社会信用代码</label>
                <Input
                  value={basicInfoForm.socialCreditCode}
                  onChange={(e) => handleBasicInfoChange("socialCreditCode", e.target.value)}
                  placeholder="输入统一社会信用代码"
                  disabled={!editModes.companyInfo}
                  className={`h-10 ${!editModes.companyInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">排污许可证号码</label>
                <Input
                  value={basicInfoForm.pollutionPermitNumber}
                  onChange={(e) => handleBasicInfoChange("pollutionPermitNumber", e.target.value)}
                  placeholder="输入排污许可证号码"
                  disabled={!editModes.companyInfo}
                  className={`h-10 ${!editModes.companyInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">企业联系人</label>
                <Input
                  value={basicInfoForm.contactPerson}
                  onChange={(e) => handleBasicInfoChange("contactPerson", e.target.value)}
                  placeholder="输入企业联系人"
                  disabled={!editModes.companyInfo}
                  className={`h-10 ${!editModes.companyInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">企业地址</label>
                <Input
                  value={basicInfoForm.address}
                  onChange={(e) => handleBasicInfoChange("address", e.target.value)}
                  placeholder="输入企业地址"
                  disabled={!editModes.companyInfo}
                  className={`h-10 ${!editModes.companyInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">企业联系电话</label>
                <Input
                  value={basicInfoForm.contactPhone}
                  onChange={(e) => handleBasicInfoChange("contactPhone", e.target.value)}
                  placeholder="输入企业联系电话"
                  disabled={!editModes.companyInfo}
                  className={`h-10 ${!editModes.companyInfo ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {(editModes.personalInfo || editModes.companyInfo) && (
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleSaveBasicInfo}
              className="bg-industrial-blue hover:bg-industrial-blue/80 text-white px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              保存更改
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Waste Info Tab
  const renderWasteInfoTab = () => (
    <div className="h-full overflow-auto p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-foreground mb-2">危废信息录入</h1>
          <p className="text-muted-foreground">管理企业危险废物基础信息数据库</p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="搜索危废名称或编码..."
                className="pl-10 w-80 h-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>
          <Button 
            onClick={() => setShowWasteForm(true)}
            className="bg-safety-green hover:bg-safety-green/80 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增危废信息
          </Button>
        </div>

        {/* Waste Info List */}
        <div className="grid gap-4 mb-6">
          {wasteInfoRecords.map((record) => (
            <div
              key={record.id}
              className="bg-muted/20 rounded-xl p-6 border border-border/30 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-foreground text-lg">{record.wasteName}</h3>
                    <span className="px-2 py-1 bg-warning-red/10 text-warning-red rounded text-sm font-medium">
                      {record.wasteCategory}
                    </span>
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm font-mono">
                      {record.wasteCode}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">废物ID：</span>
                      <span className="text-foreground font-mono">{record.wasteId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">设施代码：</span>
                      <span className="text-foreground font-mono">{record.facilityCode}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">物理形态：</span>
                      <span className="text-foreground">{record.wasteForm}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">更新时间：</span>
                      <span className="text-foreground">{record.updatedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    onClick={() => handleEditWasteInfo(record)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteWasteInfo(record.id)}
                    variant="outline"
                    size="sm"
                    className="text-warning-red border-warning-red/30 hover:bg-warning-red/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground text-sm">主要成分：</span>
                  <p className="text-foreground text-sm">{record.mainComponents}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">有害成分：</span>
                  <p className="text-foreground text-sm">{record.harmfulComponents}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Waste Info Form Modal */}
        {showWasteForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-foreground">
                    {selectedWasteRecord ? "编辑危废信息" : "新增危废信息"}
                  </h2>
                  <Button
                    onClick={handleCancelWasteForm}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">废物ID</label>
                      <Input
                        value={wasteFormData.wasteId}
                        onChange={(e) => handleWasteFormChange("wasteId", e.target.value)}
                        placeholder="输入废物ID"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">设施代码</label>
                      <Input
                        value={wasteFormData.facilityCode}
                        onChange={(e) => handleWasteFormChange("facilityCode", e.target.value)}
                        placeholder="输入设施代码"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">废物名称</label>
                      <Input
                        value={wasteFormData.wasteName}
                        onChange={(e) => handleWasteFormChange("wasteName", e.target.value)}
                        placeholder="输入废物名称"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">废物类别</label>
                      <Input
                        value={wasteFormData.wasteCategory}
                        onChange={(e) => handleWasteFormChange("wasteCategory", e.target.value)}
                        placeholder="如: HW08"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">废物代码</label>
                      <Input
                        value={wasteFormData.wasteCode}
                        onChange={(e) => handleWasteFormChange("wasteCode", e.target.value)}
                        placeholder="如: 900-041-49"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">物理形态</label>
                      <Input
                        value={wasteFormData.wasteForm}
                        onChange={(e) => handleWasteFormChange("wasteForm", e.target.value)}
                        placeholder="如: 液态、固态、气态"
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">主要成分</label>
                      <Textarea
                        value={wasteFormData.mainComponents}
                        onChange={(e) => handleWasteFormChange("mainComponents", e.target.value)}
                        placeholder="描述废物的主要成分"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">有害成分</label>
                      <Textarea
                        value={wasteFormData.harmfulComponents}
                        onChange={(e) => handleWasteFormChange("harmfulComponents", e.target.value)}
                        placeholder="描述废物的有害成分"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">注意事项</label>
                      <Textarea
                        value={wasteFormData.precautions}
                        onChange={(e) => handleWasteFormChange("precautions", e.target.value)}
                        placeholder="描述处理时的注意事项"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">危险特性</label>
                      <Textarea
                        value={wasteFormData.hazardousProperties}
                        onChange={(e) => handleWasteFormChange("hazardousProperties", e.target.value)}
                        placeholder="描述废物的危险特性"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                  <Button
                    onClick={handleCancelWasteForm}
                    variant="outline"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleSaveWasteInfo}
                    className="bg-safety-green hover:bg-safety-green/80 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Sub Accounts Tab
  const renderSubAccountsTab = () => (
    <div className="h-full overflow-auto p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-foreground mb-2">管理子账户</h1>
          <p className="text-muted-foreground">创建和管理企业子账户及权限分配</p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="搜索用户名或邮箱..."
                className="pl-10 w-80 h-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>
          <Button 
            onClick={() => setShowAccountForm(true)}
            className="bg-industrial-blue hover:bg-industrial-blue/80 text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            添加子账户
          </Button>
        </div>

        {/* Accounts List */}
        <div className="grid gap-4 mb-6">
          {subAccounts.map((account) => (
            <div
              key={account.id}
              className="bg-muted/20 rounded-xl p-6 border border-border/30 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-industrial-blue text-white">
                      {account.username.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground text-lg">{account.username}</h3>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        account.role === "管理员" ? "bg-warning-red/10 text-warning-red" :
                        account.role === "操作员" ? "bg-industrial-blue/10 text-industrial-blue" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {account.role}
                      </span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        account.status === "启用" ? "bg-safety-green/10 text-safety-green" : "bg-muted text-muted-foreground"
                      }`}>
                        {account.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">邮箱：</span>
                        <span className="text-foreground">{account.email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">最近登录：</span>
                        <span className="text-foreground">{account.lastLogin}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">权限：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {account.permissions?.map((permission, index) => (
                          <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleToggleAccountStatus(account.id)}
                    variant="outline"
                    size="sm"
                    className={account.status === "启用" ? "text-warning-red border-warning-red/30" : "text-safety-green border-safety-green/30"}
                  >
                    {account.status === "启用" ? "停用" : "启用"}
                  </Button>
                  <Button
                    onClick={() => handleEditAccount(account)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteAccount(account.id)}
                    variant="outline"
                    size="sm"
                    className="text-warning-red border-warning-red/30 hover:bg-warning-red/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Account Form Modal */}
        {showAccountForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-foreground">
                    {selectedSubAccount ? "编辑子账户" : "添加子账户"}
                  </h2>
                  <Button
                    onClick={() => setShowAccountForm(false)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">用户名</label>
                      <Input
                        value={accountFormData.username}
                        onChange={(e) => handleAccountFormChange("username", e.target.value)}
                        placeholder="输入用户名"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">角色</label>
                      <Select value={accountFormData.role} onValueChange={(value) => handleAccountFormChange("role", value)}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="选择角色" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="管理员">管理员</SelectItem>
                          <SelectItem value="操作员">操作员</SelectItem>
                          <SelectItem value="查看者">查看者</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">邮箱</label>
                    <Input
                      type="email"
                      value={accountFormData.email}
                      onChange={(e) => handleAccountFormChange("email", e.target.value)}
                      placeholder="输入邮箱地址"
                      className="h-10"
                    />
                  </div>

                  {!selectedSubAccount && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">密码</label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={accountFormData.password}
                            onChange={(e) => handleAccountFormChange("password", e.target.value)}
                            placeholder="输入密码"
                            className="h-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">确认密码</label>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            value={accountFormData.confirmPassword}
                            onChange={(e) => handleAccountFormChange("confirmPassword", e.target.value)}
                            placeholder="再次输入密码"
                            className="h-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">权限</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["数据采集", "标签打印", "查看历史", "用户管理", "系统设置"].map((permission) => (
                        <label key={permission} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={accountFormData.permissions.includes(permission)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleAccountFormChange("permissions", [...accountFormData.permissions, permission]);
                              } else {
                                handleAccountFormChange("permissions", accountFormData.permissions.filter(p => p !== permission));
                              }
                            }}
                            className="rounded border-border"
                          />
                          <span className="text-sm text-foreground">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                  <Button
                    onClick={() => setShowAccountForm(false)}
                    variant="outline"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleSaveAccount}
                    className="bg-industrial-blue hover:bg-industrial-blue/80 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Settings Tab - 将API配置移动到这里
  const renderSettingsTab = () => (
    <div className="h-full overflow-auto p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-foreground mb-2">系统设置</h1>
          <p className="text-muted-foreground">配置系统安全、通知、API接口和其他偏好设置</p>
        </div>

        <div className="grid gap-8 pb-24">
          {/* API配置与数据上报 - 从基础信息页面移动过来 */}
          <div className="bg-muted/20 rounded-xl p-8 border border-border/30 shadow-sm relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <CloudUpload className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground">API配置与数据上报</h3>
                  <p className="text-muted-foreground">管理企业数据上报接口配置、密钥安全与上报状态监控</p>
                </div>
              </div>
              <Button
                onClick={() => toggleEditMode('apiConfig')}
                variant="outline"
                size="sm"
                className="border-purple-600/30 text-purple-600 hover:bg-purple-600/10"
              >
                <Edit className="w-4 h-4 mr-1" />
                {editModes.apiConfig ? '完成' : '编辑'}
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-8">
              {/* API Token Configuration */}
              <div className="col-span-2 space-y-6">
                {/* Upload Mode Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">上报模式</label>
                  <Select value={dataUploadSettings.uploadMode} onValueChange={(value) => handleDataUploadChange("uploadMode", value)} disabled={!editModes.apiConfig}>
                    <SelectTrigger className={`h-12 ${!editModes.apiConfig ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50'}`}>
                      <SelectValue placeholder="选择上报模式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">
                        <div className="flex items-center gap-3">
                          <RefreshCw className="w-4 h-4 text-safety-green" />
                          <span>实时上报</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="scheduled">
                        <div className="flex items-center gap-3">
                          <Timer className="w-4 h-4 text-industrial-blue" />
                          <span>定时上报</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="manual">
                        <div className="flex items-center gap-3">
                          <Upload className="w-4 h-4 text-orange-600" />
                          <span>手动上报</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
                    <p className="text-xs text-muted-foreground">
                      {dataUploadSettings.uploadMode === "realtime" && "标签打印后立即上报到政府平台，确保数据实时性"}
                      {dataUploadSettings.uploadMode === "scheduled" && "按设定的时间间隔批量上报数据，降低网络负担"}
                      {dataUploadSettings.uploadMode === "manual" && "手动触发数据上报操作，完全由用户控制上报时机"}
                    </p>
                  </div>
                </div>

                {/* Upload Interval - only show for scheduled mode */}
                {dataUploadSettings.uploadMode === "scheduled" && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">上报间隔</label>
                    <Select value={dataUploadSettings.uploadInterval} onValueChange={(value) => handleDataUploadChange("uploadInterval", value)} disabled={!editModes.apiConfig}>
                      <SelectTrigger className={`h-12 ${!editModes.apiConfig ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50'}`}>
                        <SelectValue placeholder="选择上报间隔" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">每1小时</SelectItem>
                        <SelectItem value="2">每2小时</SelectItem>
                        <SelectItem value="4">每4小时</SelectItem>
                        <SelectItem value="6">每6小时</SelectItem>
                        <SelectItem value="12">每12小时</SelectItem>
                        <SelectItem value="24">每24小时</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">设定自动上报的时间间隔，建议选择适合企业作业时间的间隔</p>
                  </div>
                )}

                {/* Province Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">数据上报省份</label>
                  <Select value={dataUploadSettings.province} onValueChange={handleProvinceChange} disabled={!editModes.apiConfig}>
                    <SelectTrigger className={`h-12 ${!editModes.apiConfig ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50'}`}>
                      <SelectValue placeholder="选择省份" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(provinceConfigs).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <span>{config.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div><span className="font-medium">接口地址:</span> {provinceConfigs[dataUploadSettings.province as keyof typeof provinceConfigs]?.apiEndpoint}</div>
                      <div><span className="font-medium">请求方式:</span> {provinceConfigs[dataUploadSettings.province as keyof typeof provinceConfigs]?.uploadMethod}</div>
                      <div><span className="font-medium">数据格式:</span> {provinceConfigs[dataUploadSettings.province as keyof typeof provinceConfigs]?.dataFormat}</div>
                      <div className="pt-1 text-xs text-muted-foreground">
                        {provinceConfigs[dataUploadSettings.province as keyof typeof provinceConfigs]?.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* API Token */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">企业API Token</label>
                  <div className="relative">
                    <Input
                      type={showApiToken ? "text" : "password"}
                      value={basicInfoForm.apiToken}
                      onChange={(e) => handleBasicInfoChange("apiToken", e.target.value)}
                      placeholder="输入企业API Token"
                      disabled={!editModes.apiConfig}
                      className={`h-12 pr-12 font-mono text-sm ${!editModes.apiConfig ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiToken(!showApiToken)}
                      disabled={!editModes.apiConfig}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${!editModes.apiConfig ? 'text-muted-foreground/50' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {showApiToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    用于数据上报的企业专用API密钥，请妥善保管并定期更换以确保数据安全
                  </p>
                </div>
              </div>

              {/* Upload Status Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">上报状态</h4>
                <div className="bg-card/40 rounded-lg p-6 border border-border/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">目标省份</span>
                    <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg font-medium">
                      {provinceConfigs[dataUploadSettings.province as keyof typeof provinceConfigs]?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">上报模式</span>
                    <span className="text-sm bg-industrial-blue/10 text-industrial-blue px-3 py-1.5 rounded-lg font-medium">
                      {dataUploadSettings.uploadMode === "realtime" && "实时上报"}
                      {dataUploadSettings.uploadMode === "scheduled" && "定时上报"}  
                      {dataUploadSettings.uploadMode === "manual" && "手动上报"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">最后上报</span>
                    <span className="text-sm text-foreground font-medium">{dataUploadSettings.lastUpload}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">连接状态</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-safety-green animate-pulse"></div>
                      <span className="text-sm text-safety-green font-medium">已连接</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Operations */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">上报操作</h4>
                <div className="space-y-3">
                  {/* Manual Upload Button */}
                  {dataUploadSettings.uploadMode === "manual" && (
                    <Button
                      onClick={handleManualUpload}
                      className="w-full bg-safety-green hover:bg-safety-green/80 text-white h-12 shadow-md hover:shadow-safety-green/20 transition-all duration-200"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      立即上报数据
                    </Button>
                  )}
                  
                  {/* Connection Test Button */}
                  <Button
                    variant="outline"
                    className="w-full border-industrial-blue/30 text-industrial-blue hover:bg-industrial-blue/10 h-12"
                  >
                    <Timer className="w-5 h-5 mr-2" />
                    连接测试
                  </Button>
                  
                  {/* Upload History */}
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-accent h-12"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    上报历史
                  </Button>
                </div>
              </div>
            </div>

            {/* API配置保存按钮 */}
            {editModes.apiConfig && (
              <div className="mt-6 pt-6 border-t border-border flex justify-end">
                <Button 
                  onClick={() => {
                    toggleEditMode('apiConfig');
                    handleSaveBasicInfo();
                  }}
                  className="bg-purple-600 hover:bg-purple-600/80 text-white px-8"
                >
                  <Save className="w-4 h-4 mr-2" />
                  保存API配置
                </Button>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="bg-muted/20 rounded-xl p-6 border border-border/30 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning-red/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-warning-red" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">安全设置</h3>
                  <p className="text-xs text-muted-foreground">管理账户安全和密码策略</p>
                </div>
              </div>
              <Button
                onClick={() => editModes.security ? handleSaveSecurity() : toggleEditMode('security')}
                variant="outline"
                size="sm"
                className="border-warning-red/30 text-warning-red hover:bg-warning-red/10"
              >
                <Edit className="w-4 h-4 mr-1" />
                {editModes.security ? '保存' : '编辑'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">当前密码</label>
                <Input
                  type="password"
                  value={securitySettings.currentPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="输入当前密码"
                  disabled={!editModes.security}
                  className={`h-10 ${!editModes.security ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">新密码</label>
                <Input
                  type="password"
                  value={securitySettings.newPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="输入新密码"
                  disabled={!editModes.security}
                  className={`h-10 ${!editModes.security ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">确认新密码</label>
                <Input
                  type="password"
                  value={securitySettings.confirmPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="再次输入新密码"
                  disabled={!editModes.security}
                  className={`h-10 ${!editModes.security ? 'bg-muted/50 border-border/30 text-foreground' : 'bg-input border-border/50 text-foreground'}`}
                />
              </div>


            </div>
          </div>






        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-industrial-blue flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-medium text-sidebar-foreground">个人中心</h2>
              <p className="text-xs text-sidebar-accent-foreground">设置与管理</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as PersonalCenterTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-industrial-blue/10 text-industrial-blue border border-industrial-blue/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
            <Avatar className="w-8 h-8">
              <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
              <AvatarFallback className="bg-industrial-blue text-white text-sm">
                {userInfo.name.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userInfo.name}</p>
              <p className="text-xs text-sidebar-accent-foreground truncate">{userInfo.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0">
        {activeTab === "basicInfo" && renderBasicInfoTab()}
        {activeTab === "wasteInfo" && renderWasteInfoTab()}
        {activeTab === "subAccounts" && renderSubAccountsTab()}
        {activeTab === "deviceManagement" && renderDeviceManagementTab()}
        {activeTab === "settings" && renderSettingsTab()}
      </div>
    </div>
  );
}