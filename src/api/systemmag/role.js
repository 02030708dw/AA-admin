// 角色模块
import request from '@/utils/request'
// 获取角色分页
export function getrolePage({ pageNo, pageSize, code, roleName, status }) {
  return request({
    url: '/sys/role/page',
    method: 'get',
    params: { pageNo, pageSize, code, roleName, status }
  })
}
// 角色新增
export function getroleAdd(data) {
  return request({
    url: '/sys/role/add',
    method: 'post',
    data
  })
}
// 角色删除
export function getroleDel(id) {
  return request({
    url: `/sys/role/del/${id}`,
    method: 'get'
  })
}
// 角色编辑
export function getroleEdit(data) {
  return request({
    url: '/sys/role/edit',
    method: 'post',
    data
  })
}
// 角色状态修改
export function getroleupdateStatus(data) {
  return request({
    url: '/sys/role/updateStatus',
    method: 'post',
    data
  })
}

// 获取树形结构权限信息
export function getAuthorityTtree(roleId) {
  return request({
    url: `/sys/authority/tree/${roleId}`,
    method: 'get',
  })
}

// 角色分配权限
export function addAssignment(data) {
  return request({
    url: '/roleAuthority/assignment',
    method: 'post',
    data
  })
}

// 获取当前登录用户权限信息
export function allByUser() {
  return request({
    url: '/sys/authority/allByUser',
    method: 'get',
  })
}