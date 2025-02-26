<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('VIPlevel')" prop="vipLevel">
        <el-input v-model="ruleForm.vipLevel" />
      </el-form-item>
      <el-form-item :label="$t('Rechargeconditions')" prop="rechargeThreshold">
        <el-input v-model="ruleForm.rechargeThreshold" />
      </el-form-item>
      <el-form-item :label="$t('Flowconditions')" prop="turnoverThreshold">
        <el-input v-model="ruleForm.turnoverThreshold" />
      </el-form-item>
      <el-form-item :label="$t('describe')">
        <el-input v-model="ruleForm.description" />
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
        "description": "",
        "rechargeThreshold": 0,
        "turnoverThreshold": 0,
        "vipLevel": null
      },
      rules: {
        vipLevel: [{ required: true, message: '请输入vip等级', trigger: 'blur' }],
        rechargeThreshold: [{ required: true, message: '请输入充值条件', trigger: 'blur' }],
        turnoverThreshold: [{ required: true, message: '请输入流水条件', trigger: 'blur' }],
      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "description": "",
          "rechargeThreshold": null,
          "turnoverThreshold": null,
          "vipLevel": null,
        };
      }
      this.dialogVisible = !this.dialogVisible;
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'this.ruleForm');
          this.$emit("confirm", this.ruleForm);
          // 关闭弹窗
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "请填写完整信息!",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>