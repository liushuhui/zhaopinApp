import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/action'
 class Boss extends Component {
    componentDidMount() {
        this.props.getUserList('boss')
    }
    render() {
        console.log('userList boss',this.props.userList);
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Boss)
