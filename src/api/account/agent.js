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
export function TransferAgent(data) {
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

// 添加代理
export function AddAgent(data) {
  return request({
    url: '/user/agent/addByAdmin',
    method: 'post',
    data
  })
}

// 查询下级代理列表
export function AagentGetList(agentId) {
  return request({
    url: `/user/agent/getList/${agentId}`,
    method: 'get',
  })
}

// 获取下级代理下拉列表
export function OldAgentList(agentId) {
  return request({
    url: `/user/agent/oldAgentList/${agentId}`,
    method: 'get',
  })
}

// 获取目标代理下拉列表
export function TargetAgentList(agentId) {
  return request({
    url: `/user/agent/targetAgentList/${agentId}`,
    method: 'get',
  })
}

// 修改代理
export function EditAgent(params) {
  return request({
    url: `/user/agent/update`,
    method: 'get',
    params
  })
}

// 直接创建代理
export function CreateAgent(data) {
  return request({
    url: `/user/agent/application/create`,
    method: 'POST',
    data
  })
}