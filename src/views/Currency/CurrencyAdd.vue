<template>
  <!-- 添加币种弹窗 -->
  <el-dialog
    :title="$t('AddCurrency')"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('Currency')" prop="currency">
        <el-input v-model="ruleForm.currency" />
      </el-form-item>

      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          v-model="ruleForm.status"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item :label="$t('Notes')" prop="remark">
        <el-input v-model="ruleForm.remark" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button>
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
        currency: '', // 币种
        status: 0, // 状态
        remark: '' // 备注
      },
      rules: {
        currency: [
          { required: true, message: '请输入币种', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          currency: '', // 币种
          status: 0, // 状态
          remark: '' // 备注
        }
      }
      this.dialogVisible = !this.dialogVisible
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
<style lang="scss" scoped>

</style>
