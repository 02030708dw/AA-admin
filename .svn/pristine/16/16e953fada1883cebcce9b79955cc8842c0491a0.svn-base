// 会员提现管理
import request from '@/utils/request'

// 分页数据
export function MemberwithdrawalPage({ pageNo, pageSize, aduitStatus, cashChannelId, memberId }) {
  return request({
    url: '/finance/memberCashRecord/page',
    method: 'get',
    params: { pageNo, pageSize, aduitStatus, cashChannelId, memberId }
  })
}

// 会员提现审核
export function Audit(data) {
  return request({
    url: '/finance/memberCashRecord/audit',
    method: 'post',
    data
  })
}
