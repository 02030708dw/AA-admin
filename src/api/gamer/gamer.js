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

// 同步游戏商下游戏图片
export function synchronizePhotos(gamerCode) {
  return request({
    url: `/game/game/synchronizePhotos/${gamerCode}`,
    method: 'get',
  })
}

//游戏商类型对应游戏商分页查询
export function gamerTypePage(params) {
  return request({
    url: `/gamertype/page`,
    method: 'get',
    params
  })
}

//游戏商类型对应游戏商状态修改
export function gamerTypeUpdateStatus(data) {
  return request({
    url: `/gamertype/updateStatus`,
    method: 'post',
    data
  })
}
