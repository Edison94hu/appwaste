import { QrCode } from "lucide-react";
import { WasteType } from "./WasteTypeCard";
import { WeightUnit, LabelSize } from "./WeightOperationPanel";

interface LabelPreviewProps {
  wasteType: WasteType | null;
  weight: string;
  weightUnit: WeightUnit;
  labelSize: LabelSize;
}

export function LabelPreview({ wasteType, weight, weightUnit, labelSize }: LabelPreviewProps) {
  // Get current date
  const currentDate = new Date().toLocaleDateString('zh-CN');
  
  // Generate digital identification code
  const digitalId = wasteType ? `DW${wasteType.code.replace(/-/g, '')}${Date.now().toString().slice(-6)}` : '';

  // Mock company data
  const companyData = {
    name: "华东化工集团有限公司",
    contact: "张经理",
    phone: "021-12345678",
    address: "上海市浦东新区化工路123号"
  };

  // Convert weight for display
  const getDisplayWeight = () => {
    if (!weight) return "";
    const numWeight = parseFloat(weight);
    if (weightUnit === "T") {
      // Weight is stored in KG internally, convert to T for display
      return `${(numWeight / 1000).toFixed(3)} T`;
    } else {
      return `${numWeight.toFixed(2)} KG`;
    }
  };

  // Get text size based on label size - optimized for larger preview display
  const getTextSizes = () => {
    const textSizeMap = {
      "100*100": {
        header: "text-3xl",
        field: "text-base",
        content: "text-sm",
        minHeight: "min-h-[40px]"
      },
      "100*80": {
        header: "text-3xl", 
        field: "text-base",
        content: "text-sm",
        minHeight: "min-h-[36px]"
      },
      "100*70": {
        header: "text-2xl",
        field: "text-base",
        content: "text-sm",
        minHeight: "min-h-[32px]"
      },
      "100*60": {
        header: "text-2xl",
        field: "text-sm",
        content: "text-xs",
        minHeight: "min-h-[28px]"
      },
      "150*150": {
        header: "text-4xl",
        field: "text-lg",
        content: "text-base",
        minHeight: "min-h-[48px]"
      },
      "200*200": {
        header: "text-5xl",
        field: "text-xl",
        content: "text-lg",
        minHeight: "min-h-[56px]"
      }
    };
    return textSizeMap[labelSize];
  };

  // Waste type specific data mapping
  const getWasteDetails = (wasteType: WasteType | null) => {
    if (!wasteType) return null;
    
    const wasteDetailsMap: Record<string, any> = {
      "1": {
        category: "HW08 废矿物油与含矿物油废物",
        form: "液态",
        hazardProperty: "T,I",
        mainComponent: "矿物油、润滑油基础油",
        harmfulComponent: "多环芳烃、重金属离子",
        precautions: "远离火源，防止泄漏，穿戴防护用品"
      },
      "2": {
        category: "HW34 废酸",
        form: "液态",
        hazardProperty: "C",
        mainComponent: "硫酸、盐酸、硝酸",
        harmfulComponent: "强酸性物质",
        precautions: "防止接触皮肤，远离碱性物质"
      },
      "3": {
        category: "HW35 废碱",
        form: "液态",
        hazardProperty: "C",
        mainComponent: "氢氧化钠、氢氧化钾",
        harmfulComponent: "强碱性物质",
        precautions: "防止接触皮肤，远离酸性物质"
      },
      "4": {
        category: "HW06 废有机溶剂与含有机溶剂废物",
        form: "液态",
        hazardProperty: "T,I,F",
        mainComponent: "甲苯、二甲苯、丙酮",
        harmfulComponent: "有机溶剂、挥发性有机物",
        precautions: "通风良好环境存放，远离火源"
      }
    };

    return wasteDetailsMap[wasteType.id] || {
      category: `HW${wasteType.code.split('-')[0]} ${wasteType.name}`,
      form: "固态",
      hazardProperty: "T",
      mainComponent: "待检测确认",
      harmfulComponent: "待检测确认",
      precautions: "按危废管理要求处理"
    };
  };

  const wasteDetails = getWasteDetails(wasteType);
  const textSizes = getTextSizes();

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Square aspect ratio wrapper with border included, sized to fit container */}
      <div className="aspect-square h-full max-h-full max-w-full bg-orange-200 border-4 border-gray-700 overflow-hidden flex flex-col">
            
            {/* Header - Fixed height */}
            <div className="border-b-2 border-gray-700 px-6 py-4 text-center flex-shrink-0">
              <h1 className={`${textSizes.header} font-bold text-gray-800 leading-tight`}>危险废物</h1>
            </div>

            {/* Main Content Grid - Flexible height */}
            <div className={`grid grid-cols-3 text-gray-800 ${textSizes.field} flex-1 min-h-0`}>
            
              {/* Row 1: 废物名称 | 危险特性 */}
              <div className={`col-span-2 border-r-2 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>废物名称:</div>
                <div className={`${textSizes.content} leading-tight break-words overflow-hidden`}>{wasteType?.name || "未选择"}</div>
              </div>
              <div className={`border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>危险特性</div>
                <div className={`${textSizes.content} leading-tight overflow-hidden`}>{wasteDetails?.hazardProperty || "-"}</div>
              </div>

              {/* Row 2: 废物类别 */}
              <div className={`col-span-3 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>废物类别:</div>
                <div className={`${textSizes.content} leading-tight break-words overflow-hidden`}>{wasteDetails?.category || "-"}</div>
              </div>

              {/* Row 3: 废物代码 | 废物形态 */}
              <div className={`border-r-2 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>废物代码:</div>
                <div className={`${textSizes.content} font-mono leading-tight overflow-hidden`}>{wasteType?.code || "-"}</div>
              </div>
              <div className={`col-span-2 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>废物形态:</div>
                <div className={`${textSizes.content} leading-tight overflow-hidden`}>{wasteDetails?.form || "-"}</div>
              </div>

              {/* Row 4: 主要成分 */}
              <div className={`col-span-3 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>主要成分:</div>
                <div className={`${textSizes.content} leading-tight break-words overflow-hidden`}>{wasteDetails?.mainComponent || "-"}</div>
              </div>

              {/* Row 5: 有害成分 */}
              <div className={`col-span-3 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>有害成分:</div>
                <div className={`${textSizes.content} leading-tight break-words overflow-hidden`}>{wasteDetails?.harmfulComponent || "-"}</div>
              </div>

              {/* Row 6: 注意事项 */}
              <div className={`col-span-3 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>注意事项:</div>
                <div className={`${textSizes.content} leading-tight break-words overflow-hidden`}>{wasteDetails?.precautions || "-"}</div>
              </div>

              {/* Row 7: 数字识别码 */}
              <div className={`col-span-3 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>数字识别码:</div>
                <div className={`${textSizes.content} font-mono leading-tight overflow-hidden`}>{digitalId || "-"}</div>
              </div>

              {/* Row 8: 产生/收集单位 | QR Code */}
              <div className={`col-span-2 border-r-2 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>产生/收集单位:</div>
                <div className={`${textSizes.content} leading-tight break-words overflow-hidden`}>{companyData.name}</div>
              </div>
              <div className={`border-b-2 border-gray-700 p-3 flex items-center justify-center`}>
                <div className={`${labelSize === "200*200" ? "w-20 h-20" : labelSize === "150*150" ? "w-16 h-16" : "w-12 h-12"} border-2 border-gray-700 bg-white flex items-center justify-center`}>
                  <QrCode className={`${labelSize === "200*200" ? "w-16 h-16" : labelSize === "150*150" ? "w-12 h-12" : "w-8 h-8"} text-gray-800`} />
                </div>
              </div>

              {/* Row 9: 联系人和联系方式 */}
              <div className={`col-span-3 border-b-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>联系人和联系方式:</div>
                <div className={`${textSizes.content} leading-tight overflow-hidden`}>{companyData.contact} {companyData.phone}</div>
              </div>

              {/* Row 10: 产生日期 | 废物重量 */}
              <div className={`border-r-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>产生日期:</div>
                <div className={`${textSizes.content} leading-tight overflow-hidden`}>{currentDate}</div>
              </div>
              <div className={`col-span-2 border-gray-700 p-3 flex flex-col justify-center overflow-hidden`}>
                <div className={`font-semibold ${textSizes.field} mb-2`}>废物重量:</div>
                <div className={`${textSizes.content} font-semibold text-red-600 leading-tight overflow-hidden`}>
                  {getDisplayWeight() || `- ${weightUnit}`}
                </div>
              </div>

        </div>
      </div>
    </div>
  );
}