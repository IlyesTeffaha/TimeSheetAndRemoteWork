import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

import { useLocation } from 'react-router';



export const getTasks = createAsyncThunk(
  'todoApp/todos/getTodos',
  async (routeParams, { getState }) => {
    const emailvalue = localStorage.getItem("emailvalue");

    routeParams = routeParams || getState().todoApp.todos.routeParams;
    const response = await axios.get(`https://backendtimeline.herokuapp.com/tasks`, {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
    console.log(emailvalue);
  }
);


export const getTodos = createAsyncThunk(
  'todoApp/todos/getTodos',
  async (routeParams, { getState }) => {
    const emailvalue = localStorage.getItem("emailvalue");
    const path=window.location.pathname;
    const phaseId=path.slice(15,51);
    console.log('slice',phaseId);
    routeParams = routeParams || getState().todoApp.todos.routeParams;
    const response = await axios.get(`https://backendtimeline.herokuapp.com/tasks/findByPhase/${phaseId}`, {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
    console.log(emailvalue);
  }
);
export const getPhases = createAsyncThunk(
  'todoApp/todos/getPhases',
  async (routeParams, { getState }) => {
    
    routeParams = routeParams || getState().todoApp.todos.routeParams;
    const response = await axios.get('https://backendtimeline.herokuapp.com/phases', {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);
// export const getContacts = createAsyncThunk(
//   'contactsApp/contacts/getContacts',
//   async (routeParams, { getState }) => {
//     routeParams = routeParams || getState().todoApp.todos.routeParams;
//     const response = await axios.get('https://backendtimeline.herokuapp.com/api/team/find', {
//       params: routeParams,
//     });
//     const data = await response.data;

//     return { data, routeParams };
//   }
// );

export const addTodo = createAsyncThunk(
  'todoApp/todos/addTodo',
  async (todo, { dispatch, getState }) => {
    const emailvalue = localStorage.getItem("emailvalue");
    const response = await axios.post(`https://backendtimeline.herokuapp.com/tasks`, todo);
    const data = await response.data;

    dispatch(getTodos());

    return data;
    console.log(emailvalue);
  }
);

export const updateTodo = createAsyncThunk(
  'todoApp/todos/updateTodo',
  async (todo, { dispatch, getState }) => {
    const url = 'https://backendtimeline.herokuapp.com/tasks';
    const response = await axios.patch(`${url}/${todo.id}`, todo);
    const data = await response.data;

    dispatch(getTodos());

    return data;
  }
);

export const removeTodo = createAsyncThunk(
  'todoApp/todos/removeTodo',
  async (todoId, { dispatch, getState }) => {
    const url = 'https://backendtimeline.herokuapp.com/tasks';
    const response = await axios.delete(`${url}/${todoId}`);
    const data = await response.data;

    dispatch(getTodos());

    return data;
  }
);

const todosAdapter = createEntityAdapter({});

export const { selectAll: selectTodos, selectById: selectTodosById } = todosAdapter.getSelectors(
  (state) => state.todoApp.todos
);

const todosSlice = createSlice({
  name: 'todoApp/todos',
  initialState: todosAdapter.getInitialState({
    searchText: '',
    orderBy: '',
    orderDescending: false,
    routeParams: {},
    todoDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setTodosSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    toggleOrderDescending: (state, action) => {
      state.orderDescending = !state.orderDescending;
    },
    changeOrder: (state, action) => {
      state.orderBy = action.payload;
    },
    openNewTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateTodo.fulfilled]: todosAdapter.upsertOne,
    [addTodo.fulfilled]: todosAdapter.addOne,
    [getTodos.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      todosAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
    [getTasks.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      todosAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setTodosSearchText,
  toggleOrderDescending,
  changeOrder,
  openNewTodoDialog,
  closeNewTodoDialog,
  openEditTodoDialog,
  closeEditTodoDialog,
} = todosSlice.actions;

export default todosSlice.reducer;
