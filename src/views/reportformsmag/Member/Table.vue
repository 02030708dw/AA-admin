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
      <el-table-column prop="memberId" label="会员ID" width="" />
      <el-table-column prop="memberName" label="会员名称" width="" />
      <el-table-column prop="rateAmount" label="总返点金额" width="" />
      <el-table-column prop="friendNum" label="好友人数" width="" />
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

