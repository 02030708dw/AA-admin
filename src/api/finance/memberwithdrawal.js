// 会员提现管理
import request from '@/utils/request'
import axios from 'axios'
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

// 导出excel
export function memberCashRecordOutput(params) {
  return axios({
    url: process.env.VUE_APP_BASE_API + '/finance/memberCashRecord/output',
    method: 'GET',
    params,
    responseType: 'blob'
  })
}
