<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="day" :label="$t('Date')" width="" />
      <el-table-column prop="agentId" :label="$t('agenId')" width="" />
      <el-table-column prop="agentName" :label="$t('Agentname')" width="" />
      <el-table-column prop="registerNum" :label="$t('Enrollment')" width="" />
      <el-table-column prop="firstIncomeNum" :label="$t('Numberoffirstchargers')" width="" />
      <el-table-column prop="firstIncomeAmount" :label="$t('Firstchargeamount')" width="" />
      <el-table-column prop="incomeAmount" :label="$t('Totalrechargeamount')" width="" />
      <el-table-column prop="cashNum" :label="$t('Numberofwithdrawals')" width="" />
      <el-table-column prop="cashAmount" :label="$t('Withdrawalamount')" width="" />
      <el-table-column prop="rateAmount" :label="$t('Rebateamount')" width="" />
      <el-table-column prop="activityAmount" :label="$t('Activityamount')" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.activityAmount }}</span>
          <el-button @click="HandelActivity(scope.row.agentId)" style="margin-left: 2px;padding:  5px;" size="mini">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="plantformAmount" :label="$t('Platformfees')" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.plantformAmount }}</span>
          <el-button @click="HandelPlantform(scope.row.agentId)" style="margin-left: 2px;padding: 5px;"
            size="mini">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="phaseAmount" :label="$t('Totalprofitandloss')" width="" />
      <el-table-column prop="netProfitAmount" :label="$t('netprofit')" width="" />
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
    },
    HandelActivity(id) {
      this.$emit('Activity', id)
    },
    HandelPlantform(id) {
      this.$emit('Plantform', id)
    },
  }
}
</script>
<style lang="scss" scoped></style>
