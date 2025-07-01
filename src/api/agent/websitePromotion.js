import request from '@/utils/request'
// 分页数据
export function ServicePage(data) {
    return request({
        url: '/websitePromotion/page',
        method: 'post',
        data
    })
}

// 网站推广审核
export function ServiceExamine(data) {
    return request({
        url: '/websitePromotion/review',
        method: 'post',
        data
    })
}
