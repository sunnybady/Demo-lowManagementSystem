import React, { useState, useEffect } from "react";
import { Input, Button, Space, DatePicker, Table } from "antd";
import "./ruku.scss";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import MyModal from "../../components/MyModal";
import ExportJsonExcel from "js-export-excel";
import {
  getProList,
  searchPro,
  delPro,
  editPro,
  addPro,
} from "../../api/mock/pro";
const Ruku = () => {
  const { RangePicker } = DatePicker;
  const [proList, setProList] = useState();
  //删除的数据
  const [selectList, setSelectList] = useState();

  useEffect(() => {
    getProList().then((res) => {
      console.log(res);
      setProList(res);
    });
  }, []);
  //增加数据
  const increaseModalFn = (value) => {
    addPro(value).then((res) => {
      console.log("增加成功");
      getProList().then((res) => {
        console.log(res);
        setProList(res);
      });
    });
  };

  //新增表格的标题
  const addModal = {
    date: "入库日期",
    odd: "入库单号",
    company: "供商名称",
    name: "联系人",
    tell: "电话",
    note: "备注",
  };
  //表格数据
  const columns = [
    {
      title: "操作",
      align: "center",
      render: (t, c, i) => {
        return (
          <>
            <button
              className="min-button"
              onClick={() => {
                delPro(c.key).then((res) => {
                  console.log("删除成功");
                  getProList().then((res) => {
                    console.log(res);
                    setProList(res);
                  });
                });
              }}
            >
              删除
            </button>
            <button
              className="min-button"
              onClick={() => {
                console.log(t, c, i);
                openModalFn(true);
              }}
            >
              修改
            </button>
            <button className="min-button">查看</button>
          </>
        );
      },
    },
    {
      title: "入库明细",
      width: 100,
      align: "center",
      render: () => {
        return (
          <Button type="link" block>
            [入库明细]
          </Button>
        );
      },
    },
    {
      title: "入库日期",
      align: "center",
      dataIndex: "date",
    },

    {
      title: "入库单号",
      align: "center",
      dataIndex: "odd",
    },

    {
      title: "供商名称",
      align: "center",
      dataIndex: "company",
    },
    {
      title: "联系人",
      align: "center",
      width: 80,
      dataIndex: "name",
    },
    {
      title: "联系电话",
      align: "center",
      width: 100,
      dataIndex: "tell",
    },
    {
      title: "备注",
      align: "center",
      dataIndex: "note",
    },
  ];
  //查询
  const [ruOdd, setRuOdd] = useState();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ");
      setSelectList(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  //提示框的状态
  const [visiable, setVisiable] = useState(false);
  const openModalFn = (flag) => {
    setVisiable(flag);
  };

  return (
    <div style={{ overflow: "auto" }}>
      <div className="search">
        <p className="input-title">入库明细</p>
        <Input className="input" />
        <p className="input-title">入库日期</p>
        <Space direction="vertical" size={12} className="dateInput">
          <RangePicker
            locale={locale}
            style={{ width: "220px", marginRight: "10px" }}
          />
        </Space>
        <p className="input-title">入库单号</p>
        <Input
          className="input"
          value={ruOdd}
          onChange={(e) => {
            setRuOdd(e.target.value);
          }}
        />
        <Button
          className="button"
          onClick={() => {
            searchPro(ruOdd).then((res) => {
              setProList(res);
              setRuOdd("");
            });
          }}
        >
          查询
        </Button>
        <Button
          className="button"
          onClick={() => {
            openModalFn(true);
          }}
        >
          增加
        </Button>
        <Button
          className="button"
          onClick={() => {
            selectList.forEach((item) => {
              delPro(item.key).then((res) => {
                console.log("删除成功");
                getProList().then((res) => {
                  setProList(res);
                });
              });
            });
          }}
        >
          删除
        </Button>
        <Button className="button">刷新</Button>
        <Button
          className="button"
          onClick={() => {
            let option = {};

            option.fileName = "入库列表";
            option.datas = [
              {
                sheetData: { proList },
                sheetName: "pro",
                sheetFilter: ["date", "odd", "company", "tell", "name", "note"],
                sheetHeader: [
                  "入库日期",
                  "入库单号",
                  "供商名称",
                  "电话",
                  "联系人",
                  "备注",
                ],
                columnWidths: [],
              },
            ];

            var toExcel = new ExportJsonExcel(option); //new
            toExcel.saveExcel(); //保存
          }}
        >
          导出
        </Button>
      </div>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={proList}
        scroll={{ y: 300 }}
      />
      <MyModal
        title="原材料新增-入库"
        vis={visiable}
        openModalFn={openModalFn}
        modals={addModal}
        increaseModal={increaseModalFn}
      ></MyModal>
    </div>
  );
};

export default Ruku;
