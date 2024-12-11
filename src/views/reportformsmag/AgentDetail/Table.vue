<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="name" label="下级用户名" width="" />
      <el-table-column prop="betAmount" label="下级投注" width="" />
      <el-table-column prop="phaseAmount" label="下级盈亏" width="" />
      <el-table-column prop="" label="注册日期" width=""> 
        <template slot-scope="scope">
          {{ $creationTime(scope.row?.registerDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="incomeAmount" label="累计充值" width="" />
      <el-table-column prop="selfCashAmount" label="累计提款" width="" />

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
    }
  }
}
</script>
<style lang="scss" scoped></style>
