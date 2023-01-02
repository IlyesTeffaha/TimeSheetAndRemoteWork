import ChatPanel from 'app/fuse-layouts/shared-components/chatPanel/ChatPanel';

import NotificationPanel from 'app/fuse-layouts/shared-components/notificationPanel/NotificationPanel';
import { memo } from 'react';

import ChatbotPanel from 'app/fuse-layouts/shared-components/chatbot/notificationPanel/ChatbotPanel';




function RightSideLayout1(props) {
  return (
    
    <>
      {/* <ChatPanel /> */}
      
      

      <ChatbotPanel />
      <NotificationPanel />
    </>
  );
}

export default memo(RightSideLayout1);
