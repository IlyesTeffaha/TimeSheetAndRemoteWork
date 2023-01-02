import { lazy } from 'react';

const AllQuestionsappconfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/blog/allquestions',
      component: lazy(() => import('./AllQuestions')),
    },
  ],
};

export default AllQuestionsappconfig;
