import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

const Xiaoshou = () => {
  return (
    <Timeline>
      <Timeline.Item color="green">销售第1步</Timeline.Item>
      <Timeline.Item color="green">销售第2步</Timeline.Item>
      <Timeline.Item color="green">销售第3步</Timeline.Item>
      <Timeline.Item>销售第4步</Timeline.Item>
      <Timeline.Item>销售第5步</Timeline.Item>
      <Timeline.Item>销售第6步</Timeline.Item>
      <Timeline.Item>销售第7步</Timeline.Item>
      <Timeline.Item dot={<SmileOutlined />}>销售第8步</Timeline.Item>
    </Timeline>
  );
};

export default Xiaoshou;
