import { lazy } from 'react';

const singlepostappconfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/pages/blog/singlepost',
      component: lazy(() => import('./singlepostapp')),
    },
  ],
};

export default singlepostappconfig;
