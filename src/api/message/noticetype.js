// 公告类型模块
import request from "@/utils/request"
// 分页接口
export function noticetypePage({ pageNo, pageSize }) {
    return request({
        url: '/msg/noteType/page',
        method: 'get',
        params: { pageNo, pageSize }
    })
}
// 新增接口
export function addnoticetype(data) {
    return request({
        url: '/msg/noteType/add',
        method: 'post',
        data
    })
}
// 删除接口
export function delnoticetype(Id) {
    return request({
        url: '/msg/noteType/del',
        method: 'get',
        params: { Id }
    })
}
// 修改接口
export function editnoticetype(data) {
    return request({
        url: '/msg/noteType/edit',
        method: 'post',
        data
    })
}
// 状态修改
export function updateStatus(data) {
    return request({
        url: '/msg/noteType/updateStatus',
        method: 'post',
        data
    })
}


