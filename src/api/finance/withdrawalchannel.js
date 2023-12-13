// 充值配置管理
import request from '@/utils/request'
// 分页数据
export function WithdrawalchannelsPage({ pageNo, pageSize, name, status, type }) {
  return request({
    url: '/finance/cashChannel/page',
    method: 'get',
    params: { pageNo, pageSize, name, status, type }

  })
}
// 删除
export function WithdrawalchannelsDel(id) {
  return request({
    url: `/finance/cashChannel/del/${id}`,
    method: 'get'
  })
}
// 新增
export function WithdrawalchannelsAdd(data) {
  return request({
    url: '/finance/cashChannel/add',
    method: 'post',
    data
  })
}
// 编辑
export function WithdrawalchannelsEdit(data) {
  return request({
    url: '/finance/cashChannel/edit',
    method: 'post',
    data
  })
}
// 状态改变
export function WithdrawalchannelsUdateStatus(data) {
  return request({
    url: '/finance/cashChannel/updateStatus',
    method: 'post',
    data
  })
}
