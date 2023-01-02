import { lazy } from 'react';

const singlequestionappconfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/pages/blog/singlequestion',
      component: lazy(() => import('./SingleQuestion.jsx')),
    },
  ],
};

export default singlequestionappconfig;
