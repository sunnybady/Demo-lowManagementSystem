import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Cascader } from "antd";
import SelectAll from "./SelectAll";
import { getListOptions } from "../api/mock/test";

const MyModal = (props) => {
  let { title, openModalFn, vis, modals, increaseModal } = props;
  const [boxVisable, setBoxVisable] = useState(false);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    console.log("vis:", vis);
    getListOptions().then((res) => {
      setOptions(res);
    });
    setBoxVisable(vis);
  }, [vis]);

  //表单提交
  const onFinish = (values) => {
    openModalFn(false);
    console.log(values);
    increaseModal(values);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onChange = (value) => {
    console.log(value);
  };

  return (
    <Modal
      title={title}
      centered
      open={boxVisable}
      onCancel={() => openModalFn(false)}
      width={400}
      footer={null}
    >
      <Form
        onFinish={onFinish}
        style={{
          maxWidth: 400,
        }}
      >
        <Form.Item name={["ycl", "date"]} label={modals.date}>
          <Input />
        </Form.Item>
        <Form.Item name={["ycl", "odd"]} label={modals.odd}>
          <Input />
        </Form.Item>
        <Form.Item name={["ycl", "company"]} label={modals.company}>
          <Input />
        </Form.Item>
        <Form.Item name={["ycl", "name"]} label={modals.name}>
          <Input />
        </Form.Item>
        <Form.Item name={["ycl", "tell"]} label={modals.tell}>
          <Input value={1} readOnly={true} />
        </Form.Item>
        <Form.Item name={["ycl", "note"]} label={modals.note}>
          <Cascader
            options={options}
            onChange={onChange}
            placeholder="请选择"
          ></Cascader>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MyModal;
