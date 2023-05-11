import ajax from "../../utils/request.js";
//导入 mock 文件

import "../../mock/login";

export function loginFn(data) {
  return ajax({
    url: "/login",
    method: "post",
    data,
  });
}
