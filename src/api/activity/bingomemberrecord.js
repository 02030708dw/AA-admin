import request from '@/utils/request'

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/bingo/memberRecord/page`,
        method: 'post',
        data
    })
}

