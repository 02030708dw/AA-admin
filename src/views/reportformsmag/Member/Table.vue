<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="day" :label="$t('Date')" width="" />
      <el-table-column prop="memberName" :label="$t('Membername')" width="" />
      <el-table-column prop="rateAmount" :label="$t('Totalrebateamount')" width="" />
      <el-table-column prop="friendNum" :label="$t('Numberoffriends')" width="" />
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

