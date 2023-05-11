import React, { Component } from "react";
import { Select } from "antd";
const Option = Select.Option;

class SelectAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }
  componentDidMount() {
    this.setState({ value: this.props.record.major_id });
  }
  handleChange = (value) => {
    // 第一个是全选 再选择其他时，去掉全选
    // 第一个不是全选 而后再选全选时，只保留全选
    // 第一个是全选 且只有全选时，只保留全选
    if (value[0] === "0" && value.length > 1) {
      this.setState({ value: value.filter((item) => item !== "0") }, () => {
        this.props.changeMajor(this.state.value);
      });
    } else if (
      (value[0] !== "0" && new Set(value).has("0")) ||
      (value[0] === "0" && value.length === 1)
    ) {
      this.setState({ value: "0" }, () => {
        this.props.changeMajor(this.props.majorList.map((item) => item.id));
      });
    } else {
      this.setState({ value }, () => {
        this.props.changeMajor(this.state.value);
      });
    }
  };

  render() {
    const { majorList } = this.props;
    const { value } = this.state;
    return (
      <Select
        value={value}
        onChange={this.handleChange}
        allowClear
        showSearch
        placeholder="请选择发布专业"
        style={{ width: 300 }}
        mode="multiple"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option key="0" value="0">
          全选
        </Option>
        {majorList.map((item) => {
          return (
            <Option key={item.id} value={item.id}>
              {item.major_name}
            </Option>
          );
        })}
      </Select>
    );
  }
}
export default SelectAll;
