import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        const {userList} = this.props;
        console.log('user-list', userList);
        return (
            <WingBlank style={{marginBottom:50, marginTop:50}}>
                <QueueAnim type='scale'>
                    {
                        userList.map(list => (
                            <div key={list._id}>
                                <WhiteSpace/>
                                <Card>
                                    {
                                    list.header ? <Header 
                                        thumb={require(`../../assets/images/${list.header}.png`)}
                                        extra={list.username}
                                    /> : null
                                    }
                                    <Body>
                                        <div>职位: {list.post}</div>
                                        {list.company ? <div>公司: {list.company}</div> : null}
                                        {list.salary ? <div>月薪: {list.salary}</div> : null}
                                        <div>描述: {list.info}</div>
                                    </Body>
                                </Card>
                            </div>
                        ))
                    }
                </QueueAnim>
            </WingBlank>
        )
    }
}
export default withRouter(UserList)