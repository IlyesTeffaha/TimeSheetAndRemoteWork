import { lazy } from 'react';

const PhasesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },

  routes: [
    {
      path: '/apps/dashboards/phases',
      component: lazy(() => import('./PhasesApp')),
    },
  ],
};

export default PhasesAppConfig;
