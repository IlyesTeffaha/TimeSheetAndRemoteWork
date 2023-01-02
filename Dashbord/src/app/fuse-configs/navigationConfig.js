import { authRoles } from 'app/auth';
import i18next from 'i18next';


import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'Home',
        title: 'Home',
        translate: 'HOME',
        type: 'item',
        icon: 'today',
        url: '/apps/home',
      },
      {
        id: 'dashboards',
        title: 'Dashboards',
        translate: 'Project Management',
        type: 'collapse',
        icon: 'dashboard',
        children: [
    
          {
            id: 'projects',
            title: 'Project ',
            type: 'item',
            url: '/apps/dashboards/projects',
          },{
            id: 'phases',
            title: 'Phase ',
            type: 'item',
            url: '/apps/dashboards/phases',
          }
          
        ],
      },
      {
        id: 'todo',
        title: 'To-Do',
        translate: 'TODO',
        type: 'item',
        icon: 'check_box',
        url: '/apps/todo',
        badge: {
          title: 3,
          bg: 'rgb(255, 111, 0)',
          fg: '#FFFFFF',
        },
      },
      
      
      
      {
        id: 'team',
        title: 'Team',
        translate: 'TEAM',
        type: 'collapse',
        icon: 'person',
        
        children: [
          {
            id: 'team-mangement',
            title: 'Team-Mangement',
            type: 'item',
            url: '/apps/team/teammangement',
          },
          {
            id: 'team-chat',
            title: 'Team-chat',
            type: 'item',
            url: '/apps/team/teamchat',
          },
          
        ],
      },
     
      {
        id: 'blog',
        title: 'Blog',
        type: 'collapse',
        icon: 'pages',
         
        children:[
          {
            id: 'blog-home',
            title: 'View articles',
            type: 'item',
            icon: 'person',
            url: '/apps/blog/blog-home',
          },
          {
            id: 'blog-write',
            title: 'Write article',
            type: 'item',
            icon: 'person',
            url: '/apps/blog/blog-write',
          },
          {
            id: 'blog-questions',
            title: 'Ask a question',
            type: 'item',
            icon: 'person',
            url: '/apps/blog/blog-questions',
          },
          {
            id: 'search-questions',
            title: 'Search questions',
            type: 'item',
            icon: 'person',
            url: '/apps/blog/search-questions',
          },
          {
          id: 'search-jobs',
          title: 'Search Jobs',
          type: 'item',
          icon: 'person',
          url: '/apps/blog/search-jobs',
          },
          
        ]
      },
      
     
      {
        id: 'contacts',
        title: 'Contacts',
        translate: 'CONTACTS',
        type: 'item',
        icon: 'account_box',
        url: '/apps/contacts/all',
      },
      
    ],
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'pages',
    children: [
      {
        id: 'authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'lock',
        badge: {
          title: 10,
          bg: '#525E8A',
          fg: '#FFFFFF',
        },
        children: [
          {
            id: 'authentication-login',
            title: 'Login',
            type: 'item',
            url: '/pages/auth/login',
          },
         
          {
            id: 'authentication-register',
            title: 'Register',
            type: 'item',
            url: '/pages/auth/register',
          },
         
          {
            id: 'authentication-forgot-password',
            title: 'Forgot Password',
            type: 'item',
            url: '/pages/auth/forgot-password',
          },
          /*{
            id: 'authentication-forgot-password-v2',
            title: 'Forgot Password v2',
            type: 'item',
            url: '/pages/auth/forgot-password-2',
          },*/
          {
            id: 'authentication-reset-password',
            title: 'Reset Password',
            type: 'item',
            url: '/pages/auth/reset-password',
          },
          /*{
            id: 'authentication-reset-password-v2',
            title: 'Reset Password v2',
            type: 'item',
            url: '/pages/auth/reset-password-2',
          },
          {
            id: 'authentication-lock-screen',
            title: 'Lock Screen',
            type: 'item',
            url: '/pages/auth/lock',
          },
          {
            id: 'authentication-mail-confirmation',
            title: 'Mail Confirmation',
            type: 'item',
            url: '/pages/auth/mail-confirm',
          },*/
        ],
      },
      
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        icon: 'person',
        url: '/pages/profile',
      },
     
    ],
  },
  
  {
    type: 'divider',
    id: 'divider-1',
  },
  
];

export default navigationConfig;
