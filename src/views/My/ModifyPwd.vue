<template>
  <el-dialog
    :title="$t('Changepassword')"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('Password')" prop="newPwd">
        <el-input v-model="ruleForm.newPwd" show-password />
      </el-form-item>
      <el-form-item :label="$t('Oldpassword')" prop="oldPwd">
        <el-input v-model="ruleForm.oldPwd" show-password />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="HandelShow">{{ $t('cancellation') }}</el-button>
      <el-button type="primary" @click="HandelPwd">{{ $t('determine') }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { ChangPWD } from '../../api/account/user'
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        newPwd: '',
        oldPwd: ''
      },
      rules: {
        newPwd: [{ required: true, message: this.$t('Newpasswordnotentered'), trigger: 'blur' }],
        oldPwd: [{ required: true, message: this.$t('Theoldpasswordwasnotentered'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 改变状态
    HandelShow() {
      this.dialogVisible = !this.dialogVisible
      this.ruleForm = { newPwd: '', oldPwd: '' }
    },
    // 修改密码
    HandelPwd() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          ChangPWD({ newPwd: this.ruleForm.newPwd, oldPwd: this.ruleForm.oldPwd }).then(res => {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '修改失败!',
              type: 'warning'
            })
          })
          this.HandelShow()
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
