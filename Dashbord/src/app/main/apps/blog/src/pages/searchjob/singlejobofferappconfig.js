import { lazy } from 'react';

const singlejobofferappconfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/blog/singlejob',
      component: lazy(() => import('./singlejobofferapp')),
    },
  ],
};

export default  singlejobofferappconfig ;
