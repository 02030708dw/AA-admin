<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="day" label="日期" width="" />
      <el-table-column prop="registerNum" label="注册人数" width="" />
      <el-table-column prop="cashNum" label="提现人数" width="" />
      <el-table-column prop="cashAmount" label="提现金额" width="" />
      <el-table-column prop="firstIncomeNum" label="首次充值人数" width="" />
      <el-table-column prop="firstIncomeAmount" label="充值人数" width="" />
      <el-table-column prop="incomeAmount" label="活动总额" width="" />
      <el-table-column prop="activityAmount" label="活动金额" width="" />
      <el-table-column prop="memberRateAmount" label="会员返点金额" width="" />
      <el-table-column prop="betAmount" label="投注总金额" width="" />
      <el-table-column prop="awardAmount" label="派奖金额" width="" />
      <el-table-column prop="phaseAmount" label="盈亏总额" width="" />
      <el-table-column prop="betUserNum" label="不重复投注人数" width="" />
    </el-table>
  </el-card>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return { loading: false }
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    }
  }
}
</script>
    <style lang="scss" scoped>

    </style>

