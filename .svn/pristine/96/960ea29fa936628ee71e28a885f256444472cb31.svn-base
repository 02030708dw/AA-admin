// 代理管理
import request from '@/utils/request'

// 分页数据
export function AgentPage({ pageNo, pageSize, status, userName }) {
  return request({
    url: '/user/agent/page',
    method: 'get',
    params: { pageNo, pageSize, status, userName }
  })
}

// 转移
export function AgentTransfer(data) {
  return request({
    url: '/user/agent/transferAgent',
    method: 'post',
    data
  })
}
// 修改状态
export function AgentUpdateStatus(data) {
  return request({
    url: '/user/agent/updateStatus',
    method: 'post',
    data
  })
}
