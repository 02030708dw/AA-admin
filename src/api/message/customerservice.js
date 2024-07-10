// 活动
import request from '@/utils/request'

// 新增接口
export function customerServiceAdd(data) {
    return request({
        url: '/customerService/add',
        method: 'post',
        data
    })
}

// 前台查询启用活动
export function customerServiceClient(type) {
    return request({
        url: `/customerService/client/${type}`,
        method: 'get',
    })
}

// 删除
export function customerServiceDel(id) {
    return request({
        url: `/customerService/del/${id}`,
        method: 'get',
    })
}

// 修改
export function customerServiceEdit(data) {
    return request({
        url: `/customerService/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function customerServicePage(data) {
    return request({
        url: `/customerService/page`,
        method: 'post',
        data
    })
}

// 停启用
export function customerServiceStatus(data) {
    return request({
        url: `/customerService/status`,
        method: 'post',
        data
    })
}
