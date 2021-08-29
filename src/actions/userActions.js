import { 
    CREATE_USER_INITIATE, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAIL,
    USERS_FETCHED } from './types';
import { createUser , fetchUsers } from '../ApiService';


export const getUsers = () => {
	return async (dispatch) => {
        let users = await fetchUsers('all');
        dispatch({type: USERS_FETCHED, users });
    }
};


export const addUser = (payload) => {
	return async (dispatch) => {
        dispatch({type: CREATE_USER_INITIATE});
        try{
            let { username, email , accessToken } = await createUser(payload);
            localStorage.setItem('accessToken',accessToken);
            dispatch({type: CREATE_USER_SUCCESS, user: { username, email }});
            return Promise.resolve();
        }
        catch(error){
            dispatch({type: CREATE_USER_FAIL, error});
            return Promise.reject();
        }
    }
};

export const fetchUser = (payload) => {
	return async (dispatch) => {
            let result = await fetchUsers('self');
            let { username, email } = result[0];
            dispatch({type: CREATE_USER_SUCCESS, user: { username, email }});
            return Promise.resolve();
        }
};




