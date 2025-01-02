import request from '@/utils/request'

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/scratch/memberRecord/page`,
        method: 'post',
        data
    })
}