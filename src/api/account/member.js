import request from '@/utils/request'
// 会员管理

// 分页数据
export function MemberPage({ pageNo, pageSize, agentId, status, userName }) {
  return request({
    url: '/user/member/page',
    method: 'get',
    params: { pageNo, pageSize, agentId, status, userName }
  })
}

// 转移
export function MemberTransfer(data) {
  return request({
    url: '/user/member/transferMemberForParent',
    method: 'post',
    data
  })
}
export function agentTransfer(data) {
  return request({
    url: '/user/member/transferMemberForAgent',
    method: 'post',
    data
  })
}
// 修改状态
export function MemberUpdateStatus(data) {
  return request({
    url: '/user/member/updateStatus',
    method: 'post',
    data
  })
}
// 获取会员资金流水
export function MemberFlowingWater({ memberId, pageNo, pageSize, type }) {
  return request({
    url: '/user/member/flow',
    method: 'GET',
    params: { memberId, pageNo, pageSize, type }
  })
}
// 获取会员好友列表
export function MemberFriends({ memberId, pageNo, pageSize }) {
  return request({
    url: '/user/member/friend',
    method: 'GET',
    params: { memberId, pageNo, pageSize }
  })
}
// 获取会员游戏商余额列表
export function MemberBalanceList({ memberId }) {
  return request({
    url: `/user/member/gamerBlance/${memberId}`,
    method: 'GET'
  })
}
// 获取会员历史投注信息
export function MemberHistory({ memberId, pageNo, pageSize, gammerId }) {
  return request({
    url: '/user/member/friend',
    method: 'GET',
    params: { memberId, pageNo, pageSize, gammerId }
  })
}

// 重置密码
export function MemberresettingPwd({ memberId }) {
  return request({
    url: `/user/member/resetPwd/${memberId}`,
    method: 'get'
  })
}
