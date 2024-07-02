import request from '@/utils/request'
// 游戏商信息

// 分页数据
export function gamerPage({ pageNo, pageSize, name, status }) {
  return request({
    url: '/game/gamer/page',
    method: 'get',
    params: { pageNo, pageSize, name, status }

  })
}
// 添加
export function gamerAdd(data) {
  return request({
    url: '/game/gamer/add',
    method: 'post',
    data
  })
}
// 删除
export function gamerDel({ id }) {
  return request({
    url: `/game/gamer/del/${id}`,
    method: 'get'

  })
}
// 编辑
export function gamerEdit(data) {
  return request({
    url: '/game/gamer/edit',
    method: 'post',
    data
  })
}
// 状态修改
export function gamerupdateStatus(data) {
  return request({
    url: '/game/gamer/updateStatus',
    method: 'post',
    data
  })
}
// 绑定游戏商游戏类型
export function gamerbind(data) {
  return request({
    url: '/game/gamer/bind',
    method: 'post',
    data
  })
}
// 创建游戏商用户
export function gamerCreateUser(params) {
  return request({
    url: '/game/gamer/createGamerUser',
    method: 'post',
    params:{
      ...params
    }
  })
}
