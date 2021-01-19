import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'

import {
    reqRegister,
    reqLogin

} from '../api'
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
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
        if (result.code === 205) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}