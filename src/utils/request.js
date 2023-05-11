// src/utils/request.js
import axios from "axios";

const request = axios.create({
  baseURL: "/", //mock的接口
  //baseURL: "http://121.89.205.189:3000/admin",//千峰的服务器
  //baseURL: 'http://10.31.170.51:3001/admin',//老师的服务器
  timeout: 60000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 1. 先获取 token
    const token = localStorage.getItem("token") || "";
    // 2. 设置token
    config.headers.token = token;
    // console.log(config);

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 自定义各种数据请求的 axios
export default function ajax(config) {
  // 数据请求的时候我们需要什么参数
  // 1. 先获取到请求的一些必要参数
  const { url = "", method = "GET", data = {}, headers = {} } = config;

  // 2. 判断我们请求的类型 get  GET  GeT
  switch (method.toUpperCase()) {
    case "GET":
      // get 请求规定配置参数时需要加一个 { params: 我们的参数 }
      return request.get(url, { params: data });
    case "POST":
      // 1. 表单提交数据
      if (headers["content-type"] === "application/x-www-form-url-encoded") {
        // 转换参数类型，格式化数据
        const obj = new URLSearchParams();
        for (const key in data) {
          obj.append(key, data[key]);
        }
        return request.post(url, obj, { headers });
      }

      // 2. 文件数据
      if (headers["content-type"] === "multipart/form-data") {
        // 处理文件的对象
        const obj = new FormData();
        for (const key in data) {
          obj.append(key, data[key]);
        }
        return request.post(url, obj, { headers });
      }

      // 3. json 数据提交
      return request.post(url, data);

    case "PUT":
      // 修改数据 --- 数据的更新

      return request.put(url, data);

    case "DELETE":
      // 删除数据
      return request.delete(url, { data });

    case "PATCH":
      // 更新局部资源
      return request.patch(url, data);
    default:
      // 如果前面全部都不是
      return request.request(config);
  }
}
