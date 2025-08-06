<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="day" label="日期" />
      <el-table-column prop="amount" label="单金额" :formatter="formatMoney" />
      <el-table-column prop="incomeNum" label="首冲人数" />
      <el-table-column prop="platformType" label="渠道">
        <template #default="{ row }">
          {{
            {
              1: 'facebook',
              2: 'tiktok',
              3: 'youtube'
            }[row.platformType] || '未知'
          }}
        </template>
      </el-table-column>
      <el-table-column prop="registerNum" label="注册人数" />
      <el-table-column prop="remaining" label="剩余" />
      <el-table-column prop="totalCount" label="总数" />
      <el-table-column prop="type" label="类型">
        <template #default="{ row }">
          {{
            {
              1: '刮刮乐',
            }[row.type] || '未知'
          }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="$emit('Details', scope.row)">详情</el-button>
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
      default: () => []
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    HandelLoading(status) {
      this.loading = status
    },
    formatMoney(row, column, cellValue) {
      return this.$formatNumber ? this.$formatNumber(cellValue) : cellValue
    }
  }
}
</script>

<style lang="scss" scoped></style>
