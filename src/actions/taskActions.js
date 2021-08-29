import { TASKS_FETCHED, TASK_CREATED, TASK_DELETED, TASK_UPDATED } from './types';
import { fetchUserTasks, createNewTask, removeTask , modifyTask } from '../ApiService';

export const fetchTasks = () => {
	return async (dispatch) => {
        try{
            let tasks = await fetchUserTasks();
            dispatch({type: TASKS_FETCHED, tasks });
            return Promise.resolve();
        }catch(err){
            return Promise.reject();
        }
    }
};

export const addTask = (payload) => {
	return async (dispatch) => {
        let task = await createNewTask(payload);
        dispatch({type: TASK_CREATED, task });
    }
};

export const deleteTask = (id) => {
	return async (dispatch) => {
        await removeTask({id});
        dispatch({type: TASK_DELETED, id });
    }
};

export const updateTask = (payload) => {
	return async (dispatch) => {
        let previousStatus = payload.previousStatus;
        try{
            dispatch({type: TASK_UPDATED,  task:{_id: payload.id, status : payload.status} });
            await modifyTask(payload);
        }catch(e){
            dispatch({type: TASK_UPDATED,  task:{_id: payload.id, status : previousStatus} });
        }
       
       
    }
};
