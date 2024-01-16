<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="150" />
      <el-table-column prop="name" :label="$t('Channelname')" width="" />
      <el-table-column prop="" :label="$t('Channeltype')" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.type | Channeltype }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="停用"
              @change="getupdateStatus($event, scope.row.id)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button type="text" @click="geteroleEitor(scope.row)">{{
            $t("edit")
          }}</el-button>

          <el-button
            slot="reference"
            type="text"
            style="color: red"
            @click="getroledel(scope.row.id)"
          >{{ $t("delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Table',
  filters: {
    Channeltype(value) {
      switch (value) {
        case 0:
          return '银行卡'
        case 1:
          return '支付宝'
        case 2:
          return '微信'
        case 3:
          return '虚拟币'
      }
    }
  },
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
    // 删除事件
    getroledel(Id) {
      this.$confirm('确定删除此条渠道吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('delete', Id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑事件
    geteroleEitor(item) {
      this.$emit('eitor', item)
    },
    // 状态修改
    getupdateStatus(e, Id) {
      this.$emit('updateStatus', { status: e, id: Id })
    }
  }
}
</script>

    <style>
</style>
