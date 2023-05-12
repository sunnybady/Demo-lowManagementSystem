import React from "react";
import { Table, Progress, Button, Space, Dropdown, Menu } from "antd";

const Ruku = () => {
  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "num",
    },
    {
      title: "零件号",
      dataIndex: "pro",
      key: "pro",
      render: (text) => <a></a>,
    },
    {
      title: "所属厂房",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "生产线",
      dataIndex: "line",
      key: "line",
    },
    {
      title: "进度",
      key: "speed",
      dataIndex: "speed",
      render: (t, r, i) => {
        return <Progress percent={t} steps={5} />;
      },
    },
    {
      title: "操作",
      key: "opr",
      render: (t, r, i) => {
        return (
          <Space size="middle">
            <Dropdown overlay={menu.bind(this, r)} record={r}>
              <a>操作</a>
            </Dropdown>
          </Space>
        );
      },
    },
  ];
  const data = [
    {
      key: "1",
      pro: "1号产品",
      room: "一号车间",
      line: "第一条",
      speed: 30,
    },
    {
      key: "2",
      pro: "2号产品",
      room: "二号车间",
      line: "第二条",
      speed: 60,
    },
    {
      key: "3",
      pro: "3号产品",
      room: "三号车间",
      line: "第三条",
      speed: 100,
    },
  ];

  const handleChildActions = (row, key) => {
    console.log("子基金操作:", row, key);
    if (key === "adjustment") {
      console.log("子基金调仓：");
    } else {
      console.log("子基金赎回：");
    }
  };

  const menu = (record) => {
    return (
      <Menu onClick={handleChildActions(record)} record={record}>
        <Menu.Item key="adjustment">
          <span>调仓</span>
        </Menu.Item>
        <Menu.Item key="redemption">
          <span>赎回</span>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div>
      加工管理入库
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};

export default Ruku;
