// 报表管理接口
import request from '@/utils/request'

// 代理报表
export function getAgentPages({ pageNo, pageSize, agentId, endDay, startDay }) {
  return request({
    url: '/report/agent',
    method: 'get',
    params: { pageNo, pageSize, agentId, endDay, startDay }
  })
}
// 游戏商报表
export function getGamerPages({ pageNo, pageSize, gamerId, endDay, startDay }) {
  return request({
    url: '/report/gamer',
    method: 'get',
    params: { pageNo, pageSize, gamerId, endDay, startDay }
  })
}
// 会员报表
export function getMemberPages({ pageNo, pageSize, memberId, endDay, startDay }) {
  return request({
    url: '/report/member',
    method: 'get',
    params: { pageNo, pageSize, memberId, endDay, startDay }
  })
}
// 平台报表
export function getPlatformPages({ pageNo, pageSize, endDay, startDay }) {
  return request({
    url: '/report/plantform',
    method: 'get',
    params: { pageNo, pageSize, endDay, startDay }
  })
}
