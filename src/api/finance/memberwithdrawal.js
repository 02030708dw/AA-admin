// 会员提现管理
import request from '@/utils/request'

// 分页数据
export function MemberwithdrawalPage(params) {
  return request({
    url: '/finance/memberCashRecord/page',
    method: 'get',
    params
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

// 待审核数量
export function toBeReviewed() {
  return request({
    url: '/finance/memberCashRecord/toBeReviewed',
    method: 'get',
  })
}