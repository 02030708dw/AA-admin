<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="" :label="$t('total')" width="">
        <el-table-column prop="name" label="下级用户名" width="" />
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumBetAmount
            ? '' + $formatNumber(this.resultSet.sumBetAmount)
            : '0'
        "
      >
        <el-table-column
          prop="betAmount"
          label="下级投注"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column
        prop=""
        :label="
          this.resultSet.sumAwardAmount
            ? '' + $formatNumber(this.resultSet.sumAwardAmount)
            : '0'
        "
        width=""
      >
        <el-table-column
          prop="awardAmount"
          label="下级派奖"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumPhaseAmount
            ? '' + $formatNumber(this.resultSet.sumPhaseAmount)
            : '0'
        "
      >
        <el-table-column prop="phaseAmount" :label="$t('下级盈亏')">
          <template slot-scope="scope">
            <span
              :style="{
                color:
                  scope.row.phaseAmount < 0
                    ? 'red'
                    : scope.row.phaseAmount > 0
                    ? '#85ce61'
                    : '',
              }"
            >
              {{ formatMoney(scope.row, null, scope.row.phaseAmount) }}
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumIncomeAmount
            ? '' + $formatNumber(this.resultSet.sumIncomeAmount)
            : '0'
        "
      >
        <el-table-column
          prop="incomeAmount"
          label="累计充值"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumSelfCashAmount
            ? '' + $formatNumber(this.resultSet.sumSelfCashAmount)
            : '0'
        "
      >
        <el-table-column
          prop="selfCashAmount"
          label="累计提款"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumActivityAmount
            ? '' + $formatNumber(this.resultSet.sumActivityAmount)
            : '0'
        "
      >
        <el-table-column
          prop="activityAmount"
          label="活动金额"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column prop="" label="注册日期" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row?.registerDate) }}
        </template>
      </el-table-column>
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
    resultSet: {
      type: Object,
      default: () => {
        return {
          sumBetAmount: "",
          sumAwardAmount: "",
          sumPhaseAmount: "",
          sumAwardAmount: "",
        };
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
    // 格式化金额
    formatMoney(row, column, cellValue) {
      return this.$formatNumber(cellValue);
    },
  },
};
</script>
<style lang="scss" scoped></style>
