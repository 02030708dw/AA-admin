import request from '@/utils/request'

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/voucher/member/page`,
        method: 'post',
        data
    })
}