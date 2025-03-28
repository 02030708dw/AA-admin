<template>
  <el-dialog :title="$t('edit')" top="30px" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('describe')" prop="description">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
      <el-form-item label="每日赠送投注次数">
        <el-input v-model="ruleForm.dailyGift" />
      </el-form-item>
      <el-form-item label="gw商户code">
        <el-input v-model="ruleForm.gwMerchantCode" />
      </el-form-item>
      <el-form-item label="每个充值用户奖励的奖金（代理）">
        <el-input v-model="ruleForm.rechargeBonus" />
      </el-form-item>
      <el-form-item label="每个充值用户奖励的投注次数">
        <el-input v-model="ruleForm.rechargeNumbers" />
      </el-form-item>
      <el-form-item label="每个注册用户奖励的奖金（代理）">
        <el-input v-model="ruleForm.registrationBonus" />
      </el-form-item>
      <el-form-item label="每个注册用户奖励的投注次数">
        <el-input v-model="ruleForm.registrationNumbers" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
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
        "dailyGift": 0,
        "description": "",
        "gwMerchantCode": "",
        "name": "",
        "rechargeBonus": 0,
        "rechargeNumbers": 0,
        "registrationBonus": 0,
        "registrationNumbers": 0,
        "status": 0
      },
      rules: {
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible
      if (!this.dialogVisible) {
        this.ruleForm = {
          "dailyGift": null,
          "description": "",
          "gwMerchantCode": "",
          "name": "",
          "rechargeBonus": null,
          "rechargeNumbers": null,
          "registrationBonus": null,
          "registrationNumbers": null,
          "status": null
        };
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
