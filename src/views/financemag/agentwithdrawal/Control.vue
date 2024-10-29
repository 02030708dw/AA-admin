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

    <el-select
      v-model="agentId"
      :placeholder="$t('SelectProxy')"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in AgentData "
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>

    <el-select
      v-model="cashChannelId"
      placeholder="选择提现渠道"
      style="width: 200px;margin-left: 10px"
    >
      <el-option
        v-for="(item, index) in channelData "
        :key="index"
        :value="item.index"
        :label="item.title"
      />
    </el-select>
    <el-button
      style="margin-left: 10px"
      type="primary"
      @click="getquery()"
      v-has="'agentwithdrawal:page'"
    > {{ $t('query') }} </el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{$t('Refresh')}}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{$t('Refresh')}}</el-button>
    <!-- 开启自动刷新 -->
    <el-button v-if="!this.$store.state.autorefresh.A_Recharge" type="info" icon="el-icon-refresh" @click="GetUpdataRefresh">{{ $t('Enableautomaticrefresh') }}</el-button>
    <el-button v-else type="primary" icon="el-icon-loading" @click="GetUpdataRefresh">{{$t('Turnoffautomaticrefresh')}}</el-button>
  </el-row>
</template>

<script>
import { AgentPage } from '@/api/account/agent'
import { channelPage } from '@/api/finance/rechargechannel'
export default {
  name: 'Control',
  data() {
    return {
      aduitStatus: null, // 审核状态
      agentId: '', // 代理
      cashChannelId: '', // 提现渠道id
      noticetype: [
        { title: this.$t('PendingReview'), index: 0 },
        { title: this.$t('Approve'), index: 1 },
        { title: this.$t('Rejected'), index: 2 },
        { title: this.$t('Cancelled'), index: 3 }
      ],
      btnIcoType: true,
      AgentData: [],
      channelData: []
    }
  },
  created() {
    this.GetAgentPage()
    this.GetChannelPage()
  },
  methods: {
    // 获取代理id
    GetAgentPage() {
      this.AgentData = []
      AgentPage({ pageNo: 1, pageSize: 10000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.AgentData.push({
            title: res.resultSet.data[i].userName,
            index: res.resultSet.data[i].id
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取渠道id
    GetChannelPage() {
      this.channelData = []
      channelPage({ pageNo: 1, pageSize: 10000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.channelData.push({
            title: res.resultSet.data[i].name,
            index: res.resultSet.data[i].id
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 开启关闭自动刷新
    GetUpdataRefresh() {
      this.$store.commit('autorefresh/GetUpdataRefreshARecharge')
    },
    // 新增按钮
    // getroleAdd() {
    //   this.$emit('roleAdd')
    // },
    // 查询
    getquery() {
      this.$emit('query', {
        aduitStatus: this.aduitStatus,
        agentId: this.agentId,
        cashChannelId: this.cashChannelId
      })
    },
    // 恢复默认查找
    getresetting() {
      this.aduitStatus = null
      this.agentId = ''
      this.cashChannelId = ''
      this.$emit('resetting')
    },
    // 刷新
    HandelRefresh() {
      this.$emit('Refresh')
      this.btnIcoType = false
    },
    // 改变按钮状态
    HandelBtnStatus() {
      this.btnIcoType = true
    }
  }
}
</script>

<style scoped lang="scss"></style>
