


import './db/chat-db';
import './db/contacts-db';

import './db/faq-db';

import './db/icons-db';
import './db/invoices-db';
import './db/knowledge-base-db';

import './db/profile-db';
import './db/project-dashboard-db';

import './db/search-db';
import './db/todo-db';
import './db/notification-panel-db';
import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
