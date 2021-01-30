import io from 'socket.io-client'
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

import {
    reqRegister,
    reqLogin,
    reqUpdate,
    reqUser,
    reqUserlist,
    reqChatList,
    reqReadMsg
} from '../api'
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
const receiveUser = user => ({type: RECEIVE_USER, data: user})
export const resetUser = msg => ({type: RESET_USER, data: msg})
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
const receiveMsgList = ({users, chatList, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatList,userid}})
const receiveMsg = (chatList, userid) => ({type: RECEIVE_MSG, data: {chatList, userid}})
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

// 链接socket.io
function connectIO(dispatch, userid) {
    if (!io.socket) {
        io.socket = io('ws://localhost:7001');
        io.socket.on('connection', (msg) => {
            console.log('客户端已经连接上',msg)
        })
        io.socket.on('getMsg', (msg) => {
            // debugger;
            console.log('客户端接收服务器发送的消息',msg, msg.to)
            if(userid===msg.from || userid===msg.to) {
                dispatch(receiveMsg(msg, userid))
              }
        })
    }
}

async function getMsgList(dispatch, userid) {
    connectIO(dispatch, userid);
    const res = await reqChatList();
    const result = res.data;
    // debugger;
    if (result.code === 205) {
        const {users, chatList} = result.data;
        dispatch(receiveMsgList({users, chatList, userid}))
    }
}

export const registerAction = (user) => {
    if (!user.username) {
        return errorMsg('用户不能为空')
    }
    if (!user.password || !user.passwordConfirm) {
        return errorMsg('密码不能为空')
    }
    if (user.password !== user.passwordConfirm) {
        return errorMsg('两次密码不一致')
    }
    return async dispatch1 => {
        const res = await reqRegister(user);
        const result = res.data; // {code: 200, data: usr, msg: ''}
        if (result.code === 205) {
            getMsgList(dispatch1, result.data._id)
            dispatch1(authSuccess(result.data))
        } else {
            dispatch1(errorMsg(result.msg))
        }
    }
}

export const loginAction = (user) => {
    if (!user.username) {
        return errorMsg('用户不能为空')
    }
    if (!user.password) {
        return errorMsg('密码不能为空')
    }
    return async dispatch => {
        const res = await reqLogin(user);
        const result = res.data;
        if (result.code === 205) {
            getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export const updateUserAction = user => {
    return async dispatch => {
        const res = await reqUpdate(user);
        const result = res.data;
        if (result.code === 205) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
export const getUser = () => {
    return async dispatch => {
        // debugger
        const res = await reqUser();
        const result = res.data;
        if (result.code === 205) {
            // debugger;
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList = (type) => {
    return async dispatch => {
        let res = await reqUserlist(type);
        let result = res.data;
        if (result.code === 205) {
            dispatch(receiveUserList(result.data))
            // dispatch(() => ({type: RECEIVE_USER_LIST, data: result.data}))
        }
    }
}


export const sendMsg = ({from, to, content}) => {
    return async dispatch => {
        console.log('客户端向服务端发送的消息', from, to, content);
        io.socket.emit('postMsg',{from, to, content})
    }
}

export const readMsg = (from, to) => {
    return async dispatch => {
        const res = await reqReadMsg(from);
        console.log('reqReadMsg',res);
        const result = res.data;
        if (result.code === 205) {
            const count = result.data;
            dispatch(msgRead({count, from, to}))
        }
    }
}