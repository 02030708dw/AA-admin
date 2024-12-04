import request from '@/utils/request'

// 新增接口
export function ServiceAdd(data) {
    return request({
        url: '/vip/reward/add',
        method: 'post',
        data
    })
}

// 删除
export function ServiceDel(id) {
    return request({
        url: `/vip/reward/del/${id}`,
        method: 'post',
    })
}

// 修改
export function ServiceEdit(data) {
    return request({
        url: `/vip/reward/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/vip/reward/page`,
        method: 'post',
        data
    })
}