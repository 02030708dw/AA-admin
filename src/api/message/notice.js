// 公告模块
import request from "@/utils/request"

// 分页接口
export function noticePage({ pageNo, pageSize }) {
    return request({
        url: '/msg/note/page',
        method: 'get',
        params: { pageNo, pageSize }
    })
}
// 新增接口
export function addnotice(data) {
    return request({
        url: '/msg/note/add',
        method: 'post',
        data
    })
}
// 删除接口
export function delnotice(id) {
    return request({
        url: `/msg/note/del/${id}`,
        method: 'get'

    })
}
// 修改接口
export function editnotice(data) {
    return request({
        url: '/msg/note/edit',
        method: 'post',
        data
    })
}
// 状态修改
export function updateStatus(data) {
    return request({
        url: '/msg/note/updateStatus',
        method: 'post',
        data
    })
}

