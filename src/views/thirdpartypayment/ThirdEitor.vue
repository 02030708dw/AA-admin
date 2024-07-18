<template>
  <el-dialog title="添加第三方支付" :visible.sync="dialogVisible" width="50%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('account')" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="调用地址" prop="apiUrl">
        <el-input v-model="ruleForm.apiUrl"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Currency')" prop="currency">
        <el-input v-model="ruleForm.currency"></el-input>
      </el-form-item>
      <el-form-item label="javaBean" prop="javaBean">
        <el-input v-model="ruleForm.javaBean"></el-input>
      </el-form-item>
      <el-form-item label="秘钥" prop="secret">
        <el-input v-model="ruleForm.secret"></el-input>
      </el-form-item>
      <el-form-item :label="$t('ThreePartyNames')" prop="threeName">
        <el-input v-model="ruleForm.threeName"></el-input>
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
      //表单数据
      ruleForm: {
        account: "",
        apiUrl: "",
        currency: "",
        javaBean: "",
        secret: "",
        threeName: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        apiUrl: [
          { required: true, message: "请输入调用地址", trigger: "blur" },
        ],
        currency: [{ required: true, message: "请输入币种", trigger: "blur" }],
        javaBean: [
          { required: true, message: "请输入javaBean", trigger: "blur" },
        ],
        secret: [{ required: true, message: "请输入秘钥", trigger: "blur" }],
        threeName: [
          { required: true, message: "请输入三方名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      // 关闭时清空
      if (!this.dialogVisible) {
        this.ruleForm = {
          account: "",
          apiUrl: "",
          currency: "",
          javaBean: "",
          secret: "",
          threeName: "",
        };
      } else {
        this.ruleForm = { ...data };
      }
    },
    // 确定添加事件
    getconfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
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

<style></style>
