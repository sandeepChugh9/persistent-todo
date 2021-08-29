import { TASKS_FETCHED, TASK_CREATED, TASK_DELETED, TASK_UPDATED } from '../actions/types';

export default function taskReducer(state = [], action) {
  switch (action.type) {
    case TASKS_FETCHED:
      return [...state, ...action.tasks];
    case TASK_CREATED:
        return [...state, action.task];  
    case TASK_DELETED:
        return state.filter((task)=> task._id !== action.id);
    case TASK_UPDATED:
      return state.map(task =>(task._id === action.task._id) ? {...task, status: action.task.status}: task)
    default:
      return state;
  }
}