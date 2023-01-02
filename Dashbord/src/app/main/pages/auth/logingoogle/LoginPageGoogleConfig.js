import { lazy } from 'react';

const LoginPageGoogleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      
        path: '/pages/auth/logingoogle',
      component: lazy(() => import('./LoginPageGoogle')),
     
    },
    
  ],
};

export default LoginPageGoogleConfig;