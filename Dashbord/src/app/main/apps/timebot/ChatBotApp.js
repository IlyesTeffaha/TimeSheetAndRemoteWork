import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
// import reducer from './store';

// import { getLabels } from './store/labelsSlice';
// import { getFilters } from './store/filtersSlice';
// import { getFolders } from './store/foldersSlice';
// import { getTodos } from './store/todosSlice';
// import TodoDialog from './TodoDialog';
// import TodoHeader from './TodoHeader';
// import TodoList from './TodoList';
// import TodoSidebarContent from './TodoSidebarContent';
// import TodoSidebarHeader from './TodoSidebarHeader';
// import TodoToolbar from './TodoToolbar';
// import { reducers } from './reducers';
// import React from 'react';
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Chatbot from './Chatbot';

// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

function ChatBotApp(props) {
  // const store = createStore(reducers, compose(applyMiddleware(thunk)));
//   const dispatch = useDispatch();

  const pageLayout = useRef(null); 
  const routeParams = useParams();

//   useEffect(() => {
//     dispatch(getTasks());
//   //   dispatch(getFolders());
//   //   dispatch(getLabels());
//    },);

  // useDeepCompareEffect(() => {
  //   dispatch(getTodos(routeParams));
  // }, [dispatch, routeParams]);

  return (
    <>
    
      <FusePageCarded
        classes={{
          root: 'w-full',
          header: 'items-center min-h-0 h-0 sm:h-0 sm:min-h-0',
        }}
        // header={<TodoHeader pageLayout={pageLayout} />}
        // contentToolbar={<TodoToolbar />}
        content={<Chatbot />}
        // leftSidebarHeader={<TodoSidebarHeader />}
        
        ref={pageLayout}
        innerScroll
      />
      {/* <TodoDialog /> */}
      
    </>
  );
}

export default ChatBotApp;