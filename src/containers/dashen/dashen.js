import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/action' 
 class Dashen extends Component {
    componentDidMount() {
        this.props.getUserList('jobSeeker')
    }
    render() {
        console.log('userList dashen',this.props.userList);
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}
export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Dashen)