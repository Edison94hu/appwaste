import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/collection',
    element: <App />
  },
  {
    path: '/statistics',
    element: <App />
  },
  {
    path: '/statistics/history',
    element: <App />
  },
  {
    path: '/statistics/analytics',
    element: <App />
  },
  {
    path: '/devices',
    element: <App />
  },
  {
    path: '/profile',
    element: <App />
  },
  {
    path: '/profile/basic',
    element: <App />
  },
  {
    path: '/profile/waste',
    element: <App />
  },
  {
    path: '/profile/accounts',
    element: <App />
  },
  {
    path: '/profile/devices',
    element: <App />
  },
  {
    path: '/profile/settings',
    element: <App />
  }
]);
