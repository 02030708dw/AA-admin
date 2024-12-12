<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="" :label="$t('total')" width="">
        <el-table-column prop="" :label="$t('Creationtime')" width="">
          <template slot-scope="scope">
            <span v-if="scope.row?.accountDate">
              {{ scope.row?.accountDate }}
            </span>
            <span v-else>
              {{ scope.row?.startDate | formatDate }} - {{ scope.row?.endDate | formatDate }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="gamerName" :label="$t('GameMerchantName')" width="" />
      </el-table-column>
      <el-table-column prop="" :label=" this.resultSet.sumBetAmount ? '' + this.resultSet.sumBetAmount : '0'" width="">
        <el-table-column prop="betAmount" :label="$t('Totalbettingamount')" width="" />
      </el-table-column>
      <el-table-column prop="" :label=" this.resultSet.sumAwardAmount ? '' + this.resultSet.sumAwardAmount : '0'" width="">
        <el-table-column prop="awardAmount" :label="$t('awardAmount')" width="" />
      </el-table-column>
      <el-table-column prop="" :label="this.resultSet.sumPhaseAmount ? '' + this.resultSet.sumPhaseAmount : '0'" width="">
        <el-table-column prop="phaseAmount" :label="$t('Totalprofitandloss')" width="" />
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
        return []
      }
    },
    resultSet: {
      type: Object,
      default: () => {
        return {
          sumBetAmount: '',
          sumAwardAmount: '',
          sumPhaseAmount: ''
        }
      }
    }
  },
  filters: {
    formatDate(value) {
      if (!value) return '';
      let date = new Date(value);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return `${month}/${day}`;
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
  }
}
</script>
