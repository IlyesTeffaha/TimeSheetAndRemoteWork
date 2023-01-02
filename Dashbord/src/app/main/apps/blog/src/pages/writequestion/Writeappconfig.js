import { lazy } from 'react';

const AskQuestionBlogConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/blog/blog-questions',
      component: lazy(() => import('./Writeapp')),
    },
  ],
};

export default AskQuestionBlogConfig;
