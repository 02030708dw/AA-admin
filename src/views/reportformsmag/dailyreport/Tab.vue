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
      <el-table-column prop="betAmount" :label="$t('Bettingamount')" width="" />
      <el-table-column prop="awardAmount" :label="$t('Awardamount')" width="" />
      <el-table-column prop="cashAmount" :label="$t('Withdrawalamount')" width="" />
      <el-table-column prop="incomeAmount" :label="$t('Rechargeamount')" width="" />
      <el-table-column prop="gainAmount" :label="$t('Profitamount')" width="" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
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

  <style>
  </style>

