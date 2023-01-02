import { lazy } from 'react';

const LoginPageFaceConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      
        path: '/pages/auth/loginface',
      component: lazy(() => import('./LoginPageFace')),
     
    },
    
  ],
};

export default LoginPageFaceConfig;