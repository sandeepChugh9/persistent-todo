import { CREATE_USER_INITIATE, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAIL,
    USERS_FETCHED 
} from '../actions/types';


const initialState = {
    loginProgress: false,
    loginError: null,
    loggedInUser: {},
    userList:[]
} 

export default function taskReducer(state = initialState , action) {
  switch (action.type) {
    case CREATE_USER_INITIATE:
      return {...state, loginProgress: true}
   
    case CREATE_USER_SUCCESS:
    case CREATE_USER_FAIL:   
        return {...state, 
            loggedInUser: action.user || {}, 
            loginProgress: false,
            loginError: action.error || null
    }

    case USERS_FETCHED:
      return {...state, userList: action.users || [], }

    default:
      return state;
  }
}