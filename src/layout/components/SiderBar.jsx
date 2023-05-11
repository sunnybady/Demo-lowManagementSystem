// SiderBar.jsx
import React, { useEffect, useState } from "react";

import logo from "../../logo.svg";

import { connect } from "react-redux";

import { Layout, Menu } from "antd";

import menus from "../../router";

import { useHistory, useLocation } from "react-router-dom";

const { Sider } = Layout;

const SiderBar = ({ collapsed, checkedkeys, adminname }) => {
  // 用作路由页面跳转用的
  const history = useHistory();
  // 获取当前路由路径
  const { pathname } = useLocation();

  // 默认展开的数组
  const [openKeys, setOpenKeys] = useState(["/" + pathname.split("/")[1]]);
  // 默认选中的数组
  const [selectedKeys, setSelectedKeys] = useState([pathname]);

  useEffect(() => {
    // 监听路由发生变化，当路由发生改变后修改选中项
    setSelectedKeys([pathname]);
    setOpenKeys(["/" + pathname.split("/")[1]]);
    // console.log(selectedKeys);
  }, [pathname]);

  // 权限管理
  // 如果是 admin 那么我要开放所有权限，否则就使用 checkedkeys 中有的权限
  if (adminname !== "admin") {
    // 不是 admin
    menus.forEach((item) => {
      if (item.children) {
        item.children.forEach((it) => {
          if (checkedkeys.indexOf(it.key) === -1) {
            // 没有权限
            it.disabled = true;
          } else {
            // 有权限
            it.disabled = false;
          }
        });
      }
    });
  } else {
    // 是 admin 给全部权限
    menus.forEach((item) => {
      if (item.children) {
        item.children.forEach((it) => {
          // 有权限
          it.disabled = false;
        });
      }
    });
  }

  return (
    <Sider trigger={null} width="240px" collapsible collapsed={collapsed}>
      <div className="logo">
        <img src={logo} style={{ height: 30 }} alt="" />
        <span style={{ lineHeight: "32px", color: "#fff", fontSize: 18 }}>
          {" "}
          机械加工管理系统{" "}
        </span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        triggerSubMenuAction="click"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        items={menus}
        openKeys={openKeys}
        onClick={(item) => {
          // console.log(item);
          history.push(item.key);
        }}
        onOpenChange={(openKeys) => {
          // console.log(openKeys[openKeys.length - 1]);
          setOpenKeys([openKeys[openKeys.length - 1]]);
        }}
      />
    </Sider>
  );
};

export default connect((state) => {
  return {
    collapsed: state.getIn(["app", "collapsed"]),
    checkedkeys: state.getIn(["user", "checkedkeys"]),
    adminname: state.getIn(["user", "adminname"]),
  };
})(SiderBar);
