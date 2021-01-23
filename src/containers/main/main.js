import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import DashenInfo from '../dashen-info/dashen-info'
import {getUser} from '../../redux/action'
import {getRedirectTo} from '../../utils'
import NotFound from '../../components/not-found/not-found'
import Dashen from '../dashen/dashen'
import Boss from '../boss/boss'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../components/nav-footer/nav-footer'

 class Main extends Component {
    componentDidMount() {
        const userId = Cookies.get('userid');
        const {_id} = this.props.user;
        if (userId && !_id) {
            this.props.getUser()
        }
    }
    navList = [ // 包含所有导航组件的相关信息数据
        {
          path: '/boss', // 路由路径
          component: Boss,
          title: '老板列表',
          icon: 'laoban',
          text: '老板',
        },
        {
          path: '/jobSeeker', // 路由路径
          component: Dashen,
          title: '大神列表',
          icon: 'dashen',
          text: '大神',
        },
        {
          path: '/message', // 路由路径
          component: Message,
          title: '消息列表',
          icon: 'message',
          text: '消息',
        },
        {
          path: '/personal', // 路由路径
          component: Personal,
          title: '用户中心',
          icon: 'personal',
          text: '个人',
        }
      ]
    render() {
        const userId = Cookies.get('userid');
        const {user} = this.props;
        if (!userId) {
           return <Redirect to="/login"/>
        }
        if (!user._id) {
            return null;
        } else {
            let path = this.props.location.pathname;
            if (path === '/') {
                console.log('当路由为/的时候路径为：',path);
                path = getRedirectTo(user.userType, user.header);
                return <Redirect to={path}/>
            }
        }
        const {navList} = this;
        const path = this.props.location.pathname;
        const currentNav = navList.find(nav => nav.path === path);

        if (currentNav) {
            if (user.userType==='boss') {
                navList[1].hide = true;
            } else {
                navList[0].hide = true;
            }
        }
        return (
            <div>
                {currentNav ? <NavBar className="sticky-header">{currentNav.title}
                </NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/jobSeekerinfo' component={DashenInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList}/>: null}
            </div>
        )
    }
}
export default connect(
    state => ({user: state.users}),
    {getUser}
)(Main)