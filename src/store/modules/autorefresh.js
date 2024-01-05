const state = {
  // 会员充值自动刷新开关
  M_Recharge: false,
  // 代理提现自动关系开关
  A_Recharge: false,
  // 会员提现自动刷新开关
  A_T_Recharge: false
}

const mutations = {
  // 开启关闭会员充值自动刷新
  GetUpdataRefreshMRecharge: () => {
    state.M_Recharge = !state.M_Recharge
  },
  // 代理提现自动刷新
  GetUpdataRefreshARecharge: () => {
    state.A_Recharge = !state.A_Recharge
  },
  // 会员提现自动刷新
  GetUpdataRefreshATRecharge: () => {
    state.A_T_Recharge = !state.A_T_Recharge
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
