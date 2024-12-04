import request from '@/utils/request'

// 新增接口
export function ServiceAdd(data) {
    return request({
        url: '/vip/rebateConfig/add',
        method: 'post',
        data
    })
}

// 删除
export function ServiceDel(id) {
    return request({
        url: `/vip/rebateConfig/del/${id}`,
        method: 'post',
    })
}

// 修改
export function ServiceEdit(data) {
    return request({
        url: `/vip/rebateConfig/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/vip/rebateConfig/page`,
        method: 'post',
        data
    })
}