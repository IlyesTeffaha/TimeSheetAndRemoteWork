import { lazy } from 'react';

const ProjectsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },

  routes: [
    {
      path: '/apps/dashboards/projects',
      component: lazy(() => import('./ProjectsApp')),
    },
  ],
};

export default ProjectsAppConfig;
