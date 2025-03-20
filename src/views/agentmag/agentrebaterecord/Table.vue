<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">

      <el-table-column prop="memberName" :label="$t('Membername')" />
      <el-table-column prop="orderNo" :label="$t('orderNo')" />
      <el-table-column prop="agentName" label="返点目标代理" />
      <el-table-column prop="awardAmount" :label="$t('Awardamount')" />
      <el-table-column prop="betAmount" :label="$t('Bettingamount')" />
      <el-table-column prop="betRate" :label="$t('投注反水率')" />
      <el-table-column prop="rechargeRate" :label="$t('充值反水率')" />
      <el-table-column prop="betRatio" :label="$t('有效投注比例')" />
      <el-table-column prop="incomeAmount" :label="$t('充值金额')" />
      <el-table-column prop="rebateAmount" :label="$t('Rebateamount')" />
      <el-table-column prop="rebateType" :label="$t('返点类型')">
        <template slot-scope="scope">
          {{ scope.row.rebateType == 1 ? '充值' : '投注' }}
        </template>
      </el-table-column>
      <el-table-column prop="type" :label="$t('Statistictype')">
        <template slot-scope="scope">
          {{ scope.row.type == 1 ? '正常统计' : '有效算法' }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('Creationtime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updater" :label="$t('Updatedby')" />
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
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
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
