import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

export default combineReducers({
  tasks: taskReducer,
  filter: filterReducer,
  user:userReducer
});