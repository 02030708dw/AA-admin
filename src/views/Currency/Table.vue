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
      <el-table-column
        prop="currency"
        :label="$t('Currency')"
        width="200"
      />
      <el-table-column
        prop="remark"
        :label="$t('Notes')"
        width="280"
      />
      <el-table-column
        prop="createdAt"
        :label="$t('Creationtime')"
        width="280"
      />
      <el-table-column
        prop="updatedAt"
        :label="$t('Updatetime')"
        width="280"
      />
      <el-table-column prop="" :label="$t('state')" width="">
        <template slot-scope="scope">
          <div :style="{color:scope.row.status === 0 ? 'red':'green'}">
            {{ scope.row.status === 0 ? '停用':'启用' }}
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
    geteroleEitor(item) {
      this.$emit('eitor', item)
    },
    // 删除
    getroledel(id) {
      this.$confirm('确定删除此游戏商?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('delete', id)
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
<style lang="scss" scoped>

</style>
