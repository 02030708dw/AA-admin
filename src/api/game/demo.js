import request from '@/utils/request'
// 游戏接口
// 分页数据
export function ServicePage({ pageNo, pageSize, gamerId, name, status }) {
  return request({
    url: '/game/demo/page',
    method: 'get',
    params: { pageNo, pageSize, gamerId, name, status }

  })
}
// 添加
export function ServiceAdd(data) {
  return request({
    url: '/game/demo/add',
    method: 'post',
    data
  })
}
// 删除
export function ServiceDel(id) {
  return request({
    url: `/game/demo/del/${id}`,
    method: 'get'

  })
}
// 状态修改
export function ServiceStatus(data) {
  return request({
    url: '/game/demo/updateStatus',
    method: 'post',
    data
  })
}
// 编辑
export function ServiceEdit(data) {
  return request({
    url: '/game/demo/edit',
    method: 'post',
    data
  })
}

