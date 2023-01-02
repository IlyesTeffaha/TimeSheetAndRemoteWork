import { lazy } from 'react';

const TeamConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/team/teammangement',
      component: lazy(() => import('./Team')),
    },
  ],
};

export default TeamConfig;