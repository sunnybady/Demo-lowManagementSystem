import React from "react";
import { Table, Tag, Tooltip } from "antd";
const columns = [
  { title: "客户名", dataIndex: "name", key: "name " },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          return (
            <Tooltip title={tag} placement="topRight">
              <Tag color="#0FC6C2" key={tag}>
                {tag}
              </Tag>
            </Tooltip>
          );
        })}
      </>
    ),
  },
];
const dataSource = [
  {
    key: "1",
    name: "王宝强",
    tags: ["nice", "good"],
  },
];
const Kucun = () => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      style={{ width: "200px" }}
    />
  );
};

export default Kucun;
