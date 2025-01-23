import request from '@/utils/request'

//代理奖金组分页查询
export function agentBonusGroupPage(data) {
    return request({
        url: `/agentBonusGroup/page`,
        method: 'post',
        data
    })
}

//代理奖金组详情
export function agentBonusGroupInfo(data) {
    return request({
        url: `/agentBonusGroup/info`,
        method: 'post',
        data
    })
}