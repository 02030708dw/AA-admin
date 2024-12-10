<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="" label="总计" width="">
        <el-table-column prop="" :label="$t('Creationtime')" width="">
        <template slot-scope="scope">
          {{ scope.row?.startDate | formatDate }} - {{ scope.row?.endDate | formatDate }}
        </template>
      </el-table-column>
        <el-table-column prop="gamerName" label="游戏商" width="" />
      </el-table-column>
      <el-table-column prop="" :label="''+this.resultSet.sumBetAmount" width="">
        <el-table-column prop="betAmount" label="投注额" width="" />
      </el-table-column>
      <el-table-column prop="" :label="''+this.resultSet.sumAwardAmount" width="">
        <el-table-column prop="awardAmount" label="奖金" width="" />
      </el-table-column>
      <el-table-column prop="" :label="''+this.resultSet.sumPhaseAmount" width="">
        <el-table-column prop="phaseAmount" label="盈亏" width="" />
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
        return {}
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

