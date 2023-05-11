import React from "react";
import { Form, Input, Button, Select } from "antd";

const SearchForm = (props) => {
  const [form] = Form.useForm();

  const reset = () => {
    form.resetFields();
    props.onSearch({});
  };

  const onSearch = () => {
    form.validateFields().then((res) => {
      props.onSearch(res);
    });
  };
  return (
    <div>
      <Form
        className="layout_search"
        from={form}
        layout="inline"
        onFinish={onSearch}
      >
        {props.formList.map((item) => (
          <Form.Item label={props.showLabel !==false && item.label?item.label}></Form.Item>
        ))}
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

export default SearchForm;
