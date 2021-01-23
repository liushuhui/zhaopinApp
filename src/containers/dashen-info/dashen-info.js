import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelect from '../../components/header-select/header-select'
import {updateUserAction} from '../../redux/action'

 class DashenInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
        company: '',
        salary: '',  
    }
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    save = () => {
        this.props.updateUserAction(this.state);
    }
    render() {
         // 如果信息已经完善, 自动重定向到对应主界面
         const {header, userType} = this.props.user;
         if (header) {
             const path = userType === 'jobSeeker' ? '/jobSeeker' : '/boss';
             return <Redirect to={path}/>
         }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                <InputItem placeholder='请输入求职岗位' onChange={(val) => this.handleChange('post',val)}>求职岗位:</InputItem>
                <TextareaItem title="个人介绍:"
                            placeholder='请输入个人介绍'
                            onChange={(val) => this.handleChange('info',val)}
                            rows={3}/>
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(state => ({user: state.users}), {updateUserAction})(DashenInfo)