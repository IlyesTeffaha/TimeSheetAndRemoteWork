import { combineReducers } from 'redux';

import posts from './posts';
import phases from './phases';
export const reducers = combineReducers({ posts , phases });
