// 用户管理
import request from '@/utils/request'
//分页数据
export function userPage({ pageNo, pageSize }) {
    return request({
        url: '/sys/admin/page',
        method: 'get',
        params: { pageNo, pageSize },
    })
}
// 删除用户
export function userDel(id) {
    return request({
        url: `/sys/admin/del/${id}`,
        method: "get",
    })
}
// 添加用户
export function userAdd(data) {
    return request({
        url: '/sys/admin/add',
        method: 'post',
        data
    })
}
// 编辑用户
export function userEitor(data) {
    return request({
        url: '/sys/admin/edit',
        method: 'post',
        data
    })
}
// 用户状态修改
export function userUpdateStatus(data) {
    return request({
        url: '/sys/admin/updateStatus',
        method: 'post',
        data
    })
}