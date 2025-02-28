import request from '@/utils/request'
// 会员管理

// 分页数据
export function MemberPage(params) {
  return request({
    url: '/user/member/page',
    method: 'get',
    params
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
export function MemberHistory({ memberId, pageNo, pageSize, gammerId, startTime, endTime }) {
  return request({
    url: '/user/member/history',
    method: 'GET',
    params: { memberId, pageNo, pageSize, gammerId, startTime, endTime }
  })
}

// 重置密码
export function MemberresettingPwd({ memberId }) {
  return request({
    url: `/user/member/resetPwd/${memberId}`,
    method: 'get'
  })
}

// 会员游戏商余额列表刷新
export function MemberRefreshBalance({ memberId }) {
  return request({
    url: `/user/member/reloadBlance/${memberId}`,
    method: 'get'
  })
}

// 会员余额加减
export function MemberUpdatebalance(data) {
  return request({
    url: '/user/member/changeBalance',
    method: 'post',
    data
  })
}

// 会员修改
export function MemberEdit(data) {
  return request({
    url: '/user/member/edit',
    method: 'post',
    data
  })
}

// 获取原代理的会员下拉列表
export function OldAgentList(agentId) {
  return request({
    url: `/user/member/OldMemberList/${agentId}`,
    method: 'get',
  })
}

// 获取目标代理下拉列表
export function TargetAgentList(agentId) {
  return request({
    url: `/user/member/targetAgentList/${agentId}`,
    method: 'get',
  })
}

// 获取下级会员下拉列表
export function OldMemberList(memberId) {
  return request({
    url: `/user/member/OldMemberList/${memberId}`,
    method: 'get',
  })
}

// 获取目标上级会员下拉列表
export function TargetMemberList(memberId) {
  return request({
    url: `/user/member/targetMemberList/${memberId}`,
    method: 'get',
  })
}

// 获取目标上级会员下拉列表
export function MemberflowPage(params) {
  return request({
    url: `/memberflow/page`,
    method: 'get',
    params
  })
}

// 根据地区获取支持银行列表
export function financeCashBank(currency) {
  return request({
    url: `/finance/cashBank/${currency}`,
    method: 'get',
  })
}

// 批量获取游戏商余额
export function getGamerBalance(data) {
  return request({
    url: `/user/member/getGamerBalance`,
    method: 'post',
    data
  })
}

// 给会员修改三方支付商展示顺序信息
export function editPayment(data) {
  return request({
    url: `/user/member/editPayment`,
    method: 'post',
    data
  })
}

// 所属代理转移
export function agentTransfer(data) {
  return request({
    url: `/user/member/agentTransfer`,
    method: 'post',
    data
  })
}
