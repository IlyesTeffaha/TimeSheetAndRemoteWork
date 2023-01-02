import { lazy } from 'react';

const TeamChatConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/team/teamchat',
      component: lazy(() => import('./Chat')),
    },
  ],
};

export default TeamChatConfig;