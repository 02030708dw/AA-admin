import request from '@/utils/request'

// 分页查询
export function ServicePage(data) {
    return request({
        url: `/redpacket/record/page`,
        method: 'post',
        data
    })
}