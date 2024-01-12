<template>
  <!-- 显示会员详情 -->
  <el-dialog title="会员详情" :visible.sync="dialogVisible" width="60%" @close="Handelclose">
    <el-tabs v-model="tabsValue" type="border-card" @tab-click="HandelTab">
      <el-tab-pane label="会员资金流水">
        <FlowingWater ref="flowingwaterView" />
      </el-tab-pane>
      <el-tab-pane label="会员好友列表">
        <Friends ref="FriendsView" />
      </el-tab-pane>
      <el-tab-pane label="会员游戏商余额列表">
        <BalanceList ref="BalanceListView" />
      </el-tab-pane>
      <el-tab-pane label="会员历史投注信息">
        <History ref="HistoryView" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
// import {
//   MemberFlowingWater,
//   MemberFriends,
//   MemberBalanceList,
//   MemberHistory } from '@/api/account/member'
//   会员资金流水
import FlowingWater from './FlowingWater.vue'
// 会员好友列表
import Friends from './Friends.vue'
// 会员余额
import BalanceList from './BalanceList.vue'
//  会员历史投注信息
import History from './History.vue'
export default {
  components: {
    FlowingWater,
    Friends,
    BalanceList,
    History
  },
  data() {
    return {
      dialogVisible: false,
      // 会员详情
      MemberInfo: null,
      tabsValue: '0'
    }
  },
  methods: {
    HandelTab(e) {
      console.log('会员好友列表', e)
      switch (e.paneName) {
        case '0':
          // 会员资金流水
          this.$refs.flowingwaterView.memberId = this.MemberInfo.id
          this.$refs.flowingwaterView.getMemberFlowingWater(1)
          break
        case '1':
          // 会员会员好友列表
          this.$refs.FriendsView.memberId = this.MemberInfo.id
          this.$refs.FriendsView.getFriends(1)
          break
        case '2':
          // 会员游戏商余额列表
          this.$refs.BalanceListView.memberId = this.MemberInfo.id
          this.$refs.BalanceListView.getMemberBalanceList(1)
          break
        case '3':
          // 会员历史投注信息
          this.$refs.HistoryView.memberId = this.MemberInfo.id
          this.$refs.HistoryView.getMemberFlowingWater(1)
          break
      }
    },
    // 改变弹窗状态
    HandelUpda(data) {
      this.MemberInfo = data
      this.dialogVisible = !this.dialogVisible
      if (this.dialogVisible) {
        setTimeout(() => {
          this.$refs.flowingwaterView.memberId = this.MemberInfo.id
          this.$refs.flowingwaterView.getMemberFlowingWater(1)
        }, 1000)
      } else {
        this.tabsValue = '0'
      }
    },
    Handelclose() {
      this.tabsValue = '0'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
