<template>
  <el-row style="padding-bottom: 10px">
    <el-input v-model="amount" style="width: 180px;margin-left:10px;" placeholder="金额" />
    <el-input v-model="cardNo" style="width: 180px;margin-left:10px;" placeholder="收款卡号" />
    <el-input v-model="channelId" style="width: 180px;margin-left:10px;" placeholder="渠道id" />
    <el-date-picker v-model="date" style="width: 180px;margin-left:10px;" type="date" placeholder="选择日期" />
    <el-input v-model="memberId" style="width: 180px;margin-left:10px;" placeholder="用户id" />
    <el-select v-model="auditStatus" placeholder="审核状态" style="width: 200px;margin-left: 10px">
      <el-option v-for="(item, index) in auditStatusList" :key="index" :value="item.index" :label="item.title" />
    </el-select>
    <el-button style="margin-left:10px;" type="primary" @click="getquery()">{{ $t('query') }}</el-button>
    <el-button type="info" style="margin-left: 10px" plain @click="getresetting()">{{ $t('resetting') }}</el-button>
  </el-row>
</template>

<script>
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
      memberId: '',
      auditStatusList: [
        { title: '待审核', index: 0 },
        { title: '审核通过', index: 1 },
        { title: '驳回', index: 2 },
        { title: '已取消', index: 3 }
      ]
    }
  },
  methods: {
    // 查询
    getquery() {
      this.$emit('Gamequery', { amount: this.amount, auditStatus: this.auditStatus, cardNo: this.cardNo, channelId: this.channelId, date: new Date(this.date).toISOString().slice(0, 10), memberId: this.memberId })
    },
    // 重置
    getresetting() {
      this.amount = ''
      this.auditStatus = ''
      this.cardNo = ''
      this.channelId = ''
      this.date = ''
      this.memberId = ''
      this.$emit('resetting')
    }
  }
}
</script>

<style></style>

