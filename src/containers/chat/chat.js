import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import {sendMsg,readMsg} from '../../redux/action'

const Item = List.Item

class Chat extends Component {
    state = {
        content: '',
        isShow: false,
    }
    componentWillMount() {
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'];
      this.emojiss = emojis.map(item => ({text: item}));
    }
    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight);
    }
    componentDidUpdate() {
        window.scrollTo(0,document.body.scrollHeight);
    }
    componentWillUnmount() {
        const from = this.props.match.params.id;
        const to = this.props.user._id;
        this.props.readMsg(from, to);

    }
    handleSend = () => {
        // 收集数据
        const from = this.props.user._id;
        const to = this.props.match.params.id;
        const content = this.state.content.trim();
        if (content) {
            this.props.sendMsg({from,to,content})
        }
        this.setState({
            content: '',
            isShow: false
        })
    }
    toggleShow = () => {
        const isShow = !this.isShow;
        this.setState({isShow});
        if(isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0);
        }
    }
    onKeyDownchange = (event) => {
        if (event.keyCode === 13) {
            this.handleSend();
        }
    } 
    render() {
        const {user} = this.props;
        const {users, chatList} = this.props.chat;
        const meId = user._id;
        if (!users[meId]) {
            return null;
        }
        const targetId = this.props.match.params.id;
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
                <QueueAnim type='scale'>
                {
                    msg.map(item => {
                        if(targetId === item.from) {
                            return(
                                <Item
                                    key={item._id}
                                    thumb={targetIcon}
                                    >
                                    {item.content}
                                </Item>
                            )
                        } else {
                            return (
                                <Item
                                    key={item._id}
                                    className='chat-me'
                                    extra='我'
                                    >
                                    {item.content}
                                </Item>
                            )
                        }
                    })
                }
                </QueueAnim>
              </List>
               <div className='am-tab-bar'> 
                <InputItem value={this.state.content} 
                onChange={val => {this.setState({content: val})}} placeholder="请输入" 
                onKeyDown={e => this.onKeyDownchange(e)}
                extra={ 
                    <span>
                        <span  style={{marginRight:5}} onClick={this.toggleShow}>😊</span> 
                        <span  onClick={this.handleSend}>发送</span> 
                    </span>
                } />
                 {this.state.isShow ? (
                <Grid
                data={this.emojiss}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                    this.setState({content: this.state.content + item.text})
                }}
                />
            ) : null}
               </div>
            </div>
        )
    }
}
export default connect(state => ({
    user: state.users,
    chat: state.chat
}),{sendMsg,readMsg})(Chat)