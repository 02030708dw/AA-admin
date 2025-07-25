import request from '@/utils/request'

// 新增接口
export function ServiceAdd(data) {
    return request({
        url: '/bingo/config/add',
        method: 'post',
        data
    })
}

// 删除
export function ServiceDel(id) {
    return request({
        url: `/bingo/config/del/${id}`,
        method: 'post',
    })
}

// 修改
export function ServiceEdit(data) {
    return request({
        url: `/bingo/config/edit`,
        method: 'post',
        data
    })
}


// 分页查询
export function ServicePage(data) {
    return request({
        url: `/bingo/config/page`,
        method: 'post',
        data
    })
}

// 宾果配置id与名称
export function getConfigId(data) {
    return request({
        url: `/bingo/config/getConfigId`,
        method: 'get',
        data
    })
}