<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="bingoWeightGroupName" label="权重分组名称" />
      <el-table-column prop="lineNums" label="连线数量" />
      <el-table-column prop="weight" label="权重" />
      <el-table-column prop="updater" label="更新人" />

      <el-table-column prop="updatedAt" label="更新时间">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c" @click="getEditor(scope.row)">编辑</el-button>
          <el-button type="text" style="color: red" @click="getEdl(scope.row.id)">删除</el-button>
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
    getEditor(item) {
      this.$emit('EditorShow', item)
    },
    getEdl(Id) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('Edl', Id)
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    getUdateStatus(e, item) {
      item.status = e
      this.$emit('UdateStatus', item)
    }
  }
}
</script>
