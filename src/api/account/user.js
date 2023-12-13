// 用户管理
import request from '@/utils/request'
// 分页数据
export function userPage({ pageNo, pageSize, userName, status }) {
  return request({
    url: '/sys/admin/page',
    method: 'get',
    params: { pageNo, pageSize, userName, status }
  })
}
// 删除用户
export function userDel(id) {
  return request({
    url: `/sys/admin/del/${id}`,
    method: 'get'
  })
}
// 添加用户
export function userAdd(data) {
  return request({
    url: '/sys/admin/add',
    method: 'post',
    data
  })
}
// 编辑用户
export function userEitor(data) {
  return request({
    url: '/sys/admin/edit',
    method: 'post',
    data
  })
}
// 用户状态修改
export function userUpdateStatus(data) {
  return request({
    url: '/sys/admin/updateStatus',
    method: 'post',
    data
  })
}

// 获取当前用户信息
export function UserInfo() {
  return request({
    url: '/sys/admin/info',
    method: 'get'
  })
}

export function UserEdit(data) {
  return request({
    url: '/sys/admin/edit',
    method: 'post',
    data
  })
}

export function ChangPWD(data) {
  return request({
    url: '/sys/admin/changPWD',
    method: 'post',
    data
  })
}
