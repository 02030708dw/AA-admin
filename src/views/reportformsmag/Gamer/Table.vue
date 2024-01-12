<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="day" label="日期" width="" />
      <el-table-column prop="gamerId" label="游戏商ID" width="" />
      <el-table-column prop="gamerName" label="游戏商名称" width="" />
      <el-table-column prop="betAmount" label="投注总金额" width="" />
      <el-table-column prop="rate" label="抽成比例" width="" />
      <el-table-column prop="rateAmount" label="抽成金额" width="" />
      <el-table-column prop="betUserNum" label="不重复投注人数" width="" />
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
  <style lang="scss" scoped>

  </style>

