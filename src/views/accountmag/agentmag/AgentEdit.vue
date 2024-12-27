<template>
  <!-- 添加币种弹窗 -->
  <el-dialog :title="$t('EditCurrency')" :visible.sync="dialogVisible" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('一级日盈利率')">
        <el-input v-model="ruleForm.firstLevelDailyRate" />
      </el-form-item>
      <el-form-item :label="$t('二级日盈利率')">
        <el-input v-model="ruleForm.secondLevelDailyRate" />
      </el-form-item>
      <el-form-item :label="$t('邮箱')">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getEditstatus()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">
        {{ $t("determine") }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      // 表单数据
      ruleForm: {
        email: '',
        firstLevelDailyRate: '',
        secondLevelDailyRate: ''
      },

    }
  },
  methods: {
    // 改变弹窗状态
    getEditstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          email: '',
          firstLevelDailyRate: '',
          secondLevelDailyRate: ''
        }
      } else {
        this.ruleForm = { ...data }
      }
    },
    // 确定事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.ruleForm)
          // 关闭弹窗
          this.dialogVisible = false
        } else {
          this.$message({
            message: '请填写完整信息!',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
