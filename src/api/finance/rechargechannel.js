// 充值渠道管理
import request from '@/utils/request'
// 分页数据
export function channelPage({ pageNo, pageSize }) {
    return request({
        url: '/finance/incomeChannel/page',
        method: 'get',
        params: { pageNo, pageSize },
    })
}
// 新增
export function channelAdd(data) {
    return request({
        url: '/finance/incomeChannel/add',
        method: 'post',
        data
    })
}
// 删除
export function channelDel(id) {
    return request({
        url: `/finance/incomeChannel/del/${id}`,
        method: 'get'
    })
}
// 编辑
export function channelEdit(data) {
    return request({
        url: '/finance/incomeChannel/edit',
        method: 'post',
        data
    })
}
// 状态修改
export function channelUdateStatus(data) {
    return request({
        url: '/finance/incomeChannel/updateStatus',
        method: 'post',
        data
    })
}