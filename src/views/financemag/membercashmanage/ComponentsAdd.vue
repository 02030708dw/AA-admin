<template>
  <el-dialog :title="$t('increase')" append-to-body :visible.sync="dialogVisible" width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('ChannelID')" prop="cashChannelId">
        <el-select v-model="ruleForm.cashChannelId" placeholder="选择渠道" style="width: 200px">
          <el-option v-for="(item, index) in channelidList" :key="index" :value="item.index" :label="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('AccountName')" prop="bankAccount">
        <el-input v-model="ruleForm.bankAccount" />
      </el-form-item>
      <el-form-item :label="$t('Membername')" prop="memberName">
        <el-input v-model="ruleForm.memberName" />
      </el-form-item>
      <el-form-item v-if="[0, 4, 5].includes(Channeltype)" :label="accountNumberLabel" prop="bankCardNo">
        <el-input v-model="ruleForm.bankCardNo" />
      </el-form-item>
      <el-form-item v-if="Channeltype == 0" :label="$t('Nameofwithdrawalbank')" prop="bankName">
        <el-input v-model="ruleForm.bankName" />
      </el-form-item>
      <el-form-item v-if="Channeltype == 1" :label="$t('Alipayaccount')" prop="alipay">
        <el-input v-model="ruleForm.alipay" />
      </el-form-item>
      <el-form-item v-if="Channeltype == 2" :label="$t('WeChataccount')" prop="wechat">
        <el-input v-model="ruleForm.wechat" />
      </el-form-item>
      <el-form-item v-if="Channeltype == 3" :label="$t('Virtualcoinaddress')" prop="coin">
        <el-input v-model="ruleForm.coin" />
      </el-form-item>
      <el-form-item label="收款人IFSC" prop="ifsc">
        <el-input v-model="ruleForm.ifsc" />
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
  props: {
    channelidList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    accountNumberLabel() {
      if (this.Channeltype === 4) return 'GCash收款手机号';
      if (this.Channeltype === 5) return 'MAYA收款手机号';
      return this.$t('Withdrawalbankcardnumber');
    },
    Channeltype() {
      let type = null;
      this.channelidList.forEach((v) => {
        if (this.ruleForm.cashChannelId == v.index) {
          type = v.type;
        }
      });
      return type;
    },
  },
  data() {
    return {
      // 弹窗状态
      dialogVisible: false,
      ruleForm: {
        "alipay": "",
        "bankAccount": "",
        "bankCardNo": "",
        "bankName": "",
        "cashChannelId": null,
        "coin": "",
        "icon": "",
        "ifsc": "",
        "memberName": null,
        "wechat": ""
      },
      rules: {
        bankAccount: [{ required: true, message: "请输入户名", trigger: "blur" }],
        alipay: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" },
        ],
        bankCardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" },
        ],
        cashChannelId: [
          { required: true, message: "请选择渠道ID", trigger: "blur" },
        ],
        coin: [
          { required: true, message: "请输入虚拟币地址", trigger: "blur" },
        ],
        wechat: [
          { required: true, message: "请输入微信账号", trigger: "blur" },
        ],
        icon: [{ required: true, message: "请上传图标", trigger: "blur" }],
        ifsc: [
          { required: true, message: "请输入收款人IFSC", trigger: "blur" },
        ],
        memberName: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
        ],
      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "alipay": "",
          "bankAccount": "",
          "bankCardNo": "",
          "bankName": "",
          "cashChannelId": null,
          "coin": "",
          "icon": "",
          "ifsc": "",
          "memberId": null,
          "wechat": ""
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
