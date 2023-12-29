<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" :label="$t('SerialNumber')" width="100" />
      <el-table-column prop="userName" :label="$t('name')" width="" />
      <el-table-column prop="telPhone" :label="$t('phone')" width="" />
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

      <el-table-column prop="" :label="$t('operate')" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #e6a23c"
            @click="getEitor(scope.row)"
          >{{ $t("edit") }}</el-button>
          <el-button
            type="text"
            style="color: red"
            @click="getdel(scope.row.id)"
          >{{ $t("delete") }}</el-button>
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
    getdel(id) {
      this.$confirm('确定删除此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('userdel', id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getupdateStatus(status, Id) {
      this.$emit('updateStatus', { status: status, id: Id })
    },
    getEitor(item) {
      this.$emit('usereitor', item)
    }
  }
}
</script>

<style>
</style>
