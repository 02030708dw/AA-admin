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
        <el-table-column prop="day" :label="$t('Date')" width="" />
        <el-table-column prop="gamerName" :label="$t('GameMerchantName')" />
      </el-table-column>
      <el-table-column prop="rate" :label="$t('Drawproportion')" width="" />
      <el-table-column
        :label="
          this.resultSet.sumBetAmount
            ? '' + $formatNumber(this.resultSet.sumBetAmount)
            : '0'
        "
      >
        <el-table-column
          prop="betAmount"
          :label="$t('Totalbettingamount')"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumBetUserNum ? '' + this.resultSet.sumBetUserNum : '0'
        "
      >
        <el-table-column
          prop="betUserNum"
          :label="$t('Numberofnonrepeatedbets')"
        />
      </el-table-column>

      <el-table-column
        :label="
          this.resultSet.sumRateAmount
            ? '' + $formatNumber(this.resultSet.sumRateAmount)
            : '0'
        "
      >
        <el-table-column
          prop="rateAmount"
          :label="$t('Commissionamount')"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumRealBetAmount
            ? '' + $formatNumber(this.resultSet.sumRealBetAmount)
            : '0'
        "
      >
        <el-table-column
          prop="realBetAmount"
          :label="$t('Effectivebettingamount')"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumWinAmount
            ? '' + $formatNumber(this.resultSet.sumWinAmount)
            : '0'
        "
      >
        <el-table-column
          prop="winAmount"
          :label="$t('Totalwinningamount')"
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
        return {};
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
