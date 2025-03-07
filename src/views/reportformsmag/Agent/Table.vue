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
      <el-table-column prop="agentId" :label="$t('agenId')" width="" />
      <el-table-column prop="agentName" :label="$t('Agentname')" width="" />
      <el-table-column prop="registerNum" :label="$t('Enrollment')" />
      <el-table-column
        prop="firstIncomeNum"
        :label="$t('Numberoffirstchargers')"
      />
      <el-table-column prop="cashNum" :label="$t('Numberofwithdrawals')" />
      <el-table-column
        prop="firstIncomeAmount"
        :label="$t('Firstchargeamount')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="incomeAmount"
        :label="$t('Totalrechargeamount')"
        :formatter="formatMoney"
      />

      <el-table-column
        prop="cashAmount"
        :label="$t('Withdrawalamount')"
        :formatter="formatMoney"
      />
      <el-table-column prop="rateAmount" :label="$t('Rebateamount')" width="" />
      <el-table-column
        prop="activityAmount"
        :label="$t('Activityamount')"
        :formatter="formatMoney"
      >
        <template slot-scope="scope">
          <span>{{
            formatMoney(scope.row, null, scope.row.activityAmount)
          }}</span>
          <el-button
            @click="HandelActivity(scope.row.agentId)"
            style="margin-left: 2px; padding: 5px"
            size="mini"
            >详情</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="plantformAmount" :label="$t('Platformfees')">
        <template slot-scope="scope">
          <span>{{
            formatMoney(scope.row, null, scope.row.plantformAmount)
          }}</span>
          <el-button
            @click="HandelPlantform(scope.row)"
            style="margin-left: 2px; padding: 5px"
            size="mini"
            >详情</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="phaseAmount"
        :label="$t('Totalprofitandloss')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="netProfitAmount"
        :label="$t('netprofit')"
        :formatter="formatMoney"
      />
    </el-table>
  </el-card>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return { loading: false };
  },
  methods: {
    // 改变loading
    HandelLoading(status) {
      this.loading = status;
    },
    HandelActivity(id) {
      this.$emit("Activity", id);
    },
    HandelPlantform(item) {
      this.$emit("Plantform", item);
    },
    // 格式化金额
    formatMoney(row, column, cellValue) {
      return this.$formatNumber(cellValue);
    },
  },
};
</script>
<style lang="scss" scoped></style>
