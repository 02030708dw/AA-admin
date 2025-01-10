import request from '@/utils/request'

// 新增接口
export function ServiceAdd(data) {
    return request({
        url: '/redpacket/config/add',
        method: 'post',
        data
    })
}

// 删除
export function ServiceDel(id) {
    return request({
        url: `/redpacket/config/del/${id}`,
        method: 'post',
    })
}

// 修改
export function ServiceEdit(data) {
    return request({
        url: `/redpacket/config/edit`,
        method: 'post',
        data
    })
}

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/redpacket/config/page`,
        method: 'post',
        data
    })
}