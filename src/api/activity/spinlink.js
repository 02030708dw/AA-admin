import request from '@/utils/request'


// 分页查询
export function ServicePage(data) {
    return request({
        url: `/spinLink/page`,
        method: 'post',
        data
    })
}

