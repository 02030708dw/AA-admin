import request from '@/utils/request'


// 分页查询
export function ServicePage(data) {
    return request({
        url: `/voucherLink/page`,
        method: 'post',
        data
    })
}

