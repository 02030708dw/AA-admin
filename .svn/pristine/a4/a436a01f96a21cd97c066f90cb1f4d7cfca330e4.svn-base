import request from '@/utils/request'
// 游戏接口
// 分页数据
export function gamePage({ pageNo, pageSize, gamerId, name, status, type }) {
  return request({
    url: '/game/game/page',
    method: 'get',
    params: { pageNo, pageSize, gamerId, name, status, type }

  })
}
// 添加
export function gameAdd(data) {
  return request({
    url: '/game/game/add',
    method: 'post',
    data
  })
}
// 删除
export function gameDel(id) {
  return request({
    url: `/game/game/del/${id}`,
    method: 'get'

  })
}
// 状态修改
export function gameupdateStatus(data) {
  return request({
    url: '/game/game/updateStatus',
    method: 'post',
    data
  })
}
// 编辑
export function gameEdit(data) {
  return request({
    url: '/game/game/edit',
    method: 'post',
    data
  })
}
