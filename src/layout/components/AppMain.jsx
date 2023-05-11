// AppMain.jsx
import React, { useEffect, useState } from 'react';

import { Switch, Route, useLocation } from 'react-router-dom'

import { Layout } from 'antd';

import { connect } from 'react-redux'

// 路由配置
import menus from '../../router';

const { Content } = Layout;


const AppMain = ({ checkedkeys, adminname }) => {

    // 渲染路由的函数
    const renderRoute = (menus) => {
        return menus.map(item => {
            if (item.children) {
                // 有子路由
                return renderRoute(item.children)
            } else {
                // 没有子路由
                return <Route exact path={item.key} key={item.key} component={item.component} />
            }
        })
    }

    // 判断是否拥有权限
    const [flag, setFlag] = useState(false)

    const { pathname } = useLocation()

    useEffect(() => {
        if (adminname === 'admin') {
            // 如果是 admin 那么我们就给所有权限
            setFlag(true)
        } else {
            // 需要验证是否有权限
            // 如果用户权限中有当前路径就给权限，没有就直接不给权限
            setFlag(checkedkeys.indexOf(pathname) !== -1)
        }
    }, [adminname, checkedkeys, pathname])

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: '#fff',
            }}
        >

            {/* 路由出口 */}
            <React.Suspense fallback={<div>加载中...</div>}>
                <Switch>
                    {/* <Route path='/user' component={}></Route> */}
                    {flag ? renderRoute(menus) : <Route> <div> 无访问权限 </div> </Route>}
                </Switch>
            </React.Suspense>


        </Content>
    );
};

export default connect((state) => {
    return {
        checkedkeys: state.getIn(['user', 'checkedkeys']),
        adminname: state.getIn(['user', 'adminname']),
    }
})(AppMain);