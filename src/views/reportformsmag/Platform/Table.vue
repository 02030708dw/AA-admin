<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="day" :label="$t('Date')" />
      <el-table-column prop="registerNum" :label="$t('Enrollment')" />
      <el-table-column prop="incomeNum" :label="$t('IncomeNum')" />
      <el-table-column prop="cashNum" :label="$t('Numberofwithdrawals')" />
      <el-table-column
        prop="betUserNum"
        :label="$t('Numberofnonrepeatedbets')"
      />
      <el-table-column
        prop="firstIncomeNum"
        :label="$t('Numberoffirstrechargeusers')"
      />
      <el-table-column
        prop="firstIncomeAmount"
        :label="$t('NumberofRechargers')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="incomeAmount"
        :label="$t('Totalamountofactivities')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="cashAmount"
        :label="$t('Withdrawalamount')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="activityAmount"
        :label="$t('Activityamount')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="memberRateAmount"
        :label="$t('Memberrebateamount')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="betAmount"
        :label="$t('Totalbettingamount')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="awardAmount"
        :label="$t('Awardamount')"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="gamerBalance"
        label="游戏商总余额"
        :formatter="formatMoney"
      />
      <el-table-column
        prop="memberWalletBalance"
        label="用户总余额"
        :formatter="formatMoney"
      />
      <el-table-column prop="phaseAmount" :label="$t('Totalprofitandloss')">
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
    // 格式化金额
    formatMoney(row, column, cellValue) {
      return this.$formatNumber(cellValue);
    },
  },
};
</script>
<style lang="scss" scoped></style>
