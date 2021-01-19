//  1.首先，用户发出Action
//  2.然后，Store自动调用Reducer,并且传入两个参数:当前State和收到的Action.Reducer会返回新的State.
//  3.State 一旦有变化，Store就会调用监听函数
//  4.listener可以通过store.getState()得到当前状态,触发重新渲染 View。
import reducer from './reducer'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

// 向外暴露store对象
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))