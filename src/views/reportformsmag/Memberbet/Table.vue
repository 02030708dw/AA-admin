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
        <el-table-column prop="" :label="$t('Creationtime')" width="">
          <template slot-scope="scope">
            <span v-if="scope.row?.accountDate">
              {{ scope.row?.accountDate }}
            </span>
            <span v-else>
              {{ scope.row?.startDate | formatDate }} -
              {{ scope.row?.endDate | formatDate }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="gamerName" :label="$t('GameMerchantName')" />
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
          :label="$t('Totalbettingamount')"
          :formatter="formatMoney"
        />
      </el-table-column>
      <el-table-column
        :label="
          this.resultSet.sumAwardAmount
            ? '' + $formatNumber(this.resultSet.sumAwardAmount)
            : '0'
        "
      >
        <el-table-column
          prop="awardAmount"
          :label="$t('awardAmount')"
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
        return {
          sumBetAmount: "",
          sumAwardAmount: "",
          sumPhaseAmount: "",
        };
      },
    },
  },
  filters: {
    formatDate(value) {
      if (!value) return "";
      let date = new Date(value);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return `${month}/${day}`;
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
