// 会员充值管理
import request from '@/utils/request'

// 分页列表
export function MemberrechargelPage({ pageNo, pageSize, amount, auditStatus, cardNo, channelId, date, memberId }) {
  return request({
    url: '/finance/incomeRecord/page',
    method: 'get',
    params: { pageNo, pageSize, amount, auditStatus, cardNo, channelId, date, memberId }
  })
}

// 会员充值审核
export function MemberrechargelToexamine(data) {
  return request({
    url: '/finance/incomeRecord/audit',
    method: 'post',
    data
  })
}
