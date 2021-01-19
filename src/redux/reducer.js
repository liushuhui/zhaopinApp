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
    msg: ''
}

function users(state1 = initUser, action1) {
    console.log('action1', action1);
    switch(action1.type) {
        case AUTH_SUCCESS:
        const {userType, header} = action1.data
            return {...action1.data, redirectTo: getRedirectTo(userType, header)};
        case ERROR_MSG:
            return {...state1, msg: action1.data}
        default:
            return state1;
    }
}
export default combineReducers({
    users,
})