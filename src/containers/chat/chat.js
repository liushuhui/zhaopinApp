import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {sendMsg} from '../../redux/action'

const Item = List.Item

class Chat extends Component {
    state = {
        content: '',
    }
    handleSend = () => {
        // 收集数据
        const from = this.props.user._id;
        const to = this.props.match.params.userId;
        const content = this.state.content.trim();
        if (content) {
            this.props.sendMsg({from,to,content})
        }
        this.setState({
            content: ''
        })
    }
    render() {
        console.log('chat stated---', this.props)
        const {user} = this.props;
        const {users, chatList} = this.props.chat;
        const meId = user._id;
        if (!users[meId]) {
            return null;
        }
        const targetId = this.props.match.params.userId;
        const chatId = [meId, targetId].sort().join('_');
        const msg = chatList.filter(item => chatId === item.chat_id);
        const targetHeader = users[targetId].header;
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null;

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'/>}
                    className='sticky-header'
                    onLeftClick={()=> this.props.history.goBack()}
                    >
                    {users[targetId].username}
                </NavBar>
              <List style={{marginTop:50, marginBottom: 50}}>
                {
                    msg.map(msg => {
                        if(targetId === msg.from) {
                            return(
                                <Item
                                    key={msg._id}
                                    thumb={targetIcon}
                                    >
                                    {msg.content}
                                </Item>
                            )
                        } else {
                            return (
                                <Item
                                    key={msg._id}
                                    className='chat-me'
                                    extra='我'
                                    >
                                    {msg.content}
                                </Item>
                            )
                        }
                    })
                }
              </List>
               <div className='am-tab-bar'> 
                <InputItem value={this.state.content} 
                onChange={val => {this.setState({content: val})}} placeholder="请输入" 
                extra={ <span  onClick={this.handleSend}>发送</span> } />
               </div>
            </div>
        )
    }
}
export default connect(state => ({
    user: state.users,
    chat: state.chat
}),{sendMsg})(Chat)