import React, { useEffect, useState } from "react";
import { getUserList } from "../../api/user";
import { Table, Button } from "antd";
const Index = () => {
  const [userList, setUserList] = useState();

  useEffect(() => {
    getUserList().then((res) => {
      console.log(res);
      setUserList(res.data);
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
      title: "用户 id",
      dataIndex: "userid",
    },
    {
      title: "手机号",
      dataIndex: "tel",
    },
    {
      title: "操作",
      render: () => {
        return <Button>删除</Button>;
      },
    },
  ];

  return (
    <div>
      用户列表
      <Table
        pagination
        dataSource={userList}
        rowKey="userid"
        columns={columns}
      ></Table>
    </div>
  );
};

export default Index;
