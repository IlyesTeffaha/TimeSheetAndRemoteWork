import { lazy } from 'react';

const BotAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/chatbot',
      component: lazy(() => import('./ChatBotApp')),
    },
  ],
};

export default BotAppConfig;