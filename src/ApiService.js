import axios from 'axios';
import * as ENDPOINTS from './endpoints';
const getAuthHeader = ()=>({'Authorization': 'Basic '+ localStorage.getItem('accessToken')});

const axios_get = (url) => axios.get(url, { headers: getAuthHeader()});
const axios_post = (url,data) => axios.post(url, data,{ headers: getAuthHeader()});
export const createUser = async (payload)=>{
    try{
        let result = await axios_post(ENDPOINTS.SAVE_USER, payload)
        return result.data;
    }catch(error){
        return Promise.reject(error.response.data);
    }
}

export const fetchUsers = async (type = 'all')=>{
    try{
        let result = await axios_get(`${ENDPOINTS.GET_USERS}?type=${type}`);
        return result.data;
    }catch(error){
        return Promise.reject(error.response.data);
    }
}


export const fetchUserTasks = async ()=>{
    try{
        let result = await axios_get(ENDPOINTS.FETCH_TASKS)
        return result.data;
    }catch(error){
        return Promise.reject(error.response.data);
    }
}


export const createNewTask = async (payload)=>{
    try{
        let result = await axios_post(ENDPOINTS.ADD_TASK, payload)
        return result.data;
    }catch(error){
        return Promise.reject(error.response.data);
    }
}

export const removeTask = async (payload)=>{
    try{
        let result = await axios_post(ENDPOINTS.DELETE_TASK, payload)
        return result.data;
    }catch(error){
        return Promise.reject(error.response.data);
    }
}


export const modifyTask = async (payload)=>{
    try{
        let result = await axios_post(ENDPOINTS.UPDATE_TASK, payload)
        return result.data;
    }catch(error){
        return Promise.reject(error.response.data);
    }
}

