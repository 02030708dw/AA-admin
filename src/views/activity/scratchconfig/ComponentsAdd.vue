<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="50%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="190px" class="demo-ruleForm">

      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="充值奖金" prop="rechargeBonus">
        <el-input placeholder="每个充值用户奖励的奖金(20p,代理)" v-model="ruleForm.rechargeBonus" />
      </el-form-item>
      <el-form-item label="充值刮刮卡数量" prop="rechargeCards">
        <el-input placeholder="每个充值用户奖励的刮刮卡数量" v-model="ruleForm.rechargeCards" />
      </el-form-item>
      <el-form-item label="注册奖金" prop="registrationBonus">
        <el-input placeholder="每个注册用户奖励的奖金(2p,代理)" v-model="ruleForm.registrationBonus" />
      </el-form-item>
      <el-form-item label="注册刮刮卡数量" prop="registrationCards">
        <el-input placeholder="每个注册用户奖励的刮刮卡数量" v-model="ruleForm.registrationCards" />
      </el-form-item>
      <el-form-item label="每日刮刮卡初始数量" prop="dailyCardsLimit">
        <el-input v-model="ruleForm.dailyCardsLimit" />
      </el-form-item>
      <el-form-item label="代理创建一个要扣除的金额">
        <el-input v-model="ruleForm.deductAmount" />
      </el-form-item>
      <el-form-item :label="$t('state')" prop="status">
        <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.status"></el-switch>
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
        "dailyCardsLimit": 0,
        "description": "",
        "name": "",
        "rechargeBonus": 0,
        "rechargeCards": 0,
        "registrationBonus": 0,
        "registrationCards": 0,
        "status": 0,
        deductAmount: null
      },
      rules: {
        dailyCardsLimit: [{ required: true, message: '请输入每日刮刮卡初始数量', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        rechargeBonus: [
          { required: true, message: '请输入用户奖励的奖金', trigger: 'blur' }
        ],
        rechargeCards: [
          { required: true, message: '请输入用户奖励的刮刮卡数量', trigger: 'blur' }
        ],
        registrationBonus: [{ required: true, message: '请输入注册用户奖励的奖金', trigger: 'blur' }],
        registrationCards: [{ required: true, message: '请输入注册用户奖励的刮刮卡数量', trigger: 'blur' }],
      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "dailyCardsLimit": null,
          "description": "",
          "name": "",
          "rechargeBonus": null,
          "rechargeCards": null,
          "registrationBonus": null,
          "registrationCards": null,
          "status": 0,
          deductAmount: null
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