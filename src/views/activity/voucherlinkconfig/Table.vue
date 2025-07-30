<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="dailyCardsLimit" label="每日赠送代金券初始数量" />
      <el-table-column prop="deductAmount" label="代理创建一个要扣除的金额" />
      <el-table-column prop="rechargeBonus" label="充值用户奖励奖金" />
      <el-table-column prop="registrationBonus" label="注册用户奖励奖金" />

      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.updatedAt) }}
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" :active-value="1" :inactive-value="0"
            active-text="启用" inactive-text="停用" @change="getUdateStatus($event, scope.row)" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c" @click="getEditor(scope.row)">
            编辑
          </el-button>
          <el-button type="text" style="color: red" @click="getEdl(scope.row.id)">
            删除
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
    // 修改状态
    getUdateStatus(e, item) {
      item.status = e
      this.$emit('UdateStatus', item)
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
