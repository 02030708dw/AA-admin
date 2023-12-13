// 权限管理
import request from "@/utils/request"

// 分页数据
export function getAuthorityPage({ pageNo, pageSize }) {
    return request({
        url: '/sys/authority/page',
        method: 'get',
        params: { pageNo, pageSize }
    })
}

// 添加
export function getAuthorityAdd(data) {
    return request({
        url: '/sys/authority/add',
        method: 'post',
        data
    })
}
// 删除
export function getAuthorityDel(id) {
    return request({
        url: `/sys/authority/del/${id}`,
        method: 'get'
    })
}
// 编辑
export function getAuthorityEdit(data) {
    return request({
        url: '/sys/authority/edit',
        method: 'post',
        data
    })
}
// 改变状态
export function getAuthorityUdateStatus(data) {
    return request({
        url: '/sys/authority/updateStatus',
        method: 'post',
        data
    })
}