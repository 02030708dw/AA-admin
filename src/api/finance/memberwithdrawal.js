// 会员提现管理
import request from '@/utils/request'

// 分页数据
export function MemberwithdrawalPage({ pageNo, pageSize, aduitStatus, cashChannelId, orderNo }) {
  return request({
    url: '/finance/memberCashRecord/page',
    method: 'get',
    params: { pageNo, pageSize, aduitStatus, cashChannelId, orderNo }
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

// 获取三方支付列表
export function ThreePayList() {
  return request({
    url: '/finance/memberCashRecord/threePayList',
    method: 'GET', 
  })
}

// 发起代付
export function PayFor(data) {
  return request({
    url: '/finance/memberCashRecord/fo',
    method: 'POST', 
    data
  })
}