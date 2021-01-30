
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

 function getLastMsgs(chatList, userid) {
    // 1. 找出每个聊天的最后一条或者几条消息, 并用一个对象容器来保存 {chat_id:lastMsg}
    const lastMsgObj = {};
    chatList.forEach(item => {
        //统计某一个目标用户发给我的，但是未读的消息个数
        if (item.to === userid && !item.read) {
            item.unReadCount = 1;
        } else {
            item.unReadCount = 0;
        }
        // 得到msg的聊天标识id: chat_id
        const chatId = item.chat_id;
        let lastMsg = lastMsgObj[chatId];
        //lastMsgObj没有消息
        if (!lastMsg) {
            lastMsgObj[chatId] = item;
        } else {
            // 累加unReadCount=以前未读的 + 当前别人发给我的
            const unReadCounts = lastMsg.unReadCount + item.unReadCount;
            if (item.create_time > lastMsg.create_time) {
                lastMsgObj[chatId] = item;
            }
            //将unReadCount保存在最新的lastMsg上
            lastMsgObj[chatId].unReadCount = unReadCounts
        }
    })
    
    // 得到所有lastMsg的数组
    const getLastmessage = Object.values(lastMsgObj);
    console.log('lastMsgObj',lastMsgObj,getLastmessage);
    //按日期排序
    getLastmessage.sort((m1, m2) => m2.create_time - m1.create_time);
    return getLastmessage;
}
class Message extends Component {
    
    render() {
        // debugger;
        const {user} = this.props;
        const {users, chatList} = this.props.chat;
        const lastMsgs = getLastMsgs(chatList, user._id);
        return (
           <List style={{marginTop:50, marginBottom: 50}}>
                {
                    lastMsgs.map( msg => {
                        // 目标聊天id
                        const targetUserId = msg.from === user._id ?  msg.to : msg.from;
                        const targetUser = users[targetUserId];
                        return (
                        <Item 
                            key={msg._id}
                            extra={<Badge text={msg.unReadCount}/>}
                            thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                            arrow='horizontal'
                            onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                           
                            {msg.content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>
                    )
                    })
                   
                }
           </List>
        )
    }
}
export default connect(
    state => ({user: state.users, chat: state.chat})
)(Message)