// 活动
import request from '@/utils/request'

// 新增接口
export function bannerAdd(data) {
    return request({
        url: '/banner/add',
        method: 'post',
        data
    })
}

// 前台查询启用活动
export function bannerClient() {
    return request({
        url: `/banner/client`,
        method: 'get',
    })
}

// 删除
export function bannerDel(id) {
    return request({
        url: `/banner/del/${id}`,
        method: 'get',
    })
}

// 修改
export function bannerEdit(data) {
    return request({
        url: `/banner/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function bannerPage(data) {
    return request({
        url: `/banner/page`,
        method: 'post',
        data
    })
}

// 停启用
export function bannerStatus(data) {
    return request({
        url: `/banner/status`,
        method: 'post',
        data
    })
}
