import request from '@/utils/request'
// 分页数据
export function ServicePage(params) {
  return request({
    url: '/user/agent/application/page',
    method: 'get',
    params
  })
}

// 代理申请审核
export function ServiceExamine(data) {
  return request({
    url: '/user/agent/application/examine',
    method: 'post',
    data
  })
}

