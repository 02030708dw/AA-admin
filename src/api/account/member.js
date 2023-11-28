import request from '@/utils/request'
// 会员管理

//分页数据
export function MemberPage({ pageNo, pageSize }) {
    return request({
        url: '/user/member/page',
        method: 'get',
        params: { pageNo, pageSize },
    })
}

// 转移
export function MemberTransfer(data) {
    return request({
        url: '/user/member/transferMemberForParent',
        method: 'post',
        data
    })
}
export function agentTransfer(data) {
    return request({
        url: '/user/member/transferMemberForAgent',
        method: 'post',
        data
    })
}
// 修改状态
export function MemberUpdateStatus(data) {
    return request({
        url: '/user/member/updateStatus',
        method: 'post',
        data
    })
}