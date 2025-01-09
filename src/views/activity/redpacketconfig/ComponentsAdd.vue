<template>
  <el-dialog :title="$t('increase')" :visible.sync="dialogVisible" width="40%">
    <el-form style="width: 500px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px"
      class="demo-ruleForm">
      <el-form-item label="红包金额比例最大值" prop="amountRatioMax">
        <el-input v-model="ruleForm.amountRatioMax" />
      </el-form-item>
      <el-form-item label="红包金额比例最小值" prop="amountRatioMin">
        <el-input v-model="ruleForm.amountRatioMin" />
      </el-form-item>
      <el-form-item label="单个红包最大金额" prop="createAmountMax">
        <el-input v-model="ruleForm.createAmountMax" />
      </el-form-item>
      <el-form-item label="单个红包最小金额" prop="createAmountMin">
        <el-input v-model="ruleForm.createAmountMin" />
      </el-form-item>
      <el-form-item label="创建红包数量上限" prop="createNumberMax">
        <el-input v-model="ruleForm.createNumberMax" />
      </el-form-item>
      <el-form-item label="创建链接数量上限" prop="createUrlMax">
        <el-input v-model="ruleForm.createUrlMax" />
      </el-form-item>
      <el-form-item label="平台每天赠送的红包金额" prop="dailyBonus">
        <el-input v-model="ruleForm.dailyBonus" />
      </el-form-item>
      <el-form-item label="是否是代理" prop="isAgent">
        <el-select v-model="ruleForm.isAgent" :placeholder="$t('customertype')" style="width: 200px">
          <el-option v-for="(item, index) in [{ index: 0, title: '普通用户' }, { index: 1, title: '代理' }]" :key="index"
            :value="item.index" :label="$t(item.title)" />
        </el-select>
      </el-form-item>
      <el-form-item label="每个充值用户奖励的奖金" prop="rechargeBonus">
        <el-input v-model="ruleForm.rechargeBonus" />
      </el-form-item>
      <el-form-item label="每个注册用户奖励的奖金" prop="registrationBonus">
        <el-input v-model="ruleForm.registrationBonus" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
      <el-form-item :label="$t('state')">
        <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
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
        "amountRatioMax": 0,
        "amountRatioMin": 0,
        "createAmountMax": 0,
        "createAmountMin": 0,
        "createNumberMax": 0,
        "createUrlMax": 0,
        "dailyBonus": 0,
        "description": "",
        "isAgent": 0,
        "rechargeBonus": 0,
        "registrationBonus": 0,
        "status": 0
      },
      rules: {
        amountRatioMax: [{ required: true, message: '请输入红包金额比例最大值', trigger: 'blur' }],
        amountRatioMin: [{ required: true, message: '请输入红包金额比例最小值', trigger: 'blur' }],
        createAmountMax: [{ required: true, message: '请输入单个红包最大金额', trigger: 'blur' }],
        createAmountMin: [{ required: true, message: '请输入单个红包最小金额', trigger: 'blur' }],
        createNumberMax: [{ required: true, message: '请输入创建红包数量上限', trigger: 'blur' }],
        createUrlMax: [{ required: true, message: '请输入创建链接数量上限', trigger: 'blur' }],
        dailyBonus: [{ required: true, message: '请输入平台每天赠送的红包金额', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        isAgent: [{ required: true, message: '请选择是否代理', trigger: 'change' }],
        rechargeBonus: [{ required: true, message: '请输入充值奖励', trigger: 'blur' }],
        registrationBonus: [{ required: true, message: '请输入注册奖励', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      loading: false
    };
  },
  methods: {
    // 改变弹窗状态
    getAddstatus() {
      if (!this.dialogVisible) {
        this.ruleForm = {
          "amountRatioMax": null,
          "amountRatioMin": null,
          "createAmountMax": null,
          "createAmountMin": null,
          "createNumberMax": null,
          "createUrlMax": null,
          "dailyBonus": null,
          "description": null,
          "isAgent": null,
          "rechargeBonus": null,
          "registrationBonus": null,
          "status": 0
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