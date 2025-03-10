<template>
  <!-- 显示会员详情 -->
  <el-dialog :title="$t('MemberDetails')" :visible.sync="dialogVisible" width="60%" @close="Handelclose">
    <el-tabs v-model="tabsValue" type="border-card" @tab-click="HandelTab">
      <el-tab-pane name="0" v-has="'membermag:flow'" :label="$t('Memberfundflow')">
        <FlowingWater ref="flowingwaterView" />
      </el-tab-pane>
      <el-tab-pane name="1" v-has="'membermag:friend'" :label="$t('Memberfriendlist')">
        <Friends ref="FriendsView" />
      </el-tab-pane>
      <el-tab-pane name="2" v-has="'membermag:gamerBlance'" :label="$t('MemberGameProviderBalanceList')">
        <BalanceList ref="BalanceListView" />
      </el-tab-pane>
      <el-tab-pane name="3" v-has="'membermag:history'" :label="$t('Memberhistorybettinginformation')">
        <History ref="HistoryView" />
      </el-tab-pane>
      <el-tab-pane name="4" :label="$t('PersonalInformation')">
        <PersonalDetails @Refresh="HandelRefresh" ref="PersonalDetails" />
      </el-tab-pane>
      <el-tab-pane name="5" :label="$t('ListofMemberFlowChangePages')">
        <MemberFlow ref="MemberFlow" />
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
//  个人资料
import PersonalDetails from './PersonalDetails.vue'
//  会员流水变更页列表
import MemberFlow from './MemberFlow.vue'
export default {
  components: {
    FlowingWater,
    Friends,
    BalanceList,
    History,
    PersonalDetails,
    MemberFlow
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
    HandelTab() {
      switch (this.tabsValue) {
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
        case '4':
          // 个人资料
          this.$refs.PersonalDetails.UserInfo = {
            memberId: this.MemberInfo.id,
            realName: this.MemberInfo.realName,
            telPhone: this.MemberInfo.telPhone,
            userName: this.MemberInfo.userName,
            bankCardNoList: this.MemberInfo.bankCardNoList || [{ bankCardNo: '', memberCashId: '' }],
          }
          this.$refs.PersonalDetails.getfinanceCashBank(this.MemberInfo.currency)
          break
        case '5':
          // 会员流水变更页列表
          this.$refs.MemberFlow.memberId = this.MemberInfo.id
          this.$refs.MemberFlow.getList(1)
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
    },
    // 刷新
    HandelRefresh() {
      this.dialogVisible = !this.dialogVisible
      this.tabsValue = '0'
      this.$emit('Refresh')
    },
  }
}
</script>
<style lang="scss" scoped></style>
