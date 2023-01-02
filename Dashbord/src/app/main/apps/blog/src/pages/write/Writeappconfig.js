import { lazy } from 'react';

const WriteBlogConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/blog/blog-write',
      component: lazy(() => import('./Writeapp')),
    },
  ],
};

export default WriteBlogConfig;
