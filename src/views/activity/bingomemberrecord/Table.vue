<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="memberName" label="用户名称" />
      <el-table-column prop="bingoName" label="宾果名称" />
      <el-table-column prop="prizeAmount" label="中奖金额" />
      <el-table-column label="宾果结果">
        <template slot-scope="scope">
          <div v-if="scope.row.record">
            <div v-for="(value, key) in parseRecord(scope.row.record)" :key="key">
              {{ key }}: {{ value }}
            </div>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否中奖" />
      <el-table-column prop="type" label="用户类型">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? '游客' : scope.row.type === 2 ? '正式用户' : '未知' }}
        </template>
      </el-table-column>
      <el-table-column prop="uniqueCode" label="游客唯一码" />
      <el-table-column prop="weightGroupName" label="权重名称" />
      <el-table-column label="创建时间">
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
      default: () => []
    }
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
    parseRecord(record) {
      if (!record) return {}
      if (typeof record === 'string') {
        try {
          return JSON.parse(record)
        } catch {
          return {}
        }
      }
      return record
    },
    getEditor(item) {
      this.$emit('EditorShow', item)
    },
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
    }
  }
}
</script>
