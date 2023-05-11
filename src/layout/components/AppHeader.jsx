// AppHeader.jsx
import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

import { connect } from 'react-redux'

import { Button, Layout, theme } from 'antd';

import { useHistory } from 'react-router-dom'

const { Header } = Layout;


const AppHeader = ({ collapsed, changeCollapsed, adminname, logout }) => {

    const history = useHistory()

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => changeCollapsed(),
            })}

            <div style={{ float: 'right', marginRight: 35 }}>

                {adminname ? (<div>
                    <span> 欢迎 {adminname} </span>
                    <Button onClick={() => {
                        // 清除本地数据存储
                        localStorage.clear()
                        // 清除全局状态中的数据
                        logout()
                        // 跳转到登录页面
                        history.push('/login')
                    }}> 退出 </Button>
                </div>) : (<div>
                    <Button onClick={() => {
                        history.push('/login')
                    }}> 未登录/请登录 </Button>
                </div>)}
                {/* <div>
                    <span> 欢迎 admin </span>
                    <Button> 退出 </Button>
                </div> */}
                {/* <div>
                    <Button> 未登录/请登录 </Button>
                </div> */}
            </div>

        </Header>
    );
};

export default connect(state => {
    return {
        collapsed: state.getIn(['app', 'collapsed']),
        adminname: state.getIn(['user', 'adminname'])
    }
}, dispatch => {
    return {
        changeCollapsed () {
            dispatch({ type: 'CHANGE_COLLAPSED' })
        },
        logout () {
            // 修改全局状态中的值
            dispatch({ type: 'CHANGE_LOGIN_STATE', payload: false })
            dispatch({ type: 'CHANGE_ADMIN_NAME', payload: '' })
            dispatch({ type: 'CHANGE_TOKEN', payload: '' })
            dispatch({ type: 'CHANGE_ROLE', payload: 1 })
            dispatch({ type: 'CHANGE_CHECKEDKEYS', payload: [] })
        }
    }
})(AppHeader);