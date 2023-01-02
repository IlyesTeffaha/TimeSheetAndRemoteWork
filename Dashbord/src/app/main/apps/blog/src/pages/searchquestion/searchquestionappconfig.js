import { lazy } from 'react';

const searchquestionappconfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/blog/search-questions',
      component: lazy(() => import('./searchquestionapp')),
    },
  ],
};

export default  searchquestionappconfig ;
