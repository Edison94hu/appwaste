import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TopBar } from './TopBar';
import { BottomNavigation, NavigationTab } from './BottomNavigation';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // 根据当前路径确定活跃的导航标签
  const getActiveTab = (): NavigationTab => {
    if (location.pathname.startsWith('/collection')) return 'collection';
    if (location.pathname.startsWith('/statistics')) return 'statistics';
    if (location.pathname.startsWith('/devices')) return 'devices';
    if (location.pathname.startsWith('/profile')) return 'profile';
    return 'collection';
  };

  const handleTabChange = (tab: NavigationTab) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* 顶部栏 - 固定高度 */}
      <div className="flex-shrink-0">
        <TopBar />
      </div>
      
      {/* 主内容区域 - 填充剩余空间 */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      
      {/* 底部导航栏 - 固定高度 */}
      <div className="flex-shrink-0 border-t border-border relative z-50">
        <BottomNavigation
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}
