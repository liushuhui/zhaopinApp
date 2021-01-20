import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelect from '../../components/header-select/header-select'
import {updateUserAction} from '../../redux/action'


class BossInfo extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            header: '',
            post: '',
            info: '',
            company: '',
            salary: '',  
        }
        this.save1 = this.save.bind(this)
    }
    handleChange(name,value) {
        this.setState({
            [name]: value
        })
    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    save() {
        this.props.updateUserAction(this.state);
    }
    render() {
         // 如果信息已经完善, 自动重定向到对应主界面
         const {header, type} = this.props.user;
         if (header) {
             const path = type === 'jobSeeker' ? '/jobSeeker' : '/boss';
             return <Redirect to={path}/>
         }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                <InputItem placeholder='请输入招聘职位' onChange={(value) => {this.handleChange('post',value)}}>招聘职位:</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={(value) => {this.handleChange('company',value)}}>公司名称:</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={(value) => {this.handleChange('salary',value)}}>职位薪资:</InputItem>
                <TextareaItem title="职位要求:" onChange={(value) => {this.handleChange('info',value)}}
                            placeholder='请输入个人介绍'
                            rows={3}/>
                <Button type='primary' onClick={this.save1}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(state => ({user: state.users}),{updateUserAction})(BossInfo)