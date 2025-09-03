import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CollectionPage } from '../pages/CollectionPage';
import { StatisticsPage } from '../pages/StatisticsPage';
import { HistoryRecordsPage } from '../components/HistoryRecordsPage';
import { DataAnalyticsPanel } from '../components/DataAnalyticsPanel';
import { DevicesPage } from '../pages/DevicesPage';
import { PersonalCenterPage } from '../components/PersonalCenterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/collection" replace />
      },
      {
        path: 'collection',
        element: <CollectionPage />
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/statistics/history" replace />
          },
          {
            path: 'history',
            element: <HistoryRecordsPage />
          },
          {
            path: 'analytics',
            element: <DataAnalyticsPanel />
          }
        ]
      },
      {
        path: 'devices',
        element: <DevicesPage />
      },
      {
        path: 'profile',
        element: <PersonalCenterPage />
      },
      {
        path: 'profile/basic',
        element: <PersonalCenterPage />
      },
      {
        path: 'profile/waste',
        element: <PersonalCenterPage />
      },
      {
        path: 'profile/accounts',
        element: <PersonalCenterPage />
      },
      {
        path: 'profile/devices',
        element: <PersonalCenterPage />
      },
      {
        path: 'profile/settings',
        element: <PersonalCenterPage />
      }
    ]
  }
]);
