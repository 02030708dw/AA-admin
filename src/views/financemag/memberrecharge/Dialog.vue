<template>
  <el-dialog
    title="提示"
    :visible.sync="centerDialogVisible"
    width="30%"
    center
  >
    <span v-if="type === 1">确定通过审核?</span>
    <span v-if="type === 3">确定取消审核?</span>
    <!-- 驳回原因 -->
    <span v-if="type === 2">
      <el-input
        v-model="reason"
        type="textarea"
        :rows="3"
        placeholder="请输驳回原因"
      />
    </span>
    <!-- 驳回原因 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">{{ $t('cancellation') }} </el-button>
      <el-button type="primary" @click="handelOk"> {{ $t('determine') }} </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      // 类型
      type: null,
      // 记录id
      id: null,
      reason: ''
    }
  },
  methods: {
    // 改变弹窗状态
    HandelDialogStatus(data) {
      this.type = data.auditStatus
      this.id = data.id
      this.centerDialogVisible = !this.centerDialogVisible
    },
    handelOk() {
      this.$emit('toexamine', { type: this.type, id: this.id, reason: this.reason })
      this.reason = ''
      this.centerDialogVisible = false
    }
  }
}
</script>
<style lang="">

</style>
