import { lazy } from 'react';

const searchjobappconfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/blog/search-jobs',
      component: lazy(() => import('./searchjobapp')),
    },
  ],
};

export default  searchjobappconfig ;
