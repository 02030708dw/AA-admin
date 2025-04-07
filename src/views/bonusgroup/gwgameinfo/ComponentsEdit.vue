<template>
  <!-- 添加币种弹窗 -->
  <el-dialog :title="$t('修改代理平台游戏信息')" :visible.sync="dialogVisible" width="50%">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item :label="$t('单注中奖金额')" prop="winAmount">
        <el-input v-model="ruleForm.winAmount" />
      </el-form-item>
      <el-form-item :label="$t('单倍满水金额')" prop="fullAmount">
        <el-input v-model="ruleForm.fullAmount" />
      </el-form-item>
      <el-form-item :label="$t('展示标识')" prop="sign">
        <el-switch v-model="ruleForm.sign" :active-value="1" :inactive-value="0" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getEditstatus()">{{ $t("cancellation") }}</el-button>
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
        id: "",
        winAmount: "", // 单注中奖金额
        fullAmount: "",
        sign: 0, // 展示标识（0.不展示，1.展示）
      },
      rules: {
        winAmount: [{ required: true, message: "请输入单注中奖金额", trigger: "blur" }],
        fullAmount: [{ required: true, message: "请输入单倍满水金额", trigger: "blur" }],
        sign: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 改变弹窗状态
    getEditstatus(data) {
      this.dialogVisible = !this.dialogVisible;
      if (!this.dialogVisible) {
        this.ruleForm = {
          winAmount: "",
          fullAmount: "",
          sign: 0,
          id: "",
        };
      } else {
        this.ruleForm = { ...data };
      }
    },
    // 确定事件
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
<style lang="scss" scoped></style>
