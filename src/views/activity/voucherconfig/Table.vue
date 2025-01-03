<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="name" label="代金券名称" />
      <el-table-column prop="amount" label="代金券金额" />
      <el-table-column prop="conditionValue" label="触发条件值" />
      <el-table-column prop="expirationDate" label="有效期(小时)" />
      <el-table-column prop="minRecharge" label="最低充值金额条件" />
      <el-table-column prop="turnoverMultiple" label="流水倍数" />
      <el-table-column prop="triggerType" label="触发类型">
        <template slot-scope="scope">
          {{ getTriggerType(scope.row.triggerType) }}
        </template>
      </el-table-column>
      <el-table-column prop="updater" :label="$t('Updatedby')" />
      <el-table-column prop="" :label="$t('state')" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" :active-value="1" :inactive-value="0"
            :active-text="$t('Enable')" :inactive-text="$t('Deactivate')"
            @change="getUdateStatus($event, scope.row.id)" />
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" style="color: #e6a23c" @click="getEditor(scope.row)">{{
            $t("edit") }}</el-button>
          <el-button type="text" style="color: red" @click="getEdl(scope.row.id)">{{ $t("delete")
            }}</el-button>
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
    getTriggerType(v) {
      switch (v) {
        case 1:
          return '注册'
        case 2:
          return '使用优惠券次数'
        case 3:
          return '单笔充值总额'
        case 4:
          return '充值次数'
        case 5:
          return '累计充值'
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
    // 修改状态
    getUdateStatus(e, id) {
      this.$emit('UdateStatus', { status: e, id: id })
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
