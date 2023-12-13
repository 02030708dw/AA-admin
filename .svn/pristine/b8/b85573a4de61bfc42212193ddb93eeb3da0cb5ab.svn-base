// 会员提现管理
import request from '@/utils/request'

// 分页数据
export function MemberwithdrawalPage({ pageNo, pageSize }) {
    return request({
        url: '/finance/memberCashRecord/page',
        method: 'get',
        params: { pageNo, pageSize },
    })
}