<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="memberName" :label="$t('username')" />
      <el-table-column prop="" :label="$t('customertype')">
        <template slot-scope="scope">
          {{ scope.row.type == 1 ? '游客' : '正式用户' }}
        </template>
      </el-table-column>
      <el-table-column prop="parentMemberId" label="注册绑定上级会员ID" />
      <el-table-column prop="prizeAmount" label="中奖金额" />
      <el-table-column prop="scratchName" label="刮刮卡名称" />
      <el-table-column prop="status" label="是否刮开">
        <template slot-scope="scope">
          {{ scope.row.status == 0 ? '否' : '是' }}
        </template>
      </el-table-column>
      <el-table-column prop="uniqueCode" label="游客唯一码" />
      <el-table-column prop="updatedAt" :label="$t('Updatetime')" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="sort" :label="$t('Creationtime')">
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
