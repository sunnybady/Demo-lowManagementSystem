import React from "react";
import "./index.scss";
import MyHomeBox from "../../components/MyHomeBox";
import { Input } from "antd";

const Index = () => {
  const onSearch = () => {
    window.alert("回车了");
  };
  return (
    <div className="home">
      <MyHomeBox></MyHomeBox>
      <Input.Search
        className="inputSearch"
        suffix={<div>Q</div>}
        allowClear
        onSearch={onSearch}
        style={{ width: 200 }}
      ></Input.Search>
    </div>
  );
};

export default Index;
