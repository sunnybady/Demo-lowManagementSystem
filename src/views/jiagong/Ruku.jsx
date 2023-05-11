import React from "react";
import { Table, Progress, Button } from "antd";

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
          <div>
            {r.speed === 100 ? <Button>入库</Button> : <Button>暂缓</Button>}
          </div>
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
  return (
    <div>
      加工管理入库
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};

export default Ruku;
