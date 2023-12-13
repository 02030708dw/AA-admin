// 代理提现
import request from '@/utils/request'

// 分页数据
export function AgentWtihdrawalPage({ pageNo, pageSize, aduitStatus, agentId, cashChannelId }) {
  return request({
    url: '/finance/agentCashRecord/page',
    method: 'get',
    params: { pageNo, pageSize, aduitStatus, agentId, cashChannelId }
  })
}
