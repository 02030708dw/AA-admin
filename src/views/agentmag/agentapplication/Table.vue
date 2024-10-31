<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="memberName" label="申请人" />
      <el-table-column prop="applicantEmail" label="申请人邮箱" />
      <el-table-column prop="applicantPhone" label="申请人电话" />
      <el-table-column prop="updater" label="审核人" />
      <el-table-column prop="reviewDate" label="审核时间" />
      <el-table-column prop="remarks" label="审核备注/拒绝原因" />
      <el-table-column prop="socialSoftware" label="社交软件账号" />
      <el-table-column prop="transferUrl" label="中转页域名" />
      <el-table-column prop="status" label="申请状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="info">{{ $t('PendingReview') }}</el-tag>
          <el-tag v-if="scope.row.status == 2" type="success">通过</el-tag>
          <el-tag v-if="scope.row.status == 3" type="danger">拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('Creationtime')" width="">
        <template slot-scope="scope">
          {{ $creationTime(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :label="$t('operate')" width="">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" v-has="'demogame:edit'" type="text" style="color: #e6a23c"
            @click="getEditor(scope.row)">{{
              $t("toexamine") }}</el-button>
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
