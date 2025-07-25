import request from '@/utils/request'

// 新增接口
export function ServiceAdd(data) {
    return request({
        url: '/bingo/weight/add',
        method: 'post',
        data
    })
}

// 删除
export function ServiceDel(id) {
    return request({
        url: `/bingo/weight/del/${id}`,
        method: 'post',
    })
}

// 修改
export function ServiceEdit(data) {
    return request({
        url: `/bingo/weight/edit`,
        method: 'post',
        data
    })
}


// 分页查询
export function ServicePage(data) {
    return request({
        url: `/bingo/weight/page`,
        method: 'post',
        data
    })
}

// 宾果权重分组id与名称
export function getWeightConfigId(data) {
    return request({
        url: `/bingo/weight/getConfigId`,
        method: 'get',
        data
    })
}
