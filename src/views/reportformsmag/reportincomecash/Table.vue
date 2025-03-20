<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="cashAmount" label="提款总额" :formatter="formatMoney" />
      <el-table-column :label="$formatNumber(this.resultSet.incomeAmountSum)">
        <el-table-column prop="incomeAmount" label="充值总额" :formatter="formatMoney" />
      </el-table-column>
      <el-table-column :label="$formatNumber(this.resultSet.incomeCashMarginSum)">
        <el-table-column prop="incomeCashMargin" label="充提差" :formatter="formatMoney" />
      </el-table-column>
      <el-table-column prop="sort" :label="$t('Creationtime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.tday) }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
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
    },

  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getRepeatableType(v) {
      switch (v) {
        case 1:
          return '领一次'
        case 2:
          return '每天领取'
        case 3:
          return '每月领取'
        case 4:
          return '每年领取'
      }
    },
    // 改变loading
    HandelLoading(status) {
      this.loading = status
    },
    // 编辑
    getEditor(item) {
      this.$emit('EditorShow', item)
    },
    // 删除
    getEdl(Id) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('Edl', Id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 格式化金额
    formatMoney(row, column, cellValue) {
      return this.$formatNumber(cellValue);
    },
  }
}
</script>

<style lang="scss" scoped>
.image_box {
  margin: auto;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
