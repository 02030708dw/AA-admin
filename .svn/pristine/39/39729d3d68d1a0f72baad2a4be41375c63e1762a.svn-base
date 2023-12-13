// 充值配置管理
import request from '@/utils/request'
// 分页数据
export function RechargePage({ pageNo, pageSize, channelId, type }) {
  return request({
    url: '/finance/incomeSeting/page',
    method: 'get',
    params: { pageNo, pageSize, channelId, type }

  })
}
// 删除
export function RechargeDel(id) {
  return request({
    url: `/finance/incomeSeting/del/${id}`,
    method: 'get'
  })
}
// 新增
export function RechargeAdd(data) {
  return request({
    url: '/finance/incomeSeting/add',
    method: 'post',
    data
  })
}
// 查询
export function RechargeQuery(channelId) {
  return request({
    url: `/finance/incomeSeting/query/${channelId}`,
    method: 'get'
  })
}
// 编辑
export function RechargeEdit(data) {
  return request({
    url: '/finance/incomeSeting/edit',
    method: 'post',
    data
  })
}
// 状态改变
export function RechargeUdateStatus(data) {
  return request({
    url: '/finance/incomeSeting/updateStatus',
    method: 'post',
    data
  })
}
