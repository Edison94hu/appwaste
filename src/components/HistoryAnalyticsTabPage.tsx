import { useState } from "react";
import { Database, TrendingUp } from "lucide-react";
import { HistoryRecordsPage } from "./HistoryRecordsPage";
import { DataAnalyticsPanel } from "./DataAnalyticsPanel";

type TabType = 'history' | 'analytics';

export function HistoryAnalyticsTabPage() {
  const [activeTab, setActiveTab] = useState<TabType>('history');

  const tabs = [
    {
      id: 'history' as TabType,
      label: '历史记录',
      icon: Database,
      description: '查看打印记录和历史数据'
    },
    {
      id: 'analytics' as TabType,
      label: '数据分析',
      icon: TrendingUp,
      description: '统计分析和数据可视化'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Tab Header */}
      <div className="flex-shrink-0 bg-secondary/60 backdrop-blur-sm border-b border-border px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Tab Buttons */}
          <div className="flex bg-muted rounded-xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300
                    ${isActive 
                      ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30 transform scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Description */}
          <div className="text-sm text-muted-foreground ml-4">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'history' ? (
          <HistoryRecordsPage />
        ) : (
          <DataAnalyticsPanel />
        )}
      </div>
    </div>
  );
}