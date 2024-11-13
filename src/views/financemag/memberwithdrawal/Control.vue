<template>
  <el-row style="padding-bottom: 10px">
    <!-- <el-button type="primary" @click="getroleAdd()">新增</el-button> -->
    <!-- 条件筛选框 -->

    <el-select
      v-model="aduitStatus"
      :placeholder="$t('Reviewstatus')"
      style="width: 200px"
    >
      <el-option
        v-for="(item, index) in noticetype"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <el-input v-model="orderNo" style="width: 180px; margin-left: 10px" placeholder="请输入订单号" />
    <!-- <el-select
      v-model="orderNo"
      placeholder="选择会员"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in MemberData"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select> -->
    <el-select
      v-model="cashChannelId"
      placeholder="选择提现渠道"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in channelData"
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>

    <el-button
      v-has="'memberwithdrawal:page'"
      style="margin-left: 10px"
      type="primary"
      @click="getquery()"
    >{{ $t('query') }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{$t('Refresh')}}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{$t('Refresh')}}</el-button>
    <!-- 开启自动刷新 -->
    <el-button v-if="!this.$store.state.autorefresh.A_T_Recharge" type="info" icon="el-icon-refresh" @click="GetUpdataRefresh">开启自动刷新</el-button>
    <el-button v-else type="primary" icon="el-icon-loading" @click="GetUpdataRefresh">关闭自动刷新</el-button>
  </el-row>
</template>

<script>
import {
  MemberPage
} from '@/api/account/member'
import { channelPage } from '@/api/finance/rechargechannel'
export default {
  name: 'Control',
  data() {
    return {
      aduitStatus: null, // 审核状态
      orderNo: '', // 订单号
      cashChannelId: '', // 提现渠道id
      noticetype: [
        { title: this.$t('PendingReview'), index: 0 },
        { title: this.$t('Approve'), index: 1 },
        { title: this.$t('Rejected'), index: 2 },
        { title: this.$t('Cancelled'), index: 3 }
      ],
      btnIcoType: true,
      channelData: [],
      MemberData: []
    }
  },
  created() {
    this.GetChannelPage()
    this.GetMemberPage()
  },
  methods: {
    GetChannelPage() {
      this.channelData = []
      channelPage({ pageNo: 1, pageSize: 10000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.channelData.push({
            index: res.resultSet.data[i].id,
            title: res.resultSet.data[i].name
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    GetMemberPage() {
      this.MemberData = []
      MemberPage({ pageNo: 1, pageSize: 10000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.MemberData.push({
            title: res.resultSet.data[i].userName,
            index: res.resultSet.data[i].id
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 自动刷新开关
    GetUpdataRefresh() {
      this.$store.commit('autorefresh/GetUpdataRefreshATRecharge')
    },
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    },
    getquery() {
      this.$emit('query', {
        aduitStatus: this.aduitStatus,
        orderNo: this.orderNo,
        cashChannelId: this.cashChannelId
      })
    },
    // 恢复默认查找
    getresetting() {
      this.aduitStatus = null
      this.orderNo = ''
      this.cashChannelId = ''
      this.$emit('resetting')
    }
  }
}
</script>

  <style scoped lang="scss"></style>

