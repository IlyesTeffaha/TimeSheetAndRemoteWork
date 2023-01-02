import { lazy } from 'react';

const HomeAppconfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/home',
      component: lazy(() => import('./src/App')),
    },
  ],
};

export default HomeAppconfig;
