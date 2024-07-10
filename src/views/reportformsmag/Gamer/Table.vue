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
      <el-table-column prop="gamerName" :label="$t('GameMerchantName')" width="" />
      <el-table-column prop="betAmount" :label="$t('Totalbettingamount')" width="" />
      <el-table-column prop="betUserNum" :label="$t('Numberofnonrepeatedbets')" width="" />
      <el-table-column prop="phaseAmount" :label="$t('Totalprofitandloss')" width="" />
      <el-table-column prop="rate" :label="$t('Drawproportion')" width="" />
      <el-table-column prop="rateAmount" :label="$t('Commissionamount')" width="" />
      <el-table-column prop="realBetAmount" label="有效投注金额" width="" />
      <el-table-column prop="winAmount" label="中奖总额" width="" />
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

