
import request from '@/utils/request'
// 获取分页数据
export function MemBerrebatesPages({ pageNo, pageSize, gamerId, memberId }) {
  return request({
    url: '/user/memberGamerRate/page',
    method: 'get',
    params: { pageNo, pageSize, gamerId, memberId }
  })
}
// 新增
export function MemBerrebatesAdd(data) {
  return request({
    url: '/user/memberGamerRate/add',
    method: 'post',
    data
  })
}
// 删除
export function MemBerrebatesDel(Id) {
  return request({
    url: `/user/memberGamerRate/del/${Id}`,
    method: 'get'
  })
}
// 修改
export function MemBerrebatesUpda(data) {
  return request({
    url: '/user/memberGamerRate/edit',
    method: 'post',
    data
  })
}
