<template>
  <el-dialog
    :title="$t('Editrechargeconfiguration')"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('AccountName')" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Alipayaccount')" prop="alipay">
        <el-input v-model="ruleForm.alipay"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Bankaccount')" prop="bankCardNo">
        <el-input v-model="ruleForm.bankCardNo"></el-input>
      </el-form-item>
      <el-form-item :label="$t('BankName')" prop="bankName">
        <el-input v-model="ruleForm.bankName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('WeChataccount')" prop="wechat">
        <el-input v-model="ruleForm.wechat"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Virtualcoinaddress')" prop="coin">
        <el-input v-model="ruleForm.coin"></el-input>
      </el-form-item>
      <el-form-item :label="$t('ChannelID')" prop="channelId">
        <el-input v-model="ruleForm.channelId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('Channeltype')" prop="type">
        <el-input v-model="ruleForm.type"></el-input>
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="ruleForm.status"
        ></el-switch>
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
        alipay: "",
        bankCardNo: "",
        bankName: "",
        channelId: null,
        coin: "",
        status: 0,
        type: null,
        wechat: "",
      },
      rules: {
        account: [{ required: true, message: "请输入户名", trigger: "blur" }],
        alipay: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" },
        ],
        bankCardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" },
        ],
        channelId: [
          { required: true, message: "请输入渠道ID", trigger: "blur" },
        ],
        coin: [
          { required: true, message: "请输入虚拟币地址", trigger: "blur" },
        ],
        wechat: [
          { required: true, message: "请输入微信账号", trigger: "blur" },
        ],
        type: [{ required: true, message: "请输入渠道类型", trigger: "blur" }],
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
          alipay: "",
          bankCardNo: "",
          bankName: "",
          channelId: null,
          coin: "",
          status: 0,
          type: null,
          wechat: "",
        };
      } else {
        this.ruleForm = data;
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
      <style>
</style>