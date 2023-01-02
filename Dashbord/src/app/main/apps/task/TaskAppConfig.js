import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const TaskAppConfig = {
    settings: {
        layout: {
          config: {},
        },
      },
      routes: [
        {
          path: '/apps/task',
          component: lazy(() => import('./TaskApp')),
        },
      ],
    };

export default TaskAppConfig;