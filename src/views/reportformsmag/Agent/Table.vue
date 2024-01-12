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
      <el-table-column prop="agentId" label="代理ID" width="" />
      <el-table-column prop="agentName" label="代理名称" width="" />
      <el-table-column prop="registerNum" label="注册人数" width="" />
      <el-table-column prop="firstIncomeNum" label="首充人数" width="" />
      <el-table-column prop="firstIncomeAmount" label="首充金额" width="" />
      <el-table-column prop="incomeAmount" label="充值总金额" width="" />
      <el-table-column prop="cashNum" label="提现人数" width="" />
      <el-table-column prop="cashAmount" label="提现金额" width="" />
      <el-table-column prop="rateAmount" label="返点金额" width="" />
      <el-table-column prop="activityAmount" label="活动金额" width="" />
      <el-table-column prop="plantformAmount" label="平台费用" width="" />
      <el-table-column prop="phaseAmount" label="盈亏总额" width="" />
      <el-table-column prop="netProfitAmount" label="净盈利" width="" />
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
