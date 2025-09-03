import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Database, TrendingUp } from "lucide-react";

type TabType = 'history' | 'analytics';

export function StatisticsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 根据当前路径确定活跃的标签
  const getActiveTab = (): TabType => {
    if (location.pathname.includes('/analytics')) return 'analytics';
    return 'history';
  };

  const activeTab = getActiveTab();

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

  const handleTabChange = (tab: TabType) => {
    navigate(`/statistics/${tab}`);
  };

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
                  onClick={() => handleTabChange(tab.id)}
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
        <Outlet />
      </div>
    </div>
  );
}
