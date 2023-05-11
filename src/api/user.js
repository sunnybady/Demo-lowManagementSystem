import axios from '../utils/request'

// 管理员系统登录的接口封装
export function loginFn (params) {
    return axios({
        url: '/admin/login',
        method: 'post',
        data: params
    })
}

// 获取用户列表
export function getUserList () {
    return axios({
        url: '/user/list',
        method: 'get'
    })
}

// 获取管理员列表
export function getAdminList () {
    return axios({
        url: '/admin/list',
        method: 'get'
    })
}

// 添加管理员
export function addAdmin (params) {
    return axios({
        url: '/admin/add',
        method: 'post',
        data: params
    })
}

// 修改管理员
export function updateAdmin (params) {
    return axios({
        url: '/admin/update',
        method: 'post',
        data: params
    })
}

// 删除管理员
export function deleteAdmin (params) {
    return axios({
        url: '/admin/delete',
        method: 'post',
        data: params
    })
}