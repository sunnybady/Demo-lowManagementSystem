import React, { useEffect, useState } from "react";

import { Button, Table } from "antd";

import ExportJsonExcel from "js-export-excel";

const Export = () => {
  const [proList, setProList] = useState();

  useEffect(() => {}, []);

  const columns = [
    {
      title: "序号",
      render: (t, r, index) => {
        return <span> {index + 1} </span>;
      },
    },
    {
      title: "商品名称",
      dataIndex: "proname",
    },
  ];

  return (
    <div>
      <Button
        onClick={() => {
          let option = {};

          option.fileName = "商品列表";
          option.datas = [
            {
              sheetData: proList,
              sheetName: "pro",
              sheetFilter: ["proname", "img1", "originprice", "category"],
              sheetHeader: ["商品名称", "商品图片", "商品价格", "商品分类"],
              columnWidths: [],
            },
          ];

          var toExcel = new ExportJsonExcel(option); //new
          toExcel.saveExcel(); //保存
        }}
      >
        数据导出
      </Button>

      <Table
        dataSource={proList}
        rowKey="proid"
        pagination={{ pageSize: 6 }}
        columns={columns}
      ></Table>
    </div>
  );
};

export default Export;
