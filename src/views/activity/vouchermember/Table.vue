<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="userName" :label="$t('username')" />
      <el-table-column prop="turnoverMultiple" label="流水倍数" />
      <el-table-column prop="" :label="$t('status')">
        <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="voucherConfigId" label="代金券配置ID" />
      <el-table-column prop="useAt" label="使用时间" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.useAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="expireAt" label="过期时间" width="" />

      <el-table-column prop="" :label="$t('Creationtime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
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
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getStatus(v) {
      switch (v) {
        case 0:
          return '未刮开'
        case 1:
          return '已使用'
        case 2:
          return '已过期'
        case 3:
          return '未使用'
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
