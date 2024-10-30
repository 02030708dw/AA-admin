<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="day" :label="$t('Date')" width="" />
      <el-table-column prop="registerNum" :label="$t('Enrollment')" width="" />
      <el-table-column prop="cashNum" :label="$t('Numberofwithdrawals')" width="" />
      <el-table-column prop="cashAmount" :label="$t('Withdrawalamount')" width="" />
      <el-table-column prop="firstIncomeNum" :label="$t('Numberoffirstrechargeusers')" width="" />
      <el-table-column prop="firstIncomeAmount" :label="$t('NumberofRechargers')" width="" />
      <el-table-column prop="incomeNum" :label="$t('IncomeNum')" width="" />
      <el-table-column prop="incomeAmount" :label="$t('Totalamountofactivities')" width="" />
      <el-table-column prop="activityAmount" :label="$t('Activityamount')" width="" />
      <el-table-column prop="memberRateAmount" :label="$t('Memberrebateamount')" width="" />
      <el-table-column prop="betAmount" :label="$t('Totalbettingamount')" width="" />
      <el-table-column prop="awardAmount" :label="$t('Awardamount')" width="" />
      <el-table-column prop="phaseAmount" :label="$t('Totalprofitandloss')" width="" />
      <el-table-column prop="betUserNum" :label="$t('Numberofnonrepeatedbets')" width="" />
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

