import request from '@/utils/request'

// 新增接口
export function ServiceAdd(data) {
    return request({
        url: '/scratch/member/add',
        method: 'post',
        data
    })
}

// 删除
export function ServiceDel(id) {
    return request({
        url: `/scratch/member/del/${id}`,
        method: 'post',
    })
}

// 修改
export function ServiceEdit(data) {
    return request({
        url: `/scratch/member/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/scratch/member/page`,
        method: 'post',
        data
    })
}