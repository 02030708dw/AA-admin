import request from '@/utils/request'

// 新增接口
export function ServiceAdd(data) {
    return request({
        url: '/vip/reward_record/add',
        method: 'post',
        data
    })
}

// 删除
export function ServiceDel(id) {
    return request({
        url: `/vip/reward_record/del/${id}`,
        method: 'post',
    })
}

// 修改
export function ServiceEdit(data) {
    return request({
        url: `/vip/reward_record/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/vip/reward_record/page`,
        method: 'post',
        data
    })
}

//更新会员vip反水
export function SetStatistics(data) {
    return request({
        url: `/vip/reward_record/statistics`,
        method: 'post',
        data
    })
}