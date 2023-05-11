import React, { useEffect, useId, useState } from "react";
import * as echarts from "echarts";
import { Button } from "antd";
const Echarts = () => {
  const mainId = useId();

  // 定义图表类型
  const [types, setTypes] = useState("line");
  // 定义图表的分类
  const [xAxis, setXAxis] = useState([
    "1号",
    "2号",
    "3号",
    "4号",
    "5号",
    "6号",
    "7号",
  ]);
  // 定义图表的数据
  const [series, setSeries] = useState([150, 230, 224, 218, 135, 147, 260]);
  useEffect(() => {
    var myChart = echarts.init(document.getElementById(mainId));

    myChart.setOption({
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: series,
          type: types,
        },
      ],
    });
  }, [mainId, series, types, xAxis]);

  return (
    <div>
      <Button
        onClick={() => {
          setTypes("bar");
        }}
      >
        柱状图
      </Button>
      <Button
        onClick={() => {
          setTypes("pie");
        }}
      >
        饼状图
      </Button>
      <Button
        onClick={() => {
          setTypes("line");
        }}
      >
        折线图
      </Button>
      <Button
        onClick={() => {
          setTypes("scatter");
        }}
      >
        散点图
      </Button>
      <Button
        onClick={() => {
          setXAxis([
            "吃鸡",
            "地下城",
            "穿越火线",
            "QQ糖",
            "流星蝴蝶剑",
            "魔兽",
          ]);
          setSeries([324, 546, 635, 7656, 123, 333]);
        }}
      >
        改变数据
      </Button>
      <div id={mainId} style={{ width: "100%", height: 600 }}></div>
    </div>
  );
};

export default Echarts;
