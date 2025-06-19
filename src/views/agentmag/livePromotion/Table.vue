<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" border :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="agentName" label="代理名称" />
      <el-table-column prop="redPacketAmount" label="单个红包金额" />
      <el-table-column prop="redPacketNumbers" label="红包数量" />
      <el-table-column prop="scratchNumbers" label="刮刮乐数量" />
      <el-table-column prop="ticketNumbers" label="彩票数量" />

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.status)" disable-transitions>
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="备注" />
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? '平台套餐' : scope.row.type === 2 ? '账户余额' : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c" @click="$emit('examine', scope.row.id)">
            {{ $t('toexamine') }}
          </el-button>
          <el-button type="text" @click="$emit('detail', scope.row.livePromotionId)">
            {{ $t('Detail') }}
          </el-button>
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
    getStatusText(status) {
      switch (status) {
        case 1:
          return '待审核'
        case 2:
          return '通过'
        case 3:
          return '拒绝'
        default:
          return '-'
      }
    },
    getStatusType(status) {
      switch (status) {
        case 1:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          return 'info'
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
