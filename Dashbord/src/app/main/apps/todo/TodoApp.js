import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';
import { getLabels } from './store/labelsSlice';
import { getFilters } from './store/filtersSlice';
import { getFolders } from './store/foldersSlice';
import { getTodos,getTasks } from './store/todosSlice';
// import { getContacts } from './store/todosSlice';

import TodoDialog from './TodoDialog';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoSidebarContent from './TodoSidebarContent';
import TodoSidebarHeader from './TodoSidebarHeader';
import TodoToolbar from './TodoToolbar';
import { useLocation } from 'react-router';
function TodoApp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useEffect(() => {
    dispatch(getFilters());
    dispatch(getFolders());
    dispatch(getLabels());
    // dispatch(getContacts());
    // dispatch(getTodos());
  }, [dispatch]);
  const path=window.location.pathname;
  const phaseId=path.slice(15,51);


  useDeepCompareEffect(() => {
    if(phaseId==''){
      dispatch(getTasks(routeParams));
    }
    dispatch(getTodos(routeParams));
  }, [dispatch, routeParams]);


  // useDeepCompareEffect(() => {
  //   dispatch(getTodos(routeParams));
  // }, [dispatch, routeParams]);

  return (
    <>
      <FusePageCarded
        classes={{
          root: 'w-full',
          header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<TodoHeader pageLayout={pageLayout} />}
        contentToolbar={<TodoToolbar />}
        content={<TodoList />}
        leftSidebarHeader={<TodoSidebarHeader />}
        leftSidebarContent={<TodoSidebarContent />}
        ref={pageLayout}
        innerScroll
      />
      <TodoDialog />
    </>
  );
}

export default withReducer('todoApp', reducer)(TodoApp);
