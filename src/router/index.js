// 路由配置文件
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import React from "react";

const menus = [
  {
    key: "/",
    icon: <UserOutlined />,
    label: "系统首页",
    title: "系统首页",
    component: React.lazy(() => import("../views/home/Index")),
  },
  {
    key: "/user",
    icon: <VideoCameraOutlined />,
    label: "账号管理",
    title: "账号管理",
    children: [
      {
        key: "/user/list",
        icon: <UserOutlined />,
        label: "用户列表",
        title: "用户列表",
        component: React.lazy(() => import("../views/user/Index")),
      },
      {
        key: "/user/admin",
        icon: <UserOutlined />,
        label: "管理员列表",
        title: "管理员列表",
        component: React.lazy(() => import("../views/user/Admin")),
      },
    ],
  },

  {
    key: "/yuancailiao",
    icon: <UploadOutlined />,
    label: "原材料管理",
    title: "原材料管理",
    children: [
      {
        key: "/yuancailiao/ruku",
        icon: <UploadOutlined />,
        label: "入库",
        title: "入库",
        component: React.lazy(() => import("../views/yuancailiao/Ruku")),
      },
      {
        key: "/yuancailiao/tuihuo",
        icon: <UploadOutlined />,
        label: "退货",
        title: "退货",
        component: React.lazy(() => import("../views/yuancailiao/Tuihuo")),
      },
      {
        key: "/yuancailiao/kucun",
        icon: <UploadOutlined />,
        label: "库存",
        title: "库存",
        component: React.lazy(() => import("../views/yuancailiao/Kucun")),
      },
    ],
  },

  {
    key: "/jiagong",
    icon: <UploadOutlined />,
    label: "加工管理",
    title: "加工管理",
    children: [
      {
        key: "/jiagong/chuku",
        icon: <UploadOutlined />,
        label: "出库登记",
        title: "出库登记",
        component: React.lazy(() => import("../views/jiagong/Chuku")),
      },
      {
        key: "/jiagong/ruku",
        icon: <UploadOutlined />,
        label: "入库登记",
        title: "入库登记",
        component: React.lazy(() => import("../views/jiagong/Ruku")),
      },
      {
        key: "/jiagong/tuihui",
        icon: <UploadOutlined />,
        label: "退回登记",
        title: "退回登记",
        component: React.lazy(() => import("../views/jiagong/Tuihui")),
      },
      {
        key: "/jiagong/qianjian",
        icon: <UploadOutlined />,
        label: "欠件统计",
        title: "欠件统计",
        component: React.lazy(() => import("../views/jiagong/Qianjian")),
      },
    ],
  },

  {
    key: "/chengpin",
    icon: <UploadOutlined />,
    label: "成品管理",
    title: "成品管理",
    children: [
      {
        key: "/chengpin/ruku",
        icon: <UploadOutlined />,
        label: "成品入库",
        title: "成品入库",
        component: React.lazy(() => import("../views/chengpin/Ruku")),
      },
      {
        key: "/chengpin/xiaoshou",
        icon: <UploadOutlined />,
        label: "成品销售",
        title: "成品销售",
        component: React.lazy(() => import("../views/chengpin/Xiaoshou")),
      },
      {
        key: "/chengpin/yushengchan",
        icon: <UploadOutlined />,
        label: "成品预生产",
        title: "成品预生产",
        component: React.lazy(() => import("../views/chengpin/Yushengchan")),
      },
    ],
  },
  {
    key: "/data",
    icon: <UploadOutlined />,
    label: "数据可视化",
    title: "数据可视化",
    children: [
      {
        key: "/data/echarts",
        icon: <UploadOutlined />,
        label: "echarts",
        title: "echarts",
        component: React.lazy(() => import("../views/data/Echarts")),
      },
      {
        key: "/data/antcharts",
        icon: <UploadOutlined />,
        label: "AntCharts",
        title: "AntCharts",
        component: React.lazy(() => import("../views/data/AntCharts")),
      },
    ],
  },
  {
    key: "/excel",
    icon: <UploadOutlined />,
    label: "文件处理",
    title: "文件处理",
    children: [
      {
        key: "/excel/import",
        icon: <UploadOutlined />,
        label: "导入 Excel",
        title: "导入 Excel",
        component: React.lazy(() => import("../views/excel/Import")),
      },
      {
        key: "/excel/export",
        icon: <UploadOutlined />,
        label: "导出 Excel",
        title: "导出 Excel",
        component: React.lazy(() => import("../views/excel/Export")),
      },
    ],
  },
  {
    key: "/test",
    icon: <UploadOutlined />,
    label: "测试模块",
    title: "测试模块",
    children: [
      {
        key: "/test/1",
        icon: <UploadOutlined />,
        label: "test1",
        title: "test2",
        component: React.lazy(() => import("../views/test/Test1")),
      },
      {
        key: "/test/2",
        icon: <UploadOutlined />,
        label: "test2",
        title: "test2",
        component: React.lazy(() => import("../views/test/Test2")),
      },
      {
        key: "/test/3",
        icon: <UploadOutlined />,
        label: "test3",
        title: "test3",
        component: React.lazy(() => import("../views/test/Test3")),
      },
    ],
  },
];

export default menus;
