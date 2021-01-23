import {combineReducers} from 'redux';
import { getRedirectTo } from '../utils';
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
  } from './action-types'
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}

function users(state1 = initUser, action1) {
    // debugger;
    console.log('action1', action1);
    switch(action1.type) {
        case AUTH_SUCCESS:
        const {userType, header} = action1.data
        console.log('login reducer', action1.data);
            return {...action1.data, redirectTo: getRedirectTo(userType, header)};
        case ERROR_MSG:
            return {...state1, msg: action1.data}
        case RECEIVE_USER:
            return action1.data
        case RESET_USER:
            return {...initUser, msg: action1.data}
        default:
            return state1;
    }
}
const initUserList = []
function userList(state=initUserList, action) {
        switch(action.type) {
            case RECEIVE_USER_LIST:
            console.log('action.data reducer',action.data);
                return action.data
            default:
                return state;
        }
}
export default combineReducers({
    users,
    userList
})