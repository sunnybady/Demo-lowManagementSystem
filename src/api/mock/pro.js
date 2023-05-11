import ajax from "../../utils/request.js";
//导入 mock 文件

import "../../mock/pro";

//获取产品列表
export function getProList() {
  return ajax({
    //mock中定义的接口
    url: "/getpro",
  });
}

//新增产品
export function addPro(params) {
  return ajax({
    url: "/addpro",
    method: "post",
    data: params,
  });
}

//修改会员
export function editPro(params) {
  return ajax({
    // mock 中定义的接口
    url: "/editpro",
    method: "post",
    data: params,
  });
}

// 删除的会员
export function delPro(params) {
  return ajax({
    // mock 中定义的接口
    url: "/delpro",
    method: "post",
    data: params,
  });
}

//查找会员
export function searchPro(params) {
  return ajax({
    url: "/searchpro",
    method: "post",
    data: params,
  });
}
