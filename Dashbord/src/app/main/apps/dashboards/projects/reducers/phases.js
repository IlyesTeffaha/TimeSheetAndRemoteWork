import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (phases = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return phases.map((phase) => (phases._id === action.payload._id ? action.payload : phase));
    case CREATE:
      return [...phases, action.payload];
    case UPDATE:
      return phases.map((phase) => (phase._id === action.payload._id ? action.payload : phase));
    case DELETE:
      return phases.filter((phase) => phase._id !== action.payload);
    default:
      return phases;
  }
};

