import request from '@/utils/request'

//ip表
export function ipPage(params) {
    return request({
        url: '/login/record/page',
        method: 'GET',
        params
    })
}
