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
    reqUserlist

} from '../api'
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
const receiveUser = user => ({type: RECEIVE_USER, data: user})
export const resetUser = msg => ({type: RESET_USER, data: msg})
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})


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
        console.log('result login', result);
        if (result.code === 205) {
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
        const res = await reqUser();
        const result = res.data;
        if (result.code === 205) {
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
            console.log('result.data action 11',result, type);
            dispatch(receiveUserList(result.data))
            // dispatch(() => ({type: RECEIVE_USER_LIST, data: result.data}))
        }
    }
}