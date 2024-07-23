<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column prop="userName" :label="$t('MemberAccount')" width="" />
      <el-table-column prop="gamerName" :label="$t('GameMerchantName')" width="" />
      <el-table-column prop="rate" :label="$t('RebateRate')" width="" />
      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #e6a23c"
            @click="getEitor(scope.row)"
          >{{ $t("edit") }}</el-button>
          <el-button
            type="text"
            style="color: red"
            @click="getdel(scope.row.id)"
          >{{ $t("delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  name: 'Table',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 页面数据刷新
      loading: false
    }
  },
  methods: {
    // 编辑事件
    getEitor(item) {
      this.$emit('Eitor', item)
    },
    // 删除事件
    getdel(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('del', id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    HandelLoading(status) {
      this.loading = status
    }
  }
}
</script>
<style lang="scss" scoped></style>
