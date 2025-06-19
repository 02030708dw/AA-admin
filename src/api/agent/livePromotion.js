import request from '@/utils/request'
// 分页数据
export function ServicePage(data) {
    return request({
        url: '/livePromotionBenefitRecord/page',
        method: 'post',
        data
    })
}

// 代理直播推广追加福利审核
export function ServiceExamine(data) {
    return request({
        url: '/livePromotionBenefitRecord/examine',
        method: 'post',
        data
    })
}

//获取当前代理直播推广详情
export function ServiceDetail(params) {
    return request({
        url: '/livePromotionBenefitRecord/info',
        method: 'get',
        params
    })
}