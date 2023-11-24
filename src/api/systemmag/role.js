// 角色模块
import request from "@/utils/request"
//获取角色分页
export function getrolePage({ pageNo, pageSize }) {
    return request({
        url: '/sys/role/page',
        method: 'get',
        params: { pageNo, pageSize }
    })
}
//角色新增
export function getroleAdd(data) {
    return request({
        url: '/sys/role/add',
        method: 'post',
        data
    })
}
// 角色删除
export function getroleDel(id) {
    return request({
        url: '/sys/role/del',
        method: 'get',
        params: { id }
    })
}
//角色编辑
export function getroleEdit(data) {
    return request({
        url: '/sys/role/edit',
        method: 'post',
        data
    })
}
//角色状态修改
export function getroleupdateStatus(data) {
    return request({
        url: '/sys/role/updateStatus',
        method: 'post',
        data
    })
}







