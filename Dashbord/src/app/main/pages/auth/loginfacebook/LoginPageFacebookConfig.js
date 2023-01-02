import { lazy } from 'react';

const LoginPageFacebookConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      
        path: '/pages/auth/loginfacebook',
      component: lazy(() => import('./LoginPageFacebook')),
     
    },
    
  ],
};

export default LoginPageFacebookConfig;