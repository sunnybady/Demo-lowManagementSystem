import React, { useEffect, useState } from "react";
import {
  addAdmin,
  getAdminList,
  updateAdmin,
  deleteAdmin,
} from "../../api/user";
import {
  Button,
  Drawer,
  Input,
  Select,
  Tree,
  message,
  Table,
  Tag,
  Modal,
} from "antd";
import menus from "../../router/index";
// 导入咱自定义 hooks
import { useTreeData } from "../../utils/hooks/hooks";

// 解构出 Option
const { Option } = Select;

const Admin = () => {
  const list = useTreeData(menus);

  const [adminList, setAdminList] = useState();
  useEffect(() => {
    getAdminList().then((res) => {
      console.log(res);
      setAdminList(res.data);
    });
  }, []);

  const columns = [
    {
      title: "序号",
      render: (t, r, index) => {
        return <span> {index + 1} </span>;
      },
    },
    {
      title: "管理员账号",
      dataIndex: "adminname",
    },
    {
      title: "角色",
      dataIndex: "role",
      render: (t, r, index) => {
        return t === 2 ? (
          <Tag color="processing">超级管理员</Tag>
        ) : (
          <Tag color="success">管理员</Tag>
        );
        // return (
        //     <>
        //         <Tag color="success">管理员</Tag>
        //         <Tag color="processing">超级管理员</Tag>
        //     </>
        // )
      },
    },
    {
      title: "操作",
      render: (t, r, index) => {
        return (
          <>
            <Button
              onClick={() => {
                // 打开窗口
                setIsModalOpen(true);
                // 修改数据
                // 提交数据

                // 将用户数据显示出来
                setAdminname(r.adminname);
                setPassword(r.password);
                setRole(r.role);
                setCheckedKeys(r.checkedKeys);
              }}
            >
              {" "}
              编辑{" "}
            </Button>
            <Button
              onClick={() => {
                deleteAdmin({ adminid: r.adminid }).then((res) => {
                  message.success(res.message);

                  getAdminList().then((res) => {
                    setAdminList(res.data);
                  });
                });
              }}
            >
              {" "}
              删除{" "}
            </Button>
          </>
        );
      },
    },
  ];

  // 添加管理员
  // 定义一个标记打开还是关闭抽屉的属性
  const [open, setOpen] = useState(false);
  function onClose() {
    setOpen(false);
  }

  // 定义管理员账号密码和角色的变量
  const [adminname, setAdminname] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState(1);
  const [checkedKeys, setCheckedKeys] = useState();

  // 添加管理员

  // 编辑管理员
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    // 提交按钮的点击事件
    setIsModalOpen(false);

    // 发送数据请求，将用户最新数据传递给服务器
    updateAdmin({ adminname, password, role, checkedKeys }).then((res) => {
      message.success(res.message);

      getAdminList().then((res) => {
        // console.log(res);
        setAdminList(res.data);
      });

      // 清除表单中的所有内容
      setAdminname("");
      setPassword("");
      setRole(1);
      setCheckedKeys([]);
    });
  };
  const handleCancel = () => {
    // 取消按钮的点击事件
    setIsModalOpen(false);
    // 清除表单中的所有内容
    setAdminname("");
    setPassword("");
    setRole(1);
    setCheckedKeys([]);
  };

  // 编辑管理员

  return (
    <div>
      <h2>管理员列表</h2>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        添加管理员
      </Button>

      {/* 管理员数据渲染 */}
      <Table
        dataSource={adminList}
        pagination={{
          pageSize: 6,
        }}
        rowKey="adminid"
        columns={columns}
      ></Table>

      {/* --------------------- 添加管理员 ------------------- */}
      <Drawer
        title="添加管理员"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Input
          type="text"
          value={adminname}
          onChange={(e) => {
            setAdminname(e.target.value);
          }}
          placeholder="请输入管理员账号"
        ></Input>
        <Input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="请输入管理员密码"
        ></Input>
        <Select
          value={role}
          style={{ width: "100%" }}
          onChange={(val) => {
            setRole(val);
          }}
        >
          <Option value={1}>管理员</Option>
          <Option value={2}>超级管理员</Option>
        </Select>

        <Tree
          defaultExpandAll={true}
          checkable
          treeData={list}
          checkedKeys={checkedKeys}
          onCheck={(checkedKeys) => {
            // console.log(checkedKeys);
            // 获取到选中的权限
            setCheckedKeys(checkedKeys);
          }}
        />

        <Button
          onClick={() => {
            // 获取账号和密码
            // 获取管理员角色
            // 获取选中的权限
            console.log(adminname, password, role, checkedKeys);

            addAdmin({
              adminname,
              password,
              role,
              checkedKeys,
            }).then((res) => {
              console.log(res);

              message.success(res.message);

              // 添加成功后关闭抽屉效果
              setOpen(false);

              // 清除表单中的所有内容
              setAdminname("");
              setPassword("");
              setRole(1);
              setCheckedKeys([]);

              // 添加成功后获取最新的管理员列表
              getAdminList().then((res) => {
                console.log(res);
                setAdminList(res.data);
              });
            });
          }}
        >
          添加
        </Button>
      </Drawer>
      {/* --------------------- 添加管理员 -------------------- */}

      {/* --------------------- 编辑管理员 -------------------- */}
      <Modal
        title="编辑管理员"
        open={isModalOpen}
        cancelText="取消"
        okText="提交"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          type="text"
          value={adminname}
          onChange={(e) => {
            setAdminname(e.target.value);
          }}
          placeholder="请输入管理员账号"
        ></Input>
        <Input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="请输入管理员密码"
        ></Input>
        <Select
          value={role}
          style={{ width: "100%" }}
          onChange={(val) => {
            setRole(val);
          }}
        >
          <Option value={1}>管理员</Option>
          <Option value={2}>超级管理员</Option>
        </Select>

        <Tree
          defaultExpandAll={true}
          checkable
          treeData={list}
          checkedKeys={checkedKeys}
          onCheck={(checkedKeys) => {
            // console.log(checkedKeys);
            // 获取到选中的权限
            setCheckedKeys(checkedKeys);
          }}
        />
      </Modal>
      {/* --------------------- 编辑管理员 -------------------- */}
    </div>
  );
};

export default Admin;
