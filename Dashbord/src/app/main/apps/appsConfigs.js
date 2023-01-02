
import singlepostappconfig from './blog/src/components/singlePost/Singlepostappconfig';
import Homeappconfig from './blog/src/pages/home/Homeappconfig';
import WriteBlogConfig from './blog/src/pages/write/Writeappconfig';
import AskQuestionBlogConfig from './blog/src/pages/writequestion/Writeappconfig';

import ChatAppConfig from './chat/ChatAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';

import ProjectsAppConfig from './dashboards/projects/ProjectsAppConfig';
import PhasesAppConfig from './dashboards/projects/PhasesAppConfig';

import TaskAppConfig from './task/TaskAppConfig';
import TeamChatConfig from './team/Components/TeamChatConfig';
import TeamConfig from './team/Components/TeamConfig';

import BotAppConfig from './timebot/BotAppConfig';
import TodoAppConfig from './todo/TodoAppConfig';
import singlequestionappconfig from './blog/src/components/singleQuestion/SingleQuestionappconfig';
import AllQuestionsappconfig from './blog/src/pages/writequestion/AllQuestionsappconfig';
import searchquestionappconfig from './blog/src/pages/searchquestion/searchquestionappconfig';
import searchjobappconfig from './blog/src/pages/searchjob/searchjobappconfig';
import singlejobofferappconfig from './blog/src/pages/searchjob/singlejobofferappconfig';
import reportsAppConfig from './dashboards/projects/components/reports/reportsAppConfig';
import HomeAppconfig from './home/HomeAppconfig';

const appsConfigs = [

  TodoAppConfig,

  ContactsAppConfig,

  ChatAppConfig,

  TaskAppConfig,
  BotAppConfig,
  ProjectsAppConfig,
  WriteBlogConfig,
  AskQuestionBlogConfig,
  Homeappconfig,
  singlepostappconfig,

  singlequestionappconfig,
  AllQuestionsappconfig,
  searchquestionappconfig,
  searchjobappconfig,
  singlejobofferappconfig,
 
  TeamConfig,
 TeamChatConfig,
  PhasesAppConfig,
  reportsAppConfig,
 HomeAppconfig,
];

export default appsConfigs;
