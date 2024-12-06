<template>
  <el-dialog :title="$t('EditAnnouncement')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="用户id">
        <el-input v-model="ruleForm.memberId" />
      </el-form-item>
      <el-form-item :label="$t('Nexttimeyoucanclaimthetimepoint')">
        <el-date-picker v-model="ruleForm.nextSpinTime" type="datetime" :placeholder="$t('Selectdateandtime')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('Remainingnumberofturntables')">
        <el-input v-model="ruleForm.remainingSpins" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getAddstatus()">{{ $t("cancellation") }}</el-button>
      <el-button type="primary" @click="getconfirm()">{{
        $t("determine")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        "memberId": null,
        "nextSpinTime": "",
        "remainingSpins": null
      },
      typeData: [{
        index: 1,
        title: '金额'
      }, {
        index: 2,
        title: '谢谢惠顾'
      }, {
        index: 3,
        title: '再转一次'
      }],
      rules: {

      }
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "memberId": null,
          "nextSpinTime": "",
          "remainingSpins": null
        }
      } else {
        this.ruleForm = { ...data }
      }
    },
    // 确定添加事件
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
    },
  }
}
</script>
