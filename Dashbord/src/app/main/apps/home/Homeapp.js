import FusePageCarded from '@fuse/core/FusePageCarded';
//import withReducer from 'app/store/withReducer';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import App from './src/App';
//import { useDeepCompareEffect } from '@fuse/hooks';
import App from './src/App';
/* import { getLabels } from './store/labelsSlice';
import { getFilters } from './store/filtersSlice';
import { getFolders } from './store/foldersSlice';
import { getTodos } from './store/todosSlice'; */
// import Home from './Home';

function Homeapp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

 /*  useEffect(() => {
    dispatch(getFilters());
    dispatch(getFolders());
    dispatch(getLabels());
  }, [dispatch]);

  useDeepCompareEffect(() => {
    dispatch(getTodos(routeParams));
  }, [dispatch, routeParams]);
 */
  return (
    <>
      <FusePageCarded
        classes={{
          root: 'w-full',
          header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
      /*   header={<TodoHeader pageLayout={pageLayout} />} */
      /*   contentToolbar={<TodoToolbar />} */
        content={<App />}
        /* leftSidebarHeader={<TodoSidebarHeader />}
        leftSidebarContent={<TodoSidebarContent />} */
        ref={pageLayout}
        innerScroll
      />
    {/*   <TodoDialog /> */}
    </>
  );
}

export default Homeapp;
