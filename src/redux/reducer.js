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
    switch(action1.type) {
        case AUTH_SUCCESS:
        const {userType, header} = action1.data
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
                return action.data
            default:
                return state;
        }
}

const chatInit = {
    users: {},
    chatList: [],
    unReadCount: 0
}
function chat(stateChat = chatInit, action) {
    switch(action.type) {
        case RECEIVE_MSG_LIST: 
        // debugger;
            const {users, chatList, userid} = action.data;
            return {
                users, 
                chatList,
                unReadCount: chatList.reduce((total, msg) => total+(!msg.read&&msg.to===userid ? 1 : 0),0)
            }
        case RECEIVE_MSG:
            const chatLists = action.data.chatList;
            return {
                users: stateChat.users,
                chatList: [...stateChat.chatList, chatLists],
                unReadCount: stateChat.unReadCount + (!chatLists.read&&action.data.userid === chatLists.to ? 1 : 0)

            }
        case MSG_READ:
            const {count, from, to} = action.data;
            // stateChat.chatList.forEach(im => {
            //     if (im.from === from && im.to === to && !im.read) {
            //         im.read = true;
            //     }
            // })
            return {
                users: stateChat.users,
                chatList: stateChat.chatList.map(item => {
                    if (item.from === from && item.to === to && !item.read) {
                        return {...item, read: true}
                    } else {
                        return item;
                    }
                }),
                unReadCount: stateChat.unReadCount - count
            }

        default:
         return stateChat;
    }
}
export default combineReducers({
    users,
    userList,
    chat
})