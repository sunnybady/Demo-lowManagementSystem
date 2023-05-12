import React from "react";
import { Form, Input, Button, Select } from "antd";

const reset = () => {
  console.log("reset");
};
const Yushengchan = () => {
  return (
    <div>
      <Form>
        <Form.Item label="测试数据" key="1" name="测试数据">
          {true ? <Select /> : <Input></Input>}
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">查询</Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="reset" onClick={reset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Yushengchan;
