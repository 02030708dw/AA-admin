<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="vipConfigId" :label="$t('VIPlevelconfigurationID')" />
      <el-table-column prop="rewardValue" :label="$t('Rewardvalue')" />
      <el-table-column prop="" :label="$t('Typeofclaim')">
        <template slot-scope="scope">
          {{ getRepeatableType(scope.row.repeatableType) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('Typeofclaim')">
        <template slot-scope="scope">
          {{ scope.row.rewardType == 1 ? $t('bonus') : $t('defect') }}
        </template>
      </el-table-column>
      <el-table-column prop="description" :label="$t('describe')" />
      <el-table-column prop="sort" :label="$t('Creationtime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updater" :label="$t('Updatedby')" />
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
