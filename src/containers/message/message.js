
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

class Message extends Component {
    render() {
        return (
            <div>
                消息列表
            </div>
        )
    }
}
export default connect(
    state => ({user: state.users})
)(Message)