import request from '@/utils/request'

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/reward/record/page`,
        method: 'post',
        data
    })
}