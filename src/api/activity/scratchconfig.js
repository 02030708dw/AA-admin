import request from '@/utils/request'

// 新增接口
export function ServiceAdd(data) {
    return request({
        url: '/scratch/config/add',
        method: 'post',
        data
    })
}

// 删除
export function ServiceDel(id) {
    return request({
        url: `/scratch/config/del/${id}`,
        method: 'post',
    })
}

// 修改
export function ServiceEdit(data) {
    return request({
        url: `/scratch/config/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/scratch/config/page`,
        method: 'post',
        data
    })
}

// 获取刮刮乐配置名称和id
export function ConfigList() {
    return request({
        url: `/scratch/config/getName`,
        method: 'get',
    })
}