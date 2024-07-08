// 活动
import request from '@/utils/request'

// 新增接口
export function activityAdd(data) {
    return request({
        url: '/activity/add',
        method: 'post',
        data
    })
}

// 前台查询启用活动
export function activityClient(type) {
    return request({
        url: `/activity/client/${type}`,
        method: 'get',
    })
}

// 删除
export function activityDel(id) {
    return request({
        url: `/activity/del/${id}`,
        method: 'get',
    })
}

// 修改
export function activityEdit(data) {
    return request({
        url: `/activity/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function activityPage(data) {
    return request({
        url: `/activity/page`,
        method: 'post',
        data
    })
}

// 停启用
export function activityStatus(data) {
    return request({
        url: `/activity/status`,
        method: 'post',
        data
    })
}
