<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="amount" style="width: 180px;margin-left:10px;" :placeholder="$t('amountofmoney')" />
    <el-input v-model="cardNo" style="width: 180px;margin-left:10px;" :placeholder="$t('Paymentcardnumber')" />

    <el-select v-model="channelId" :placeholder="$t('Choosechannels')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in ChannelIdData" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <!-- <el-input v-model="channelId" style="width: 180px;margin-left:10px;" :placeholder="$t('ChannelID')" /> -->

    <!-- <el-date-picker v-model="date" style="width: 180px;margin-left:10px;" type="date" placeholder="选择日期" /> -->

    <el-input v-model="userName" style="width: 180px;margin-left:10px;" :placeholder="$t('username')" />
    <!-- <el-select v-model="userName" :placeholder="$t('selectuser')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in UserId" :key="index" :value="item.index" :label="item.title" />
    </el-select> -->
    <el-select v-model="auditStatus" :placeholder="$t('Reviewstatus')" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in auditStatusList" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <el-button v-has="'memberrecharge:page'" style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query')
    }}</el-button>
    <el-button :disabled="excelStatus" style="margin-left:10px;" type="primary" @click="getExcel()">导出数据</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
    <!-- 刷新按钮 -->
    <el-button v-if="btnIcoType" type="success" icon="el-icon-refresh-left" @click="HandelRefresh">{{ $t('Refresh')
    }}</el-button>
    <el-button v-else type="success" icon="el-icon-loading" disabled>{{ $t('Refresh') }}</el-button>
    <!-- 开启自动刷新 -->
    <el-button v-if="!this.$store.state.autorefresh.M_Recharge" type="info" icon="el-icon-refresh"
      @click="GetUpdataRefresh"> {{ $t('Enableautomaticrefresh') }} </el-button>
    <el-button v-else type="primary" icon="el-icon-loading" @click="GetUpdataRefresh">{{ $t('Turnoffautomaticrefresh')
    }}</el-button>
  </el-row>
</template>

<script>
import { channelPage } from '@/api/finance/rechargechannel'
import { userPage } from '@/api/account/user'
import { mapGetters } from 'vuex'
export default {
  name: 'Control',
  data() {
    return {
      // 金额
      amount: '',
      // 审核状态
      auditStatus: '',
      // 卡号
      cardNo: '',
      // 渠道id
      channelId: '',
      // 时间
      date: '',
      // 用户id
      userName: '',
      auditStatusList: [
        { title: this.$t('PendingReview'), index: 0 },
        { title: this.$t('Approve'), index: 1 },
        { title: this.$t('reject'), index: 2 },
        { title: this.$t('Cancelled'), index: 3 }
      ],
      btnIcoType: true,
      ChannelIdData: [],
      UserId: [],
      excelStatus: false
    }
  },
  computed: {
    ...mapGetters([
      'M_Recharge'
    ])
  },
  created() {
    this.GetChannelId()
    this.GetUserId()
  },
  methods: {
    // 获取用户id
    GetUserId() {
      this.UserId = []
      userPage({ pageNo: 1, pageSize: 10000 }).then(res => {
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.UserId.push({
            index: res.resultSet.data[i].id,
            title: res.resultSet.data[i].userName
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取渠道id
    GetChannelId() {
      this.ChannelIdData = []
      channelPage({ pageNo: 1, pageSize: 10000 }).then(res => {
        console.log(res)
        console.log(res.resultSet.data)
        for (let i = 0; i < res.resultSet.data.length; i++) {
          this.ChannelIdData.push({
            title: res.resultSet.data[i].name,
            index: res.resultSet.data[i].id
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 开启自动刷新
    GetUpdataRefresh() {
      this.$store.commit('autorefresh/GetUpdataRefreshMRecharge')
      // this.$emit('UpdataRefresh')
      // console.log(this.$store.state.autorefresh.M_Recharge)
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
    // 查询
    getquery() {
      this.$emit('Gamequery', { amount: this.amount, auditStatus: this.auditStatus, cardNo: this.cardNo, channelId: this.channelId, userName: this.userName })
      // date: new Date(this.date).toISOString().slice(0, 10),
    },
    // 重置
    getresetting() {
      this.amount = ''
      this.auditStatus = ''
      this.cardNo = ''
      this.channelId = ''
      // this.date = ''
      this.userName = ''
      this.$emit('resetting')
    },
    // 导出
    getExcel() {
      this.$emit('getExcel')
      this.excelStatus = true
    },
    HandelExcelStatus() {
      this.excelStatus = false
    }
  }
}
</script>

<style></style>
