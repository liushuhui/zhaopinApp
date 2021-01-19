import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {registerAction} from '../../redux/action'
import Logo from '../../components/logo/logo'
const ListItem = List.Item;
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            userType: 'jobSeeker',
        }
         this.toLogin = this.toLogin.bind(this);
         this.register = this.register.bind(this);
    }
    register() {
        this.props.registerAction(this.state);
    }
    handleChange(name, val) {
        this.setState({
            [name]: val
        })
    }
    toLogin() {
        this.props.history.replace('/login')
    }
    render() {
        const {userType} = this.state;
        const {msg, redirectTo} = this.props.user;
        // if (redirectTo) {
        //     return <Redirect to={redirectTo}/>
        // }
        return (
            <div>
                <NavBar>招聘App</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg ?<div className="error-msg">{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder="请输入用户名" 
                            onChange={(val) => this.handleChange('username', val)}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入密码" type="password" 
                            onChange={(val) => this.handleChange('password', val)}>密码:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入确认密码" type="password" 
                            onChange={(val) => this.handleChange('passwordConfirm', val)}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={userType === 'jobSeeker'} 
                                onChange={() => this.handleChange('userType', 'jobSeeker')}>大神</Radio>
                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                            <Radio checked={userType === 'boss'} 
                                onChange={() => this.handleChange('userType', 'boss')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.register}>注册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有帐户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => {
        console.log('connect state', state)
       return {user: state.users}
    },
    {registerAction}
)(Register)