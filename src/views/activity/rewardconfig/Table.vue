<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="" :label="$t('Statistictype')">
        <template slot-scope="scope">
          {{ scope.row.countType == 1 ? $t('thesameday') : $t('total') }}
        </template>
      </el-table-column>
      <el-table-column prop="threshold" :label="$t('conditionvalue')" />
      <el-table-column prop="" :label="$t('conditiontype')">
        <template slot-scope="scope">
          {{ scope.row.thresholdType == 1 ? $t('defect') : $t('ReverseLoss') }}
        </template>
      </el-table-column>
      <el-table-column prop="sort" :label="$t('Creationtime')">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updater" :label="$t('Updatedby')" />
      <el-table-column prop="" :label="$t('state')" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" :active-value="1" :inactive-value="0"
            :active-text="$t('Enable')" :inactive-text="$t('Deactivate')" @change="getUdateStatus($event, scope.row)" />
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
