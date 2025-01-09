<template>
  <el-card>
    <el-table v-loading="loading" :data="tableData" :border="true" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="userName" :label="$t('username')" />
      <el-table-column prop="claimedCount" label="已领取红包个数" />
      <el-table-column prop="createType" label="红包创建类型">
        <template slot-scope="scope">
          {{ scope.row.createType == 1 ? '红包余额创建' : '用户余额创建' }}
        </template>
      </el-table-column>
      <el-table-column prop="shareUrl" label="分享链接" />
      <el-table-column prop="singleAmount" label="单个红包金额" />
      <el-table-column prop="status" label="红包状态">
        <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="红包总金额" />
      <el-table-column prop="totalCount" label="红包总个数" />
      <el-table-column prop="updater" :label="$t('Updatedby')" />
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
    getStatus(v) {
      switch (v) {
        case 1:
          return '已创建'
        case 2:
          return '已领完'
        case 3:
          return '用户删除'
        case 4:
          return '系统过期删除'
      }
    },
    // 改变loading
    HandelLoading(status) {
      this.loading = status
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
