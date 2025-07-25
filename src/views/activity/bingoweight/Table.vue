<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">>
      <el-table-column label="宾果配置名称" prop="bingoConfigName" />
      <el-table-column label="权重组名称" prop="name" />
      <el-table-column label="权重组描述" prop="description" />

      <el-table-column label="更新人" prop="updater" />
      <el-table-column label="更新时间" prop="updatedAt">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
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
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
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

  },
}
</script>
