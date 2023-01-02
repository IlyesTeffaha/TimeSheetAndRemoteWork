import { lazy } from 'react';

const reportsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/dashboards/reports',
      component: lazy(() => import('./reports')),
    },
  ],
};

export default reportsAppConfig;
