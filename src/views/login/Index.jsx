import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./index.scss";

import { loginFn } from "../../api/mock/login";

import { useHistory } from "react-router-dom";

import { connect } from "react-redux";

const App = ({ login }) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    // loginFn(values).then(res => {
    //     console.log(res);

    //     // 登录成功了
    //     // 跳转到首页
    //     history.push('/')
    // })

    login(values).then(() => {
      // 登录处理完成后的操作
      // 跳转到首页
      history.push("/");
    });
  };
  //重置表单
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div style={{ backgroundColor: "#38B0DE", height: "100%" }}>
      <h1 className="login-title">机械加工管理系统</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="adminname"
          rules={[{ required: true, message: "管理员账号不能为空!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入管理员账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "密码不能为空!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入管理员密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href=" ">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          <Button
            className="reset-form-button"
            htmlType="button"
            onClick={onReset}
          >
            重置
          </Button>
          <a href=" ">去注册!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(null, (dispatch) => {
  return {
    login(params) {
      return new Promise((resolve) => {
        // console.log('qqqqqqqqq', params);
        loginFn(params).then((res) => {
          if (res.code === "10003") {
            // 密码错误
            message.error("密码错误");
          } else if (res.code === "10005") {
            // 账号不存在
            message.error("账号不存在");
          } else if (res.code === "200") {
            // 登录成功
            message.success("登录成功");

            // 登录成功之后的处理
            // 本地保留用户登录信息
            localStorage.setItem("loginState", true);
            localStorage.setItem("adminname", res.data.adminname);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem(
              "checkedkeys",
              JSON.stringify(res.data.checkedkeys)
            );

            // 修改全局状态中的属性
            dispatch({ type: "CHANGE_LOGIN_STATE", payload: true });
            dispatch({
              type: "CHANGE_ADMIN_NAME",
              payload: res.data.adminname,
            });
            dispatch({ type: "CHANGE_TOKEN", payload: res.data.token });
            dispatch({ type: "CHANGE_ROLE", payload: res.data.role });
            dispatch({
              type: "CHANGE_CHECKEDKEYS",
              payload: res.data.checkedkeys,
            });

            // 告诉展示组件我们登录处理完成了，你可以进行跳转到想要跳转的页面了
            resolve();
          } else {
            // 我也不知道你是在搞什么
            message.warning("我也不知道你是在搞什么");
          }
        });
      });
    },
  };
})(App);
